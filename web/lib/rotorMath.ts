export const ROTOR_STEP = (Math.PI * 2) / 26;

export function rotationFromPosition(position: number): number {
  return -(((position % 26) + 26) % 26) * ROTOR_STEP;
}

export function positionFromRotation(rotationX: number): number {
  const n = Math.round(-rotationX / ROTOR_STEP);
  return ((n % 26) + 26) % 26;
}
