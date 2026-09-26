import { Fragment } from "react";
import Reveal from "@/components/Reveal";
import Callout from "@/components/Callout";

export type ProcessStage = {
  number: string;
  label: string;
  title: string;
  description: string;
  /** Short note attached under this stage's card, e.g. "Discovery may conclude here." */
  note?: string;
  /** SVG path data for the stage icon (see lib/icons). */
  icon?: string;
};

export type ProcessConnector = {
  from: number;
  to: number;
  label: string;
};

/** A terminal arrow that leaves the flow at a stage, rather than linking two stages. */
export type ProcessExit = {
  at: number;
  label: string;
};

type ConnectorKind = "forward" | "feedback" | "shortcut" | "branch" | "exit";

type Routed = {
  kind: ConnectorKind;
  from: number;
  to?: number;
  label?: string;
};

// Literal class names so Tailwind's scanner picks them up — the row split is
// data-driven, so the column/span utilities have to be looked up, not built.
const COLS_CLASS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};
const SPAN_CLASS: Record<number, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  6: "sm:col-span-6",
};

const KIND_COLOUR: Record<ConnectorKind, string> = {
  forward: "var(--color-blue-600)",
  feedback: "var(--color-teal-accent)",
  shortcut: "var(--color-blue-400)",
  branch: "var(--color-teal-accent)",
  exit: "var(--color-navy-500)",
};

/** Horizontal gap between cards, in px — also the length of an in-row connector. */
const COL_GAP = 40;

/** Seconds the glow takes to travel once around a card's border before handing
 *  off to the next stage. The whole diagram loops every stages × GLOW_STEP. */
const GLOW_STEP = 3;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

function Arrowhead({
  direction,
  colour,
  style,
}: {
  direction: "right" | "left" | "up" | "down";
  colour: string;
  style?: React.CSSProperties;
}) {
  const rotation = { right: 0, down: 90, left: 180, up: 270 }[direction];
  return (
    <svg
      className="absolute h-2.5 w-2.5 shrink-0"
      viewBox="0 0 12 12"
      fill="none"
      stroke={colour}
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ ...style, transform: `${style?.transform ?? ""} rotate(${rotation}deg)` }}
    >
      <path d="M4 2 L8 6 L4 10" />
    </svg>
  );
}

/** Marks where a connector leaves its source card; the Arrowhead marks where it lands. */
function StartDot({ colour, style }: { colour: string; style?: React.CSSProperties }) {
  return (
    <span
      className="start-dot absolute z-10 h-2 w-2 shrink-0 rounded-full ring-2 ring-white"
      style={{ background: colour, color: colour, ...style }}
    />
  );
}

/**
 * Shared process-diagram building block for the service pages.
 *
 * Reading order is the flat <ol>: one <li> per stage, 1 through N, regardless of
 * how many visual rows the grid is split into. The row split comes from column
 * spans over a least-common-multiple grid (3 + 2 rows become a 6-column grid
 * with spans of 2 and 3), so the DOM order is never broken into row wrappers.
 *
 * Connections are drawn explicitly as animated dotted lines with arrowheads:
 * steps within a row run through the column gap, and anything crossing rows is
 * routed orthogonally through a lane in the strip between the two rows. Straight
 * segments only, so the dash pattern stays undistorted at any width. All
 * connector elements are aria-hidden — the numbered stages carry the sequence
 * for assistive tech, and each non-linear path is also stated in text for mobile.
 *
 * NOTE: the continuous marching animation is a deliberate, owner-approved
 * deviation from the master brief's "a static flow is sufficient / do not
 * animate the stages automatically". Reduced-motion is still honoured.
 */
