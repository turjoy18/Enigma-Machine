"use client";

import { QWERTZ_ROWS } from "@/lib/layout";
import { useEnigmaStore } from "@/store/useEnigmaStore";
import { useEffect } from "react";

export function Keyboard() {
  const pressKey = useEnigmaStore((s) => s.pressKey);
  const lastInput = useEnigmaStore((s) => s.lastTrace?.input);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      const letter = event.key.toUpperCase();
      if (letter.length === 1 && letter >= "A" && letter <= "Z") {
        event.preventDefault();
        pressKey(letter);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pressKey]);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[10px] uppercase tracking-[0.35em] text-brass">
        Tastatur
      </p>
      {QWERTZ_ROWS.map((row, i) => (
        <div
          key={row.join("")}
          className={`flex gap-2 ${i === 1 ? "pl-5" : ""}`}
        >
          {row.map((letter) => {
            const active = lastInput === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => pressKey(letter)}
                className={`h-10 w-10 rounded-sm border text-sm transition-colors sm:h-11 sm:w-11 ${
                  active
                    ? "border-lamp bg-lamp/20 text-lamp"
                    : "border-brass/40 bg-background text-foreground hover:border-brass hover:text-lamp"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
