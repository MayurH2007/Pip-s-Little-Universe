import type { ReactNode } from "react";

interface Scene {
  id: string;
  chapter: string;
  title: string;
  text: string;
  art: ReactNode;
}

const FallingStar = (
  <svg viewBox="0 0 320 200" aria-hidden="true">
    <rect width="320" height="200" fill="var(--midnight)" />
    {[[30, 30], [80, 60], [260, 40], [290, 90], [150, 20], [210, 70]].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="var(--cloud)" />
    ))}
    <path className="scene-trail" d="M40 20 Q 130 70 196 124" stroke="var(--gold)" strokeWidth="5" strokeLinecap="round" fill="none" strokeDasharray="2 10" />
    <path d="M206 112l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z" fill="var(--gold)" className="scene-star" />
    <path d="M0 170c60-20 120-24 180-12s100 10 140-4v46H0Z" fill="var(--hill-back)" />
    <rect x="176" y="140" width="56" height="40" rx="4" fill="var(--blush)" />
    <path d="M168 142a36 30 0 0 1 72 0Z" fill="var(--berry)" />
    <rect x="198" y="158" width="12" height="22" rx="6" fill="var(--gold)" />
  </svg>
);

const FirstInvention = (
  <svg viewBox="0 0 320 200" aria-hidden="true">
    <rect width="320" height="200" fill="var(--blush)" />
    <circle cx="160" cy="96" r="80" fill="var(--gold)" opacity=".28" />
    <rect x="20" y="150" width="280" height="16" rx="4" fill="var(--cocoa)" />
    <rect x="34" y="166" width="12" height="34" fill="var(--cocoa)" />
    <rect x="274" y="166" width="12" height="34" fill="var(--cocoa)" />
    {/* music box */}
    <rect x="44" y="110" width="78" height="40" rx="5" fill="var(--berry)" />
    <path d="M48 110l-4-30h86l-4 30Z" fill="var(--cream)" />
    <path d="M70 90h34" stroke="var(--berry)" strokeWidth="3" strokeLinecap="round" />
    <text x="130" y="88" fontSize="20" fill="var(--cocoa)" className="scene-note">♪</text>
    {/* lantern */}
    <path d="M160 52v12" stroke="var(--cocoa)" strokeWidth="3" />
    <rect x="144" y="64" width="32" height="56" rx="10" fill="var(--gold)" stroke="var(--cocoa)" strokeWidth="3" />
    <path d="M160 78c7 8 7 18 0 22-7-4-7-14 0-22Z" fill="var(--cream)" className="scene-flame" />
    <rect x="146" y="120" width="28" height="30" rx="3" fill="var(--cocoa)" opacity=".2" />
    {/* storybook */}
    <path d="M200 140l40-12 40 12v10h-80Z" fill="var(--lavender)" />
    <path d="M240 128v22" stroke="var(--midnight)" strokeWidth="2" />
    <path d="M208 138l26-7M248 131l26 7" stroke="var(--midnight)" strokeOpacity=".4" strokeWidth="2" />
  </svg>
);

const Rooftops = (
  <svg viewBox="0 0 320 200" aria-hidden="true">
    <rect width="320" height="200" fill="var(--sky-deep)" />
    <path d="M262 26a24 24 0 1 0 0 44 20 20 0 0 1 0-44Z" fill="var(--gold)" />
    <g fill="var(--midnight)">
      <path d="M0 200v-60l30-24 30 24v60Z" />
      <path d="M60 200v-80h50v80Z" />
      <path d="M54 124l31-26 31 26Z" />
      <path d="M116 200v-50l34-28 34 28v50Z" />
      <path d="M184 200v-90h44v90Z" />
      <path d="M228 200v-60l30-26 30 26v60Z" />
      <path d="M288 200v-70h32v70Z" />
    </g>
    <g fill="var(--gold)">
      <rect x="76" y="140" width="10" height="12" rx="2" />
      <rect x="146" y="160" width="8" height="10" rx="2" />
      <rect x="200" y="130" width="10" height="12" rx="2" />
      <rect x="252" y="160" width="10" height="10" rx="2" />
    </g>
    <path className="scene-trail" d="M20 110 Q 90 50 150 92 T 290 70" stroke="var(--blush)" strokeWidth="3" fill="none" strokeDasharray="1 9" strokeLinecap="round" />
    <circle cx="290" cy="70" r="6" fill="var(--blush)" className="scene-star" />
  </svg>
);

const SCENES: Scene[] = [
  {
    id: "falling-star",
    chapter: "Scene 1",
    title: "The Falling Star",
    text: "One quiet evening, a little star fell into the Midnight Nursery. Inside it was Pip, a sleepy baby with curious amber eyes and a pocket full of impossible dreams.",
    art: FallingStar,
  },
  {
    id: "first-invention",
    chapter: "Scene 2",
    title: "The First Invention",
    text: "Pip discovered that a little music, a warm lantern, and a kind story could turn a frightening night into a peaceful one. So Pip began building tiny inventions for the neighborhood's sleepless creatures.",
    art: FirstInvention,
  },
  {
    id: "dream-engineer",
    chapter: "Scene 3",
    title: "The Dream Engineer",
    text: "Now Pip travels across the rooftops every night, delivering carefully crafted dreams. There is always one more little creature waiting for a peaceful night's sleep.",
    art: Rooftops,
  },
];

export function OriginStory() {
  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <div className="wrap">
        <p className="eyebrow">A bedtime story, in three pictures</p>
        <h2 id="story-title" className="section-title">
          My Story
        </h2>
        <ol className="scenes">
          {SCENES.map((s, i) => (
            <li key={s.id} className={`scene scene--${i + 1} reveal`}>
              <div className="scene__art">{s.art}</div>
              <div className="scene__text">
                <p className="scene__chapter">{s.chapter}</p>
                <h3 className="scene__title">{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
