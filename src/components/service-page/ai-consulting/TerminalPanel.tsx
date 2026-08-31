import Reveal from "@/components/Reveal";

export default function TerminalPanel() {
  return (
    <Reveal delay={100} className="rounded-lg bg-ink overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="ml-2 font-mono text-[10px] text-white/35">engineering.diff</span>
      </div>
      <div className="font-mono text-xs leading-loose p-5 text-white/75">
        <div className="text-white/30">{"// AI-assisted, engineering-reviewed"}</div>
        <div className="text-blue-300">
          function <span className="text-white">routeRequest</span>(req) {"{"}
        </div>
        <div className="pl-4">const plan = discover(req);</div>
        <div className="pl-4">assertHumanReview(plan);</div>
        <div className="pl-4">return engineer(plan);</div>
        <div className="text-blue-300">{"}"}</div>
        <div className="mt-2 text-blue-300">&#10003; architecture reviewed</div>
        <div className="text-blue-300">&#10003; security &amp; validation passed</div>
      </div>
    </Reveal>
  );
}
