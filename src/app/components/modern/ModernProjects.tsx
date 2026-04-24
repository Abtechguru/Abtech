import { motion } from "motion/react";
import { ExternalLink, ArrowRight, Play } from "lucide-react";
import { useData } from "../../contexts/DataContext";

const gradients = [
  "from-blue-500 to-purple-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-teal-500",
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-rose-500"
];

export function ModernProjects() {
  const { projects } = useData();

  return (
    <section id="projects" className="min-h-screen py-24 px-12">
      <div className="max-w-7xl mx-auto">
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
              <span className="text-[var(--blue-primary)]">Featured</span> Work
            </h2>
            <span className="text-6xl font-mono text-[var(--muted-foreground)]">/&gt;</span>
          </div>
          <p className="text-xl text-[var(--muted-foreground)] ml-20">
            Production-grade applications serving real users
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              {/* Project Card */}
              <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-2xl transition-all">
                {/* Image/Media */}
                <div className="relative h-64 overflow-hidden bg-[var(--secondary)]">
                  {project.media && project.media.length > 0 ? (
                    <>
                      {project.media[0].type === "video" ? (
                        <div className="relative w-full h-full group">
                          <video
                            src={project.media[0].url}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="w-8 h-8 text-[var(--blue-primary)] ml-1" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={project.media[0].url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-20`} />
                      <div className="absolute inset-0 bg-[var(--blue-primary)]/5" />
                    </>
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                  </div>
                  {project.media && project.media.length > 1 && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <div className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs">
                        +{project.media.length - 1} more
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--blue-primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[var(--accent)] text-[var(--blue-primary)] text-sm rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-3 bg-[var(--blue-dark)] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--blue-primary)] transition-all"
                      >
                        <span>View Live</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 border-2 border-[var(--border)] rounded-xl hover:border-[var(--blue-primary)] hover:text-[var(--blue-primary)] transition-all"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
