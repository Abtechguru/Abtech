import { motion } from "motion/react";
import { MessageCircle, Lightbulb, Code, Rocket, ArrowRight } from "lucide-react";

export function ProcessSection() {
  const conversation = [
    {
      speaker: "client",
      message: "I need a custom web application for my business. We need AI integration and real-time features.",
      icon: "💼"
    },
    {
      speaker: "me",
      message: "Alright, great! I'll handle everything—from system architecture and database design to frontend development and AI integration. I'll share the design mockups first. Once validated, I'll develop your application and deploy it live!",
      icon: "💻"
    },
    {
      speaker: "client",
      message: "Perfect, when do we start :)?",
      icon: "✨"
    },
    {
      speaker: "me",
      message: "Now!",
      icon: "🚀",
      highlight: true
    }
  ];

  const steps = [
    {
      icon: Lightbulb,
      title: "Discovery & Analysis",
      description: "Understanding your business needs, target audience, and technical requirements. I analyze competitors and market positioning to create the optimal solution."
    },
    {
      icon: Code,
      title: "Design & Development",
      description: "Creating beautiful UI/UX designs, then building robust, scalable systems. Full-stack development with AI integration, database optimization, and security best practices."
    },
    {
      icon: Rocket,
      title: "Deployment & Training",
      description: "Launching your application with proper hosting, monitoring, and documentation. Training sessions included so you can manage content and understand your system."
    }
  ];

  return (
    <section id="process" className="py-24 px-12 bg-[var(--muted)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl font-mono text-[var(--muted-foreground)]">09</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">
            You must be <span className="text-[var(--blue-primary)]">wondering</span>
          </h2>
          <p className="text-xl text-[var(--muted-foreground)]">...</p>
        </motion.div>

        {/* Conversation */}
        <div className="max-w-4xl mx-auto mb-20">
          {conversation.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: item.speaker === "client" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`mb-6 flex ${item.speaker === "client" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xl p-6 rounded-2xl ${
                  item.speaker === "client"
                    ? "bg-white border border-[var(--border)]"
                    : item.highlight
                    ? "bg-[var(--blue-primary)] text-white"
                    : "bg-[var(--blue-primary)]/10 border border-[var(--blue-primary)]/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <p className={`text-lg leading-relaxed ${item.highlight ? "font-semibold text-2xl" : ""}`}>
                    {item.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-2xl border border-[var(--border)] hover:border-[var(--blue-primary)] transition-all h-full">
                <div className="w-16 h-16 rounded-2xl bg-[var(--blue-primary)]/10 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-[var(--blue-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 w-8 h-8 items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-[var(--blue-primary)]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
