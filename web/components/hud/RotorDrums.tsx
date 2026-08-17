"use client";

import { ALPHABET, letterFromPosition } from "@/lib/layout";
import { useEnigmaStore } from "@/store/useEnigmaStore";
import gsap from "gsap";
import { useEffect, useRef } from "react";

function Drum({ slot }: { slot: 0 | 1 | 2 }) {
  const rotor = useEnigmaStore((s) => s.rotors[slot]);
  const tape = useRef<HTMLDivElement>(null);
  const labels = ["left", "middle", "right"] as const;

  useEffect(() => {
    if (!tape.current) return;
    gsap.to(tape.current, {
      y: -rotor.position * 36,
      duration: 0.22,
      ease: "power2.out",
    });
  }, [rotor.position]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.3em] text-brass">
        {labels[slot]} · {rotor.name}
      </span>
      <div className="relative h-9 w-14 overflow-hidden rounded border border-brass/40 bg-metal">
        <div ref={tape} className="absolute inset-x-0 top-0">
          {ALPHABET.split("").concat(ALPHABET[0]).map((letter, i) => (
            <div
              key={`${letter}-${i}`}
              className="flex h-9 items-center justify-center font-sans text-xl text-foreground"
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_12px_rgba(0,0,0,0.65)]" />
      </div>
      <span className="font-mono text-xs text-muted">
        {letterFromPosition(rotor.position)}
      </span>
    </div>
  );
}

export function RotorDrums() {
  return (
    <div className="flex items-end justify-center gap-6">
      <Drum slot={0} />
      <Drum slot={1} />
      <Drum slot={2} />
    </div>
  );
}
