"use client";

import { Keyboard } from "./Keyboard";
import { Lampboard } from "./Lampboard";
import { PathViz } from "./PathViz";
import { PlugboardDrawer } from "./PlugboardDrawer";
import { Settings } from "./Settings";
import { Ticker } from "./Ticker";
import { RotorStage } from "@/components/machine/RotorStage";

export function OperateView() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8 lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col items-center gap-8">
        <Lampboard />
        <RotorStage />
        <PathViz />
        <Ticker />
        <Keyboard />
        <PlugboardDrawer />
      </div>
      <Settings />
    </div>
  );
}
