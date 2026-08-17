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
      pathIndex: -1,
      animating: false,
      slowMo: false,
      muted: true,
      mode: "operate",
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

  it("locks into operate after boot and returns to story on stand up", () => {
    const store = useEnigmaStore.getState();
    store.sitDown();
    expect(useEnigmaStore.getState().mode).toBe("boot");
    expect(useEnigmaStore.getState().animating).toBe(true);
    useEnigmaStore.getState().finishBoot();
    expect(useEnigmaStore.getState().mode).toBe("operate");
    useEnigmaStore.getState().standUp();
    expect(useEnigmaStore.getState().mode).toBe("story");
  });

  it("rejects an invalid plug and accepts a valid pair", () => {
    expect(useEnigmaStore.getState().addPlug("A", "A")).toBe(false);
    expect(useEnigmaStore.getState().addPlug("A", "B")).toBe(true);
    expect(useEnigmaStore.getState().plugs).toEqual([["A", "B"]]);
    expect(useEnigmaStore.getState().addPlug("A", "C")).toBe(false);
  });

  it("holds the lamp until commitLamp in slow-mo", () => {
    useEnigmaStore.setState({ slowMo: true });
    useEnigmaStore.getState().pressKey("H");
    expect(useEnigmaStore.getState().lastLamp).toBeNull();
    expect(useEnigmaStore.getState().ciphertext).toBe("");
    expect(useEnigmaStore.getState().animating).toBe(true);
    useEnigmaStore.getState().commitLamp();
    expect(useEnigmaStore.getState().lastLamp).toBe("I");
    expect(useEnigmaStore.getState().ciphertext).toBe("I");
    expect(useEnigmaStore.getState().animating).toBe(false);
  });
});
