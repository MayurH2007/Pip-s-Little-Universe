import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { readPref, writePref } from "./prefs";

/** Shared sound system: one AudioContext, one master gain, one mute switch. */
export interface SoundApi {
  muted: boolean;
  toggleMute: () => void;
  /** Creates (or resumes) the AudioContext. Only call from a user gesture. */
  ensureAudio: () => { ctx: AudioContext; out: GainNode } | null;
  /** A soft single bell note for small interactions. Silent when muted. */
  chime: (freq?: number) => void;
}

const MASTER_LEVEL = 0.55;
const SoundContext = createContext<SoundApi | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState<boolean>(() => readPref("pip-muted") === "1");
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
    writePref("pip-muted", muted ? "1" : "0");
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(muted ? 0 : MASTER_LEVEL, ctx.currentTime, 0.06);
    }
  }, [muted]);

  useEffect(
    () => () => {
      ctxRef.current?.close().catch(() => undefined);
      ctxRef.current = null;
    },
    [],
  );

  const ensureAudio = useCallback(() => {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    if (!ctxRef.current) {
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = mutedRef.current ? 0 : MASTER_LEVEL;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume().catch(() => undefined);
    return { ctx: ctxRef.current, out: masterRef.current! };
  }, []);

  const chime = useCallback(
    (freq = 880) => {
      if (mutedRef.current) return;
      const audio = ensureAudio();
      if (!audio) return;
      const { ctx, out } = audio;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.08, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      osc.connect(g).connect(out);
      osc.start(t);
      osc.stop(t + 0.75);
      osc.onended = () => {
        osc.disconnect();
        g.disconnect();
      };
    },
    [ensureAudio],
  );

  const api = useMemo<SoundApi>(
    () => ({ muted, toggleMute: () => setMuted((m) => !m), ensureAudio, chime }),
    [muted, ensureAudio, chime],
  );

  return <SoundContext.Provider value={api}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundApi {
  const api = useContext(SoundContext);
  if (!api) throw new Error("useSound must be used inside SoundProvider");
  return api;
}
