import { describe, expect, it } from "vitest";
import { dailyConfig, dayStamp } from "./dailyKey";

describe("dailyKey", () => {
  it("is deterministic for a given UTC day", () => {
    const date = new Date("2026-08-17T12:00:00.000Z");
    expect(dayStamp(date)).toBe("2026-08-17");
    expect(dailyConfig(date)).toEqual(dailyConfig(new Date("2026-08-17T23:00:00.000Z")));
  });

  it("picks three unique rotors", () => {
    const config = dailyConfig(new Date("2026-01-01T00:00:00.000Z"));
    expect(new Set(config.rotors).size).toBe(3);
  });
});
