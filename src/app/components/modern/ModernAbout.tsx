import { motion } from "motion/react";
import { Code2, Database, Brain, Zap, Award, Briefcase, ExternalLink, ArrowRight, Github, Linkedin, Smartphone } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function ModernAbout() {
  const { profileData, skills } = useData();

  const stats = [
    { value: profileData.yearsExperience, label: "Evolution" },
    { value: profileData.projectsDelivered, label: "Deliverables" },
    { value: profileData.activeUsers, label: "Impact" }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[#fafafa] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,var(--blue-primary)/0.03_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl"
            >
                <div className="flex items-center gap-6 mb-8">
                    <span className="text-4xl md:text-7xl font-black text-[var(--blue-dark)] opacity-10 select-none">&lt;</span>
                    <h2 className="text-4xl md:text-7xl font-black text-[var(--blue-dark)] tracking-tighter uppercase italic leading-none">
                        Self <span className="text-[var(--blue-primary)] not-italic">Identity</span>
                    </h2>
                    <span className="text-4xl md:text-7xl font-black text-[var(--blue-dark)] opacity-10 select-none">/&gt;</span>
                </div>
                <p className="text-xl md:text-3xl font-bold text-[var(--blue-dark)] leading-tight tracking-tight max-w-2xl italic opacity-80">
                    "I build high-performance digital engines that drive meaningful human experiences."
                </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
                <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center hover:bg-[var(--blue-primary)] hover:text-white transition-all shadow-sm">
                    <Github className="w-6 h-6" />
                </a>
                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center hover:bg-[var(--blue-primary)] hover:text-white transition-all shadow-sm">
                    <Linkedin className="w-6 h-6" />
                </a>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-5 space-y-12"
          >
            <div className="space-y-8">
                <div className="relative p-8 md:p-12 rounded-[40px] bg-white border border-[var(--border)] shadow-2xl shadow-blue-900/5">
                    <div className="absolute top-0 right-0 p-8">
                        <Award className="w-12 h-12 text-[var(--blue-primary)] opacity-10" />
                    </div>
                    <h3 className="text-2xl font-black text-[var(--blue-dark)] mb-6">Mission & Vision</h3>
                    <p className="text-lg text-[var(--muted-foreground)] leading-relaxed font-medium">
                        {profileData.bio || "Crafting the future through code and architectural excellence."}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-[var(--blue-dark)] text-white text-center">
                            <div className="text-2xl font-black mb-1">{stat.value}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <motion.a
                href="#contact"
                className="w-full py-6 md:py-8 bg-[var(--blue-primary)] text-white rounded-3xl font-black uppercase tracking-[0.2em] hover:bg-[var(--blue-dark)] transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-blue-900/20"
              >
                <span>Initiate Strategic Call</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Mastery Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-7 space-y-10"
          >
            <div className="flex items-center gap-4 mb-4">
                <h3 className="text-3xl font-black text-[var(--blue-dark)] tracking-tighter uppercase italic">Technical <span className="text-[var(--blue-primary)] not-italic">Mastery</span></h3>
                <div className="h-[2px] flex-1 bg-[var(--border)]" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {skills.length > 0 ? skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-8 rounded-[32px] bg-white border border-[var(--border)] hover:border-[var(--blue-primary)] hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)] flex items-center justify-center group-hover:bg-[var(--blue-primary)] group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                      <Zap className="w-7 h-7" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-[var(--blue-dark)] uppercase italic tracking-tighter">{skill.name}</h4>
                        <p className="text-[10px] font-black text-[var(--blue-primary)] uppercase tracking-widest">{skill.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-[var(--border)] group-hover:border-[var(--blue-primary)]/40 transition-all"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-2 h-32 border-2 border-dashed border-[var(--border)] rounded-3xl flex items-center justify-center text-[var(--muted-foreground)] font-bold italic">
                   No mastery stacks indexed.
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
