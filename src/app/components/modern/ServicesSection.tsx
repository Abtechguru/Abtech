import { motion } from "motion/react";
import { Palette, Code, Smartphone, Brain, ShoppingCart, Wrench, ArrowRight } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: Palette,
      title: "UX/UI & Art Direction",
      tools: ["Figma", "Adobe Suite", "Prototyping"],
      description: "Crafting digital experiences that prioritize user psychology and aesthetic excellence."
    },
    {
      icon: Code,
      title: "Fullstack Engineering",
      tools: ["React", "Next.js", "TypeScript", "Node.js"],
      description: "Building resilient, type-safe web systems designed for high-concurrency and speed."
    },
    {
      icon: Brain,
      title: "AI & Data Architecture",
      tools: ["OpenAI", "Vector DBs", "RAG Systems"],
      description: "Integrating intelligent LLMs and automation to supercharge business productivity."
    },
    {
      icon: Smartphone,
      title: "Mobile App Strategy",
      tools: ["React Native", "Flutter", "App Store"],
      description: "Developing cross-platform mobile solutions with native performance and feel."
    },
    {
      icon: ShoppingCart,
      title: "Scale E-commerce",
      tools: ["Custom Stores", "Stripe", "Checkout"],
      description: "Optimizing conversion funnels and payment flows for maximum revenue generation."
    },
    {
      icon: Wrench,
      title: "DevOps & Cloud",
      tools: ["Vercel", "AWS", "CI/CD", "Security"],
      description: "Ensuring 99.9% uptime with automated deployments and robust cloud security."
    }
  ];

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,var(--blue-primary)/0.02_0%,transparent_20%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-6 mb-6">
            <span className="text-4xl md:text-7xl font-black opacity-10 select-none">&lt;</span>
            <h2 className="text-4xl md:text-7xl font-black text-[var(--blue-dark)] tracking-tighter">
              Professional <span className="text-[var(--blue-primary)] uppercase italic">Services</span>
            </h2>
            <span className="text-4xl md:text-7xl font-black opacity-10 select-none">/&gt;</span>
          </div>
          <p className="text-xl md:text-2xl text-[var(--muted-foreground)] max-w-3xl font-medium">
             Engineering bespoke digital solutions with a focus on performance, scalability, and user-centric design.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-[32px] bg-[var(--secondary)]/30 border border-[var(--border)] hover:border-[var(--blue-primary)] hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--border)] group-hover:bg-[var(--blue-primary)] group-hover:border-[var(--blue-primary)] flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-6">
                <service.icon className="w-8 h-8 text-[var(--blue-primary)] group-hover:text-white transition-all duration-500" />
              </div>

              <h3 className="text-2xl font-black text-[var(--blue-dark)] mb-4">{service.title}</h3>
              <p className="text-[var(--muted-foreground)] font-medium mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {service.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-[var(--border)] text-[var(--blue-dark)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-bold text-[var(--blue-primary)]">Learn more</span>
                  <ArrowRight className="w-5 h-5 text-[var(--blue-primary)]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 rounded-[40px] bg-[var(--blue-primary)] text-white text-center shadow-2xl shadow-blue-900/20 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
          <h3 className="text-3xl md:text-4xl font-black mb-4 relative z-10">Starting a new project?</h3>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto relative z-10 font-bold">
            Let's collaborate to build something exceptional. No project is too small for world-class quality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <a
                href="#contact"
                className="px-10 py-5 bg-white text-[var(--blue-primary)] rounded-2xl font-black uppercase tracking-widest hover:bg-[var(--blue-dark)] hover:text-white transition-all shadow-xl shadow-black/10"
              >
                Get a Free Quote
              </a>
              <a
                href="#projects"
                className="px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                View Process
              </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
