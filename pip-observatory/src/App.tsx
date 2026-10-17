import { SoundProvider } from "./lib/sound";
import { useMode } from "./lib/theme";
import { useReveal } from "./lib/motion";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { CharacterIntroduction } from "./components/CharacterIntroduction";
import { Creations } from "./components/Creations";
import { OriginStory } from "./components/OriginStory";
import { DreamPlayground } from "./components/DreamPlayground";
import { Footer } from "./components/Footer";

export default function App() {
  const [mode, toggleMode] = useMode();
  useReveal();
  return (
    <SoundProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation mode={mode} onToggleMode={toggleMode} />
      <main id="main">
        <HeroSection />
        <CharacterIntroduction />
        <Creations />
        <OriginStory />
        <DreamPlayground />
      </main>
      <Footer />
    </SoundProvider>
  );
}
