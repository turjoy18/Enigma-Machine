export class Plugboard {
  private readonly wiring = new Map<string, string>();

  addPlug(a: string, b: string): void {
    if (a === b) {
      throw new Error(`Cannot pair '${a}' with itself.`);
    }
    if (this.wiring.has(a)) {
      throw new Error(
        `Character '${a}' is already paired with '${this.wiring.get(a)}'.`,
      );
    }
    if (this.wiring.has(b)) {
      throw new Error(
        `Character '${b}' is already paired with '${this.wiring.get(b)}'.`,
      );
    }
    this.wiring.set(a, b);
    this.wiring.set(b, a);
  }

  removePlug(letter: string): void {
    const other = this.wiring.get(letter);
    if (!other) {
      throw new Error("Character is not mapped in the plugboard.");
    }
    this.wiring.delete(letter);
    this.wiring.delete(other);
  }

  process(input: string): string {
    return this.wiring.get(input) ?? input;
  }

  reset(): void {
    this.wiring.clear();
  }

  pairs(): [string, string][] {
    const seen = new Set<string>();
    const result: [string, string][] = [];
    for (const [a, b] of this.wiring) {
      if (a < b && !seen.has(a)) {
        seen.add(a);
        seen.add(b);
        result.push([a, b]);
      }
    }
    return result.sort((x, y) => x[0].localeCompare(y[0]));
  }

  clone(): Plugboard {
    const copy = new Plugboard();
    for (const [a, b] of this.pairs()) {
      copy.addPlug(a, b);
    }
    return copy;
  }
}
