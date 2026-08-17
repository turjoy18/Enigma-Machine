import { describe, expect, it } from "vitest";
import { EnigmaMachine } from "./machine";
import { Plugboard } from "./plugboard";

describe("Plugboard", () => {
  it("rejects pairing a letter with itself", () => {
    const board = new Plugboard();
    expect(() => board.addPlug("A", "A")).toThrow(/itself/);
  });

  it("rejects a letter that is already paired", () => {
    const board = new Plugboard();
    board.addPlug("A", "B");
    expect(() => board.addPlug("A", "C")).toThrow(/already paired/);
    expect(() => board.addPlug("D", "B")).toThrow(/already paired/);
  });
});

describe("EnigmaMachine Java parity", () => {
  it("never encrypts a letter to itself (reflector property)", () => {
    const machine = EnigmaMachine.fromConfig({
      rotors: ["I", "II", "III"],
      rings: [0, 0, 0],
      positions: [0, 0, 0],
      reflector: "B",
    });
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      const clone = EnigmaMachine.fromConfig({
        rotors: ["I", "II", "III"],
        rings: [0, 0, 0],
        positions: [0, 0, i],
        reflector: "B",
      });
      const { output } = clone.encryptChar(letter);
      expect(output).not.toBe(letter);
    }
    const { ciphertext } = machine.encryptMessage("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    expect(ciphertext).toHaveLength(26);
    for (let i = 0; i < 26; i++) {
      expect(ciphertext[i]).not.toBe(String.fromCharCode(65 + i));
    }
  });

  it("matches Java HELLO with I/II/III, rings 0, positions 0, reflector B", () => {
    const machine = EnigmaMachine.fromConfig({
      rotors: ["I", "II", "III"],
      rings: [0, 0, 0],
      positions: [0, 0, 0],
      reflector: "B",
    });
    const { ciphertext, traces } = machine.encryptMessage("HELLO");
    expect(ciphertext).toBe("ILBDA");
    expect(traces.map((t) => t.positions)).toEqual([
      [0, 0, 1],
      [0, 0, 2],
      [0, 0, 3],
      [0, 0, 4],
      [0, 0, 5],
    ]);
    expect(traces[0].stepped).toEqual({
      left: false,
      middle: false,
      right: true,
    });
    expect(traces[0].path).toHaveLength(9);
  });

  it("double-steps when the middle rotor starts on its notch", () => {
    const machine = EnigmaMachine.fromConfig({
      rotors: ["I", "II", "III"],
      rings: [0, 0, 0],
      positions: [0, 4, 0],
      reflector: "B",
    });
    const trace = machine.encryptChar("A");
    expect(trace.output).toBe("F");
    expect(trace.positions).toEqual([1, 5, 1]);
    expect(trace.stepped).toEqual({
      left: true,
      middle: true,
      right: true,
    });
  });

  it("matches Java HELLO with plugboard AB CD", () => {
    const machine = EnigmaMachine.fromConfig({
      rotors: ["I", "II", "III"],
      rings: [0, 0, 0],
      positions: [0, 0, 0],
      reflector: "B",
      plugs: [
        ["A", "B"],
        ["C", "D"],
      ],
    });
    expect(machine.encryptMessage("HELLO").ciphertext).toBe("ILACB");
  });

  it("matches Java ATTACKATDAWN with mixed rotors, rings, and a plug", () => {
    const machine = EnigmaMachine.fromConfig({
      rotors: ["IV", "I", "V"],
      rings: [3, 1, 8],
      positions: [5, 12, 20],
      reflector: "C",
      plugs: [["Q", "A"]],
    });
    expect(machine.encryptMessage("ATTACKATDAWN").ciphertext).toBe(
      "ZEILSXRETLTP",
    );
  });

  it("is reciprocal: encrypting the ciphertext with the same start key recovers plaintext", () => {
    const config = {
      rotors: ["II", "V", "III"] as ["II", "V", "III"],
      rings: [4, 7, 11] as [number, number, number],
      positions: [2, 9, 18] as [number, number, number],
      reflector: "A" as const,
      plugs: [
        ["E", "T"],
        ["A", "N"],
      ] as [string, string][],
    };
    const first = EnigmaMachine.fromConfig(config);
    const { ciphertext } = first.encryptMessage("WETTERBERICHT");
    const second = EnigmaMachine.fromConfig(config);
    expect(second.encryptMessage(ciphertext).ciphertext).toBe("WETTERBERICHT");
  });
});
