import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { About } from "./About";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { AIEngineering } from "./AIEngineering";
import { Experience } from "./Experience";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export function PortfolioPage() {
  return (
    <div className="dark min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navigation />
      <main className="pt-16">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <AIEngineering />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
