import { useState, type ReactNode } from "react";

export type ArtName = "cloud" | "box" | "lantern" | "portrait";

const FILES: Record<ArtName, string> = {
  cloud: "pip_avatar_cloud.png",
  box: "pip_lullaby_box.png",
  lantern: "pip_dream_lantern.png",
  portrait: "pip_portrait.png",
};

// Official PNGs placed in src/assets are bundled automatically.
// If a file is missing, the glob simply has no entry and the fallback is shown.
const found = import.meta.glob("../assets/*.png", { eager: true, query: "?url", import: "default" }) as Record<
  string,
  string
>;

function srcFor(name: ArtName): string | undefined {
  return found[`../assets/${FILES[name]}`];
}

export function hasOfficialArt(name: ArtName): boolean {
  return Boolean(srcFor(name));
}

interface OfficialArtProps {
  name: ArtName;
  alt: string;
  className?: string;
  fallback: ReactNode;
}

/** Shows an official haX.baby PNG, untouched, or a drawn fallback if it can't load. */
export function OfficialArt({ name, alt, className, fallback }: OfficialArtProps) {
  const src = srcFor(name);
  const [state, setState] = useState<"loading" | "ok" | "failed">(src ? "loading" : "failed");
  return (
    <>
      {state !== "ok" && fallback}
      {src && state !== "failed" && (
        <img
          src={src}
          alt={alt}
          className={className}
          hidden={state !== "ok"}
          decoding="async"
          onLoad={() => setState("ok")}
          onError={() => setState("failed")}
        />
      )}
    </>
  );
}
