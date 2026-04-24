import { motion } from "motion/react";
import { ArrowDown, ChevronRight } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function ModernHero() {
  const { profileData } = useData();

  return (
    <section className="min-h-screen flex items-center justify-center px-12 relative">
      {/* Work with me button */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-8 right-8 px-8 py-4 bg-[var(--blue-dark)] text-white rounded-xl flex items-center gap-2 hover:bg-[var(--blue-primary)] transition-all z-50 shadow-lg"
      >
        <span className="font-semibold">Work with me</span>
        <ChevronRight className="w-5 h-5" />
      </motion.a>

      {/* Main Content */}
      <div className="max-w-5xl">
        {/* Small decorative square */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-[var(--blue-light)]/30 rounded-lg mb-8 ml-20"
        />

        {/* Line 01 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-8 mb-4"
        >
          <span className="text-xl text-[var(--muted-foreground)] font-mono">01</span>
          <h1 className="text-7xl">
            <span className="text-[var(--muted-foreground)]">&lt;</span>
            Hello, I'm{" "}
            <span className="text-[var(--blue-primary)] font-bold">
              {profileData.fullName.split(' ')[0]}
            </span>
            <span className="text-[var(--muted-foreground)]">!</span>
            <span className="text-[var(--muted-foreground)]">&gt;</span>
          </h1>
        </motion.div>

        {/* Line 02 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-8 mb-4"
        >
          <span className="text-xl text-[var(--muted-foreground)] font-mono">02</span>
          <h2 className="text-7xl">
            <span className="text-[var(--muted-foreground)]">&lt;</span>
            I{" "}
            <span className="text-[var(--blue-primary)] font-bold">build</span>
            <span className="text-[var(--muted-foreground)]"> , </span>
            <span className="text-[var(--blue-primary)] font-bold">design</span>
            <span className="text-[var(--muted-foreground)]"> , </span>
            and{" "}
            <span className="text-[var(--blue-primary)] font-bold">develop</span>
            <span className="text-[var(--muted-foreground)]"> _</span>
          </h2>
        </motion.div>

        {/* Line 03 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-start gap-8 mb-12"
        >
          <span className="text-xl text-[var(--muted-foreground)] font-mono">03</span>
          <h2 className="text-7xl">
            <span className="text-[var(--muted-foreground)]">&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">intelligent web systems</span>
            <span className="text-[var(--muted-foreground)]">.&gt;</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="ml-32"
        >
          <p className="text-xl text-[var(--muted-foreground)] mb-8">
            I also design AI systems, fintech platforms, brand identities, and scalable architectures...
          </p>
        </motion.div>

        {/* Learn More */}
        <motion.a
          href="#process"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="ml-32 inline-flex items-center gap-3 text-lg hover:text-[var(--blue-primary)] transition-colors group"
        >
          <span>Learn more</span>
          <div className="w-12 h-12 rounded-xl bg-[var(--blue-dark)] flex items-center justify-center text-white group-hover:bg-[var(--blue-primary)] transition-all">
            <ArrowDown className="w-6 h-6" />
          </div>
        </motion.a>
      </div>

      {/* Honors Badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed right-0 top-1/2 -translate-y-1/2"
      >
        <div className="bg-teal-400 text-white px-4 py-16 writing-vertical-rl">
          <span className="font-semibold tracking-wider">EXCELLENCE</span>
        </div>
      </motion.div>
    </section>
  );
}
