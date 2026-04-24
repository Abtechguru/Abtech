import { motion } from "motion/react";
import { useEffect } from "react";
import { ArrowDown, Paintbrush, Box, ChevronRight } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function ModernHero() {
  const { profileData, incrementProfileView } = useData();

  useEffect(() => {
    incrementProfileView();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative py-20 overflow-hidden bg-white select-none">
      {/* Decorative Square */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-[20%] left-[20%] w-20 h-28 bg-gradient-to-br from-blue-400/30 to-blue-600/10 blur-xl rounded-2xl pointer-events-none"
      />

      {/* Top Right "Work with me" Button */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-10 right-10 z-20"
      >
        <a
          href="#contact"
          className="bg-[var(--blue-dark)] text-white px-8 py-5 rounded-2xl font-bold flex flex-col items-center gap-1 group hover:bg-[var(--blue-primary)] transition-all shadow-xl shadow-blue-900/10"
        >
          <div className="flex items-center gap-3">
             <span className="text-sm tracking-widest uppercase">Work</span>
             <div className="w-8 h-[2px] bg-white transform group-hover:translate-x-2 transition-transform" />
             <ChevronRight className="w-4 h-4" />
          </div>
          <span className="text-sm tracking-widest uppercase">with me</span>
        </a>
      </motion.div>

      {/* Right Side "Honors" Badge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="bg-teal-200/50 py-10 px-4 rounded-l-2xl border-l border-y border-teal-300/30 backdrop-blur-sm">
            <span className="vertical-text text-[10px] font-black uppercase tracking-[0.5em] text-teal-800 opacity-60">Honors</span>
          </div>
      </div>

      {/* Bottom Right Cookie/Theme Icon */}
      <div className="absolute bottom-10 right-10 opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
          <Box className="w-8 h-8 text-[var(--blue-dark)]" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl w-full">
        <div className="space-y-8 mb-12">
          {/* Line 01 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-8"
          >
            <span className="text-2xl text-[var(--muted-foreground)] font-mono opacity-40 pt-4">01</span>
            <h1 className="text-6xl md:text-8xl flex flex-wrap items-center gap-x-4 tracking-tight">
              <span className="text-[var(--muted-foreground)] opacity-40">&lt;</span>
              <span>Hello, I'm</span>
              <span className="text-[var(--blue-dark)] font-bold">{profileData.fullName.split(' ')[0]}!</span>
              <span className="text-[var(--muted-foreground)] opacity-40">&gt;</span>
            </h1>
          </motion.div>

          {/* Line 02 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-8"
          >
            <span className="text-2xl text-[var(--muted-foreground)] font-mono opacity-40 pt-4">02</span>
            <h2 className="text-6xl md:text-8xl flex flex-wrap items-center gap-x-4 tracking-tight">
              <span className="text-[var(--muted-foreground)] opacity-40">&lt;</span>
              <span>I</span>
              <span className="text-[var(--blue-dark)] font-bold relative inline-flex items-center gap-4">
                design
                <Paintbrush className="w-10 h-10 text-[var(--blue-primary)] -rotate-12" />
              </span>
              <span>and</span>
              <span className="text-[var(--blue-dark)] font-bold relative inline-flex items-center gap-4">
                develop
                <Box className="w-10 h-10 text-[var(--blue-primary)]" />
              </span>
            </h2>
          </motion.div>

          {/* Line 03 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-8"
          >
            <span className="text-2xl text-[var(--muted-foreground)] font-mono opacity-40 pt-4">03</span>
            <h2 className="text-6xl md:text-8xl flex flex-wrap items-center gap-x-4 tracking-tight">
              <span className="ml-12 md:ml-24">websites.</span>
              <span className="text-[var(--muted-foreground)] opacity-40">&gt;</span>
            </h2>
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="ml-32 md:ml-40"
        >
          <p className="text-2xl text-[var(--blue-dark)] font-medium max-w-xl">
             {profileData.bio || "I also design your brand image, logo, and digital experience..."}
          </p>
        </motion.div>
      </div>

      {/* Learn More Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 group cursor-pointer"
      >
        <span className="text-sm font-bold uppercase tracking-widest text-[var(--muted-foreground)] group-hover:text-[var(--blue-dark)] transition-colors">
            Learn more
        </span>
        <div className="w-12 h-12 rounded-2xl bg-[var(--blue-dark)] flex items-center justify-center text-white shadow-lg group-hover:bg-[var(--blue-primary)] transition-all">
            <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
