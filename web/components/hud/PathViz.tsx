"use client";

import { useEnigmaStore } from "@/store/useEnigmaStore";
import { useEffect } from "react";

const LABELS: Record<string, string> = {
  "plug-in": "Stecker in",
  "right-fwd": "Right →",
  "mid-fwd": "Middle →",
  "left-fwd": "Left →",
  reflector: "Reflector",
  "left-back": "← Left",
  "mid-back": "← Middle",
  "right-back": "← Right",
  "plug-out": "Stecker out",
};

export function PathViz() {
  const lastTrace = useEnigmaStore((s) => s.lastTrace);
  const pathIndex = useEnigmaStore((s) => s.pathIndex);
  const slowMo = useEnigmaStore((s) => s.slowMo);
  const animating = useEnigmaStore((s) => s.animating);
  const setPathIndex = useEnigmaStore((s) => s.setPathIndex);
  const commitLamp = useEnigmaStore((s) => s.commitLamp);

  useEffect(() => {
    if (!slowMo || !animating || !lastTrace) return;
    const hops = lastTrace.path.length;
    const step = 400 / hops;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      if (i >= hops) {
        window.clearInterval(id);
        commitLamp();
        return;
      }
      setPathIndex(i);
    }, step);
    return () => window.clearInterval(id);
  }, [animating, lastTrace, slowMo, commitLamp, setPathIndex]);

  if (!lastTrace) {
    return (
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
        Current idle
      </p>
    );
  }

  const hop = lastTrace.path[Math.max(0, pathIndex)] ?? lastTrace.path[0];

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-[0.35em] text-brass">
        Current · {LABELS[hop.stage]}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-xs">
        {lastTrace.path.map((item, i) => (
          <span
            key={item.stage}
            className={`rounded-sm border px-1.5 py-0.5 ${
              i === pathIndex
                ? "border-lamp bg-lamp text-background"
                : i < pathIndex
                  ? "border-brass/40 text-brass"
                  : "border-metal text-muted"
            }`}
          >
            {item.to}
          </span>
        ))}
      </div>
    </div>
  );
}
