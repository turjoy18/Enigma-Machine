import type { RotorName } from "./types";
import { ROTOR_SPECS } from "./wirings";

export class Rotor {
  readonly name: RotorName;
  readonly wiring: string;
  readonly notchPosition: number;
  position: number;
  ringSetting: number;

  constructor(
    name: RotorName,
    wiring: string,
    notchPosition: number,
    position = 0,
    ringSetting = 0,
  ) {
    this.name = name;
    this.wiring = wiring;
    this.notchPosition = notchPosition;
    this.position = position;
    this.ringSetting = ringSetting;
  }

  static fromName(
    name: RotorName,
    position = 0,
    ringSetting = 0,
  ): Rotor {
    const spec = ROTOR_SPECS[name];
    return new Rotor(name, spec.wiring, spec.notch, position, ringSetting);
  }

  clone(): Rotor {
    return new Rotor(
      this.name,
      this.wiring,
      this.notchPosition,
      this.position,
      this.ringSetting,
    );
  }

  forward(input: string): string {
    const inputIndex = input.charCodeAt(0) - 65;
    const offsetIndex =
      (inputIndex + this.position - this.ringSetting + 26) % 26;
    const mappedChar = this.wiring.charAt(offsetIndex);
    const outputIndex =
      (mappedChar.charCodeAt(0) - 65 - this.position + this.ringSetting + 26) %
      26;
    return String.fromCharCode(outputIndex + 65);
  }

  backward(input: string): string {
    const inputIndex = input.charCodeAt(0) - 65;
    const offsetIndex =
      (inputIndex + this.position - this.ringSetting + 26) % 26;
    const wiringIndex = this.wiring.indexOf(
      String.fromCharCode(65 + offsetIndex),
    );
    const outputIndex =
      (wiringIndex - this.position + this.ringSetting + 26) % 26;
    return String.fromCharCode(outputIndex + 65);
  }

  step(): void {
    this.position = (this.position + 1) % 26;
  }

  atNotch(): boolean {
    return this.position === this.notchPosition;
  }
}
