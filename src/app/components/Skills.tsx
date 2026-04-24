import { motion } from "motion/react";
import { Code2, Server, Brain, Database, Cloud } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"]
    },
    {
      icon: Server,
      title: "Backend",
      skills: ["Node.js", "Python", "Django", "Express", "FastAPI"]
    },
    {
      icon: Brain,
      title: "AI / ML",
      skills: ["LangChain", "OpenAI", "RAG Systems", "Vector DBs", "LLM Integration"]
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Pinecone", "OpenSearch"]
    },
    {
      icon: Cloud,
      title: "DevOps",
      skills: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Vercel"]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-[var(--secondary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-center">
            Technical <span className="text-[var(--orange)]">Expertise</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-center mb-16 max-w-2xl mx-auto">
            A comprehensive tech stack built through real-world production experience
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-[var(--orange)]" />
                  </div>
                  <h3 className="text-xl">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[var(--secondary)] text-sm text-[var(--foreground)] border border-[var(--border)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
