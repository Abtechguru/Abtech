import { Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--orange)] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg">Lateef Abiodun</span>
          </div>

          <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-[var(--orange)] fill-current" />
            <span>using React + Tailwind</span>
          </div>

          <p className="text-[var(--muted-foreground)] text-sm">
            © 2026 Lateef Abiodun. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
