"use client";

import { ALPHABET } from "@/lib/layout";
import { useEnigmaStore } from "@/store/useEnigmaStore";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function BootSequence() {
  const finishBoot = useEnigmaStore((s) => s.finishBoot);
  const setLastLamp = (letter: string | null) =>
    useEnigmaStore.setState({ lastLamp: letter });
  const status = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const letters = ALPHABET.split("");
    const tl = gsap.timeline({
      onComplete: () => {
        setLastLamp(null);
        finishBoot();
      },
    });

    if (status.current) {
      tl.fromTo(
        status.current,
        { opacity: 0.3 },
        { opacity: 1, duration: 0.4, yoyo: true, repeat: 3 },
      );
    }

    letters.forEach((letter, i) => {
      tl.call(() => setLastLamp(letter), [], i === 0 ? 0.15 : "+=0.045");
    });

    return () => {
      tl.kill();
    };
  }, [finishBoot]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-between bg-background/40 px-6 py-8 sm:px-10">
      <p
        ref={status}
        className="font-sans text-4xl tracking-tight text-lamp sm:text-6xl"
      >
        Load Enigma
      </p>
      <p className="text-[11px] uppercase tracking-[0.3em] text-brass">
        Lamps · rotors · current
      </p>
    </div>
  );
}
