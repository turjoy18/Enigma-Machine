"use client";

import { QWERTZ_ROWS } from "@/lib/layout";
import { play } from "@/lib/audio";
import { useEnigmaStore } from "@/store/useEnigmaStore";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const CABLE_COLORS = ["#e8a54b", "#c4a574", "#8b1e1e", "#f4ead8", "#d27a3a", "#9a7b4f"];

export function PlugboardDrawer() {
  const plugs = useEnigmaStore((s) => s.plugs);
  const addPlug = useEnigmaStore((s) => s.addPlug);
  const removePlug = useEnigmaStore((s) => s.removePlug);
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<string | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [, redraw] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const sockets = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!open) {
      setFrom(null);
      setCursor(null);
      return;
    }
    redraw((n) => n + 1);
  }, [open, plugs]);

  function center(letter: string) {
    const el = sockets.current[letter];
    const box = root.current?.getBoundingClientRect();
    if (!el || !box) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
  }

  function tryPair(a: string, b: string) {
    if (a === b) {
      play("snap");
      const el = sockets.current[a];
      if (el) gsap.fromTo(el, { x: -6 }, { x: 0, duration: 0.25, ease: "elastic.out(1,0.4)" });
      return;
    }
    const ok = addPlug(a, b);
    if (!ok) {
      play("snap");
      const el = sockets.current[b];
      if (el) gsap.fromTo(el, { x: 8 }, { x: 0, duration: 0.28, ease: "elastic.out(1,0.35)" });
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mb-3 text-[10px] uppercase tracking-[0.35em] text-brass hover:text-lamp"
      >
        Steckerbrett {open ? "—" : "+"}
      </button>
      {open ? (
        <div
          ref={root}
          className="relative border border-brass/30 bg-metal/50 p-4"
          onPointerMove={(e) => {
            if (!from || !root.current) return;
            const box = root.current.getBoundingClientRect();
            setCursor({ x: e.clientX - box.left, y: e.clientY - box.top });
          }}
          onPointerUp={() => {
            setFrom(null);
            setCursor(null);
          }}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {plugs.map(([a, b], i) => {
              const pa = center(a);
              const pb = center(b);
              if (!pa || !pb) return null;
              const midY = (pa.y + pb.y) / 2 + 18;
              return (
                <path
                  key={`${a}${b}`}
                  d={`M ${pa.x} ${pa.y} Q ${(pa.x + pb.x) / 2} ${midY} ${pb.x} ${pb.y}`}
                  fill="none"
                  stroke={CABLE_COLORS[i % CABLE_COLORS.length]}
                  strokeWidth="3"
                />
              );
            })}
            {from && cursor && center(from) ? (
              <line
                x1={center(from)!.x}
                y1={center(from)!.y}
                x2={cursor.x}
                y2={cursor.y}
                stroke="#e8a54b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            ) : null}
          </svg>
          <div className="relative flex flex-col items-center gap-3">
            {QWERTZ_ROWS.map((row, i) => (
              <div key={row.join("")} className={`flex gap-3 ${i === 1 ? "pl-6" : ""}`}>
                {row.map((letter) => {
                  const paired = plugs.some(([a, b]) => a === letter || b === letter);
                  return (
                    <button
                      key={letter}
                      type="button"
                      ref={(el) => {
                        sockets.current[letter] = el;
                      }}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        if (paired) {
                          removePlug(letter);
                          return;
                        }
                        setFrom(letter);
                      }}
                      onPointerUp={() => {
                        if (from && from !== letter) tryPair(from, letter);
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs ${
                        paired
                          ? "border-lamp bg-lamp/20 text-lamp"
                          : "border-brass/50 bg-background text-brass"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted">
            Drag a cable. Click a paired letter to unplug.
          </p>
        </div>
      ) : null}
    </div>
  );
}
