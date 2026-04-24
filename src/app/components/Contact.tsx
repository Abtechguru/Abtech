import { motion } from "motion/react";
import { Mail, Github, Linkedin, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com", username: "@lateefabiodun" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", username: "Lateef Abiodun" },
    { icon: Mail, label: "Email", href: "mailto:lateef@example.com", username: "lateef@example.com" },
    { icon: MessageSquare, label: "WhatsApp", href: "https://wa.me", username: "+234 XXX XXX XXXX" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[var(--secondary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-center">
            Let's <span className="text-[var(--orange)]">Connect</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-center mb-16 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Reach out!
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-6">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none transition-all min-h-32 resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-[var(--orange)] text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
                >
                  Send Message <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>

            <div>
              <h3 className="text-2xl mb-6">Connect on Social</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center flex-shrink-0">
                      <link.icon className="w-6 h-6 text-[var(--orange)]" />
                    </div>
                    <div>
                      <h4>{link.label}</h4>
                      <p className="text-sm text-[var(--muted-foreground)]">{link.username}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[var(--orange)]/10 to-transparent border border-[var(--orange)]/20">
                <h4 className="text-lg mb-2">Open to Opportunities</h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Currently available for fullstack development, AI integration projects,
                  and technical consulting opportunities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
