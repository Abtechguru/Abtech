import { motion } from "motion/react";
import { Clock, HeadphonesIcon, Shield } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function PricingSection() {
  const { services, isLoading } = useData();

  const afterServices = [
    {
      icon: HeadphonesIcon,
      title: "Content Management",
      description: "You can modify the content using the provided CMS! Training hours are included to teach you how to add or update content.",
      badge: "Included"
    },
    {
      icon: Shield,
      title: "Ongoing Support",
      description: "Leave the maintenance, updates, and support to me with a monthly subscription. Focus on your business while I handle the tech.",
      badge: "Optional"
    }
  ];

  return (
    <section className="py-24 px-12">
      <div className="max-w-6xl mx-auto">
        {/* How much does it cost */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-5xl font-bold">
              How much <span className="text-[var(--blue-primary)]">does it cost</span>?
            </h2>
          </div>

          <p className="text-xl text-[var(--muted-foreground)] mb-12 leading-relaxed max-w-4xl">
            Tell me about your project, the cost will depend on complexity and time needed.
            I will then send you a detailed quote with timeline and deliverables.
          </p>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-2xl bg-gray-100 animate-pulse" />
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--blue-primary)] hover:shadow-xl transition-all"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-[var(--muted-foreground)] text-sm mb-4">{service.description}</p>
                    <div className="text-3xl font-bold text-[var(--blue-primary)]">{service.price}</div>
                  </div>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue-primary)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
            ) : (
                <p className="col-span-3 text-center text-[var(--muted-foreground)]">No services defined yet.</p>
            )}
          </div>
        </motion.div>

        {/* And after */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-12">
            And <span className="text-[var(--blue-primary)]">after</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {afterServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative bg-gradient-to-br from-[var(--blue-primary)]/5 to-transparent border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--blue-primary)] transition-all"
              >
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 bg-[var(--blue-primary)] text-white text-sm rounded-full">
                    {service.badge}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[var(--blue-primary)]/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-[var(--blue-primary)]" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-8 bg-[var(--blue-dark)] text-white rounded-2xl text-center"
          >
            <Clock className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Sleep Tight</h3>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              You can leave the support, updates, and content management to me based on a monthly subscription.
              Focus on growing your business while I keep your systems running smoothly.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
