"use client";

import { Typewriter } from "@/components/story/Typewriter";
import { HISTORY } from "@/lib/story/history";
import { usePrefersReducedMotion } from "@/lib/story/usePrefersReducedMotion";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

const CARD_WIDTH = 320;
const GAP = 28;

function CardMedia({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="h-36 w-full object-cover opacity-85"
    />
  );
}

export function HistoryRail() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalDistance = (HISTORY.length - 1) * (CARD_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (HISTORY.length - 1));
    setActive(Math.min(HISTORY.length - 1, Math.max(0, idx)));
  });

  if (reduced) {
    return (
      <section className="border-y border-brass/20 px-8 py-20 sm:px-16">
        <p className="mb-10 text-[10px] uppercase tracking-[0.35em] text-brass">
          Timeline
        </p>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {HISTORY.map((entry) => (
            <li
              key={entry.year}
              className="overflow-hidden border border-brass/30 bg-metal/40"
            >
              <CardMedia src={entry.image} />
              <div className="p-5">
              <p className="font-mono text-lamp">{entry.year}</p>
              <h3 className="mt-3 font-sans text-2xl tracking-tight">
                {entry.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{entry.body}</p>
              {entry.cipher ? (
                <p className="mt-4 font-mono text-xs tracking-[0.3em] text-brass">
                  {entry.cipher}
                </p>
              ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 top-0 z-10 h-[2px] origin-left bg-lamp"
          style={{ scaleX: scrollYProgress }}
        />
        <div className="mb-10 px-8 sm:px-16">
          <Typewriter
            text="A short history of the machine"
            className="text-[10px] uppercase tracking-[0.35em] text-brass"
            stagger={0.03}
          />
          <p className="mt-3 max-w-md text-sm text-muted">
            Scroll down. The dossier drifts right.
          </p>
        </div>
        <motion.div className="flex gap-7 pl-8 sm:pl-16" style={{ x }}>
          {HISTORY.map((entry, i) => {
            const isActive = i === active;
            return (
              <article
                key={entry.year}
                className={`w-[320px] shrink-0 overflow-hidden border bg-metal/50 transition-[border-color,transform,box-shadow] duration-300 ${
                  isActive
                    ? "scale-[1.03] border-lamp shadow-[0_0_28px_rgba(232,165,75,0.18)]"
                    : "scale-100 border-brass/30"
                }`}
              >
                <CardMedia src={entry.image} />
                <div className="p-6">
                  <p
                    className={`font-mono text-sm tracking-[0.2em] ${
                      isActive ? "text-lamp" : "text-brass"
                    }`}
                  >
                    {entry.year}
                  </p>
                  <h3 className="mt-4 font-sans text-2xl leading-tight tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{entry.body}</p>
                  {entry.cipher ? (
                    <p className="mt-5 font-mono text-xs tracking-[0.35em] text-lamp">
                      {entry.cipher}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
