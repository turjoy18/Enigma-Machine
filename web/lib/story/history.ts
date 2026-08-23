export type HistoryEntry = {
  year: string;
  title: string;
  body: string;
  /** Optional ciphertext Easter egg */
  cipher?: string;
};

export const HISTORY: HistoryEntry[] = [
  {
    year: "1918",
    title: "Scherbius patents the rotor",
    body: "Arthur Scherbius files for a machine that scrambles letters through rotating disks. Commerce first. War later.",
  },
  {
    year: "1926",
    title: "The Navy adopts Enigma",
    body: "German naval forces put a commercial Enigma into service. Keys become a daily ritual.",
  },
  {
    year: "1932",
    title: "Polish Cipher Bureau",
    body: "Rejewski, Różycki, and Zygalski recover the wiring. Mathematics cracks what metal tried to hide.",
  },
  {
    year: "1939",
    title: "War, and changing keys",
    body: "Wehrmacht Enigma I goes to war. Plugboard pairs and daily settings multiply the search space.",
    cipher: "ILBDA",
  },
  {
    year: "1940",
    title: "Bletchley Park",
    body: "Hut 6 and Hut 8 turn intercepts into cribs. The country house becomes a factory for silence.",
  },
  {
    year: "1941",
    title: "Bombe refinements",
    body: "Turing and Welchman accelerate the attack. Machines hunt settings the operators set by hand.",
  },
  {
    year: "1945",
    title: "The war ends",
    body: "Enigmas are captured, sunk, or buried. The dossier stays sealed for decades.",
  },
];
