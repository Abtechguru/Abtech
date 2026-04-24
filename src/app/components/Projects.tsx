import { motion } from "motion/react";
import { ExternalLink, ArrowRight, Wallet, Users, Newspaper, Car } from "lucide-react";

export function Projects() {
  const projects = [
    {
      icon: Wallet,
      title: "Somietech Connect",
      category: "Fintech Platform",
      description: "Comprehensive fintech solution handling airtime, data bundles, bill payments, and wallet management with Moniepoint integration.",
      features: ["Real-time transactions", "Wallet system", "Payment gateway integration", "Admin dashboard"],
      tech: ["React", "Node.js", "PostgreSQL", "Redis", "Moniepoint API"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Intelleva",
      category: "Strategic Partnerships",
      description: "Platform connecting brands with youth communities through sponsorships, events, and strategic partnership management.",
      features: ["Event management", "Sponsorship tracking", "Community engagement", "Analytics dashboard"],
      tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Newspaper,
      title: "VeritusNews",
      category: "Media Platform",
      description: "Modern news publishing platform with community features, content management, and reader engagement tools.",
      features: ["CMS integration", "Real-time updates", "Comment system", "SEO optimization"],
      tech: ["React", "Django", "PostgreSQL", "AWS S3"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Car,
      title: "Extodus Car Hire",
      category: "Logistics Platform",
      description: "Car rental and fleet management system with booking, scheduling, and real-time vehicle tracking capabilities.",
      features: ["Booking system", "Fleet management", "Payment processing", "Location tracking"],
      tech: ["Vue.js", "Express", "MongoDB", "Stripe"],
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-center">
            Featured <span className="text-[var(--orange)]">Projects</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-center mb-16 max-w-2xl mx-auto">
            Production-grade applications serving real users and solving real business problems
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <project.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[var(--orange-glow)] text-[var(--orange)] text-sm">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl mb-3">{project.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm text-[var(--muted-foreground)] mb-2">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1 h-1 rounded-full bg-[var(--orange)]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm text-[var(--muted-foreground)] mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-md bg-[var(--secondary)] text-xs border border-[var(--border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 rounded-xl bg-[var(--orange)] text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all">
                    View Live <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-xl bg-[var(--secondary)] text-[var(--foreground)] flex items-center justify-center gap-2 hover:bg-[var(--muted)] transition-all">
                    Case Study <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
