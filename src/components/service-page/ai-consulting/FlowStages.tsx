"use client";

import { useEffect, useRef, useState } from "react";

type Stage = {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: string;
};

// 6 boxes + 5 connectors, alternating: box(0), arrow(1), box(2), arrow(3), ...
const STEP_COUNT = 11;
const BOX_DWELL_MS = 550;
const ARROW_DWELL_MS = 350;
const LOOP_PAUSE_MS = 1400;
const PAUSE_POLL_MS = 200;

function ArrowRight({ lit }: { lit: boolean }) {
  return (
    <div className="hidden sm:flex items-center justify-center">
      <svg
        className={`w-5 h-5 transition-colors duration-300 ${lit ? "text-blue-600" : "text-navy-200"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

function ArrowDown({ lit }: { lit: boolean }) {
  return (
    <div className="flex justify-center py-2">
      <svg
        className={`w-5 h-5 transition-colors duration-300 ${lit ? "text-blue-600" : "text-navy-200"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M6 13l6 6 6-6" />
      </svg>
    </div>
  );
}

function StageNode({ stage, state }: { stage: Stage; state: "idle" | "current" | "passed" }) {
  const cardClass =
    state === "current"
      ? "border-blue-600 bg-white shadow-md ring-4 ring-blue-600/10 scale-[1.02]"
      : state === "passed"
        ? "border-warm-border bg-white"
        : "border-warm-border bg-transparent";
  const accentClass = state === "idle" ? "text-navy-300" : "text-blue-600";
  const titleClass = state === "idle" ? "text-navy-400" : "text-navy-900";
  const descClass = state === "idle" ? "text-navy-400" : "text-navy-600";

  return (
    <div className={`rounded-2xl border p-6 transition-all duration-500 ${cardClass}`}>
      <div className="flex items-center justify-between">
        <span
          className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 transition-colors duration-300 ${
            state === "idle" ? "border-warm-border text-navy-300" : "border-blue-600 text-blue-600"
          }`}
        >
          {stage.number}
        </span>
        <svg className={`w-5 h-5 transition-colors duration-300 ${accentClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={stage.icon} />
        </svg>
      </div>
      <div className={`mt-3.5 text-xs font-mono tracking-wider transition-colors duration-300 ${accentClass}`}>{stage.label}</div>
      <div className={`mt-1 text-base font-medium transition-colors duration-300 ${titleClass}`}>{stage.title}</div>
      <div className={`mt-2 text-xs leading-relaxed transition-colors duration-300 ${descClass}`}>{stage.description}</div>
    </div>
  );
}

export default function FlowStages({ stages }: { stages: readonly Stage[] }) {
  const [row1, row2] = [stages.slice(0, 3), stages.slice(3, 6)];
  const [activeStep, setActiveStep] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let step = -1;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!visibleRef.current || hoveredRef.current) {
        timeoutId = setTimeout(tick, PAUSE_POLL_MS);
        return;
      }

      step = step + 1 >= STEP_COUNT ? 0 : step + 1;
      setActiveStep(step);
      const dwell = step === STEP_COUNT - 1 ? LOOP_PAUSE_MS : step % 2 === 0 ? BOX_DWELL_MS : ARROW_DWELL_MS;
      timeoutId = setTimeout(tick, dwell);
    };

    const waitForStart = () => {
      if (!visibleRef.current) {
        timeoutId = setTimeout(waitForStart, PAUSE_POLL_MS);
        return;
      }
      if (reducedMotion) {
        setActiveStep(STEP_COUNT - 1);
        return;
      }
      timeoutId = setTimeout(tick, 200);
    };

    timeoutId = setTimeout(waitForStart, PAUSE_POLL_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  const boxState = (stepIndex: number): "idle" | "current" | "passed" =>
    activeStep === stepIndex ? "current" : activeStep > stepIndex ? "passed" : "idle";
  const arrowLit = (stepIndex: number) => activeStep >= stepIndex;

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
    >
      <div className="grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-y-4">
        <StageNode stage={row1[0]} state={boxState(0)} />
        <ArrowRight lit={arrowLit(1)} />
        <StageNode stage={row1[1]} state={boxState(2)} />
        <ArrowRight lit={arrowLit(3)} />
        <StageNode stage={row1[2]} state={boxState(4)} />
      </div>

      <ArrowDown lit={arrowLit(5)} />

      <div className="grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-y-4">
        <StageNode stage={row2[0]} state={boxState(6)} />
        <ArrowRight lit={arrowLit(7)} />
        <StageNode stage={row2[1]} state={boxState(8)} />
        <ArrowRight lit={arrowLit(9)} />
        <StageNode stage={row2[2]} state={boxState(10)} />
      </div>
    </div>
  );
}
