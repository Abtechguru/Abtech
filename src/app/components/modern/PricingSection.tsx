import { motion } from "motion/react";
import { Clock, HeadphonesIcon, Shield, Check, Star, Zap, HelpCircle } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function PricingSection() {
  const { services, isLoading } = useData();

  const afterServices = [
    {
      icon: HeadphonesIcon,
      title: "Content Autonomy",
      description: "Take full control with an integrated CMS. Includes strategic training on scaling your digital assets.",
      badge: "Integrated"
    },
    {
      icon: Shield,
      title: "Strategic Retainers",
      description: "Dedicated monthly support for performance auditing, security hardening, and technical updates.",
      badge: "Available"
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 md:px-12 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
            >
                <span className="px-4 py-2 rounded-full bg-[var(--blue-primary)]/5 text-[var(--blue-primary)] text-[10px] font-black uppercase tracking-widest mb-6 inline-block border border-[var(--blue-primary)]/10">
                    Service Pricing
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-[var(--blue-dark)] tracking-tighter leading-[0.9] mb-8">
                    Choose Your <br />
                    <span className="text-[var(--blue-primary)] uppercase italic">Plan</span>
                </h2>
                <p className="text-xl text-[var(--muted-foreground)] font-medium">
                    Scalable solutions tailored to your technical complexity. Select a starting point or request a bespoke architectural audit.
                </p>
            </motion.div>

            <div className="hidden md:flex flex-col items-end gap-3 text-right">
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200" />
                    ))}
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)] max-w-[200px]">
                    Trusted by venture-backed startups and institutions
                </p>
            </div>
        </div>

        {/* Pricing Matrix */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-[40px] bg-white animate-pulse border border-[var(--border)]" />
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative p-10 rounded-[40px] bg-white border border-[var(--border)] hover:border-[var(--blue-primary)] hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden flex flex-col ${index === 1 ? 'lg:scale-105 z-10 border-[var(--blue-primary)] shadow-2xl shadow-blue-900/10' : ''}`}
                >
                  {index === 1 && (
                      <div className="absolute top-0 right-0 p-5">
                          <span className="px-4 py-1.5 bg-[var(--blue-primary)] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                              Popular Choice
                          </span>
                      </div>
                  )}

                  <div className="mb-10">
                    <h3 className="text-2xl font-black text-[var(--blue-dark)] uppercase italic tracking-tighter mb-4">{service.title}</h3>
                    <p className="text-sm font-bold text-[var(--muted-foreground)] mb-8 leading-relaxed opacity-70 italic">{service.description}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xs font-black text-[var(--muted-foreground)] uppercase tracking-widest">Starting at</span>
                        <div className="text-4xl font-black text-[var(--blue-primary)]">{service.price}</div>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-[var(--border)] mb-10" />

                  <ul className="space-y-6 flex-1 mb-10">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-sm font-bold text-[var(--blue-dark)] group-hover:translate-x-1 transition-transform">
                        <div className="mt-1 w-5 h-5 rounded-full bg-[var(--blue-primary)]/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-[var(--blue-primary)]" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a 
                    href="#contact"
                    className={`block w-full py-5 rounded-2xl font-black uppercase tracking-widest text-center transition-all ${index === 1 ? 'bg-[var(--blue-primary)] text-white hover:bg-[var(--blue-dark)] shadow-xl shadow-blue-900/10' : 'bg-[var(--secondary)] text-[var(--blue-dark)] hover:bg-[var(--blue-primary)] hover:text-white'}`}
                  >
                    Select Plan
                  </a>
                </motion.div>
              ))
            ) : (
                <div className="col-span-3 h-64 border-2 border-dashed border-[var(--border)] rounded-[40px] flex items-center justify-center text-[var(--muted-foreground)] font-bold italic">
                   No service frameworks defined. Contact for custom audit.
                </div>
            )}
        </div>

        {/* Post-Launch Section */}
        <div className="relative">
            <div className="flex flex-col items-center text-center mb-20">
                <h3 className="text-4xl font-black text-[var(--blue-dark)] tracking-tighter mb-4">Ecosystem Support</h3>
                <div className="w-20 h-1.5 bg-[var(--blue-primary)] rounded-full mb-8" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {afterServices.map((service, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group relative p-10 rounded-[40px] bg-white border border-[var(--border)] hover:border-[var(--blue-primary)] transition-all duration-500 overflow-hidden"
                >
                    <div className="absolute top-6 right-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--blue-primary)] opacity-40">
                            {service.badge}
                        </span>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-[var(--blue-primary)]/5 flex items-center justify-center mb-8 border border-[var(--blue-primary)]/10 group-hover:rotate-12 transition-transform duration-500">
                        <service.icon className="w-8 h-8 text-[var(--blue-primary)]" />
                    </div>

                    <h3 className="text-2xl font-black text-[var(--blue-dark)] uppercase italic tracking-tighter mb-4">{service.title}</h3>
                    <p className="text-[var(--muted-foreground)] font-medium leading-relaxed">
                        {service.description}
                    </p>
                </motion.div>
                ))}
            </div>

            {/* Support CTA Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 md:p-12 rounded-[40px] bg-[var(--blue-dark)] text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20"
            >
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                   <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter">Expert Support</h3>
                        </div>
                        <p className="text-xl text-white/70 font-medium max-w-2xl leading-relaxed">
                            Focus on your business while I handle the tech. From security to updates, you get priority support.
                        </p>
                   </div>
                   <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 mb-4">
                             {[1, 2, 3].map(i => (
                                 <div key={i} className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                             ))}
                             <span className="text-xs font-black uppercase tracking-widest text-white/50">Active Now</span>
                        </div>
                        <a 
                            href="#contact"
                            className="px-12 py-6 bg-[var(--blue-primary)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-[var(--blue-dark)] transition-all shadow-xl shadow-black/10 group/btn"
                        >
                            Request Access
                        </a>
                   </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
