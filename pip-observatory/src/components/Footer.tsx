import { LogoMark } from "./Decor";
import { NAV_LINKS, SoundToggle } from "./Navigation";
import { scrollToSection } from "../lib/motion";
import { hasOfficialArt } from "../lib/art";

export function Footer() {
  const usingOfficialArt = (["cloud", "box", "lantern", "portrait"] as const).some(hasOfficialArt);
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <p className="footer__logo">
            <LogoMark size={40} /> Pip's Little Universe
          </p>
          <p className="footer__love">Made with tiny dreams and lots of love.</p>
          <div className="footer__sound">
            <SoundToggle />
            <span>Sound plays only when you press something.</span>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <h2 className="footer__h">Wander</h2>
          <ul>
            {[...NAV_LINKS, { id: "playground", label: "Dream Playground" }, { id: "top", label: "Back to the stars" }].map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(l.id);
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__credits">
          <h2 className="footer__h">Credits</h2>
          <ul>
            <li>
              Pip, the character and story, and the official artwork belong to{" "}
              <a href="https://hax.baby" target="_blank" rel="noreferrer">haX.baby</a>
              {usingOfficialArt ? ", used from the official asset pack." : ". Scenery here is drawn for this site."}
            </li>
            <li>
              Fonts: <a href="https://fonts.google.com/specimen/Fraunces" target="_blank" rel="noreferrer">Fraunces</a> and{" "}
              <a href="https://fonts.google.com/specimen/Fredoka" target="_blank" rel="noreferrer">Fredoka</a> via Google Fonts (SIL Open Font License).
            </li>
            <li>
              Icons: <a href="https://lucide.dev" target="_blank" rel="noreferrer">Lucide</a> (ISC). Star confetti:{" "}
              <a href="https://github.com/catdad/canvas-confetti" target="_blank" rel="noreferrer">canvas-confetti</a> (ISC). Built with React.
            </li>
            <li>Lullabies are original melodies, synthesized live in your browser.</li>
          </ul>
        </div>
      </div>
      <p className="wrap footer__legal">
        © 2026 · A fan-made project for the haX.baby “Baby's First Website” hackathon. Not an official haX.baby website.
      </p>
    </footer>
  );
}
