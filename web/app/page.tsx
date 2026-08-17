"use client";

import { OperateView } from "@/components/hud/OperateView";
import { BootSequence } from "@/components/story/BootSequence";
import { StoryShell } from "@/components/story/StoryShell";
import { useEnigmaStore } from "@/store/useEnigmaStore";
import { useEffect } from "react";

export default function Home() {
  const mode = useEnigmaStore((s) => s.mode);
  const standUp = useEnigmaStore((s) => s.standUp);

  useEffect(() => {
    const locked = mode !== "story";
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [mode]);

  if (mode === "story") {
    return <StoryShell />;
  }

  return (
    <div className="relative flex h-dvh flex-col gap-8 overflow-hidden px-6 py-8 sm:px-10">
      {mode === "boot" ? <BootSequence /> : null}
      <header className="flex items-baseline justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-brass">
            {mode === "boot" ? "Boot" : "Operate"}
          </p>
          <h1 className="font-sans text-5xl leading-none tracking-tight sm:text-7xl">
            ENIGMA
          </h1>
        </div>
        <button
          type="button"
          onClick={standUp}
          className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-lamp"
        >
          Stand up
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-auto">
        <OperateView />
      </div>
    </div>
  );
}
