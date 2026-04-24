import { motion } from "motion/react";
import { Brain, Database, Zap, ArrowRight } from "lucide-react";

export function AIEngineering() {
  const pipeline = [
    {
      icon: Database,
      title: "Data Ingestion",
      description: "Multi-source data collection and preprocessing",
      tech: ["Web Scraping", "APIs", "Document Processing"]
    },
    {
      icon: Zap,
      title: "Embedding & Vector Storage",
      description: "Transform data into high-dimensional vectors",
      tech: ["OpenAI Embeddings", "Pinecone", "OpenSearch"]
    },
    {
      icon: Brain,
      title: "Retrieval & Generation",
      description: "Context-aware LLM responses with RAG",
      tech: ["LangChain", "GPT-4", "Custom Pipelines"]
    }
  ];

  const aiProjects = [
    {
      title: "Intelligent Document QA System",
      description: "RAG-powered system for querying large document repositories",
      metrics: ["95% accuracy", "< 2s response time", "10K+ docs indexed"]
    },
    {
      title: "AI Customer Support Bot",
      description: "Context-aware chatbot with knowledge base integration",
      metrics: ["80% automation", "4.8/5 satisfaction", "24/7 availability"]
    }
  ];

  return (
    <section id="ai" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-center">
            AI <span className="text-[var(--orange)]">Engineering</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-center mb-16 max-w-2xl mx-auto">
            Building production RAG pipelines and intelligent systems
          </p>

          <div className="mb-16">
            <h3 className="text-2xl mb-8 text-center">RAG Pipeline Architecture</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {pipeline.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-[var(--orange)]" />
                    </div>
                    <h4 className="text-xl mb-2">{step.title}</h4>
                    <p className="text-[var(--muted-foreground)] mb-4">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-md bg-[var(--secondary)] text-xs border border-[var(--border)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {index < pipeline.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 w-6 h-6 items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-[var(--orange)]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl mb-8 text-center">AI Projects in Production</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {aiProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[var(--card)] to-[var(--secondary)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
                >
                  <h4 className="text-xl mb-3">{project.title}</h4>
                  <p className="text-[var(--muted-foreground)] mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)]"
                      >
                        <span className="text-[var(--orange)]">{metric}</span>
                      </div>
                    ))}
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
