"use client";

import { ALPHABET } from "@/lib/layout";
import { positionFromRotation, rotationFromPosition } from "@/lib/rotorMath";
import { useEnigmaStore } from "@/store/useEnigmaStore";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function makeBandTexture() {
  const cell = 64;
  const canvas = document.createElement("canvas");
  canvas.width = cell * 26;
  canvas.height = cell;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.fillStyle = "#2a2622";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "600 36px Oswald, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ALPHABET.split("").forEach((letter, i) => {
    ctx.fillStyle = "#c4a574";
    ctx.fillRect(i * cell, 0, 1, cell);
    ctx.fillStyle = "#f4ead8";
    ctx.fillText(letter, i * cell + cell / 2, cell / 2);
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function RotorCylinder({ slot }: { slot: 0 | 1 | 2 }) {
  const rotor = useEnigmaStore((s) => s.rotors[slot]);
  const lastTrace = useEnigmaStore((s) => s.lastTrace);
  const setPosition = useEnigmaStore((s) => s.setPosition);
  const group = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastPress = useRef(0);
  const x = (slot - 1) * 1.45;
  const texture = useMemo(() => makeBandTexture(), []);

  useEffect(() => {
    lastPress.current = performance.now();
  }, [lastTrace]);

  useFrame(() => {
    if (!group.current || dragging.current) return;
    const target = rotationFromPosition(rotor.position);
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      target,
      0.2,
    );
  });

  return (
    <group position={[x, 0.15, 0]}>
      <mesh position={[0, 0.72, 0.55]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.12]} />
        <meshStandardMaterial color="#c4a574" metalness={0.6} roughness={0.35} />
      </mesh>
      <group
        ref={group}
        onPointerDown={(event) => {
          if (performance.now() - lastPress.current < 280) return;
          event.stopPropagation();
          dragging.current = true;
          event.nativeEvent.target instanceof HTMLElement &&
            event.nativeEvent.target.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (!dragging.current || !group.current) return;
          dragging.current = false;
          event.nativeEvent.target instanceof HTMLElement &&
            event.nativeEvent.target.releasePointerCapture(event.pointerId);
          const next = positionFromRotation(group.current.rotation.x);
          setPosition(slot, next);
          event.stopPropagation();
        }}
        onPointerMove={(event) => {
          if (!dragging.current || !group.current) return;
          group.current.rotation.x += event.movementY * 0.01;
        }}
      >
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.58, 0.58, 0.78, 64]} />
          <meshStandardMaterial map={texture} roughness={0.45} metalness={0.15} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.42, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.06, 32]} />
          <meshStandardMaterial color="#1a1510" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.42, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.06, 32]} />
          <meshStandardMaterial color="#1a1510" />
        </mesh>
      </group>
    </group>
  );
}
