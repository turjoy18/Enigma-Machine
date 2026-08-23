import { describe, expect, it } from "vitest";
import { CHAPTERS } from "./chapters";
import { typewriterChars, typewriterDisplayText } from "./typewriter";

describe("story chapters", () => {
  it("has five dossier chapters with kickers", () => {
    expect(CHAPTERS).toHaveLength(5);
    expect(CHAPTERS[0].kicker).toMatch(/Tastatur/);
    expect(CHAPTERS.every((c) => c.title && c.body)).toBe(true);
  });

  it("points each chapter at a photo under /story/", () => {
    expect(CHAPTERS.every((c) => c.art?.startsWith("/story/") && /\.(jpg|png)$/.test(c.art))).toBe(
      true,
    );
  });
});

describe("typewriter", () => {
  it("preserves length including spaces as nbsp", () => {
    const chars = typewriterChars("AB CD");
    expect(chars).toHaveLength(5);
    expect(chars[2]).toBe("\u00A0");
  });

  it("shows the full string immediately when reduced motion is on", () => {
    expect(typewriterDisplayText("HELLO", true)).toBe("HELLO");
  });
});
