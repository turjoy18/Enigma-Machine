"use client";

import type { ReflectorName, RotorName } from "@/lib/enigma";
import { letterFromPosition } from "@/lib/layout";
import { useEnigmaStore } from "@/store/useEnigmaStore";

const ROTOR_NAMES: RotorName[] = ["I", "II", "III", "IV", "V"];
const REFLECTORS: ReflectorName[] = ["A", "B", "C", "D"];
const SLOT_LABELS = ["Left", "Middle", "Right"];

export function Settings() {
  const rotors = useEnigmaStore((s) => s.rotors);
  const reflector = useEnigmaStore((s) => s.reflector);
  const setRotor = useEnigmaStore((s) => s.setRotor);
  const setRing = useEnigmaStore((s) => s.setRing);
  const setPosition = useEnigmaStore((s) => s.setPosition);
  const setReflector = useEnigmaStore((s) => s.setReflector);
  const reset = useEnigmaStore((s) => s.reset);
  const slowMo = useEnigmaStore((s) => s.slowMo);
  const muted = useEnigmaStore((s) => s.muted);
  const setSlowMo = useEnigmaStore((s) => s.setSlowMo);
  const setMuted = useEnigmaStore((s) => s.setMuted);
  const applyDailyKey = useEnigmaStore((s) => s.applyDailyKey);

  return (
    <aside className="flex w-full max-w-xs flex-col gap-5 border border-brass/25 bg-metal/40 p-4">
      <p className="text-[10px] uppercase tracking-[0.35em] text-brass">
        Grundstellung
      </p>
      {rotors.map((rotor, slot) => (
        <div key={SLOT_LABELS[slot]} className="grid gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted">
            {SLOT_LABELS[slot]}
          </label>
          <select
            className="border border-brass/40 bg-background px-2 py-1 text-sm text-foreground"
            value={rotor.name}
            onChange={(e) =>
              setRotor(slot as 0 | 1 | 2, e.target.value as RotorName)
            }
          >
            {ROTOR_NAMES.map((name) => (
              <option key={name} value={name}>
                Rotor {name}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted">
              Ring {rotor.ring}
              <input
                type="range"
                min={0}
                max={25}
                value={rotor.ring}
                onChange={(e) =>
                  setRing(slot as 0 | 1 | 2, Number(e.target.value))
                }
                className="mt-1 w-full accent-lamp"
              />
            </label>
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted">
              Start {letterFromPosition(rotor.startPosition)}
              <input
                type="range"
                min={0}
                max={25}
                value={rotor.startPosition}
                onChange={(e) =>
                  setPosition(slot as 0 | 1 | 2, Number(e.target.value))
                }
                className="mt-1 w-full accent-lamp"
              />
            </label>
          </div>
        </div>
      ))}
      <label className="grid gap-2 text-xs uppercase tracking-[0.2em] text-muted">
        Umkehrwalze
        <select
          className="border border-brass/40 bg-background px-2 py-1 text-sm text-foreground"
          value={reflector}
          onChange={(e) => setReflector(e.target.value as ReflectorName)}
        >
          {REFLECTORS.map((name) => (
            <option key={name} value={name}>
              Reflector {name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
        Slow-mo current
        <input
          type="checkbox"
          className="accent-lamp"
          checked={slowMo}
          onChange={(e) => setSlowMo(e.target.checked)}
        />
      </label>
      <label className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
        Mute
        <input
          type="checkbox"
          className="accent-lamp"
          checked={muted}
          onChange={(e) => setMuted(e.target.checked)}
        />
      </label>
      <button
        type="button"
        onClick={applyDailyKey}
        className="border border-brass/70 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-brass hover:border-lamp hover:text-lamp"
      >
        Today&apos;s key
      </button>
      <button
        type="button"
        onClick={reset}
        className="border border-danger/70 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-foreground hover:bg-danger/20"
      >
        Reset message
      </button>
    </aside>
  );
}
