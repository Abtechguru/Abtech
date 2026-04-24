import { Helmet } from "react-helmet-async";
import { Sidebar } from "./Sidebar";
import { ModernHero } from "./ModernHero";
import { ProcessSection } from "./ProcessSection";
import { PricingSection } from "./PricingSection";
import { ModernProjects } from "./ModernProjects";
import { ServicesSection } from "./ServicesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ModernAbout } from "./ModernAbout";
import { ModernContact } from "./ModernContact";
import { CurrencyConverter } from "../ui/CurrencyConverter";
import { useData } from "../../contexts/DataContext";

export function ModernPortfolio() {
  const { profileData } = useData();

  return (
    <div className="bg-white text-[var(--foreground)] min-h-screen selection:bg-[var(--blue-primary)] selection:text-white">
      <Helmet>
        <title>{profileData.fullName} | {profileData.title}</title>
        <meta name="description" content={profileData.bio} />
        <meta property="og:title" content={`${profileData.fullName} - Portfolio`} />
        <meta property="og:description" content={profileData.bio} />
        <meta property="og:image" content={profileData.profilePhoto} />
      </Helmet>
      
      <Sidebar />
      
      <main className="lg:ml-64 transition-all duration-300">
        <div className="mx-auto">
          <ModernHero />
          
          <div className="space-y-0">
            <ProcessSection />
            <div className="py-20 bg-[var(--secondary)]/10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
                    <h2 className="text-3xl font-black text-[var(--blue-dark)] mb-4 uppercase tracking-tighter">Quick Utilities</h2>
                    <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-widest text-xs opacity-60">Handy tools for global business</p>
                </div>
                <CurrencyConverter />
            </div>
            <PricingSection />
            <ModernProjects />
            <ServicesSection />
            <TestimonialsSection />
            <ModernAbout />
            <ModernContact />
          </div>

          {/* Footer */}
          <footer className="py-20 px-6 md:px-12 border-t border-[var(--border)] bg-[var(--secondary)]/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--blue-primary)] flex items-center justify-center text-white font-bold text-lg">
                    {profileData.fullName.charAt(0)}
                  </div>
                  <span className="text-2xl font-black text-[var(--blue-dark)] tracking-tighter uppercase italic">
                    {profileData.fullName}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center gap-8 text-sm font-black uppercase tracking-widest text-[var(--muted-foreground)]">
                  <a href="#" className="hover:text-[var(--blue-primary)] transition-colors">Home</a>
                  <a href="#projects" className="hover:text-[var(--blue-primary)] transition-colors text-[var(--blue-dark)]">Projects</a>
                  <a href="#about" className="hover:text-[var(--blue-primary)] transition-colors">About</a>
                  <a href="#contact" className="hover:text-[var(--blue-primary)] transition-colors">Contact</a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-[var(--border)]/50">
                <p className="text-[var(--muted-foreground)] text-xs font-bold uppercase tracking-widest">
                  © 2026 {profileData.fullName}. Handcrafted with Excellence.
                </p>
                <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  <p>{profileData.location}</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
