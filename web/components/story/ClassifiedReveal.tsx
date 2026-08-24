"use client";

import { Typewriter } from "@/components/story/Typewriter";
import { usePrefersReducedMotion } from "@/lib/story/usePrefersReducedMotion";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";

export function ClassifiedReveal() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const x = useSpring(rawX, { stiffness: 140, damping: 28 });
  const y = useSpring(rawY, { stiffness: 140, damping: 28 });
  const mask = useMotionTemplate`radial-gradient(circle 140px at ${x}% ${y}%, black 0%, transparent 70%)`;

  if (reduced) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-center px-8 py-24 text-center sm:px-16">
        <Typewriter
          text="CLASSIFIED · INTERCEPT"
          className="text-[10px] uppercase tracking-[0.35em] text-danger"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/story/classified.jpg"
          alt="Declassified intercept archive"
          className="mt-8 max-h-[420px] w-full max-w-xl object-cover"
        />
        <p className="mt-6 max-w-md text-sm leading-7 text-muted">
          A letter never encrypts to itself. That property leaked the machine.
        </p>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 py-24 text-center sm:px-16">
      <Typewriter
        text="CLASSIFIED · INTERCEPT"
        className="relative z-20 text-[10px] uppercase tracking-[0.35em] text-danger"
      />
      <p className="relative z-20 mt-4 max-w-md text-sm text-muted">
        Hover to lift the redaction. Tap on mobile to declassify.
      </p>
      <div
        className="relative z-10 mt-10 w-full max-w-xl cursor-crosshair"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          rawX.set(((e.clientX - rect.left) / rect.width) * 100);
          rawY.set(((e.clientY - rect.top) / rect.height) * 100);
        }}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={open}
        aria-label="Reveal classified document"
      >
        <motion.img
          src="/story/classified.jpg"
          alt=""
          className="aspect-[4/3] w-full object-cover"
          style={
            open
              ? undefined
              : hovering
                ? {
                    WebkitMaskImage: mask,
                    maskImage: mask,
                  }
                : {
                    WebkitMaskImage: "linear-gradient(transparent, transparent)",
                    maskImage: "linear-gradient(transparent, transparent)",
                  }
          }
        />
      </div>
      <div className="story-grain pointer-events-none absolute inset-0 opacity-50" />
    </section>
  );
}
