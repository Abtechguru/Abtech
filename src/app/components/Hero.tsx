import { motion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--orange-glow)] via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--orange)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--orange)] opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)]">
            <span className="text-[var(--muted-foreground)]">AI-Powered Fullstack Developer</span>
          </div>

          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-white to-[var(--orange)] bg-clip-text text-transparent">
            Building Intelligent, Scalable<br />Web Systems with AI & Data
          </h1>

          <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-12">
            Fullstack Engineer & Data Specialist crafting production-grade AI systems, fintech platforms,
            and scalable web applications. Based in Lagos, Nigeria.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded-xl flex items-center gap-2 hover:border-[var(--orange)] transition-all"
            >
              Contact Me <Mail className="w-4 h-4" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[var(--secondary)] text-[var(--foreground)] rounded-xl flex items-center gap-2 hover:bg-[var(--muted)] transition-all"
            >
              Download CV <Download className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
