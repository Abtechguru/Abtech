import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, Zap, Globe, Clock } from "lucide-react";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";

export function ModernContact() {
  const { profileData, sendMessage } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactInfo = [
    { icon: Mail, label: "Official Email", value: profileData.email, href: `mailto:${profileData.email}` },
    { icon: Phone, label: "Direct Line", value: profileData.phone, href: `tel:${profileData.phone}` },
    { icon: MapPin, label: "HQ Location", value: profileData.location, href: "#" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await sendMessage(formData);
    setIsSubmitting(false);
    if (error) {
      alert("Transmission error: " + (error.message || error));
    } else {
      alert("Inquiry successfully dispatched. Expect a response shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--secondary)]/30 to-transparent pointer-events-none" />
        <div className="absolute -right-64 top-0 w-[1000px] h-[1000px] bg-[var(--blue-primary)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="mb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center gap-6 mb-8 text-[var(--blue-dark)]">
                    <span className="text-4xl md:text-7xl font-black opacity-10 select-none">&lt;</span>
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic">
                        Send <span className="text-[var(--blue-primary)] not-italic">a Message</span>
                    </h2>
                    <span className="text-4xl md:text-7xl font-black opacity-10 select-none">/&gt;</span>
                </div>
                <p className="text-xl md:text-2xl text-[var(--muted-foreground)] font-medium max-w-2xl md:ml-24">
                    Ready to modernize your infrastructure? Let's discuss your architectural requirements and project timelines.
                </p>
            </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-5 space-y-10"
          >
            <div className="relative p-10 rounded-[40px] bg-white border border-[var(--border)] shadow-2xl shadow-blue-900/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--blue-primary)]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-black text-[var(--blue-dark)] mb-10 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-[var(--blue-primary)]" />
                    Global Reach
                </h3>
                <div className="space-y-8">
                    {contactInfo.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="flex items-center gap-6 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)] flex items-center justify-center text-[var(--blue-dark)] group-hover:bg-[var(--blue-primary)] group-hover:text-white transition-all duration-500 shadow-sm group-hover:rotate-6">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] mb-1 opacity-60">{item.label}</p>
                                <p className="text-lg font-black text-[var(--blue-dark)] group-hover:text-[var(--blue-primary)] transition-colors">{item.value}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="p-8 rounded-[32px] bg-[var(--blue-dark)] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Zap className="w-16 h-16" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Response Integrity: 100%</span>
                </div>
                <h4 className="text-xl font-black mb-4 uppercase italic">Active Availability</h4>
                <p className="text-white/60 font-medium leading-relaxed">
                    Professional response guaranteed within 12 standard business hours. 
                </p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                    <Clock className="w-4 h-4" />
                    Current Status: Accepting Engagements
                </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="relative p-8 md:p-14 rounded-[48px] bg-white border border-[var(--border)] shadow-3xl shadow-blue-900/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--blue-primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] ml-1">Identity</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name / Brand"
                    className="w-full px-8 py-5 rounded-[24px] bg-[var(--secondary)]/50 border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white focus:outline-none transition-all font-bold text-[var(--blue-dark)]"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] ml-1">Digital Mail</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@nexus.com"
                    className="w-full px-8 py-5 rounded-[24px] bg-[var(--secondary)]/50 border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white focus:outline-none transition-all font-bold text-[var(--blue-dark)]"
                  />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] ml-1">Engagement Topic</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Fintech MVP Architecture"
                  className="w-full px-8 py-5 rounded-[24px] bg-[var(--secondary)]/50 border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white focus:outline-none transition-all font-bold text-[var(--blue-dark)]"
                />
              </div>

              <div className="space-y-3 mb-12">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] ml-1">Briefing</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your requirements..."
                  className="w-full px-8 py-5 rounded-[32px] bg-[var(--secondary)]/50 border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white focus:outline-none transition-all font-medium text-[var(--blue-dark)] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-20 bg-[var(--blue-primary)] text-white rounded-[32px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[var(--blue-dark)] hover:-translate-y-1 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 disabled:opacity-70 group"
              >
                {isSubmitting ? (
                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <span>Send Message</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                    </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
