import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useSound } from "../lib/sound";
import { OfficialArt } from "../lib/art";
import { MusicBoxFallback } from "./Illustrations";

interface Note {
  /** Note name like "A4" or "R" for a rest. */
  n: string;
  /** Length in beats. */
  b: number;
}

interface Lullaby {
  id: string;
  title: string;
  mood: string;
  bpm: number;
  notes: Note[];
}

const parse = (s: string): Note[] =>
  s
    .trim()
    .split(/\s+/)
    .map((tok) => {
      const [n, b] = tok.split(":");
      return { n, b: Number(b ?? 1) };
    });

// Original melodies written for this site.
const LULLABIES: Lullaby[] = [
  {
    id: "hush",
    title: "Starlight Hush",
    mood: "For field mice who count too many stars",
    bpm: 76,
    notes: parse(
      "A4 F#4 A4 D5:1 C#5 B4 A4:2 B4 A4 F#4 E4 D4:3 R:1 F#4 A4 B4 A4 D5 C#5 B4:2 A4 F#4 E4 F#4 D4:3 R:1",
    ),
  },
  {
    id: "waltz",
    title: "Cloudberry Waltz",
    mood: "For hedgehogs who toss and turn",
    bpm: 96,
    notes: parse("D4 G4 B4 A4 G4 E4 D4 G4 A4 B4:3 C5 B4 A4 G4 E4 D4 E4 F#4 A4 G4:3"),
  },
];

const SEMITONES: Record<string, number> = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };

function freq(note: string): number | null {
  const m = /^([A-G])(#|b)?(\d)$/.exec(note);
  if (!m) return null;
  const semis = SEMITONES[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0) + (Number(m[3]) - 4) * 12;
  return 440 * Math.pow(2, semis / 12);
}

/** A music-box tone: sine fundamental + quiet bell partial, quick attack, long decay. */
function pluck(ctx: AudioContext, out: AudioNode, f: number, t: number, live: Set<OscillatorNode>) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.12, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
  g.connect(out);
  const parts: Array<[OscillatorType, number, number]> = [
    ["sine", 1, 1],
    ["triangle", 2, 0.18],
    ["sine", 3.01, 0.06],
  ];
  for (const [type, mult, level] of parts) {
    const o = ctx.createOscillator();
    const pg = ctx.createGain();
    o.type = type;
    o.frequency.value = f * mult;
    pg.gain.value = level;
    o.connect(pg).connect(g);
    o.start(t);
    o.stop(t + 1.5);
    live.add(o);
    o.onended = () => {
      live.delete(o);
      o.disconnect();
      pg.disconnect();
    };
  }
}

export function LullabyPlayer() {
  const { muted, toggleMute, ensureAudio } = useSound();
  const [songId, setSongId] = useState(LULLABIES[0].id);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(-1);
  const song = LULLABIES.find((s) => s.id === songId) ?? LULLABIES[0];

  const timer = useRef<number | null>(null);
  const bus = useRef<GainNode | null>(null);
  const live = useRef(new Set<OscillatorNode>());
  const visualTimers = useRef<number[]>([]);

  const stop = useCallback(() => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
    visualTimers.current.forEach((t) => window.clearTimeout(t));
    visualTimers.current = [];
    const b = bus.current;
    if (b) {
      const ctx = b.context;
      b.gain.cancelScheduledValues(ctx.currentTime);
      b.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
      const oscs = [...live.current];
      window.setTimeout(() => {
        oscs.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* already stopped */
          }
        });
        b.disconnect();
      }, 450);
    }
    bus.current = null;
    setActive(-1);
    setPlaying(false);
  }, []);

  const start = useCallback(
    (s: Lullaby) => {
      const audio = ensureAudio();
      if (!audio) return;
      const { ctx, out } = audio;
      const b = ctx.createGain();
      b.gain.value = 0.9;
      b.connect(out);
      bus.current = b;

      const beat = 60 / s.bpm;
      let idx = 0;
      let nextTime = ctx.currentTime + 0.08;

      const tick = () => {
        while (nextTime < ctx.currentTime + 0.15) {
          const note = s.notes[idx];
          const f = freq(note.n);
          if (f) {
            pluck(ctx, b, f, nextTime, live.current);
            const i = idx;
            const delay = Math.max(0, (nextTime - ctx.currentTime) * 1000);
            visualTimers.current.push(window.setTimeout(() => setActive(i), delay));
          }
          nextTime += note.b * beat;
          idx = (idx + 1) % s.notes.length;
          if (idx === 0) nextTime += beat; // a breath before the melody loops
        }
        if (visualTimers.current.length > 64) visualTimers.current = visualTimers.current.slice(-32);
      };
      tick();
      timer.current = window.setInterval(tick, 40);
      setPlaying(true);
    },
    [ensureAudio],
  );

  useEffect(() => stop, [stop]);

  const toggle = () => (playing ? stop() : start(song));

  const choose = (id: string) => {
    const next = LULLABIES.find((s) => s.id === id);
    if (!next || id === songId) return;
    setSongId(id);
    if (playing) {
      stop();
      window.setTimeout(() => start(next), 120);
    }
  };

  return (
    <div className="lullaby" data-playing={playing}>
      <div className="lullaby__stage">
        <svg viewBox="0 0 400 60" className="lullaby__staff" aria-hidden="true" preserveAspectRatio="none">
          {[10, 20, 30, 40, 50].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} />
          ))}
        </svg>
        <div className="lullaby__box">
          <OfficialArt name="box" alt="Pip's lullaby music box" className="lullaby__img" fallback={<MusicBoxFallback />} />
          <svg viewBox="0 0 60 60" className="lullaby__key" aria-hidden="true">
            <rect x="0" y="26" width="26" height="8" rx="4" fill="var(--gold)" />
            <path d="M26 30c0-12 10-22 16-14 4 6-4 14-16 14 12 0 20 8 16 14-6 8-16-2-16-14Z" fill="var(--gold)" stroke="var(--cocoa)" strokeWidth="2" />
          </svg>
          {["♪", "♫", "♪"].map((g, i) => (
            <span key={i} className={`lullaby__float lullaby__float--${i}`} aria-hidden="true">
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="lullaby__pegs" aria-hidden="true">
        {song.notes.map((n, i) => (
          <span key={i} className={i === active ? "peg is-on" : n.n === "R" ? "peg is-rest" : "peg"} />
        ))}
      </div>

      <fieldset className="lullaby__songs">
        <legend>Choose a lullaby</legend>
        {LULLABIES.map((s) => (
          <label key={s.id} className="song-pill">
            <input type="radio" name="lullaby" id={`lullaby-${s.id}`} value={s.id} checked={songId === s.id} onChange={() => choose(s.id)} />
            <span>
              <strong>{s.title}</strong>
              <small>{s.mood}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="lullaby__controls-wrap">
      <div className="lullaby__controls">
        <button type="button" className="btn btn--primary" onClick={toggle} aria-pressed={playing}>
          {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
          {playing ? "Pause lullaby" : "Wind & play"}
        </button>
        <button type="button" className="btn btn--soft" onClick={toggleMute} aria-pressed={muted}>
          {muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>
      <p className="lullaby__status" role="status">
        {playing ? (muted ? `“${song.title}” is playing silently. Unmute to hear it.` : `Now playing “${song.title}”.`) : "The music box is resting."}
      </p>
      </div>
    </div>
  );
}
