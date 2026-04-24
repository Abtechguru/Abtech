import { motion } from "motion/react";
import { Star, Quote, User } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function TestimonialsSection() {
  const { testimonials, profileData } = useData();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--secondary)]/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--blue-primary)]/5 rounded-full text-[var(--blue-primary)] text-sm font-bold mb-4">
            <Star className="w-4 h-4 fill-[var(--blue-primary)]" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            They <span className="text-[var(--blue-primary)]">trusted me</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--blue-primary)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-[var(--border)] rounded-[32px] p-8 hover:border-[var(--blue-primary)]/30 hover:shadow-2xl transition-all relative group"
            >
              <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-[var(--blue-primary)]" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--blue-primary)] text-[var(--blue-primary)]" />
                ))}
              </div>

              <p className="text-[var(--foreground)] text-lg leading-relaxed mb-8 italic relative z-10">
                "{testimonial.feedback}"
              </p>

              <div className="flex items-center gap-4 pt-8 border-t border-[var(--border)]">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[var(--secondary)] flex-shrink-0">
                  {testimonial.clientImage ? (
                    <img src={testimonial.clientImage} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <User className="w-6 h-6 text-[var(--muted-foreground)]" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-[var(--blue-dark)]">{testimonial.clientName}</div>
                  <div className="text-sm text-[var(--muted-foreground)] font-medium">{testimonial.clientRole}</div>
                  <div className="text-xs text-[var(--blue-primary)] font-black uppercase tracking-wider">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-12 p-8 md:p-10 bg-white border border-[var(--border)] rounded-[40px] shadow-xl">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--blue-primary)] mb-1">{profileData.projectsDelivered}</div>
              <div className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">Success Projects</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--blue-primary)] mb-1">100%</div>
              <div className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">Client Smile</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--blue-primary)] mb-1">{profileData.yearsExperience}</div>
              <div className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">Career Years</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
