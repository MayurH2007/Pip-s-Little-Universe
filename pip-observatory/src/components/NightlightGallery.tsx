import { useState, type CSSProperties } from "react";
import { Power } from "lucide-react";
import { useSound } from "../lib/sound";

type LampShape = "moon" | "mushroom" | "lighthouse" | "jelly" | "hearth";

interface Lamp {
  id: string;
  name: string;
  shape: LampShape;
  glow: string;
  body: string;
  description: string;
  note: number;
}

const LAMPS: Lamp[] = [
  { id: "moonbun", name: "Moonbun", shape: "moon", glow: "#ffc2d6", body: "#f4c9d6", description: "A round little moon that hums when it's hugged. Best for bunnies with big ears.", note: 523 },
  { id: "toadstool", name: "Toadstool Tim", shape: "mushroom", glow: "#f6bd60", body: "#e8875f", description: "Glows like toast. Keeps worries away by telling knock-knock jokes very slowly.", note: 587 },
  { id: "lighthouse", name: "Little Lighthouse", shape: "lighthouse", glow: "#9fd3f2", body: "#dcebf5", description: "Sweeps a soft blue beam so nobody gets lost on the way to dreamland.", note: 659 },
  { id: "jelly", name: "Jellyglow", shape: "jelly", glow: "#c9b8ed", body: "#c9b8ed", description: "Floats near the ceiling and drifts like a sleepy jellyfish. Very quiet. Very wobbly.", note: 784 },
  { id: "hearth", name: "Pocket Hearth", shape: "hearth", glow: "#ffa45c", body: "#a34063", description: "A lantern with a tiny fire that smells like cinnamon. For the coldest, longest nights.", note: 440 },
];

