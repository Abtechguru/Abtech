import { motion } from "motion/react";
import { Mail, Send, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export function ModernContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl font-mono text-[var(--muted-foreground)]">&lt;</span>
            <h2 className="text-6xl font-bold">
              Let's <span className="text-[var(--blue-primary)]">Connect</span>
            </h2>
            <span className="text-6xl font-mono text-[var(--muted-foreground)]">/&gt;</span>
          </div>
          <p className="text-xl text-[var(--muted-foreground)] ml-20">
            Have a project in mind? Let's make it happen together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
                I'm currently available for freelance work, fullstack development projects,
                and AI integration consultations.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 bg-[var(--muted)] rounded-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--blue-primary)]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[var(--blue-primary)]" />
                </div>
                <div>
                  <div className="text-sm text-[var(--muted-foreground)]">Email</div>
                  <div className="font-semibold">lateef@example.com</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 bg-[var(--muted)] rounded-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--blue-primary)]/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[var(--blue-primary)]" />
                </div>
                <div>
                  <div className="text-sm text-[var(--muted-foreground)]">Phone</div>
                  <div className="font-semibold">+234 XXX XXX XXXX</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 bg-[var(--muted)] rounded-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--blue-primary)]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[var(--blue-primary)]" />
                </div>
                <div>
                  <div className="text-sm text-[var(--muted-foreground)]">Location</div>
                  <div className="font-semibold">Lagos, Nigeria</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-[var(--muted)] border-2 border-transparent rounded-xl focus:border-[var(--blue-primary)] focus:outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-[var(--muted)] border-2 border-transparent rounded-xl focus:border-[var(--blue-primary)] focus:outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 bg-[var(--muted)] border-2 border-transparent rounded-xl focus:border-[var(--blue-primary)] focus:outline-none transition-all min-h-40 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-[var(--blue-dark)] text-white rounded-xl flex items-center justify-center gap-3 hover:bg-[var(--blue-primary)] transition-all font-semibold text-lg shadow-lg"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
