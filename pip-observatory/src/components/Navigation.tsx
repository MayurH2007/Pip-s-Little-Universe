import { useEffect, useState } from "react";
import { Menu, Moon, Sun, Volume2, VolumeX, X } from "lucide-react";
import { LogoMark } from "./Decor";
import { useSound } from "../lib/sound";
import { scrollToSection } from "../lib/motion";
import type { Mode } from "../lib/theme";

export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: "meet", label: "Meet Pip" },
  { id: "creations", label: "My Creations" },
  { id: "story", label: "My Story" },
];

interface NavigationProps {
  mode: Mode;
  onToggleMode: () => void;
}

export function SoundToggle({ compact = false }: { compact?: boolean }) {
  const { muted, toggleMute } = useSound();
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggleMute}
      aria-pressed={!muted}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      title={muted ? "Sound is off" : "Sound is on"}
    >
      {muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
      {!compact && <span className="icon-btn__label">{muted ? "Sound off" : "Sound on"}</span>}
    </button>
  );
}

export function Navigation({ mode, onToggleMode }: NavigationProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  const themeLabel = mode === "night" ? "Switch to day mode" : "Switch to night mode";

  return (
    <header className="nav">
      <nav className="nav__inner" aria-label="Main">
        <a
          className="nav__brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("top");
          }}
        >
          <LogoMark />
          <span>Pip's Little Universe</span>
        </a>

        <ul className="nav__links" id="nav-menu" data-open={open}>
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__tools">
          <SoundToggle compact />
          <button type="button" className="icon-btn" onClick={onToggleMode} aria-label={themeLabel} title={themeLabel}>
            {mode === "night" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="icon-btn nav__menu-btn"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
