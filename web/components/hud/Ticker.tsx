"use client";

import { useEnigmaStore } from "@/store/useEnigmaStore";

function group(text: string): string {
  return text.replace(/(.{5})/g, "$1 ").trim();
}

export function Ticker() {
  const plaintext = useEnigmaStore((s) => s.plaintext);
  const ciphertext = useEnigmaStore((s) => s.ciphertext);

  return (
    <div className="grid w-full max-w-2xl gap-3 font-mono text-sm">
      <div>
        <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-brass">
          Klartext
        </p>
        <p className="min-h-6 tracking-[0.2em] text-muted">
          {group(plaintext) || "—"}
        </p>
      </div>
      <div>
        <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-lamp">
          Geheimtext
        </p>
        <p className="min-h-6 tracking-[0.2em] text-foreground">
          {group(ciphertext) || "—"}
        </p>
      </div>
    </div>
  );
}
