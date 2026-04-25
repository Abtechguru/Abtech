import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, Users, MapPin, CheckCircle2, ArrowLeft, ArrowUpRight, MessageCircle, Star, Quote, Code, Globe, Laptop } from "lucide-react";
import { useData } from "../../contexts/DataContext";
import { Helmet } from "react-helmet-async";

export function ModernTeaching() {
  const { profileData, teachingMedia } = useData();

  const handleBack = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const expertTags = profileData.examExpert?.split(",") || ["WAEC", "JAMB", "Further Maths", "IT & Web Development", "STEM Coaching"];
  
  const hasTeachingMedia = teachingMedia && teachingMedia.length > 0;

  const sampleTestimonials = [
    { name: "Mrs. Adebayo", role: "Parent", text: "Exceptional improvement in my son's physics grades within 3 months." },
    { name: "John D.", role: "Student", text: "Math became my favorite subject thanks to Lateef's teaching style." }
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-[var(--blue-primary)] selection:text-white">
      <Helmet>
        <title>Expert Educator | {profileData.fullName}</title>
        <meta name="description" content="Professional Mathematics and Physics tutoring by Engr. Lateef." />
      </Helmet>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 font-black uppercase tracking-widest text-[var(--blue-dark)] hover:text-[var(--blue-primary)] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Engineering
          </button>
          <div className="hidden md:flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[var(--blue-primary)] flex items-center justify-center text-white font-bold">
                {profileData.fullName.charAt(0)}
             </div>
             <span className="font-black uppercase tracking-tighter text-[var(--blue-dark)]">{profileData.fullName}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-[var(--secondary)]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--blue-primary)]/10 text-[var(--blue-primary)] rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <GraduationCap className="w-4 h-4" />
                Specialist Educator
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-[var(--blue-dark)] tracking-tighter leading-[0.9] mb-8 uppercase italic">
                Shaping <br />
                <span className="text-[var(--blue-primary)] not-italic underline decoration-4 underline-offset-8">Brilliant</span> <br />
                Minds
              </h1>
              <p className="text-xl text-[var(--muted-foreground)] font-medium max-w-lg mb-10 leading-relaxed">
                Expert Mathematics, Physics, and Further Mathematics specialist dedicated to fostering critical thinking and academic excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={profileData.calendlyLink || profileData.tutorLink || "#contact"} 
                  target="_blank"
                  className="px-8 py-5 bg-[var(--blue-dark)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[var(--blue-primary)] transition-all shadow-xl shadow-blue-900/20"
                >
                  Book a Session
                </a>
                <button className="px-8 py-5 bg-white border border-[var(--border)] text-[var(--blue-dark)] rounded-2xl font-black uppercase tracking-widest hover:bg-[var(--secondary)] transition-all">
                  View Success Stories
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue-primary)] to-indigo-600 rounded-[60px] opacity-10 blur-3xl animate-pulse" />
              <div className="relative h-full w-full bg-white rounded-[60px] border border-[var(--border)] shadow-2xl flex items-center justify-center overflow-hidden group">
                 <div className="bg-[var(--secondary)]/30 w-full h-full flex flex-col items-center justify-center p-12 text-center">
                    <GraduationCap className="w-24 h-24 text-[var(--blue-primary)] mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-3xl font-black text-[var(--blue-dark)] mb-2">Academic Mastery</h3>
                    <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-widest text-xs">Curriculum Specialist</p>
                 </div>
                 {/* Visual Metric */}
                 <div className="absolute bottom-8 right-8 p-6 bg-white rounded-3xl border border-[var(--border)] shadow-xl">
                    <div className="text-4xl font-black text-[var(--blue-primary)] tracking-tighter">98%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)]">Success Rate</div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-black text-[var(--blue-dark)] tracking-tighter uppercase mb-4">Core Curriculum</h2>
                <div className="w-24 h-2 bg-[var(--blue-primary)] mx-auto rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: BookOpen, title: "Pure Science", tags: ["Maths", "Physics", "FE"] },
                    { icon: Code, title: "Web Dev", tags: ["HTML/CSS", "JavaScript", "React"] },
                    { icon: Laptop, title: "IT Literacy", tags: ["Computer Sci", "Coding for Kids"] },
                    { icon: Star, title: "Exam Prep", tags: ["WAEC", "JAMB", "Cambridge"] }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="p-8 rounded-3xl bg-white border border-[var(--border)] hover:border-[var(--blue-primary)] transition-all shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[var(--blue-primary)]/10 flex items-center justify-center text-[var(--blue-primary)] mb-6">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-[var(--blue-dark)] mb-4">{item.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map(t => (
                                <span key={t} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-[var(--secondary)]/50 rounded-lg">{t}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* Classroom Gallery */}
      {hasTeachingMedia && (
        <section className="py-24 px-6 bg-[var(--secondary)]/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-[var(--blue-dark)] tracking-tighter uppercase mb-4">The Classroom In Action</h2>
                        <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-widest text-xs opacity-60">Visual evidence of effective learning sessions</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-12 h-1 bg-[var(--blue-primary)] rounded-full" />
                        <div className="w-4 h-1 bg-[var(--blue-primary)]/20 rounded-full" />
                    </div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {teachingMedia.map((m: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group rounded-3xl overflow-hidden cursor-zoom-in shadow-xl"
                        >
                            {m.type === 'video' ? (
                                <video src={m.url} className="w-full h-auto object-cover" controls />
                            ) : (
                                <img src={m.url} alt={m.name} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                                <p className="text-white text-xs font-black uppercase tracking-widest">{m.name || "Teaching Session"}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* Expertise Grid */}
      <section className="py-24 px-6 bg-[var(--blue-dark)] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_20%_30%,white_0%,transparent_30%)]" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12 uppercase italic">
                    Certified <br />
                    <span className="text-[var(--blue-primary)] not-italic">Competence</span>
                </h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                            <Award className="w-6 h-6 text-yellow-400" />
                        </div>
                        <p className="text-xl font-bold uppercase tracking-tight">Electrical & Electronics Engineering (B.Eng)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                            <Award className="w-6 h-6 text-yellow-400" />
                        </div>
                        <p className="text-xl font-bold uppercase tracking-tight">Agricultural & Bio-Env. Engineering (ND)</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white/5 p-12 rounded-[50px] border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-black mb-8 uppercase tracking-widest text-[var(--blue-primary)]">Exam Excellence Areas</h3>
                <div className="flex flex-wrap gap-3">
                    {expertTags.map((tag, idx) => (
                        <span key={idx} className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-[var(--blue-primary)] transition-colors font-black text-sm uppercase tracking-widest cursor-default">
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black text-[var(--blue-dark)] tracking-tighter uppercase mb-6 leading-none italic">Voices of <br /><span className="text-[var(--blue-primary)] not-italic">Success</span></h2>
                    <p className="text-xl text-[var(--muted-foreground)] font-medium mb-12">I've mentored over 50+ students across Nigeria and internationally, achieving consistent excellence in STEM subjects.</p>
                    
                    <div className="space-y-8">
                        {sampleTestimonials.map((t, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-[var(--secondary)]/30 border border-[var(--border)] relative">
                                <Quote className="absolute top-6 right-6 w-10 h-10 text-[var(--blue-primary)]/10" />
                                <p className="text-lg font-medium italic mb-6 text-[var(--blue-dark)]">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20" />
                                    <div>
                                        <p className="font-black text-sm text-[var(--blue-dark)] uppercase tracking-widest">{t.name}</p>
                                        <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-tighter">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col justify-center">
                    <div className="p-12 rounded-[60px] bg-[var(--blue-primary)] text-white text-center">
                        <MessageCircle className="w-16 h-16 mx-auto mb-8 text-white/50" />
                        <h3 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">Ready to Start?</h3>
                        <p className="text-lg font-bold text-white/80 mb-10 max-w-sm mx-auto">Book a free consultation to discuss your child's academic goals and current challenges.</p>
                        <a 
                            href={profileData.calendlyLink || profileData.tutorLink || "#contact"} 
                            target="_blank"
                            className="inline-block px-12 py-6 bg-white text-[var(--blue-dark)] rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform"
                        >
                            Hire Engr. Lateef
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border)] px-6 text-center">
        <p className="text-[var(--muted-foreground)] font-black uppercase tracking-widest text-xs">
          © 2026 Academic Excellence Protocol | Excellence through precision.
        </p>
      </footer>
    </div>
  );
}
