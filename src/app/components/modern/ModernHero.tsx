import { motion } from "motion/react";
import { useEffect } from "react";
import { ChevronRight, User } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function ModernHero() {
  const { profileData, incrementProfileView } = useData();

  useEffect(() => {
    incrementProfileView();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative py-20 overflow-hidden bg-white">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--blue-primary)]/[0.03] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--purple)]/[0.03] rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--blue-primary)]/5 border border-[var(--blue-primary)]/10 text-[var(--blue-primary)] text-sm font-black uppercase tracking-[0.2em] mb-12"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--blue-primary)] animate-pulse" />
            Software Architecture & AI
          </motion.div>

          <div className="space-y-2 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 text-[var(--muted-foreground)] font-mono text-lg mb-4"
            >
              <span className="w-12 h-[1px] bg-[var(--border)]" />
              <span>01 / Start</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl font-black leading-[1.1] tracking-tight text-[var(--blue-dark)]"
            >
              I am <br />
              <span className="relative inline-block mt-4">
                <span className="relative z-10 bg-gradient-to-r from-[var(--blue-primary)] via-blue-400 to-indigo-600 bg-clip-text text-transparent filter drop-shadow-sm">
                  {profileData.fullName}
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-4 left-0 h-[20%] bg-[var(--blue-primary)]/10 -z-0 rounded-sm"
                />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 mt-8"
            >
               <h2 className="text-2xl sm:text-4xl text-[var(--muted-foreground)] font-medium flex items-center gap-3">
                    Expert in <span className="text-[var(--blue-dark)] font-bold decoration-[var(--blue-primary)] decoration-4 underline-offset-8 underline">Scalable Web Systems</span>
               </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12 max-w-2xl"
          >
            <p className="text-xl text-[var(--muted-foreground)] leading-relaxed mb-10">
              {profileData.bio || "Crafting high-performance digital experiences through elegant code and thoughtful design."}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-[var(--blue-dark)] text-white rounded-[24px] font-bold text-lg hover:bg-[var(--blue-primary)] transition-all shadow-2xl shadow-[var(--blue-primary)]/20 flex items-center gap-3 group"
              >
                Explore Works
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 border-2 border-[var(--border)] text-[var(--blue-dark)] rounded-[24px] font-bold text-lg hover:border-[var(--blue-primary)] hover:text-[var(--blue-primary)] transition-all bg-white/50 backdrop-blur-sm"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Profile Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", damping: 15 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
        >
          <div className="relative group p-4">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--blue-primary)]/20 to-purple-500/20 rounded-[60px] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="absolute -inset-2 bg-gradient-to-tr from-[var(--blue-primary)] to-indigo-500 rounded-[64px] opacity-10 blur-sm group-hover:opacity-20 transition-opacity" />
            
            <div className="relative w-72 h-72 sm:w-[450px] sm:h-[450px] rounded-[60px] overflow-hidden border-8 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transform group-hover:-rotate-2 transition-all duration-700">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.fullName}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-[var(--secondary)] flex items-center justify-center">
                  <User className="w-40 h-40 text-[var(--muted-foreground)]/10" />
                </div>
              )}

              {/* Glass Overlay on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 -right-8 px-6 py-4 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 z-20 flex flex-col items-center min-w-[120px]"
            >
               <span className="text-2xl font-black text-[var(--blue-primary)]">{profileData.projectsDelivered}</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">Success</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 -left-8 px-6 py-4 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 z-20 flex flex-col items-center min-w-[120px]"
            >
               <span className="text-2xl font-black text-green-500">{profileData.yearsExperience}</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">Expertise</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Social Indicator */}
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 text-[var(--muted-foreground)]"
      >
          <div className="h-24 w-[1px] bg-gradient-to-b from-transparent to-[var(--border)] mx-auto" />
          <span className="text-xs font-black uppercase tracking-[0.3em] vertical-text">Scroll Down</span>
          <div className="h-24 w-[1px] bg-gradient-to-t from-transparent to-[var(--border)] mx-auto" />
      </motion.div>
    </section>
  );
}
