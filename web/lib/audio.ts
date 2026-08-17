type Voice = "click" | "ratchet" | "lamp" | "hum" | "snap";

let ctx: AudioContext | null = null;
let hum: OscillatorNode | null = null;
let humGain: GainNode | null = null;
let muted = false;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  return ctx;
}

export function setMuted(value: boolean) {
  muted = value;
  if (humGain && ctx) {
    humGain.gain.setTargetAtTime(value ? 0 : 0.012, ctx.currentTime, 0.05);
  }
}

export function isMuted() {
  return muted;
}

function burst(freq: number, duration: number, type: OscillatorType, gain = 0.08) {
  const ac = audio();
  if (!ac || muted) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration);
}

export function play(voice: Voice) {
  if (muted) return;
  if (voice === "click") burst(180, 0.05, "square", 0.05);
  if (voice === "ratchet") burst(90, 0.08, "sawtooth", 0.06);
  if (voice === "lamp") burst(740, 0.18, "sine", 0.04);
  if (voice === "snap") burst(220, 0.07, "triangle", 0.05);
}

export function startHum() {
  const ac = audio();
  if (!ac || hum) return;
  hum = ac.createOscillator();
  humGain = ac.createGain();
  hum.type = "sine";
  hum.frequency.value = 62;
  humGain.gain.value = muted ? 0 : 0.012;
  hum.connect(humGain);
  humGain.connect(ac.destination);
  hum.start();
}

export function stopHum() {
  try {
    hum?.stop();
  } catch {
    /* already stopped */
  }
  hum = null;
  humGain = null;
}

export async function resumeAudio() {
  const ac = audio();
  if (ac && ac.state === "suspended") await ac.resume();
}
