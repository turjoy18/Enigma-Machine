"use client";

import { RotorDrums } from "@/components/hud/RotorDrums";
import { WebGLBoundary } from "@/components/machine/WebGLBoundary";
import dynamic from "next/dynamic";

const MachineCanvas = dynamic(() => import("./MachineCanvas"), {
  ssr: false,
  loading: () => <RotorDrums />,
});

export function RotorStage() {
  return (
    <WebGLBoundary>
      <MachineCanvas />
    </WebGLBoundary>
  );
}
