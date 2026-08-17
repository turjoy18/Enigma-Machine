import { describe, expect, it } from "vitest";
import { positionFromRotation, rotationFromPosition, ROTOR_STEP } from "./rotorMath";

describe("rotorMath", () => {
  it("round-trips positions 0–25", () => {
    for (let i = 0; i < 26; i++) {
      expect(positionFromRotation(rotationFromPosition(i))).toBe(i);
    }
  });

  it("snaps a half-step drag to the nearest letter", () => {
    expect(positionFromRotation(-3 * ROTOR_STEP - ROTOR_STEP / 3)).toBe(3);
  });
});
