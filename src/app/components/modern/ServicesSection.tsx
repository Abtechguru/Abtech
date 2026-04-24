import { motion } from "motion/react";
import { Palette, Code, Smartphone, Brain, ShoppingCart, Wrench } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: Palette,
      title: "Graphic & UX/UI Design",
      tools: ["Figma", "Adobe XD", "Illustrator", "Sketch"],
      description: "Creating beautiful, intuitive interfaces that users love"
    },
    {
      icon: Code,
      title: "Web Development",
      tools: ["React", "Next.js", "Node.js", "TypeScript", "Python", "Django"],
      description: "Building robust, scalable web applications"
    },
    {
      icon: Brain,
      title: "AI Integration",
      tools: ["OpenAI", "LangChain", "RAG", "Vector DBs"],
      description: "Implementing intelligent features powered by AI"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      tools: ["React Native", "Flutter", "iOS", "Android"],
      description: "Native and cross-platform mobile applications"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      tools: ["Shopify", "WooCommerce", "Stripe", "PayPal"],
      description: "Complete online stores with payment integration"
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      tools: ["24/7 Support", "Updates", "Backups", "Security"],
      description: "Ongoing care for your digital products"
    }
  ];

  return (
    <section className="py-24 px-12 bg-white">
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
              My <span className="text-[var(--blue-primary)]">Services</span>
            </h2>
            <span className="text-6xl font-mono text-[var(--muted-foreground)]">/&gt;</span>
          </div>
          <p className="text-xl text-[var(--muted-foreground)] ml-20">
            Full-stack expertise for your digital success
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-[var(--muted)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--blue-primary)] hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--blue-primary)]/10 group-hover:bg-[var(--blue-primary)] flex items-center justify-center mb-4 transition-all">
                <service.icon className="w-7 h-7 text-[var(--blue-primary)] group-hover:text-white transition-all" />
              </div>

              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-[var(--muted-foreground)] text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white text-xs rounded-lg border border-[var(--border)] text-[var(--foreground)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-[var(--muted-foreground)] mb-6">
            Need something specific? Let's discuss your project!
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-[var(--blue-dark)] text-white rounded-xl hover:bg-[var(--blue-primary)] transition-all font-semibold text-lg"
          >
            Get a Free Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
