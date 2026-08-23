/** Split text for typewriter stagger; spaces stay as non-breaking so layout holds. */
export function typewriterChars(text: string): string[] {
  return text.split("").map((ch) => (ch === " " ? "\u00A0" : ch));
}

export function typewriterDisplayText(
  text: string,
  reducedMotion: boolean,
): string {
  return reducedMotion ? text : text;
}
