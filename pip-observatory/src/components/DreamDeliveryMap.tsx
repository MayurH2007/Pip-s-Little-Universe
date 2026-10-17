import { useState } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { useSound } from "../lib/sound";

interface Place {
  id: string;
  name: string;
  x: number;
  y: number;
  time: string;
  recipient: string;
  dream: string;
  description: string;
}

const W = 600;
const H = 420;

const PLACES: Place[] = [
  {
    id: "nursery",
    name: "Midnight Nursery",
    x: 92,
    y: 96,
    time: "9:00 pm",
    recipient: "The night-shift team",
    dream: "The Test-Flight Dream",
    description: "Every new dream gets one practice run under the observatory dome before it leaves. Tonight's has a slightly squeaky wing.",
  },
  {
    id: "cottage",
    name: "Cloudberry Cottage",
    x: 210,
    y: 262,
    time: "10:15 pm",
    recipient: "Seven field mice in one sock drawer",
    dream: "Pancake Snow",
    description: "Warm pancakes drift down like snowflakes, and nobody has to share the syrup.",
  },
  {
    id: "library",
    name: "The Moonlit Library",
    x: 372,
    y: 120,
    time: "11:40 pm",
    recipient: "Mrs. Hoot, the librarian owl",
    dream: "The Whispering Shelves",
    description: "Every book reads itself aloud, very quietly, in the voice of someone who loves you.",
  },
  {
    id: "rooftops",
    name: "Starfall Rooftops",
    x: 512,
    y: 250,
    time: "1:20 am",
    recipient: "The chimney cats",
    dream: "The Last Tram to the Milky Way",
    description: "A tram made of moonlight rattles across the sky. The tickets are free and the seats are warm.",
  },
  {
    id: "garden",
    name: "The Sleeping Garden",
    x: 330,
    y: 360,
    time: "3:05 am",
    recipient: "Snails, bumblebees and one tired worm",
    dream: "Seed Under a Blanket",
    description: "You are a tiny seed, tucked under soft soil, growing a little bit while you rest.",
  },
];

const ROUTE =
  "M92 96 C 120 190, 150 250, 210 262 S 300 150, 372 120 S 540 160, 512 250 S 400 380, 330 360";

export function DreamDeliveryMap() {
  const { chime } = useSound();
  const [selectedId, setSelectedId] = useState(PLACES[0].id);
  const index = PLACES.findIndex((p) => p.id === selectedId);
  const selected = PLACES[index];

  const select = (id: string) => {
    setSelectedId(id);
    chime(660 + PLACES.findIndex((p) => p.id === id) * 60);
  };

  const next = () => select(PLACES[(index + 1) % PLACES.length].id);

  return (
    <div className="routes">
      <div className="map" role="group" aria-label="Map of the sleeping village">
        <svg viewBox={`0 0 ${W} ${H}`} className="map__art" aria-hidden="true">
          <rect width={W} height={H} rx="24" fill="var(--map-ground)" />
          <path d="M0 330c120-40 220-10 320 10s200 10 280-30v110H0Z" fill="var(--map-hill)" />
          <path d="M0 60c80 30 160 20 240-10" stroke="var(--map-river)" strokeWidth="18" fill="none" strokeLinecap="round" opacity=".7" />
          {/* little trees */}
          {[
            [40, 210], [70, 240], [150, 340], [460, 340], [560, 330], [260, 60], [470, 70], [540, 110],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
              <rect x="-2" y="0" width="4" height="10" fill="var(--cocoa)" opacity=".5" />
              <circle cx="0" cy="-4" r="10" fill="var(--map-tree)" />
            </g>
          ))}
          {/* route */}
          <path d={ROUTE} className="map__route-shadow" />
          <path d={ROUTE} className="map__route" />
          {/* buildings */}
          <g transform="translate(92 96)">
            <rect x="-22" y="-6" width="44" height="30" rx="4" fill="var(--blush)" />
            <path d="M-26 -4a26 26 0 0 1 52 0Z" fill="var(--berry)" />
            <rect x="4" y="-36" width="22" height="7" rx="3" transform="rotate(-30)" fill="var(--lavender)" />
          </g>
          <g transform="translate(210 262)">
            <rect x="-20" y="-8" width="40" height="28" rx="3" fill="var(--cream)" stroke="var(--cocoa)" strokeOpacity=".3" />
            <path d="M-26 -6L0 -30L26 -6Z" fill="var(--berry)" />
            <rect x="-6" y="4" width="12" height="16" rx="6" fill="var(--cocoa)" />
          </g>
          <g transform="translate(372 120)">
            <rect x="-28" y="-14" width="56" height="34" rx="3" fill="var(--lavender)" />
            <path d="M-32 -12h64L0 -36Z" fill="var(--midnight)" />
            {[-18, -6, 6, 18].map((x) => (
              <rect key={x} x={x - 3} y="-6" width="6" height="22" rx="2" fill="var(--cream)" opacity=".8" />
            ))}
          </g>
          <g transform="translate(512 250)">
            <rect x="-34" y="-6" width="30" height="30" fill="var(--cocoa)" opacity=".75" />
            <rect x="0" y="-16" width="34" height="40" fill="var(--cocoa)" opacity=".9" />
            <path d="M-38 -6L-19 -24L0 -6ZM-4 -16L17 -36L38 -16Z" fill="var(--midnight)" />
            <rect x="8" y="-6" width="8" height="8" fill="var(--gold)" />
          </g>
          <g transform="translate(330 360)">
            <path d="M-34 14c0-16 14-24 34-24s34 8 34 24Z" fill="var(--map-tree)" />
            {[-20, -6, 8, 22].map((x, i) => (
              <circle key={x} cx={x} cy={i % 2 ? -2 : 2} r="5" fill={i % 2 ? "var(--blush)" : "var(--gold)"} />
            ))}
          </g>
          {/* moon */}
          <path d="M560 40a22 22 0 1 0 0 40 18 18 0 0 1 0-40Z" fill="var(--gold)" />
        </svg>

        <span
          className="map__traveller"
          aria-hidden="true"
          style={{ left: `${(selected.x / W) * 100}%`, top: `${(selected.y / H) * 100}%` }}
        />

        {PLACES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="map__pin"
            aria-pressed={p.id === selectedId}
            aria-label={`${p.name}: see the dream delivered here`}
            onClick={() => select(p.id)}
            style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
          >
            <span className="map__pin-dot">{i + 1}</span>
            <span className="map__pin-label">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="routes__side">
        <ol className="routes__list" aria-label="Delivery stops">
          {PLACES.map((p, i) => (
            <li key={p.id}>
              <button type="button" aria-pressed={p.id === selectedId} onClick={() => select(p.id)}>
                <span className="routes__n">{i + 1}</span>
                {p.name}
              </button>
            </li>
          ))}
        </ol>

        <div className="ticket" aria-live="polite">
          <p className="ticket__stamp">
            <MapPin size={14} aria-hidden="true" /> Stop {index + 1} of {PLACES.length} · {selected.time}
          </p>
          <h4 className="ticket__place">{selected.name}</h4>
          <p className="ticket__dream">“{selected.dream}”</p>
          <p className="ticket__for">For: {selected.recipient}</p>
          <p className="ticket__desc">{selected.description}</p>
          <button type="button" className="btn btn--soft" onClick={next}>
            Fly to the next stop <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
