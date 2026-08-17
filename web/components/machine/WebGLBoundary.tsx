"use client";

import { Component, type ReactNode } from "react";
import { RotorDrums } from "@/components/hud/RotorDrums";

type Props = { children: ReactNode };

export class WebGLBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <RotorDrums />;
    return this.props.children;
  }
}
