import { describe, expect, it } from "vitest";
import { TOKENS } from "./tokens";

describe("design tokens", () => {
  it("uses a warm near-black field, not pure black", () => {
    expect(TOKENS.background).toBe("#12100e");
    expect(TOKENS.lamp).toBe("#e8a54b");
  });
});
