import { beforeEach, describe, expect, it } from "vitest";
import { useEnigmaStore } from "@/store/useEnigmaStore";

describe("useEnigmaStore", () => {
  beforeEach(() => {
    useEnigmaStore.setState({
      rotors: [
        { name: "I", ring: 0, position: 0, startPosition: 0 },
        { name: "II", ring: 0, position: 0, startPosition: 0 },
        { name: "III", ring: 0, position: 0, startPosition: 0 },
      ],
      reflector: "B",
      plugs: [],
      plaintext: "",
      ciphertext: "",
      lastLamp: null,
      lastTrace: null,
      animating: false,
    });
  });

  it("encrypts HELLO to ILBDA from the default key", () => {
    for (const letter of "HELLO") {
      useEnigmaStore.getState().pressKey(letter);
    }
    const state = useEnigmaStore.getState();
    expect(state.plaintext).toBe("HELLO");
    expect(state.ciphertext).toBe("ILBDA");
    expect(state.lastLamp).toBe("A");
    expect(state.rotors.map((r) => r.position)).toEqual([0, 0, 5]);
  });

  it("reset restores start positions and clears the ticker", () => {
    useEnigmaStore.getState().setPosition(2, 3);
    useEnigmaStore.getState().pressKey("A");
    useEnigmaStore.getState().reset();
    const state = useEnigmaStore.getState();
    expect(state.plaintext).toBe("");
    expect(state.ciphertext).toBe("");
    expect(state.rotors[2].position).toBe(3);
  });
});
