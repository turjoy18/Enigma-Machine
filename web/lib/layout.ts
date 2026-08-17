export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Enigma I QWERTZ, three rows 9-8-9 */
export const QWERTZ_ROWS = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O"],
  ["A", "S", "D", "F", "G", "H", "J", "K"],
  ["P", "Y", "X", "C", "V", "B", "N", "M", "L"],
] as const;

export function letterFromPosition(position: number): string {
  return ALPHABET[(position + 26) % 26];
}

export function isLetter(value: string): boolean {
  return value.length === 1 && value >= "A" && value <= "Z";
}
