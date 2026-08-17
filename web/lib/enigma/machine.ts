import { Plugboard } from "./plugboard";
import { Reflector } from "./reflector";
import { Rotor } from "./rotor";
import type { PathHop, ReflectorName, RotorName, Trace } from "./types";

export type MachineConfig = {
  rotors: [RotorName, RotorName, RotorName];
  rings: [number, number, number];
  positions: [number, number, number];
  reflector: ReflectorName;
  plugs?: [string, string][];
};

export class EnigmaMachine {
  private rotors: Rotor[] = [];
  private reflector: Reflector | null = null;
  private readonly plugboard = new Plugboard();

  static fromConfig(config: MachineConfig): EnigmaMachine {
    const machine = new EnigmaMachine();
    config.rotors.forEach((name, i) => {
      machine.addRotor(Rotor.fromName(name, config.positions[i], config.rings[i]));
    });
    machine.setReflector(Reflector.fromName(config.reflector));
    for (const [a, b] of config.plugs ?? []) {
      machine.addPlugboardPair(a, b);
    }
    return machine;
  }

  addRotor(rotor: Rotor): void {
    this.rotors.push(rotor);
  }

  setReflector(reflector: Reflector): void {
    this.reflector = reflector;
  }

  addPlugboardPair(a: string, b: string): void {
    this.plugboard.addPlug(a, b);
  }

  getPositions(): [number, number, number] {
    return [
      this.rotors[0]?.position ?? 0,
      this.rotors[1]?.position ?? 0,
      this.rotors[2]?.position ?? 0,
    ];
  }

  getRotors(): Rotor[] {
    return this.rotors;
  }

  getReflector(): Reflector | null {
    return this.reflector;
  }

  getPlugboard(): Plugboard {
    return this.plugboard;
  }

  encryptChar(inputChar: string): Trace {
    if (!this.reflector || this.rotors.length !== 3) {
      throw new Error("Enigma requires three rotors and one reflector.");
    }
    const input = inputChar.toUpperCase();
    if (input.length !== 1 || input < "A" || input > "Z") {
      throw new Error("Only A–Z letters can be encrypted.");
    }

    const stepped = this.stepRotors();
    const hop = (stage: PathHop["stage"], from: string, to: string): PathHop => ({
      stage,
      from,
      to,
    });

    const afterPlugIn = this.plugboard.process(input);
    const afterRightFwd = this.rotors[2].forward(afterPlugIn);
    const afterMidFwd = this.rotors[1].forward(afterRightFwd);
    const afterLeftFwd = this.rotors[0].forward(afterMidFwd);
    const reflected = this.reflector.reflect(afterLeftFwd);
    const afterLeftBack = this.rotors[0].backward(reflected);
    const afterMidBack = this.rotors[1].backward(afterLeftBack);
    const afterRightBack = this.rotors[2].backward(afterMidBack);
    const output = this.plugboard.process(afterRightBack);

    return {
      input,
      output,
      positions: this.getPositions(),
      stepped,
      path: [
        hop("plug-in", input, afterPlugIn),
        hop("right-fwd", afterPlugIn, afterRightFwd),
        hop("mid-fwd", afterRightFwd, afterMidFwd),
        hop("left-fwd", afterMidFwd, afterLeftFwd),
        hop("reflector", afterLeftFwd, reflected),
        hop("left-back", reflected, afterLeftBack),
        hop("mid-back", afterLeftBack, afterMidBack),
        hop("right-back", afterMidBack, afterRightBack),
        hop("plug-out", afterRightBack, output),
      ],
    };
  }

  encryptMessage(plaintext: string): { ciphertext: string; traces: Trace[] } {
    const traces: Trace[] = [];
    let ciphertext = "";
    for (const char of plaintext.toUpperCase()) {
      if (char < "A" || char > "Z") continue;
      const trace = this.encryptChar(char);
      traces.push(trace);
      ciphertext += trace.output;
    }
    return { ciphertext, traces };
  }

  private stepRotors(): Trace["stepped"] {
    const left = this.rotors[0];
    const middle = this.rotors[1];
    const right = this.rotors[2];

    const stepped = { left: false, middle: false, right: true };
    right.step();

    if (middle.atNotch()) {
      middle.step();
      left.step();
      stepped.middle = true;
      stepped.left = true;
    } else if (right.atNotch()) {
      middle.step();
      stepped.middle = true;
    }

    return stepped;
  }
}
