export type StoryChapter = {
  kicker: string;
  title: string;
  body: string;
  /** Schematic asset under /story/ for parallax layers */
  art?: string;
};

export const CHAPTERS: StoryChapter[] = [
  {
    kicker: "01  Tastatur",
    title: "A letter goes in.",
    body: "You press a key. Before the current even moves, the right rotor steps one notch — every time.",
    art: "/story/keyboard.svg",
  },
  {
    kicker: "02  Steckerbrett",
    title: "Cables swap it.",
    body: "Pairs of letters trade places on the plugboard. A patch cord is a secret you can hold.",
    art: "/story/plugboard.svg",
  },
  {
    kicker: "03  Walzen",
    title: "Wheels scramble it.",
    body: "Three rotors, chosen from five. Wiring, ring, and window. When a notch hits, the next wheel ticks. Sometimes two at once.",
    art: "/story/rotors.svg",
  },
  {
    kicker: "04  Umkehrwalze",
    title: "It turns around.",
    body: "The reflector sends the signal back through different contacts. A letter never encrypts to itself. That is not a bug. That is the machine.",
    art: "/story/reflector.svg",
  },
  {
    kicker: "05  Lampenfeld",
    title: "A lamp lights.",
    body: "The current comes home as a glow. Write it down. The next key is already a different cipher.",
    art: "/story/lampboard.svg",
  },
];
