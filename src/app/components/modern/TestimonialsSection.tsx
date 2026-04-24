import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Chen",
      role: "CEO, TechStart Inc",
      company: "SaaS Platform",
      rating: 5,
      text: "I gave Lateef complete freedom to build our entire AI-powered platform. Extremely professional and highly responsive. I am more than satisfied with the result. The RAG system he implemented transformed how our users interact with data. I highly recommend Lateef!",
      avatar: "MC"
    },
    {
      name: "Sarah Johnson",
      role: "CTO, FinanceFlow",
      company: "Fintech Startup",
      rating: 5,
      text: "Very nice professional encounter with Lateef. Even working remotely, he was always responsive and proactive. Attentive to our ideas, he perfectly created a secure fintech platform that handles thousands of transactions daily. His expertise in payment integrations is outstanding. We only have praise for his work!",
      avatar: "SJ"
    },
    {
      name: "David Rodriguez",
      role: "Founder, DataDrive",
      company: "Data Analytics",
      rating: 5,
      text: "Lateef is a developer who was attentive and delivered results on time. The quality was top-notch—his work brought fresh innovation to our data pipeline architecture. His knowledge of AI and machine learning is exceptional. I highly recommend his services.",
      avatar: "DR"
    }
  ];

  return (
    <section className="py-24 px-12 bg-[var(--muted)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            They <span className="text-[var(--blue-primary)]">trusted me</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[var(--blue-primary)] text-[var(--blue-primary)]" />
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--blue-primary)] hover:shadow-xl transition-all"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-full bg-[var(--blue-primary)]/10 flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-[var(--blue-primary)]" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--blue-primary)] text-[var(--blue-primary)]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[var(--foreground)] leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-[var(--border)]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--blue-primary)] to-[var(--purple)] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">{testimonial.role}</div>
                  <div className="text-xs text-[var(--blue-primary)]">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 p-6 bg-white border border-[var(--border)] rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--blue-primary)]">50+</div>
              <div className="text-sm text-[var(--muted-foreground)]">Projects Delivered</div>
            </div>
            <div className="w-px h-12 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--blue-primary)]">100%</div>
              <div className="text-sm text-[var(--muted-foreground)]">Client Satisfaction</div>
            </div>
            <div className="w-px h-12 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--blue-primary)]">3+</div>
              <div className="text-sm text-[var(--muted-foreground)]">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
