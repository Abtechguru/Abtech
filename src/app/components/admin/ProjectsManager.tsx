import { motion } from "motion/react";
import { Plus, Edit, Trash2, Eye, Save, X, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { MediaUploader } from "./MediaUploader";
import { useData } from "../../contexts/DataContext";

interface MediaFile {
  id: string;
  type: "image" | "video" | "logo";
  url: string;
  name: string;
  size: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  media?: MediaFile[];
  logo?: string;
}

export function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject } = useData();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    category: "",
    description: "",
    features: [],
    tech: [],
    liveUrl: "",
    caseStudyUrl: "",
    media: [],
    logo: ""
  });

  const handleEdit = (project: Project) => {
    setIsEditing(project.id);
    setEditForm(project);
  };

  const handleSave = async (id: string) => {
    setIsSaving(true);
    try {
      const { error } = await updateProject(id, editForm);
      if (error) {
        alert("Error updating project: " + (error.message || error));
      } else {
        setIsEditing(null);
        setEditForm({});
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const { error } = await deleteProject(id);
      if (error) {
        alert("Error deleting project: " + (error.message || error));
      }
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title) {
      alert("Project title is required");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await addProject(newProject as Omit<Project, 'id'>);
      if (error) {
        alert("Error adding project: " + (error.message || error));
      } else {
        setShowAddForm(false);
        setNewProject({
          title: "",
          category: "",
          description: "",
          features: [],
          tech: [],
          liveUrl: "",
          caseStudyUrl: "",
          media: [],
          logo: ""
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Projects Management</h1>
          <p className="text-[var(--muted-foreground)]">Manage your portfolio projects in Supabase</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
        >
          <Plus className="w-5 h-5" /> Add Project
        </motion.button>
      </div>

      {/* Add New Project Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 rounded-2xl bg-[var(--card)] border-2 border-[var(--orange)]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl">Add New Project</h3>
            <button onClick={() => setShowAddForm(false)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="md:col-span-2 px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none min-h-24"
            />
            <input
              type="text"
              placeholder="Live URL (optional)"
              value={newProject.liveUrl}
              onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Case Study URL (optional)"
              value={newProject.caseStudyUrl}
              onChange={(e) => setNewProject({ ...newProject, caseStudyUrl: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Logo URL (optional)"
              value={newProject.logo}
              onChange={(e) => setNewProject({ ...newProject, logo: e.target.value })}
              className="md:col-span-2 px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Project Media (Images & Videos)
            </h4>
            <MediaUploader
              onFilesSelected={(files) => setNewProject({ ...newProject, media: files })}
              existingFiles={newProject.media}
            />
          </div>

          <div className="mt-4">
            <button
              onClick={handleAddProject}
              disabled={isSaving}
              className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              <span>{isSaving ? "Saving..." : "Save Project"}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
          >
            {isEditing === project.id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="md:col-span-2 px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none min-h-24"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(project.id)}
                    disabled={isSaving}
                    className="px-4 py-2 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-4 py-2 bg-[var(--secondary)] rounded-xl flex items-center gap-2 hover:bg-[var(--muted)] transition-all"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl">{project.title}</h3>
                      <span className="px-3 py-1 rounded-lg bg-[var(--orange-glow)] text-[var(--orange)] text-sm">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-[var(--muted-foreground)]">{project.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="w-10 h-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center hover:bg-[var(--muted)] transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-[var(--muted-foreground)] mb-2">Features</h4>
                    <div className="space-y-1">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 rounded-full bg-[var(--orange)]" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-[var(--muted-foreground)] mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-md bg-[var(--secondary)] text-xs border border-[var(--border)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {(project.liveUrl || project.caseStudyUrl) && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)] flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[var(--secondary)] text-sm flex items-center gap-2 hover:bg-[var(--muted)] transition-all"
                      >
                        <Eye className="w-4 h-4" /> View Live
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        className="px-4 py-2 rounded-xl bg-[var(--secondary)] text-sm flex items-center gap-2 hover:bg-[var(--muted)] transition-all"
                      >
                        Case Study
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
