"use client";

import { Case } from "@/components/machine/Case";
import { RotorCylinder } from "@/components/machine/RotorCylinder";
import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function MachineCanvas() {
  return (
    <div className="h-56 w-full max-w-3xl sm:h-72">
      <Canvas
        shadows
        camera={{ position: [0, 1.1, 4.2], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#12100e", 0);
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.4}
          color="#f4ead8"
          castShadow
        />
        <pointLight position={[-2, 2, 3]} intensity={0.4} color="#e8a54b" />
        <Case />
        <RotorCylinder slot={0} />
        <RotorCylinder slot={1} />
        <RotorCylinder slot={2} />
        <ContactShadows
          position={[0, -1.18, 0]}
          opacity={0.45}
          scale={8}
          blur={2.2}
          far={3}
        />
      </Canvas>
    </div>
  );
}