export default function ProcessDiagram({
  stages,
  rows,
  shortcut,
  loop,
  branch,
  exit,
  caption,
  captionLabel,
}: {
  stages: readonly ProcessStage[];
  /** Stages per row, e.g. [3, 3] or [3, 2]. Defaults to one row of 3 then the remainder. */
  rows?: readonly number[];
  /** Forward-skip connector, e.g. GovCon's "02 → 04, Active solicitation". */
  shortcut?: ProcessConnector;
  /** Backward connector, e.g. AI Consulting's "Review & Refine → Build & Demonstrate". */
  loop?: ProcessConnector;
  /** Conditional path that bypasses a stage, e.g. Design & Engineering's design-only path. */
  branch?: { fromStage: number; toStage: number; label: string };
  /** Terminal arrow leaving the flow, e.g. "Discovery may conclude here." */
  exit?: ProcessExit;
  caption?: string;
  /** Heading for the highlighted caption panel, e.g. "A note on the process". */
  captionLabel?: string | null;
}) {
  const rowSplit = (rows?.length ? [...rows] : [3, Math.max(stages.length - 3, 0)]).filter((n) => n > 0);

  const groups: ProcessStage[][] = [];
  let cursor = 0;
  for (const count of rowSplit) {
    groups.push(stages.slice(cursor, cursor + count));
    cursor += count;
  }
  if (cursor < stages.length) groups.push(stages.slice(cursor));

  let cols = rowSplit.reduce((a, b) => lcm(a, b), 1);
  if (!COLS_CLASS[cols]) cols = Math.max(...rowSplit, 1);

  const items = groups.flatMap((row, rowIndex) =>
    row.map((stage, posInRow) => ({
      stage,
      rowIndex,
      posInRow,
      rowCount: row.length,
      span: Math.max(1, Math.floor(cols / row.length)),
      isRowEnd: posInRow === row.length - 1,
    }))
  );

  /** Horizontal centre of a stage as a percentage of the grid width. */
  const centrePct = (index: number) => {
    const item = items[index];
    if (!item) return 50;
    return ((item.posInRow + 0.5) / item.rowCount) * 100;
  };
  const rowOf = (index: number) => items[index]?.rowIndex ?? 0;

  // Every declared connection, forward steps included.
  const routed: Routed[] = [];
  for (let i = 0; i < items.length - 1; i++) routed.push({ kind: "forward", from: i, to: i + 1 });
  if (shortcut) routed.push({ kind: "shortcut", from: shortcut.from, to: shortcut.to, label: shortcut.label });
  if (loop) routed.push({ kind: "feedback", from: loop.from, to: loop.to, label: loop.label });
  if (branch) routed.push({ kind: "branch", from: branch.fromStage, to: branch.toStage, label: branch.label });
  if (exit) routed.push({ kind: "exit", from: exit.at, label: exit.label });

  const isInRow = (c: Routed) =>
    c.kind === "forward" && c.to !== undefined && rowOf(c.from) === rowOf(c.to) && c.to === c.from + 1;

  const inRowAfter = new Set(routed.filter(isInRow).map((c) => c.from));

  // Anything not drawn inside a card goes into the strip below the upper row it touches.
  const strips = new Map<number, Routed[]>();
  for (const c of routed) {
    if (isInRow(c)) continue;
    const stripRow = c.to === undefined ? rowOf(c.from) : Math.min(rowOf(c.from), rowOf(c.to));
    const list = strips.get(stripRow) ?? [];
    list.push(c);
    strips.set(stripRow, list);
  }

  const lastRowIndex = groups.length - 1;

  return (
    <div>
      <ol className={`grid grid-cols-1 gap-y-4 gap-x-10 ${COLS_CLASS[cols] ?? "sm:grid-cols-3"}`}>
        {items.map((item, index) => {
          const stripHere = item.isRowEnd && strips.get(item.rowIndex);
          const stripConnectors = stripHere && item.rowIndex < lastRowIndex + 1 ? stripHere : undefined;
          const laneCount = stripConnectors?.length ?? 0;
          const stripHeight = 44 + Math.max(0, laneCount - 1) * 30;

          return (
            <Fragment key={item.stage.number}>
              <li className={`relative ${SPAN_CLASS[item.span] ?? "sm:col-span-1"}`}>
                <Reveal delay={index * 70} className="h-full">
                  <div
                    className="stage-glow h-full rounded-2xl border border-blue-200 bg-pale-blue p-6"
                    style={{
                      ["--glow-step" as string]: `${GLOW_STEP}s`,
                      ["--glow-cycle" as string]: `${items.length * GLOW_STEP}s`,
                      ["--glow-delay" as string]: `${index * GLOW_STEP}s`,
                      ["--glow-slot" as string]: `glow-slot-${items.length}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-sans text-sm text-white shrink-0">
                        {item.stage.number}
                      </span>
                      {item.stage.icon && (
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shrink-0">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.stage.icon} />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="mt-3.5 text-xs font-mono tracking-wider text-blue-600">{item.stage.label}</div>
                    <div className="mt-1 text-base font-medium text-navy-900">{item.stage.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.stage.description}</p>
                    {item.stage.note && (
                      <p
                        className={`mt-3 text-xs font-medium italic text-navy-500 ${
                          exit && exit.at === index ? "sm:hidden" : ""
                        }`}
                      >
                        {item.stage.note}
                      </p>
                    )}
                    {/* Non-linear paths restated as text, since the drawn lines are desktop-only. */}
                    {loop && index === loop.from && (
                      <p className="mt-3 text-xs font-medium text-teal-accent sm:hidden">
                        ↻ {loop.label} — back to {stages[loop.to]?.title}
                      </p>
                    )}
                    {shortcut && index === shortcut.from && (
                      <p className="mt-3 text-xs font-medium text-blue-700 sm:hidden">
                        ↷ {shortcut.label} — skip to {stages[shortcut.to]?.title}
                      </p>
                    )}
                    {branch && index === branch.fromStage && (
                      <p className="mt-3 text-xs font-medium text-teal-accent sm:hidden">
                        ⤳ {branch.label} — straight to {stages[branch.toStage]?.title}
                      </p>
                    )}
                  </div>
                </Reveal>

                {/* Step to the next stage in the same row — runs through the column gap. */}
                {inRowAfter.has(index) && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 hidden items-center sm:flex"
                    style={{ left: "100%", width: COL_GAP, transform: "translateY(-50%)" }}
                  >
                    <StartDot
                      colour={KIND_COLOUR.forward}
                      style={{ left: 0, top: "50%", transform: "translate(-50%, -50%)" }}
                    />
                    <span
                      className="flow-x flow-right h-0.5 flex-1"
                      style={{ ["--flow-color" as string]: KIND_COLOUR.forward }}
                    />
                    <Arrowhead
                      direction="right"
                      colour={KIND_COLOUR.forward}
                      style={{ right: -2, top: "50%", transform: "translateY(-50%)" }}
                    />
                  </span>
                )}

                {/* Step to the next stage on mobile, where the cards are stacked. */}
                {index < items.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 sm:hidden"
                    style={{ top: "100%", height: 16, transform: "translateX(-50%)" }}
                  >
                    <StartDot
                      colour={KIND_COLOUR.forward}
                      style={{ left: "50%", top: 0, transform: "translate(-50%, -50%)" }}
                    />
                    <span
                      className="flow-y flow-down block h-full w-0.5"
                      style={{ ["--flow-color" as string]: KIND_COLOUR.forward }}
                    />
                  </span>
                )}
              </li>

              {stripConnectors && stripConnectors.length > 0 && (
                <li role="presentation" aria-hidden="true" className="col-span-full hidden sm:block">
                  <div className="relative" style={{ height: stripHeight }}>
                    {stripConnectors.map((c, lane) => {
                      const colour = KIND_COLOUR[c.kind];
                      const laneY = ((lane + 1) / (stripConnectors.length + 1)) * 100;
                      // Nudge each lane's verticals apart so parallel runs don't sit on top of each other.
                      const nudge = lane * 10 - (stripConnectors.length - 1) * 5;
                      const fromX = `calc(${centrePct(c.from)}% + ${nudge}px)`;

                      if (c.to === undefined) {
                        // Terminal exit: drops out of the flow and stops.
                        return (
                          <Fragment key={`exit-${c.from}`}>
                            <StartDot colour={colour} style={{ left: fromX, top: 0, transform: "translate(-50%, -50%)" }} />
                            <span
                              className="flow-y flow-down absolute w-0.5"
                              style={{ left: fromX, top: 0, height: `${laneY}%`, ["--flow-color" as string]: colour }}
                            />
                            <Arrowhead
                              direction="down"
                              colour={colour}
                              style={{ left: fromX, top: `${laneY}%`, transform: "translate(-50%, -50%)" }}
                            />
                            {c.label && (
                              <span
                                className="absolute whitespace-nowrap text-[11px] font-medium text-navy-500"
                                style={{ left: `calc(${centrePct(c.from)}% + ${nudge + 12}px)`, top: `${laneY}%`, transform: "translateY(-50%)" }}
                              >
                                {c.label}
                              </span>
                            )}
                          </Fragment>
                        );
                      }

                      const toX = `calc(${centrePct(c.to)}% + ${nudge}px)`;
                      const goingDown = rowOf(c.to) > rowOf(c.from);
                      const leftPct = Math.min(centrePct(c.from), centrePct(c.to));
                      const rightPct = Math.max(centrePct(c.from), centrePct(c.to));
                      const travellingLeft = centrePct(c.to) < centrePct(c.from);

                      return (
                        <Fragment key={`${c.kind}-${c.from}-${c.to}`}>
                          {/* leave the source card */}
                          <StartDot
                            colour={colour}
                            style={{
                              left: fromX,
                              ...(goingDown ? { top: 0, transform: "translate(-50%, -50%)" } : { bottom: 0, transform: "translate(-50%, 50%)" }),
                            }}
                          />
                          <span
                            className={`flow-y absolute w-0.5 ${goingDown ? "flow-down" : "flow-up"}`}
                            style={{
                              left: fromX,
                              ...(goingDown ? { top: 0, height: `${laneY}%` } : { bottom: 0, height: `${100 - laneY}%` }),
                              ["--flow-color" as string]: colour,
                            }}
                          />
                          {/* run along the lane */}
                          <span
                            className={`flow-x absolute h-0.5 ${travellingLeft ? "flow-left" : "flow-right"}`}
                            style={{
                              left: `calc(${leftPct}% + ${nudge}px)`,
                              width: `${rightPct - leftPct}%`,
                              top: `${laneY}%`,
                              ["--flow-color" as string]: colour,
                            }}
                          />
                          {/* arrive at the target card */}
                          <span
                            className={`flow-y absolute w-0.5 ${goingDown ? "flow-down" : "flow-up"}`}
                            style={{
                              left: toX,
                              ...(goingDown ? { top: `${laneY}%`, bottom: 0 } : { top: 0, height: `${laneY}%` }),
                              ["--flow-color" as string]: colour,
                            }}
                          />
                          <Arrowhead
                            direction={goingDown ? "down" : "up"}
                            colour={colour}
                            style={{
                              left: toX,
                              ...(goingDown ? { bottom: -5 } : { top: -5 }),
                              transform: "translateX(-50%)",
                            }}
                          />
                          {c.label && (
                            <span
                              className="absolute whitespace-nowrap bg-white px-2 text-[11px] font-medium"
                              style={{
                                left: `calc(${(leftPct + rightPct) / 2}% + ${nudge}px)`,
                                top: `${laneY}%`,
                                color: colour,
                                transform: "translate(-50%, -50%)",
                              }}
                            >
                              {c.label}
                            </span>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>

      {caption && (
        <Callout label={captionLabel} className="mt-8">
          {caption}
        </Callout>
      )}
    </div>
  );
}
