import type { ReflectorName } from "./types";
import { REFLECTOR_WIRINGS } from "./wirings";

export class Reflector {
  readonly name: ReflectorName;
  private readonly wiring: Map<string, string>;

  constructor(name: ReflectorName, wiringStr: string) {
    this.name = name;
    this.wiring = new Map();
    for (let i = 0; i < wiringStr.length; i++) {
      const letter = String.fromCharCode(65 + i);
      const mapped = wiringStr.charAt(i);
      this.wiring.set(letter, mapped);
      this.wiring.set(mapped, letter);
    }
  }

  static fromName(name: ReflectorName): Reflector {
    return new Reflector(name, REFLECTOR_WIRINGS[name]);
  }

  reflect(input: string): string {
    return this.wiring.get(input) ?? input;
  }
}
