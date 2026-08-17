"use client";

import { QWERTZ_ROWS } from "@/lib/layout";
import { useEnigmaStore } from "@/store/useEnigmaStore";
import gsap from "gsap";
import { useEffect, useRef } from "react";

function Lamp({ letter }: { letter: string }) {
  const on = useEnigmaStore((s) => s.lastLamp === letter);
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current || !on) return;
    gsap.fromTo(
      el.current,
      { boxShadow: "0 0 0 rgba(232, 165, 75, 0)" },
      {
        boxShadow: "0 0 22px rgba(232, 165, 75, 0.95)",
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.18,
      },
    );
  }, [on]);

  return (
    <span
      ref={el}
      className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm tracking-wide transition-colors duration-150 sm:h-12 sm:w-12 ${
        on
          ? "border-lamp bg-lamp text-background"
          : "border-brass/35 bg-metal text-brass"
      }`}
    >
      {letter}
    </span>
  );
}

export function Lampboard() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-[0.35em] text-brass">
        Lampenfeld
      </p>
      {QWERTZ_ROWS.map((row, i) => (
        <div
          key={row.join("")}
          className={`flex gap-2 ${i === 1 ? "pl-5" : ""}`}
        >
          {row.map((letter) => (
            <Lamp key={letter} letter={letter} />
          ))}
        </div>
      ))}
    </div>
  );
}
