import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, Users, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function TeachingSection() {
  const { profileData } = useData();

  const handleGoToTeaching = () => {
    window.history.pushState({}, "", "/teaching");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const expertTags = profileData.examExpert?.split(",") || ["WAEC", "JAMB", "Further Maths", "Physics Specialist"];

  return (
    <section id="teaching" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,var(--blue-primary)/0.03_0%,transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Info & Stats */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="px-4 py-2 rounded-full bg-[var(--blue-primary)]/5 text-[var(--blue-primary)] text-xs font-black uppercase tracking-widest mb-6 inline-block">
                Expert Teacher
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-[var(--blue-dark)] tracking-tighter mb-8 italic">
                Teaching <br />
                <span className="text-[var(--blue-primary)] not-italic">Students</span>
              </h2>
              <p className="text-xl text-[var(--muted-foreground)] leading-relaxed font-medium">
                Distinguished Mathematics & Physics specialist with a proven track record of student excellence at all levels.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-[var(--secondary)]/50 border border-[var(--border)]">
                <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-[var(--blue-primary)]" />
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">ND / B.Eng</span>
                </div>
                <div className="text-2xl font-black text-[var(--blue-dark)]">Engr. Lateef</div>
              </div>
              <div className="p-6 rounded-3xl bg-[var(--secondary)]/50 border border-[var(--border)]">
                <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">Verified</span>
                </div>
                <div className="text-2xl font-black text-[var(--blue-dark)]">Top Tutor</div>
              </div>
            </div>

            {/* Teaching Badges */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[var(--border)] shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">Modality</p>
                        <p className="text-sm font-bold text-[var(--blue-dark)]">{profileData.teachingModality || "Physical Lessons Only"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[var(--border)] shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-[var(--muted-foreground)]">Curriculum</p>
                        <p className="text-sm font-bold text-[var(--blue-dark)]">{profileData.curriculum || "Nigerian & British Standards"}</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column - Main Bio & Expertise */}
          <div className="lg:col-span-12 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[40px] border border-[var(--border)] shadow-2xl relative"
            >
              <div className="prose prose-blue max-w-none mb-12">
                <h3 className="text-2xl font-black text-[var(--blue-dark)] mb-6">Teaching Philosophy</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-wrap font-medium">
                  {profileData.tutorDescription || "I am an accomplished mathematics, physics, and further mathematics teacher, eager to contribute my expertise to your child and institution. With a rich background in education, I have cultivated a dynamic teaching approach that not only imparts knowledge but also sparks curiosity and critical thinking."}
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--blue-primary)] mb-6">Expert Examination Preparation</h4>
                  <div className="flex flex-wrap gap-2">
                    {expertTags.map((tag, idx) => (
                      <span key={idx} className="px-5 py-3 rounded-2xl bg-[var(--secondary)] text-[var(--blue-dark)] text-sm font-black border border-[var(--border)] hover:border-[var(--blue-primary)] transition-colors cursor-default">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-[var(--secondary)] flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-20" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-[var(--muted-foreground)]">
                            <span className="text-[var(--blue-dark)] font-black">50+ Students</span> mentored to excellence
                        </p>
                    </div>
                    
                    <button 
                        onClick={handleGoToTeaching}
                        className="px-10 py-5 bg-[var(--blue-dark)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[var(--blue-primary)] transition-all flex items-center gap-3 shadow-xl shadow-blue-900/10 group"
                    >
                        Learn More
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    
                    {profileData.tutorLink && (
                        <a 
                            href={profileData.tutorLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-black uppercase tracking-[0.2em] text-[var(--blue-primary)] hover:underline"
                        >
                            Hire on Tuteria
                        </a>
                    )}
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
