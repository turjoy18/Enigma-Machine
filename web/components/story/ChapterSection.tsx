"use client";

import { ParallaxLayer } from "@/components/story/ParallaxLayer";
import { Typewriter } from "@/components/story/Typewriter";
import type { StoryChapter } from "@/lib/story/chapters";

type ChapterSectionProps = {
  chapter: StoryChapter;
};

export function ChapterSection({ chapter }: ChapterSectionProps) {
  return (
    <section data-chapter className="relative min-h-screen">
      <ParallaxLayer
        src={chapter.art ?? "/story/rotors.svg"}
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
      </ParallaxLayer>
    </section>
  );
}
