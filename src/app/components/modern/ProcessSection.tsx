import { motion } from "motion/react";
import { MessageSquare, Lightbulb, Code, Rocket, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

export function ProcessSection() {
  const conversation = [
    {
      speaker: "client",
      message: "I need a scalable web architecture with AI integrations and sub-second performance. Can you handle it?",
      icon: "👔",
      label: "Strategic Partner"
    },
    {
      speaker: "me",
      message: "Absolutely. I architect end-to-end systems from schema design to edge deployment. We'll start with detailed mockups, build with modern tech, and scale to your traffic.",
      icon: "👨‍💻",
      label: "Lateef Abiodun"
    }
  ];

  const steps = [
    {
      id: "01",
      icon: Lightbulb,
      title: "Planning & Strategy",
      tags: ["Structure", "Analysis"],
      description: "We look into your business needs and technical goals to build a clear roadmap."
    },
    {
      id: "02",
      icon: Code,
      title: "Design & Build",
      tags: ["Development", "AI Features"],
      description: "Building the engine with clean code and adding smart features to help your business."
    },
    {
      id: "03",
      icon: Rocket,
      title: "Launch & Support",
      tags: ["Deployment", "Maintenance"],
      description: "Going live with high speed and continuous updates to ensure your business grows."
    }
  ];

  return (
    <section id="process" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Structural Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Context Side */}
            <div className="lg:col-span-5 space-y-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="px-5 py-2 rounded-full bg-[var(--blue-primary)]/5 text-[var(--blue-primary)] text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block border border-[var(--blue-primary)]/10">
                        My Process
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black text-[var(--blue-dark)] tracking-tighter mb-8 leading-[0.9]">
                        How I <br />
                        <span className="text-[var(--blue-primary)] uppercase italic">Work</span>
                    </h2>
                    <p className="text-xl text-[var(--muted-foreground)] font-medium max-w-md">
                        Transforming complex requirements into streamlined digital products through a rigorous three-phase audit and build process.
                    </p>
                </motion.div>

                {/* Mini Conversation UI */}
                <div className="space-y-4 max-w-sm">
                    {conversation.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`p-4 rounded-2xl border ${msg.speaker === 'me' ? 'bg-[var(--blue-dark)] text-white border-transparent shadow-xl' : 'bg-white border-[var(--border)] shadow-sm'}`}
                        >
                            <div className="flex items-center gap-2 mb-2 opacity-50">
                                <span className="text-xs font-black uppercase tracking-widest">{msg.label}</span>
                                <div className="h-[1px] flex-1 bg-current opacity-20" />
                            </div>
                            <p className="text-sm font-bold leading-relaxed">{msg.message}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Steps Side */}
            <div className="lg:col-span-7 space-y-6">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative p-8 md:p-10 rounded-[32px] bg-[var(--secondary)]/30 border border-[var(--border)] hover:border-[var(--blue-primary)] hover:bg-white transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute -right-4 -top-4 text-8xl font-black text-[var(--blue-primary)]/5 select-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 font-mono">
                            {step.id}
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--blue-primary)] transition-colors duration-500 shadow-sm">
                                <step.icon className="w-8 h-8 text-[var(--blue-primary)] group-hover:text-white transition-colors duration-500" />
                            </div>
                            
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {step.tags.map((tag, t) => (
                                        <span key={t} className="text-[10px] font-black uppercase tracking-widest text-[var(--blue-primary)] px-2 py-1 bg-[var(--blue-primary)]/5 rounded-lg">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-black text-[var(--blue-dark)] uppercase italic tracking-tighter">{step.title}</h3>
                                <p className="text-[var(--muted-foreground)] font-medium leading-relaxed max-w-lg">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>

        {/* Success Metrics Overlay */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 pt-12 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 gap-8"
        >
            {[
                { label: "Deployment Speed", val: "2X Faster" },
                { label: "Uptime SLA", val: "99.9%" },
                { label: "AI Accuracy", val: "95%+" },
                { label: "Support", val: "24/7 Live" }
            ].map((metric, m) => (
                <div key={m} className="text-center md:text-left">
                    <div className="text-xl font-black text-[var(--blue-dark)] mb-1">{metric.val}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">{metric.label}</div>
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