function LampArt({ shape, body }: { shape: LampShape; body: string }) {
  const line = "var(--cocoa)";
  switch (shape) {
    case "moon":
      return (
        <svg viewBox="0 0 80 90" aria-hidden="true">
          <rect x="30" y="74" width="20" height="10" rx="4" fill={line} />
          <circle cx="40" cy="42" r="32" fill={body} stroke={line} strokeWidth="3" />
          <circle cx="30" cy="34" r="5" fill="#fff8f1" opacity=".7" />
          <circle cx="50" cy="52" r="7" fill="#fff8f1" opacity=".45" />
        </svg>
      );
    case "mushroom":
      return (
        <svg viewBox="0 0 80 90" aria-hidden="true">
          <path d="M30 50h20l4 34H26Z" fill="#fff8f1" stroke={line} strokeWidth="3" />
          <path d="M6 50a34 30 0 0 1 68 0Z" fill={body} stroke={line} strokeWidth="3" />
          <circle cx="26" cy="34" r="5" fill="#fff8f1" />
          <circle cx="48" cy="28" r="4" fill="#fff8f1" />
          <circle cx="58" cy="42" r="3" fill="#fff8f1" />
        </svg>
      );
    case "lighthouse":
      return (
        <svg viewBox="0 0 80 90" aria-hidden="true">
          <path d="M28 28h24l6 56H22Z" fill={body} stroke={line} strokeWidth="3" />
          <path d="M25 50h30M23 68h34" stroke="#a34063" strokeWidth="6" />
          <rect x="30" y="12" width="20" height="16" rx="3" fill="#f6bd60" stroke={line} strokeWidth="3" />
          <path d="M26 12l14-10 14 10Z" fill="#a34063" stroke={line} strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    case "jelly":
      return (
        <svg viewBox="0 0 80 90" aria-hidden="true">
          <path d="M12 44a28 28 0 0 1 56 0c0 6-6 8-10 4-4 6-10 6-14 0-4 6-10 6-14 0-4 4-18 4-18-4Z" fill={body} stroke={line} strokeWidth="3" />
          <path d="M26 54c-4 10 4 16 0 28M40 54c4 10-4 16 0 28M54 54c-4 10 4 16 0 28" stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="32" cy="32" r="4" fill="#fff8f1" opacity=".8" />
        </svg>
      );
    case "hearth":
      return (
        <svg viewBox="0 0 80 90" aria-hidden="true">
          <path d="M40 4v8" stroke={line} strokeWidth="3" strokeLinecap="round" />
          <path d="M26 12h28l6 10H20Z" fill={body} stroke={line} strokeWidth="3" strokeLinejoin="round" />
          <rect x="18" y="22" width="44" height="54" rx="12" fill="#ffe2b8" stroke={line} strokeWidth="3" />
          <path d="M40 34c10 12 10 24 0 30-10-6-10-18 0-30Z" fill="#ffa45c" />
          <path d="M40 46c4 5 4 10 0 13-4-3-4-8 0-13Z" fill="#f6bd60" />
          <path d="M22 76h36l-4 8H26Z" fill={body} stroke={line} strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
  }
}

/** Three sleepy creatures. Eyes open in the dark, closed once a lamp is on. */
function Bedroom({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 360 150" className="nl-room" aria-hidden="true">
      <rect x="0" y="118" width="360" height="32" fill="var(--nl-floor)" />
      {/* matchbox bed with mouse */}
      <rect x="28" y="96" width="92" height="28" rx="6" fill="var(--nl-thing)" />
      <path d="M44 98c0-14 12-22 26-22s22 10 22 22Z" fill="var(--nl-creature)" />
      <circle cx="52" cy="78" r="9" fill="var(--nl-creature)" />
      <circle cx="84" cy="78" r="9" fill="var(--nl-creature)" />
      {/* owl on a stack of books */}
      <rect x="150" y="104" width="64" height="12" rx="3" fill="var(--nl-thing)" />
      <rect x="156" y="92" width="54" height="12" rx="3" fill="var(--nl-thing)" />
      <path d="M160 92c-4-30 6-48 23-48s27 18 23 48Z" fill="var(--nl-creature)" />
      <path d="M164 50l6 10M202 50l-6 10" stroke="var(--nl-creature)" strokeWidth="6" strokeLinecap="round" />
      {/* hedgehog */}
      <path d="M250 118c0-26 18-40 44-40s40 16 40 40Z" fill="var(--nl-creature)" />
      <path d="M258 96l-8-6M270 84l-4-10M290 80l2-10M310 84l6-9M324 96l9-5" stroke="var(--nl-creature)" strokeWidth="5" strokeLinecap="round" />
      <g className="nl-eyes" stroke="var(--nl-eye)" strokeWidth="2.6" strokeLinecap="round" fill="var(--nl-eye)">
        {lit ? (
          <>
            <path d="M58 92q4 3 8 0M74 92q4 3 8 0" fill="none" />
            <path d="M170 66q5 4 10 0M188 66q5 4 10 0" fill="none" />
            <path d="M272 102q4 3 8 0M290 102q4 3 8 0" fill="none" />
          </>
        ) : (
          <>
            <circle cx="62" cy="91" r="2.6" />
            <circle cx="78" cy="91" r="2.6" />
            <circle cx="175" cy="65" r="5" fill="none" />
            <circle cx="193" cy="65" r="5" fill="none" />
            <circle cx="276" cy="101" r="2.6" />
            <circle cx="294" cy="101" r="2.6" />
          </>
        )}
      </g>
      {lit && (
        <g className="nl-zzz" fill="var(--nl-eye)" fontFamily="var(--font-ui)" fontWeight="600">
          <text x="98" y="70" fontSize="14">z</text>
          <text x="108" y="58" fontSize="10">z</text>
          <text x="214" y="50" fontSize="14">z</text>
          <text x="336" y="78" fontSize="14">z</text>
        </g>
      )}
    </svg>
  );
}

export function NightlightGallery() {
  const { chime } = useSound();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = LAMPS.find((l) => l.id === activeId) ?? null;

  const pick = (lamp: Lamp) => {
    const next = lamp.id === activeId ? null : lamp.id;
    setActiveId(next);
    if (next) chime(lamp.note);
  };

  const sceneStyle = { "--lamp": active?.glow ?? "transparent" } as CSSProperties;

  return (
    <div className="nightlights">
      <div className="nl-scene" data-lit={Boolean(active)} style={sceneStyle}>
        <div className="nl-scene__glow" aria-hidden="true" />
        <Bedroom lit={Boolean(active)} />
        <p className="nl-scene__caption" role="status">
          {active ? (
            <>
              <strong>{active.name}</strong> is on. {active.description}
            </>
          ) : (
            "It's very dark in here. Three little friends can't sleep. Pick a nightlight."
          )}
        </p>
      </div>

      <ul className="nl-shelf" aria-label="Nightlights">
        {LAMPS.map((lamp) => (
          <li key={lamp.id}>
            <button
              type="button"
              className="nl-lamp"
              aria-pressed={lamp.id === activeId}
              onClick={() => pick(lamp)}
              style={{ "--lamp": lamp.glow } as CSSProperties}
            >
              <span className="nl-lamp__art">
                <LampArt shape={lamp.shape} body={lamp.body} />
              </span>
              <span className="nl-lamp__name">{lamp.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn--soft nl-off" onClick={() => setActiveId(null)} disabled={!active}>
        <Power size={16} aria-hidden="true" /> Lights out
      </button>
    </div>
  );
}
