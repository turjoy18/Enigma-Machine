"use client";

import { OperateView } from "@/components/hud/OperateView";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-8 px-6 py-8 sm:px-10">
      <header className="flex items-baseline justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-brass">
            Operate
          </p>
          <h1 className="font-sans text-5xl leading-none tracking-tight sm:text-7xl">
            ENIGMA
          </h1>
        </div>
        <p className="max-w-xs text-right text-[11px] uppercase tracking-[0.22em] text-muted">
          Type A–Z. Lamps light. Rotors step.
        </p>
      </header>
      <OperateView />
    </div>
  );
}
