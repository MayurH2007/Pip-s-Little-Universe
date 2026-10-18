import { useEffect, useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
// import { OfficialArt } from "../lib/art";
import { scrollToSection, prefersReducedMotion } from "../lib/motion";
import { ObservatoryFallback, Village } from "./Illustrations";
import { Puff, Twinkle } from "./Decor";

const STARS: Array<{ x: number; y: number; s: number; d: number }> = [
  { x: 6, y: 14, s: 14, d: 0 },
  { x: 18, y: 6, s: 9, d: 1.2 },
  { x: 32, y: 22, s: 11, d: 2.1 },
  { x: 47, y: 9, s: 8, d: 0.6 },
  { x: 58, y: 30, s: 12, d: 1.7 },
  { x: 71, y: 8, s: 16, d: 2.6 },
  { x: 86, y: 18, s: 10, d: 0.3 },
  { x: 93, y: 42, s: 8, d: 1.4 },
  { x: 40, y: 44, s: 7, d: 2.9 },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  // Pointer-responsive parallax on desktop pointers only.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={ref} aria-labelledby="hero-title">
      <div className="hero__sky" aria-hidden="true">
        <div className="layer layer--far">
          {STARS.map((s, i) => (
            <Twinkle
              key={i}
              className="twinkle"
              color={i % 3 === 0 ? "var(--blush)" : "var(--gold)"}
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
            />
          ))}
        </div>
        <div className="layer layer--mid">
          <Puff className="hero__puff hero__puff--a float" />
          <Puff className="hero__puff hero__puff--b float float--slow" />
        </div>
        <Village className="hero__village" />
      </div>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="badge">
            <Sparkles size={14} aria-hidden="true" /> MIDNIGHT NURSERY · DREAM ENGINEER
          </p>
          <h1 id="hero-title" className="hero__title">
            A little engineer of <em>big dreams.</em>
          </h1>
          <p className="hero__lede">
            Somewhere between the stars and bedtime, Pip is building your next favorite dream.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn--primary" onClick={() => scrollToSection("creations")}>
              Explore my lbittle universe <ArrowDown size={18} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => scrollToSection("meet")}>
              Meet the dream engineer
            </button>
          </div>
          <p className="hero__psst">
            <span className="hero__psst-dot" aria-hidden="true" /> Psst... Pip is still awake.
          </p>
        </div>

       <div className="hero__stage">
          <div className="hero__halo" aria-hidden="true" />
          <div className="layer layer--near hero__pip float float--gentle">
            <ObservatoryFallback />
          </div>
          <p className="hero__tag">
            “I build the dreams you fall asleep inside.”
          </p>
        </div>
      </div>
    </section>
  );
}
