import { motion } from "motion/react";
import { Code2, Database, Brain, Zap, Award, Briefcase, ExternalLink } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function ModernAbout() {
  const { profileData, skills, experience } = useData();

  const iconMap: Record<string, any> = {
    Code2, Database, Brain, Zap, Award, Briefcase
  };

  const stats = [
    { icon: Award, value: profileData.yearsExperience, label: "Years Experience" },
    { icon: Briefcase, value: profileData.projectsDelivered, label: "Projects Delivered" },
    { icon: Code2, value: profileData.activeUsers, label: "Active Users" }
  ];

  return (
    <section id="about" className="min-h-screen py-24 px-6 md:px-12 bg-white selection:bg-[var(--blue-primary)] selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-6xl font-mono text-[var(--muted-foreground)]">&lt;</span>
              <h2 className="text-4xl md:text-6xl font-bold">
                About <span className="text-[var(--blue-primary)]">Me</span>
              </h2>
              <span className="text-4xl md:text-6xl font-mono text-[var(--muted-foreground)]">/&gt;</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 text-lg text-[var(--foreground)] leading-relaxed">
              <p className="text-xl">
                I'm <span className="font-bold text-[var(--blue-primary)]">{profileData.fullName}</span>, a passionate
                professional based in <span className="font-semibold">{profileData.location}</span>.
              </p>
              <p className="text-[var(--muted-foreground)]">
                {profileData.bio || "Bringing ideas to life through code and design."}
              </p>
            </div>

            <motion.a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-[var(--blue-dark)] text-white rounded-2xl font-bold hover:bg-[var(--blue-primary)] transition-all shadow-lg"
              >
                <span>Full Journey on LinkedIn</span>
                <ExternalLink className="w-5 h-5" />
              </motion.a>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-3xl bg-[var(--secondary)]/50 border border-[var(--border)] group hover:border-[var(--blue-primary)] transition-all"
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[var(--blue-primary)] group-hover:text-white transition-all">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-[var(--blue-dark)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-[var(--muted-foreground)]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
                <h3 className="text-3xl font-bold mb-8 relative z-10">Technical Mastery</h3>
            </div>

            <div className="grid gap-6">
              {skills.length > 0 ? skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-3xl border border-[var(--border)] hover:shadow-xl hover:border-[var(--blue-primary)]/30 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--blue-primary)]/5 flex items-center justify-center group-hover:bg-[var(--blue-primary)] group-hover:text-white transition-all">
                      <Code2 className="w-7 h-7" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-[var(--blue-dark)]">{skill.name}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] font-bold uppercase tracking-wider">{skill.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[var(--secondary)] text-[var(--blue-dark)] text-sm rounded-xl font-bold border border-[var(--border)] group-hover:border-[var(--blue-primary)]/20 transition-all"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )) : (
                <p className="text-[var(--muted-foreground)]">No skills added yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
