import type { MachineConfig, ReflectorName, RotorName } from "./enigma";

const ROTORS: RotorName[] = ["I", "II", "III", "IV", "V"];
const REFLECTORS: ReflectorName[] = ["A", "B", "C", "D"];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function mulberry(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dayStamp(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function dailyConfig(date = new Date()): MachineConfig {
  const day = dayStamp(date);
  let seed = 2166136261;
  for (let i = 0; i < day.length; i++) {
    seed ^= day.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }
  const rand = mulberry(seed >>> 0);
  const pool = [...ROTORS];
  const rotors: RotorName[] = [];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(rand() * pool.length);
    rotors.push(pool.splice(idx, 1)[0]);
  }
  const rings: [number, number, number] = [
    Math.floor(rand() * 26),
    Math.floor(rand() * 26),
    Math.floor(rand() * 26),
  ];
  const positions: [number, number, number] = [
    Math.floor(rand() * 26),
    Math.floor(rand() * 26),
    Math.floor(rand() * 26),
  ];
  const reflector = REFLECTORS[Math.floor(rand() * REFLECTORS.length)];
  const unused = LETTERS.split("");
  const plugs: [string, string][] = [];
  const pairCount = 3 + Math.floor(rand() * 3);
  for (let i = 0; i < pairCount && unused.length >= 2; i++) {
    const a = unused.splice(Math.floor(rand() * unused.length), 1)[0];
    const b = unused.splice(Math.floor(rand() * unused.length), 1)[0];
    plugs.push(a < b ? [a, b] : [b, a]);
  }
  return {
    rotors: [rotors[0], rotors[1], rotors[2]],
    rings,
    positions,
    reflector,
    plugs,
  };
}
