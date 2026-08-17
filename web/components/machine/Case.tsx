"use client";

export function Case() {
  return (
    <group>
      <mesh position={[0, -0.85, 0]} receiveShadow>
        <boxGeometry args={[5.2, 0.7, 2.4]} />
        <meshStandardMaterial color="#1a1510" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.05, -0.85]} receiveShadow>
        <boxGeometry args={[5.2, 1.6, 0.5]} />
        <meshStandardMaterial color="#241e18" roughness={0.65} />
      </mesh>
    </group>
  );
}
