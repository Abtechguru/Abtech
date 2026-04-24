import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
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
    { icon: Mail, label: "Email", value: profileData.email, href: `mailto:${profileData.email}` },
    { icon: Phone, label: "Phone", value: profileData.phone, href: `tel:${profileData.phone}` },
    { icon: MapPin, label: "Location", value: profileData.location, href: "#" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await sendMessage(formData);
    
    setIsSubmitting(false);
    if (error) {
      alert("Error sending message: " + (error.message || error));
    } else {
      alert("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 md:px-12 relative overflow-hidden bg-[var(--secondary)]/30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--blue-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
                Get In <span className="text-[var(--blue-primary)]">Touch</span>
              </h2>
              <span className="text-4xl md:text-6xl font-mono text-[var(--muted-foreground)]">/&gt;</span>
            </div>
          </div>
          <p className="text-xl text-[var(--muted-foreground)] md:ml-20">
            Let's discuss your next project or collaboration
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white p-10 rounded-[32px] border border-[var(--border)] shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-[var(--blue-primary)]/10 flex items-center justify-center text-[var(--blue-primary)] mb-8">
                    <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-[var(--blue-dark)]">Contact Information</h3>
                <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="flex items-center gap-6 group hover:-translate-x-2 transition-all p-3 -m-3 rounded-2xl hover:bg-[var(--secondary)]"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[var(--secondary)] flex items-center justify-center text-[var(--blue-primary)] group-hover:bg-[var(--blue-primary)] group-hover:text-white transition-all shadow-sm">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)] mb-1">{item.label}</p>
                                <p className="text-lg font-bold text-[var(--blue-dark)]">{item.value}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="bg-[var(--blue-dark)] p-8 rounded-[32px] text-white">
                <div className="flex items-center gap-3 mb-4 text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-widest">Available for Projects</span>
                </div>
                <p className="text-blue-100/70 leading-relaxed">
                    I'm currently accepting new projects and remote collaborations. 
                    Expect a response within 24 hours.
                </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-12 rounded-[40px] border border-[var(--border)] shadow-2xl relative"
            >
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[var(--blue-dark)] ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-[var(--secondary)] border border-transparent focus:border-[var(--blue-primary)] focus:bg-white focus:outline-none transition-all placeholder:text-[var(--muted-foreground)]/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[var(--blue-dark)] ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-6 py-4 rounded-2xl bg-[var(--secondary)] border border-transparent focus:border-[var(--blue-primary)] focus:bg-white focus:outline-none transition-all placeholder:text-[var(--muted-foreground)]/50"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="block text-sm font-bold text-[var(--blue-dark)] ml-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can I help you?"
                  className="w-full px-6 py-4 rounded-2xl bg-[var(--secondary)] border border-transparent focus:border-[var(--blue-primary)] focus:bg-white focus:outline-none transition-all placeholder:text-[var(--muted-foreground)]/50"
                />
              </div>

              <div className="space-y-2 mb-10">
                <label className="block text-sm font-bold text-[var(--blue-dark)] ml-1">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 rounded-2xl bg-[var(--secondary)] border border-transparent focus:border-[var(--blue-primary)] focus:bg-white focus:outline-none transition-all resize-none placeholder:text-[var(--muted-foreground)]/50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[var(--blue-primary)] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[var(--blue-dark)] hover:-translate-y-1 transition-all shadow-xl shadow-[var(--blue-primary)]/20 active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
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
