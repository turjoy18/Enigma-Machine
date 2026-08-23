"use client";

import { typewriterChars } from "@/lib/story/typewriter";
import { usePrefersReducedMotion } from "@/lib/story/usePrefersReducedMotion";
import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";

type TypewriterProps = {
  text: string;
  className?: string;
  /** Delay between characters in seconds */
  stagger?: number;
};

const container = (stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

const charVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export function Typewriter({
  text,
  className,
  stagger = 0.028,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const chars = typewriterChars(text);

  if (reduced) {
    return <p className={className}>{text}</p>;
  }

  return (
    <motion.p
      ref={ref}
      className={className}
      variants={container(stagger)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <motion.span key={`${ch}-${i}`} variants={charVariant} aria-hidden>
          {ch}
        </motion.span>
      ))}
      <motion.span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.1em] bg-lamp align-baseline"
        initial={{ opacity: 0 }}
        animate={
          inView
            ? { opacity: [1, 0], transition: { repeat: Infinity, duration: 0.7 } }
            : { opacity: 0 }
        }
      />
    </motion.p>
  );
}
