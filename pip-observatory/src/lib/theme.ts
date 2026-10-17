import { useEffect, useState } from "react";
import { readPref, writePref } from "./prefs";

export type Mode = "day" | "night";

function initialMode(): Mode {
  const saved = readPref("pip-theme");
  if (saved === "day" || saved === "night") return saved;
  const host = document.documentElement.dataset.theme;
  if (host === "dark") return "night";
  if (host === "light") return "day";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
}

export function useMode(): [Mode, () => void] {
  const [mode, setMode] = useState<Mode>(initialMode);
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);
  const toggle = () =>
    setMode((m) => {
      const next: Mode = m === "day" ? "night" : "day";
      writePref("pip-theme", next);
      return next;
    });
  return [mode, toggle];
}
