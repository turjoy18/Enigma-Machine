"use client";

import { Typewriter } from "@/components/story/Typewriter";
import { CHAPTERS } from "@/lib/story/chapters";
import { useEnigmaStore } from "@/store/useEnigmaStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StoryShell() {
  const sitDown = useEnigmaStore((s) => s.sitDown);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]");
      chapters.forEach((chapter) => {
        gsap.fromTo(
          chapter.querySelectorAll("[data-fade]"),
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 70%",
              end: "bottom 40%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="flex flex-col">
      <section className="flex min-h-screen flex-col justify-between px-8 py-10 sm:px-16 sm:py-14">
        <header className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.28em] text-brass">
          <span>Wehrmacht I</span>
          <button
            type="button"
            onClick={sitDown}
            className="hover:text-lamp"
          >
            Sit down
          </button>
        </header>
        <main>
          <Typewriter
            text="Made for keys, lamps, and everything between."
            className="mb-8 text-[11px] uppercase tracking-[0.35em] text-muted"
            stagger={0.022}
          />
          <h1 className="font-sans text-[18vw] leading-[0.8] tracking-tight sm:text-[8rem]">
            ENIGMA
          </h1>
          <h2 className="mt-2 font-sans text-[12vw] leading-[0.8] tracking-tight text-brass sm:text-[5.5rem]">
            machine
          </h2>
          <p className="mt-10 max-w-md text-sm leading-7 text-muted">
            Scroll the path of a single letter. Then sit down and type.
          </p>
        </main>
        <footer className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.28em] text-brass">
          <span>&amp; make cipher</span>
          <span>A–Z only</span>
        </footer>
      </section>

      {CHAPTERS.map((chapter) => (
        <section
          key={chapter.kicker}
          data-chapter
          className="flex min-h-screen flex-col justify-center px-8 py-24 sm:px-16"
        >
          <Typewriter
            text={chapter.kicker}
            className="text-[10px] uppercase tracking-[0.35em] text-brass"
            stagger={0.035}
          />
          <h2
            data-fade
            className="mt-6 max-w-3xl font-sans text-5xl leading-[0.95] tracking-tight sm:text-7xl"
          >
            {chapter.title}
          </h2>
          <p data-fade className="mt-8 max-w-lg text-base leading-8 text-muted">
            {chapter.body}
          </p>
        </section>
      ))}

      <section className="flex min-h-[70vh] flex-col items-start justify-center gap-8 px-8 py-24 sm:px-16">
        <p className="text-[10px] uppercase tracking-[0.35em] text-brass">
          Begin
        </p>
        <h2 className="font-sans text-5xl tracking-tight sm:text-7xl">
          Sit down.
        </h2>
        <button
          type="button"
          onClick={sitDown}
          className="border border-lamp px-8 py-3 text-[11px] uppercase tracking-[0.35em] text-lamp hover:bg-lamp hover:text-background"
        >
          Enter the machine
        </button>
      </section>
    </div>
  );
}
