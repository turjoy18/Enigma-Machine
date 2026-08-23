import { describe, expect, it } from "vitest";
import { HISTORY } from "./history";

describe("history", () => {
  it("covers 1918 through 1945 with seven beats", () => {
    expect(HISTORY).toHaveLength(7);
    expect(HISTORY[0].year).toBe("1918");
    expect(HISTORY[HISTORY.length - 1].year).toBe("1945");
  });

  it("hides an ILBDA ciphertext Easter egg on the 1939 card", () => {
    const war = HISTORY.find((e) => e.year === "1939");
    expect(war?.cipher).toBe("ILBDA");
  });
});
