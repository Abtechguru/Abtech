import { Sidebar } from "./Sidebar";
import { ModernHero } from "./ModernHero";
import { ProcessSection } from "./ProcessSection";
import { PricingSection } from "./PricingSection";
import { ModernProjects } from "./ModernProjects";
import { ServicesSection } from "./ServicesSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ModernAbout } from "./ModernAbout";
import { ModernContact } from "./ModernContact";
import { useData } from "../../contexts/DataContext";

export function ModernPortfolio() {
  const { profileData } = useData();

  return (
    <div className="bg-white text-[var(--foreground)] min-h-screen">
      <Sidebar />
      <main className="ml-64">
        <ModernHero />
        <ProcessSection />
        <PricingSection />
        <ModernProjects />
        <ServicesSection />
        <TestimonialsSection />
        <ModernAbout />
        <ModernContact />

        {/* Footer */}
        <footer className="py-12 px-12 border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--muted-foreground)]">
              © 2026 {profileData.fullName}
            </p>
            <p className="text-[var(--muted-foreground)]">
              {profileData.location}
            </p>
            <p className="text-[var(--muted-foreground)]">
              Built with React + Tailwind
            </p>
          </div>
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 mt-6 text-sm text-[var(--muted-foreground)]">
            <a href="#" className="hover:text-[var(--blue-primary)] transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[var(--blue-primary)] transition-colors">
              Legal Notice
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
