"use client";

import { usePrefersReducedMotion } from "@/lib/story/usePrefersReducedMotion";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type ParallaxLayerProps = {
  src: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
};

export function ParallaxLayer({
  src,
  alt = "",
  children,
  className = "",
}: ParallaxLayerProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.12, 0.32, 0.32, 0.14]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ y, rotate, opacity }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/40" />
      <div className="story-grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
