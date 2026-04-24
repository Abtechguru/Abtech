import { motion } from "motion/react";
import { ExternalLink, ArrowRight, Play, Maximize2 } from "lucide-react";
import { useData } from "../../contexts/DataContext";
import { useState } from "react";
import { MediaGallery } from "../ui/MediaGallery";

const gradients = [
  "from-blue-500 to-purple-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-teal-500",
  "from-cyan-500 to-blue-500",
  "from-pink-500 to-rose-500"
];

export function ModernProjects() {
  const { projects, incrementProjectView } = useData();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = (project: any) => {
    setSelectedProject(project);
    setIsGalleryOpen(true);
    incrementProjectView(project.id);
  };

  return (
    <section id="projects" className="min-h-screen py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-6xl font-mono text-[var(--muted-foreground)]">&lt;</span>
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="text-[var(--blue-primary)]">Featured</span> Work
              </h2>
              <span className="text-4xl md:text-6xl font-mono text-[var(--muted-foreground)]">/&gt;</span>
            </div>
          </div>
          <p className="text-xl text-[var(--muted-foreground)] md:ml-20">
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
              <div className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all">
                {/* Image/Media */}
                <div 
                  onClick={() => openGallery(project)}
                  className="relative h-64 md:h-80 overflow-hidden bg-[var(--secondary)] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                      <Maximize2 className="w-6 h-6 text-[var(--blue-primary)]" />
                    </div>
                  </div>

                  {project.media && project.media.length > 0 ? (
                    <>
                      {project.media[0].type === "video" ? (
                        <div className="relative w-full h-full">
                          <video
                            src={project.media[0].url}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            autoPlay
                          />
                        </div>
                      ) : (
                        <img
                          src={project.media[0].url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-20`} />
                      <div className="absolute inset-0 bg-[var(--blue-primary)]/5" />
                    </>
                  )}
                  
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-[var(--blue-primary)] shadow-sm">
                      {project.category}
                    </div>
                  </div>
                  
                  {project.media && project.media.length > 1 && (
                    <div className="absolute bottom-4 right-4 z-20">
                      <div className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        +{project.media.length - 1} More Items
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-[var(--blue-primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[var(--blue-primary)]/5 text-[var(--blue-primary)] text-sm rounded-xl font-bold border border-[var(--blue-primary)]/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-4 bg-[var(--blue-dark)] text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-[var(--blue-primary)] hover:-translate-y-1 transition-all shadow-md active:scale-95"
                      >
                        <span className="font-bold">Launch Project</span>
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-4 border-2 border-[var(--border)] rounded-2xl flex items-center justify-center text-[var(--blue-dark)] hover:border-[var(--blue-primary)] hover:text-[var(--blue-primary)] hover:-translate-y-1 transition-all active:scale-95"
                      >
                        <span className="font-bold mr-2">Case Study</span>
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

      {selectedProject && (
        <MediaGallery
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          media={selectedProject.media}
        />
      )}
    </section>
  );
}
