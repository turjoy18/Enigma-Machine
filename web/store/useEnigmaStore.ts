"use client";

import { dailyConfig } from "@/lib/dailyKey";
import { EnigmaMachine, Plugboard } from "@/lib/enigma";
import type { ReflectorName, RotorName, Trace } from "@/lib/enigma";
import { isLetter } from "@/lib/layout";
import { play, setMuted as setAudioMuted } from "@/lib/audio";
import { create } from "zustand";

export type RotorSlot = {
  name: RotorName;
  ring: number;
  position: number;
  startPosition: number;
};

export type EnigmaStore = {
  rotors: [RotorSlot, RotorSlot, RotorSlot];
  reflector: ReflectorName;
  plugs: [string, string][];
  plaintext: string;
  ciphertext: string;
  lastLamp: string | null;
  lastTrace: Trace | null;
  pathIndex: number;
  animating: boolean;
  slowMo: boolean;
  muted: boolean;
  mode: "story" | "boot" | "operate";
  setRotor: (slot: 0 | 1 | 2, name: RotorName) => void;
  setRing: (slot: 0 | 1 | 2, ring: number) => void;
  setPosition: (slot: 0 | 1 | 2, position: number) => void;
  setReflector: (name: ReflectorName) => void;
  setAnimating: (animating: boolean) => void;
  setSlowMo: (slowMo: boolean) => void;
  setMuted: (muted: boolean) => void;
  addPlug: (a: string, b: string) => boolean;
  removePlug: (letter: string) => void;
  applyDailyKey: () => void;
  sitDown: () => void;
  finishBoot: () => void;
  standUp: () => void;
  pressKey: (letter: string) => Trace | null;
  commitLamp: () => void;
  setPathIndex: (pathIndex: number) => void;
  reset: () => void;
};

const DEFAULT_ROTORS: [RotorSlot, RotorSlot, RotorSlot] = [
  { name: "I", ring: 0, position: 0, startPosition: 0 },
  { name: "II", ring: 0, position: 0, startPosition: 0 },
  { name: "III", ring: 0, position: 0, startPosition: 0 },
];

const cleared = {
  plaintext: "",
  ciphertext: "",
  lastLamp: null,
  lastTrace: null,
  pathIndex: -1,
};

function buildMachine(state: Pick<EnigmaStore, "rotors" | "reflector" | "plugs">) {
  return EnigmaMachine.fromConfig({
    rotors: [state.rotors[0].name, state.rotors[1].name, state.rotors[2].name],
    rings: [state.rotors[0].ring, state.rotors[1].ring, state.rotors[2].ring],
    positions: [
      state.rotors[0].position,
      state.rotors[1].position,
      state.rotors[2].position,
    ],
    reflector: state.reflector,
    plugs: state.plugs,
  });
}

export const useEnigmaStore = create<EnigmaStore>((set, get) => ({
  rotors: DEFAULT_ROTORS,
  reflector: "B",
  plugs: [],
  plaintext: "",
  ciphertext: "",
  lastLamp: null,
  lastTrace: null,
  pathIndex: -1,
  animating: false,
  slowMo: false,
  muted: false,
  mode: "story",

  setRotor: (slot, name) =>
    set((state) => {
      const rotors = state.rotors.map((rotor) => ({ ...rotor })) as EnigmaStore["rotors"];
      const other = rotors.findIndex((rotor, i) => i !== slot && rotor.name === name);
      if (other >= 0) {
        rotors[other].name = rotors[slot].name;
      }
      rotors[slot].name = name;
      return { rotors };
    }),

  setRing: (slot, ring) =>
    set((state) => {
      const rotors = state.rotors.map((rotor) => ({ ...rotor })) as EnigmaStore["rotors"];
      rotors[slot].ring = ((ring % 26) + 26) % 26;
      return { rotors };
    }),

  setPosition: (slot, position) =>
    set((state) => {
      const rotors = state.rotors.map((rotor) => ({ ...rotor })) as EnigmaStore["rotors"];
      const next = ((position % 26) + 26) % 26;
      rotors[slot].position = next;
      rotors[slot].startPosition = next;
      return { rotors, ...cleared };
    }),

  setReflector: (name) => set({ reflector: name, ...cleared }),

  setAnimating: (animating) => set({ animating }),
  setSlowMo: (slowMo) => set({ slowMo }),
  setMuted: (value) => {
    setAudioMuted(value);
    set({ muted: value });
  },

  addPlug: (a, b) => {
    const board = new Plugboard();
    try {
      for (const [x, y] of get().plugs) board.addPlug(x, y);
      board.addPlug(a, b);
    } catch {
      return false;
    }
    set({ plugs: board.pairs(), ...cleared });
    return true;
  },

  removePlug: (letter) =>
    set((state) => ({
      plugs: state.plugs.filter(([x, y]) => x !== letter && y !== letter),
      ...cleared,
    })),

  applyDailyKey: () => {
    const config = dailyConfig();
    set({
      rotors: config.rotors.map((name, i) => ({
        name,
        ring: config.rings[i],
        position: config.positions[i],
        startPosition: config.positions[i],
      })) as EnigmaStore["rotors"],
      reflector: config.reflector,
      plugs: config.plugs ?? [],
      ...cleared,
    });
  },

  sitDown: () => set({ mode: "boot", animating: true, lastLamp: null }),

  finishBoot: () => set({ mode: "operate", animating: false, lastLamp: null }),

  standUp: () =>
    set({
      mode: "story",
      animating: false,
      lastLamp: null,
      pathIndex: -1,
    }),

  pressKey: (raw) => {
    const letter = raw.toUpperCase();
    if (!isLetter(letter) || get().animating) return null;
    const machine = buildMachine(get());
    const trace = machine.encryptChar(letter);
    const slow = get().slowMo;
    play("click");
    play("ratchet");
    if (trace.stepped.middle || trace.stepped.left) play("ratchet");
    set((state) => {
      const rotors = state.rotors.map((rotor, i) => ({
        ...rotor,
        position: trace.positions[i],
      })) as EnigmaStore["rotors"];
      return {
        rotors,
        plaintext: state.plaintext + letter,
        ciphertext: slow ? state.ciphertext : state.ciphertext + trace.output,
        lastLamp: slow ? null : trace.output,
        lastTrace: trace,
        pathIndex: slow ? 0 : trace.path.length - 1,
        animating: slow,
      };
    });
    if (!slow) play("lamp");
    return trace;
  },

  commitLamp: () => {
    const trace = get().lastTrace;
    if (!trace) return;
    play("lamp");
    set((state) => ({
      ciphertext: state.ciphertext.endsWith(trace.output)
        ? state.ciphertext
        : state.ciphertext + trace.output,
      lastLamp: trace.output,
      animating: false,
      pathIndex: trace.path.length - 1,
    }));
  },

  setPathIndex: (pathIndex) => set({ pathIndex }),

  reset: () =>
    set((state) => ({
      rotors: state.rotors.map((rotor) => ({
        ...rotor,
        position: rotor.startPosition,
      })) as EnigmaStore["rotors"],
      ...cleared,
    })),
}));
