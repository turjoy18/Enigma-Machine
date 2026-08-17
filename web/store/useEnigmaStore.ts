"use client";

import { EnigmaMachine } from "@/lib/enigma";
import type { ReflectorName, RotorName, Trace } from "@/lib/enigma";
import { isLetter } from "@/lib/layout";
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
  animating: boolean;
  mode: "story" | "boot" | "operate";
  setRotor: (slot: 0 | 1 | 2, name: RotorName) => void;
  setRing: (slot: 0 | 1 | 2, ring: number) => void;
  setPosition: (slot: 0 | 1 | 2, position: number) => void;
  setReflector: (name: ReflectorName) => void;
  setAnimating: (animating: boolean) => void;
  sitDown: () => void;
  finishBoot: () => void;
  standUp: () => void;
  pressKey: (letter: string) => Trace | null;
  reset: () => void;
};

const DEFAULT_ROTORS: [RotorSlot, RotorSlot, RotorSlot] = [
  { name: "I", ring: 0, position: 0, startPosition: 0 },
  { name: "II", ring: 0, position: 0, startPosition: 0 },
  { name: "III", ring: 0, position: 0, startPosition: 0 },
];

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
  animating: false,
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
      return { rotors, plaintext: "", ciphertext: "", lastLamp: null, lastTrace: null };
    }),

  setReflector: (name) =>
    set({
      reflector: name,
      plaintext: "",
      ciphertext: "",
      lastLamp: null,
      lastTrace: null,
    }),

  setAnimating: (animating) => set({ animating }),

  sitDown: () => set({ mode: "boot", animating: true, lastLamp: null }),

  finishBoot: () => set({ mode: "operate", animating: false, lastLamp: null }),

  standUp: () =>
    set({
      mode: "story",
      animating: false,
      lastLamp: null,
    }),

  pressKey: (raw) => {
    const letter = raw.toUpperCase();
    if (!isLetter(letter) || get().animating) return null;
    const machine = buildMachine(get());
    const trace = machine.encryptChar(letter);
    set((state) => {
      const rotors = state.rotors.map((rotor, i) => ({
        ...rotor,
        position: trace.positions[i],
      })) as EnigmaStore["rotors"];
      return {
        rotors,
        plaintext: state.plaintext + letter,
        ciphertext: state.ciphertext + trace.output,
        lastLamp: trace.output,
        lastTrace: trace,
      };
    });
    return trace;
  },

  reset: () =>
    set((state) => ({
      rotors: state.rotors.map((rotor) => ({
        ...rotor,
        position: rotor.startPosition,
      })) as EnigmaStore["rotors"],
      plaintext: "",
      ciphertext: "",
      lastLamp: null,
      lastTrace: null,
    })),
}));
