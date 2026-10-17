import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import { X } from "lucide-react";
import { useSound } from "../lib/sound";
import { prefersReducedMotion } from "../lib/motion";

const CLICKS_NEEDED = 5;

function starBurst() {
  if (prefersReducedMotion()) return;
  const colors = ["#f6bd60", "#f4c9d6", "#c9b8ed", "#fff8f1", "#dcebf5"];
  const base = { shapes: ["star"] as confetti.Shape[], colors, disableForReducedMotion: true, zIndex: 120, scalar: 1.1, ticks: 160 };
  confetti({ ...base, particleCount: 46, spread: 70, startVelocity: 32, origin: { x: 0.5, y: 0.45 } });
  window.setTimeout(() => confetti({ ...base, particleCount: 22, spread: 110, startVelocity: 22, origin: { x: 0.5, y: 0.4 } }), 220);
}

/** A tiny star button. Five presses reveal Pip's secret diary. */
export function EasterEgg() {
  const { chime } = useSound();
  const [open, setOpen] = useState(false);
  const [wiggle, setWiggle] = useState(0);
  const count = useRef(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const starRef = useRef<HTMLButtonElement>(null);

  const press = () => {
    if (open) return;
    count.current += 1;
    setWiggle((w) => w + 1);
    chime(700 + count.current * 90);
    if (count.current >= CLICKS_NEEDED) {
      count.current = 0;
      setOpen(true);
      starBurst();
    }
  };

  const close = () => {
    setOpen(false);
    starRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        // Only one control inside: keep focus on it.
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={starRef}
        type="button"
        className="secret-star"
        aria-label="Tiny star"
        onClick={press}
        data-wiggle={wiggle % 2}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l2.6 6.1 6.6.6-5 4.4 1.5 6.5L12 16.2l-5.7 3.4 1.5-6.5-5-4.4 6.6-.6Z" />
        </svg>
      </button>

      {open &&
        createPortal(
        <div className="diary-backdrop" onClick={close}>
          <div
            className="diary"
            role="dialog"
            aria-modal="true"
            aria-labelledby="diary-title"
            aria-describedby="diary-body"
            onClick={(e) => e.stopPropagation()}
          >
            <button ref={closeRef} type="button" className="icon-btn diary__close" onClick={close} aria-label="Close secret diary">
              <X size={18} aria-hidden="true" />
            </button>
            <p className="diary__found">You found my secret! You must be a dream detective.</p>
            <h2 id="diary-title" className="diary__title">
              Pip’s secret diary
            </h2>
            <div id="diary-body" className="diary__page">
              <p className="diary__date">Tuesday, very late</p>
              <p>
                Dear diary, today I dropped a whole jar of stars down the observatory stairs. They bounced all the way to the
                kitchen. I said “oops” very quietly so nobody would wake up.
              </p>
              <p>
                I picked up every single one except the smallest. I left that one by the window on purpose, so whoever finds it
                knows somebody is still awake and thinking of them.
              </p>
              <p className="diary__sign">— Pip ☆</p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
