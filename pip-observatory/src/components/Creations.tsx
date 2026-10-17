import { Lamp, Map as MapIcon, Music, type LucideIcon } from "lucide-react";
import { ProjectCard, type ProjectMeta } from "./ProjectCard";
import { LullabyPlayer } from "./LullabyPlayer";
import { NightlightGallery } from "./NightlightGallery";
import { DreamDeliveryMap } from "./DreamDeliveryMap";
import { OfficialArt } from "../lib/art";
import { LanternFallback } from "./Illustrations";
import { scrollToSection } from "../lib/motion";

const PROJECTS: Array<ProjectMeta & { icon: LucideIcon; blurb: string }> = [
  {
    id: "lullaby-lab",
    theme: "lullaby",
    number: "01",
    title: "Lullaby Lab",
    concept: "Pip writes gentle lullabies and winds them into a music box, one tiny tooth at a time.",
    hint: "Choose a tune, then wind the box. Sound starts only when you press play.",
    icon: Music,
    blurb: "A music box that plays real, synthesized lullabies.",
  },
  {
    id: "nightlights",
    theme: "nightlight",
    number: "02",
    title: "Nightlight Collection",
    concept: "Five tiny lamps, each designed for a different kind of scared-of-the-dark.",
    hint: "Tap a lamp to light the room and watch who falls asleep.",
    icon: Lamp,
    blurb: "Five lamps that light a sleepy little room.",
  },
  {
    id: "dream-routes",
    theme: "routes",
    number: "03",
    title: "Dream Delivery",
    concept: "Every night Pip flies one winding route across the village with a satchel of hand-built dreams.",
    hint: "Pick a stop on the map to see which dream lands there.",
    icon: MapIcon,
    blurb: "A village map of tonight's five deliveries.",
  },
];

export function Creations() {
  return (
    <section className="section creations" id="creations" aria-labelledby="creations-title">
      <div className="wrap">
        <div className="creations__intro">
          <div>
            <p className="eyebrow">The workshop logbook</p>
            <h2 id="creations-title" className="section-title">
              My Creations
            </h2>
            <p className="section-lede">
              Three inventions from the Midnight Nursery workbench. Each one works, so go ahead and touch everything.
            </p>
          </div>
          <div className="creations__lantern float float--slow" aria-hidden="true">
            <OfficialArt name="lantern" alt="" className="creations__lantern-img" fallback={<LanternFallback />} />
          </div>
        </div>

        <ul className="index-cards">
          {PROJECTS.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.id} className={`index-card index-card--${p.theme}`}>
                <button type="button" onClick={() => scrollToSection(p.id)}>
                  <span className="index-card__icon">
                    <Icon size={22} aria-hidden={true} />
                  </span>
                  <span className="index-card__num">{p.number}</span>
                  <span className="index-card__title">{p.title}</span>
                  <span className="index-card__blurb">{p.blurb}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="projects">
          <ProjectCard project={PROJECTS[0]}>
            <LullabyPlayer />
          </ProjectCard>
          <ProjectCard project={PROJECTS[1]}>
            <NightlightGallery />
          </ProjectCard>
          <ProjectCard project={PROJECTS[2]}>
            <DreamDeliveryMap />
          </ProjectCard>
        </div>
      </div>
    </section>
  );
}
