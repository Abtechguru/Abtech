import { motion } from "motion/react";
import { Star, Quote, User, ArrowRight, Check } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function TestimonialsSection() {
  const { testimonials, profileData } = useData();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,var(--blue-primary)/0.02_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--blue-primary)]/5 border border-[var(--blue-primary)]/10 rounded-full text-[var(--blue-primary)] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                    <Star className="w-4 h-4 fill-[var(--blue-primary)]" />
                    <span>User Testimonials</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-[var(--blue-dark)] tracking-tighter leading-[0.9] mb-8 uppercase italic">
                    Client <br />
                    <span className="text-[var(--blue-primary)] not-italic">Reviews</span>
                </h2>
                <p className="text-xl text-[var(--muted-foreground)] font-medium">
                    Verified feedback from partners, founders, and students who have experienced the standard of excellence.
                </p>
            </motion.div>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-10 rounded-[40px] bg-white border border-[var(--border)] hover:border-[var(--blue-primary)] hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-10 right-10">
                <Quote className="w-12 h-12 text-[var(--blue-primary)] opacity-5 group-hover:opacity-10 transition-opacity rotate-12" />
              </div>

              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[var(--blue-primary)] text-[var(--blue-primary)]" />
                ))}
              </div>

              <blockquote className="text-[var(--blue-dark)] text-lg font-bold leading-relaxed mb-10 italic relative z-10 opacity-90">
                "{testimonial.feedback}"
              </blockquote>

              <div className="flex items-center gap-5 pt-8 border-t border-[var(--border)] mt-auto">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[var(--secondary)] border border-[var(--border)] flex-shrink-0 group-hover:rotate-3 transition-transform duration-500">
                  {testimonial.clientImage ? (
                    <img src={testimonial.clientImage} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <User className="w-7 h-7 text-[var(--muted-foreground)]" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-black text-[var(--blue-dark)] text-lg leading-tight mb-1">{testimonial.clientName}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--blue-primary)]">{testimonial.clientRole}</p>
                  <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Impact Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-32 p-12 md:p-20 bg-[var(--blue-dark)] rounded-[64px] text-white relative overflow-hidden group shadow-3xl shadow-blue-900/40"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--blue-primary)/0.2_0%,transparent_100%)] opacity-30 pointer-events-none" />
          
          <div className="relative z-10 grid md:grid-cols-3 gap-16 md:gap-4 items-center">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter tabular-nums">{profileData.projectsDelivered}</div>
              <div className="text-sm font-black uppercase tracking-[0.4em] text-white/40">Projects Shipped</div>
            </div>
            
            <div className="hidden md:block w-px h-32 bg-white/10 mx-auto" />
            
            <div className="text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[var(--blue-primary)] flex items-center justify-center mb-8 shadow-2xl shadow-blue-900/50 group-hover:scale-110 transition-transform duration-700">
                    <Check className="w-10 h-10 text-white" />
                </div>
                <div className="text-2xl font-black uppercase tracking-[0.2em] italic mb-2">99% Retention</div>
                <p className="text-sm font-medium text-white/50">Industry Leading Partnership Lifetime</p>
            </div>

            <div className="hidden md:block w-px h-32 bg-white/10 mx-auto" />

            <div className="text-center">
              <div className="text-6xl md:text-8xl font-black text-[var(--blue-primary)] mb-4 tracking-tighter tabular-nums">{profileData.yearsExperience}</div>
              <div className="text-sm font-black uppercase tracking-[0.4em] text-white/40">Career Maturity</div>
            </div>
          </div>
          
          <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <p className="text-lg font-bold text-white/60">Ready to join the standard of excellence?</p>
              <a 
                href="#contact"
                className="px-12 py-6 bg-white text-[var(--blue-dark)] rounded-2xl font-black uppercase tracking-widest hover:bg-[var(--blue-primary)] hover:text-white transition-all shadow-xl group/btn"
              >
                Inaugurate Project
              </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
