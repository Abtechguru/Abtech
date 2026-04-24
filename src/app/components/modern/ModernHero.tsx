import { motion } from "motion/react";
import { useEffect } from "react";
import { ArrowDown, ChevronRight, User } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function ModernHero() {
  const { profileData, incrementProfileView } = useData();

  useEffect(() => {
    incrementProfileView();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative py-20 overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--blue-primary)]/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--purple)]/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          {/* Small decorative square */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block w-16 h-16 bg-[var(--blue-light)]/30 rounded-lg mb-8"
          />

          {/* Lines */}
          <div className="space-y-4 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4 md:gap-8"
            >
              <span className="hidden sm:block text-xl text-[var(--muted-foreground)] font-mono">01</span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl">
                <span className="text-[var(--muted-foreground)]">&lt;</span>
                Hello, I'm{" "}
                <span className="text-[var(--blue-primary)] font-bold">
                  {profileData.fullName.split(' ')[0]}
                </span>
                <span className="text-[var(--muted-foreground)]">!</span>
                <span className="text-[var(--muted-foreground)]">&gt;</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 md:gap-8"
            >
              <span className="hidden sm:block text-xl text-[var(--muted-foreground)] font-mono">02</span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl">
                <span className="text-[var(--muted-foreground)]">&lt;</span>
                I{" "}
                <span className="text-[var(--blue-primary)] font-bold">build</span>
                <span className="text-[var(--muted-foreground)]">_</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-4 md:gap-8"
            >
              <span className="hidden sm:block text-xl text-[var(--muted-foreground)] font-mono">03</span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold">
                <span className="hidden sm:inline">&nbsp;&nbsp;&nbsp;</span>
                intelligent web systems
                <span className="text-[var(--muted-foreground)]">.&gt;</span>
              </h2>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:ml-20 mb-12"
          >
            <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-xl">
              {profileData.bio || "Crafting high-performance digital experiences through elegant code and thoughtful design."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[var(--blue-dark)] text-white rounded-2xl font-bold hover:bg-[var(--blue-primary)] transition-all shadow-lg flex items-center gap-2"
              >
                View My Work
                <ChevronRight className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[var(--border)] text-[var(--foreground)] rounded-2xl font-bold hover:border-[var(--blue-primary)] hover:text-[var(--blue-primary)] transition-all"
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Profile Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue-primary)] to-[var(--purple)] rounded-[40px] rotate-6 group-hover:rotate-12 transition-transform duration-500 blur-xl opacity-20" />
            
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-[40px] overflow-hidden border-4 border-white shadow-2xl">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.fullName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-[var(--secondary)] flex items-center justify-center">
                  <User className="w-32 h-32 text-[var(--muted-foreground)]/20" />
                </div>
              )}
            </div>

            {/* Float Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 px-6 py-3 bg-white rounded-2xl shadow-xl border border-[var(--border)] z-10"
            >
              <span className="font-bold text-[var(--blue-primary)]">Available for Hire</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 px-6 py-3 bg-white rounded-2xl shadow-xl border border-[var(--border)] z-10"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-bold">Active Now</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted-foreground)]"
      >
        <span className="text-sm font-medium tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-3 bg-[var(--blue-primary)] rounded-full"
        />
      </motion.div>
    </section>
  );
}
