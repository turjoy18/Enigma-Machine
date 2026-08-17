import type { ReflectorName, RotorName } from "./types";

/** Historical Enigma I rotors I–V, copied from src/Main.java */
export const ROTOR_SPECS: Record<
  RotorName,
  { wiring: string; notch: number }
> = {
  I: { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: 16 },
  II: { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: 4 },
  III: { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: 21 },
  IV: { wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: 9 },
  V: { wiring: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: 25 },
};

/** Reflectors A–D, copied from src/Main.java */
export const REFLECTOR_WIRINGS: Record<ReflectorName, string> = {
  A: "EJMZALYXVBWFCRQUONTSPIKHGD",
  B: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
  C: "FVPJIAOYEDRZXWGCTKUQSBNMHL",
  D: "ZGBTCJFEQJHRSKLPALDXNZMVOU",
};
