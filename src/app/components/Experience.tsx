import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      role: "Lead Developer",
      company: "Caremandate",
      period: "2023 - Present",
      type: "Full-time",
      contributions: [
        "Architected and deployed scalable healthcare management system",
        "Implemented AI-powered features using RAG and LLM integrations",
        "Led team of 4 developers using Agile methodologies",
        "Reduced system response time by 60% through optimization"
      ],
      impact: "Serving 10,000+ active users with 99.9% uptime"
    },
    {
      role: "Software Developer",
      company: "MavenCode",
      period: "2021 - 2023",
      type: "Full-time",
      contributions: [
        "Developed production fintech applications handling real transactions",
        "Built RESTful APIs and integrated third-party payment gateways",
        "Implemented comprehensive testing and CI/CD pipelines",
        "Mentored junior developers and conducted code reviews"
      ],
      impact: "Processed over $500K in transactions monthly"
    },
    {
      role: "Technical Instructor",
      company: "Various Bootcamps",
      period: "2020 - Present",
      type: "Part-time",
      contributions: [
        "Teaching fullstack development and data engineering",
        "Developed curriculum for modern web development",
        "Mentored 100+ students in career transition",
        "Created project-based learning materials"
      ],
      impact: "85% student placement rate in tech roles"
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-[var(--secondary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-center">
            Professional <span className="text-[var(--orange)]">Journey</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-center mb-16 max-w-2xl mx-auto">
            Building impactful solutions and empowering teams across multiple domains
          </p>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--border)] hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute left-8 top-8 w-4 h-4 rounded-full bg-[var(--orange)] border-4 border-[var(--background)] hidden md:block" />

                  <div className="md:ml-20 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-[var(--orange)]" />
                        </div>
                        <div>
                          <h3 className="text-xl">{exp.role}</h3>
                          <p className="text-[var(--muted-foreground)]">{exp.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[var(--orange)]">{exp.period}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{exp.type}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {exp.contributions.map((contribution, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange)] mt-2 flex-shrink-0" />
                          <p className="text-[var(--foreground)]">{contribution}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[var(--border)]">
                      <p className="text-sm">
                        <span className="text-[var(--muted-foreground)]">Impact: </span>
                        <span className="text-[var(--orange)]">{exp.impact}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
