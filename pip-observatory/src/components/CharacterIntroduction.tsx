import { OfficialArt } from "../lib/art";
import { PortraitFallback } from "./Illustrations";
import { Squiggle, StoryStar, Twinkle } from "./Decor";

interface Fact {
  label: string;
  value: string;
}

const FACTS: Fact[] = [
  { label: "Name", value: "Pip" },
  { label: "Species", value: "A friendly skull-faced baby" },
  { label: "Personality", value: "Curious, sleepy, a little clumsy, and delighted by tiny discoveries" },
  { label: "Profession", value: "Junior Dream Engineer at the Midnight Nursery" },
];

const FAVORITES: string[] = [
  "Collecting fallen stars",
  "Winding tiny music boxes",
  "Drawing dreams on the observatory windows",
  "Helping sleepy creatures find their way home",
];

export function CharacterIntroduction() {
  return (
    <section className="section meet" id="meet" aria-labelledby="meet-title">
      <div className="wrap meet__grid">
        <figure className="polaroid reveal">
          <span className="tape tape--l" aria-hidden="true" />
          <span className="tape tape--r" aria-hidden="true" />
          <div className="polaroid__frame">
            <OfficialArt
              name="portrait"
              alt="Portrait of Pip: a round skull face, warm amber eyes, a tiny crooked smile and a starry nightcap with a pink bow"
              className="polaroid__img"
              fallback={<PortraitFallback />}
            />
          </div>
          <figcaption>fig. 1 — Pip, on the night shift</figcaption>
          <StoryStar className="meet__sticker" />
        </figure>

        <div className="sheet reveal">
          <p className="eyebrow">Character sheet</p>
          <h2 id="meet-title" className="section-title">
            Meet Pip
          </h2>
          <Squiggle className="squiggle" />

          <dl className="facts">
            {FACTS.map((f) => (
              <div className="fact" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="sheet__row">
            <div className="favorites">
              <h3>Favorite things</h3>
              <ul>
                {FAVORITES.map((f) => (
                  <li key={f}>
                    <Twinkle className="favorites__star" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shift-card" aria-label="Pip's work details">
              <p className="shift-card__label">Shift</p>
              <p className="shift-card__value">9:00 pm – sunrise</p>
              <p className="shift-card__label">Toolbelt</p>
              <p className="shift-card__value">Star net, winding key, one blue crayon</p>
            </div>
          </div>

          <blockquote className="saying">
            <p>“Every little star has a dream to tell.”</p>
            <footer>— Pip’s favorite saying</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
