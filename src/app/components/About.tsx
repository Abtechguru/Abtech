import { motion } from "motion/react";
import { Code2, Database, Brain, Zap } from "lucide-react";

export function About() {
  const highlights = [
    { icon: Code2, label: "3+ Years Experience" },
    { icon: Brain, label: "AI & ML Systems" },
    { icon: Database, label: "Data Engineering" },
    { icon: Zap, label: "Fullstack Development" }
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-center">
            About <span className="text-[var(--orange)]">Lateef Abiodun</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--orange)] to-[var(--orange)]/50 p-1">
                <div className="w-full h-full bg-[var(--card)] rounded-3xl flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[var(--orange)] to-[var(--orange)]/30 flex items-center justify-center">
                    <Code2 className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg text-[var(--muted-foreground)] mb-6 leading-relaxed">
                I'm a passionate <span className="text-[var(--orange)]">Fullstack Developer and Data Engineer</span> specializing
                in building intelligent, scalable systems. With expertise in AI integration, fintech platforms, and production-grade
                web applications, I transform complex business requirements into elegant technical solutions.
              </p>

              <p className="text-lg text-[var(--muted-foreground)] mb-8 leading-relaxed">
                My work spans <span className="text-[var(--orange)]">RAG pipelines, LLM integrations, vector databases</span>,
                and real-time fintech systems—combining cutting-edge AI with robust engineering practices.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
                  >
                    <item.icon className="w-8 h-8 text-[var(--orange)] mb-2" />
                    <p className="text-sm text-[var(--foreground)]">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
