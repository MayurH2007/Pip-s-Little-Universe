import { useState } from "react";
import { Telescope } from "lucide-react";
import { useSound } from "../lib/sound";
import { EasterEgg } from "./EasterEgg";
import { Puff, StoryStar, Twinkle } from "./Decor";

interface Constellation {
  name: string;
  points: Array<[number, number]>;
}

const CONSTELLATIONS: Constellation[] = [
  { name: "The Sleepy Bunny", points: [[40, 120], [60, 80], [70, 40], [84, 82], [110, 96], [140, 90], [150, 120]] },
  { name: "The Teacup", points: [[50, 70], [150, 70], [140, 120], [60, 120], [50, 70], [150, 70], [170, 90], [146, 104]] },
  { name: "The Little Kite", points: [[100, 30], [140, 80], [100, 130], [60, 80], [100, 30], [100, 130], [86, 160], [110, 170]] },
  { name: "Grandma's Slipper", points: [[30, 120], [70, 110], [120, 80], [160, 90], [170, 120], [30, 120]] },
];

const MESSAGES: string[] = [
  "Pip polished the star. It hums a little.",
  "Two stars! Pip puts them in a jar labelled “for later.”",
  "The star is getting sleepy. So are you, probably.",
  "That's a lot of starlight. Pip is making a dream out of it.",
  "A brand-new dream is ready. Pip yawns proudly.",
];

const NOTES = [523, 587, 659, 784, 880];

export function DreamPlayground() {
  const { chime } = useSound();
  const [stars, setStars] = useState(0);
  const [spin, setSpin] = useState(0);
  const [view, setView] = useState(-1);
  const [message, setMessage] = useState("The observatory is quiet. Try the big star, or peek through the telescope.");

  const polish = () => {
    const next = stars + 1;
    setStars(next);
    setSpin((s) => s + 1);
    chime(NOTES[(next - 1) % NOTES.length]);
    setMessage(MESSAGES[(next - 1) % MESSAGES.length]);
  };

  const peek = () => {
    const next = (view + 1) % CONSTELLATIONS.length;
    setView(next);
    chime(392);
    setMessage(`Through the telescope: ${CONSTELLATIONS[next].name}.`);
  };

  const c = view >= 0 ? CONSTELLATIONS[view] : null;

  return (
    <section className="section playground" id="playground" aria-labelledby="playground-title">
      <div className="wrap">
        <p className="eyebrow eyebrow--night">After hours</p>
        <h2 id="playground-title" className="section-title section-title--night">
          The Dream Playground
        </h2>
        <p className="section-lede section-lede--night">A small toy observatory. Everything here can be poked.</p>

        <div className="toy">
          <Twinkle className="toy__deco toy__deco--a twinkle" color="var(--blush)" />
          <Twinkle className="toy__deco toy__deco--b twinkle" />
          <span className="toy__planet float" aria-hidden="true" />
          <span className="toy__planet toy__planet--small float float--slow" aria-hidden="true" />
          <Puff className="toy__cloud drift" />

          <div className="toy__window-wrap">
            <div className="toy__window" aria-hidden="true">
              <svg viewBox="0 0 200 200">
                {[[30, 40], [160, 30], [170, 150], [40, 170], [110, 20], [20, 100]].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="var(--cloud)" />
                ))}
                {c && (
                  <g key={c.name} className="constellation">
                    <polyline points={c.points.map((p) => p.join(",")).join(" ")} />
                    {c.points.map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="3.4" />
                    ))}
                  </g>
                )}
              </svg>
              <p className="toy__window-label">{c ? c.name : "Clear skies"}</p>
            </div>
            <EasterEgg />
          </div>

          <div className="toy__controls">
            <button type="button" className="big-star" onClick={polish} aria-label={`Polish the star. Stars collected: ${stars}`}>
              <StoryStar className="big-star__svg" style={{ transform: `rotate(${spin * 72}deg)` }} />
              <span className="big-star__count" aria-hidden="true">
                {stars}
              </span>
            </button>
            <button type="button" className="btn btn--night" onClick={peek}>
              <Telescope size={18} aria-hidden="true" /> Peek through the telescope
            </button>
          </div>

          <p className="toy__message" role="status">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
