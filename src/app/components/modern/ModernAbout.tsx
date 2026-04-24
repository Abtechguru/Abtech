import { motion } from "motion/react";
import { Code2, Database, Brain, Zap, Award, Briefcase, ExternalLink } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function ModernAbout() {
  const { profileData } = useData();
  const skills = [
    { icon: Code2, name: "Frontend Dev", tools: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { icon: Database, name: "Backend Dev", tools: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
    { icon: Brain, name: "AI Engineering", tools: ["LangChain", "RAG", "OpenAI", "Vector DBs"] },
    { icon: Zap, name: "DevOps", tools: ["Docker", "AWS", "CI/CD", "GitHub Actions"] }
  ];

  const stats = [
    { icon: Award, value: "3+", label: "Years Experience" },
    { icon: Briefcase, value: "50+", label: "Projects Delivered" },
    { icon: Code2, value: "10K+", label: "Active Users" }
  ];

  return (
    <section id="about" className="min-h-screen py-24 px-12 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl font-mono text-[var(--muted-foreground)]">&lt;</span>
            <h2 className="text-6xl font-bold">
              About <span className="text-[var(--blue-primary)]">Me</span>
            </h2>
            <span className="text-6xl font-mono text-[var(--muted-foreground)]">/&gt;</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 text-lg text-[var(--foreground)] leading-relaxed">
              <p>
                I'm <span className="font-bold text-[var(--blue-primary)]">{profileData.fullName}</span>, a passionate
                fullstack developer and data engineer based in <span className="font-semibold">{profileData.location}</span>.
              </p>
              <p>
                {profileData.bio}
              </p>
              <p>
                Driven by a deep passion for <span className="font-semibold text-[var(--blue-primary)]">graphic design
                and web development</span>, I specialize in harmonizing the logic of code with the aesthetics of design.
                This ensures effective intervention on all aspects of the project, without intermediaries.
              </p>
              <p>
                I also specialize in creating your <span className="font-semibold">brand image</span>: logo, banners,
                UI/UX design, and much more. From a simple idea, a unique brand identity and an exceptional
                application are created.
              </p>
            </div>

            <motion.a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[var(--blue-dark)] text-white rounded-xl hover:bg-[var(--blue-primary)] transition-all"
            >
              <span>Discover my journey (LinkedIn)</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--blue-primary)]/10 flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-[var(--blue-primary)]" />
                  </div>
                  <div className="text-3xl font-bold text-[var(--blue-primary)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold mb-8">Technical Expertise</h3>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="bg-white p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--blue-primary)] transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--blue-primary)]/10 flex items-center justify-center">
                      <skill.icon className="w-6 h-6 text-[var(--blue-primary)]" />
                    </div>
                    <h4 className="text-xl font-bold">{skill.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[var(--accent)] text-[var(--blue-primary)] text-sm rounded-lg font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
