import { motion } from "motion/react";
import { Plus, Edit, Trash2, Eye, Save, X, Image as ImageIcon, Play } from "lucide-react";
import { useState } from "react";
import { MediaUploader } from "./MediaUploader";
import { useData } from "../../contexts/DataContext";

interface MediaFile {
  id: string;
  type: "image" | "video" | "logo";
  url: string;
  name: string;
  size?: string;
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
          className="px-6 py-3 bg-[var(--blue-primary)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" /> Add Project
        </motion.button>
      </div>

      {/* Add New Project Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-8 rounded-3xl bg-white border-2 border-[var(--blue-primary)] shadow-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Add New Project</h3>
            <button onClick={() => setShowAddForm(false)} className="w-10 h-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-red-500 transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g. Fintech Mobile App"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Web Development"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea
                placeholder="Brief project description..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none min-h-[120px] transition-all"
              />
            </div>

            <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Live URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Case Study URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newProject.caseStudyUrl}
                  onChange={(e) => setNewProject({ ...newProject, caseStudyUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[var(--blue-primary)]" /> Media Assets (Images & Videos)
            </h4>
            <div className="p-4 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--secondary)]/50">
              <MediaUploader
                onFilesSelected={(files) => setNewProject({ ...newProject, media: files })}
                existingFiles={newProject.media}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-[var(--border)]">
             <button
              onClick={() => setShowAddForm(false)}
              className="px-8 py-3 rounded-xl font-bold bg-[var(--secondary)] hover:bg-[var(--muted)] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProject}
              disabled={isSaving}
              className="px-8 py-3 bg-[var(--blue-primary)] text-white rounded-xl font-bold hover:shadow-lg disabled:opacity-50 flex items-center gap-2 transition-all"
            >
              {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
              <span>{isSaving ? "Creating..." : "Create Project"}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl bg-white border ${isEditing === project.id ? 'border-[var(--blue-primary)] ring-2 ring-[var(--blue-primary)]/10' : 'border-[var(--border)]'} transition-all`}
          >
            {isEditing === project.id ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none min-h-[110px]"
                  />
                </div>
                
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/30">
                  <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[var(--blue-primary)]" /> Update Media
                  </h4>
                  <MediaUploader
                    onFilesSelected={(files) => setEditForm({ ...editForm, media: files })}
                    existingFiles={editForm.media}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleSave(project.id)}
                    disabled={isSaving}
                    className="px-6 py-3 bg-[var(--blue-primary)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(null)}
                    className="px-6 py-3 bg-[var(--secondary)] rounded-xl flex items-center gap-2 hover:bg-[var(--muted)] transition-all font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-6">
                    {project.media && project.media.length > 0 ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-[var(--border)] flex-shrink-0 bg-[var(--secondary)]/30">
                        {project.media[0].url.startsWith('blob:') ? (
                            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                                <ImageIcon className="w-4 h-4 text-red-400 mb-1" />
                                <span className="text-[8px] font-black uppercase text-red-500">Reset Required</span>
                            </div>
                        ) : project.media[0].type === "video" ? (
                           <div className="w-full h-full bg-black flex items-center justify-center">
                             <Play className="w-6 h-6 text-white" />
                           </div>
                        ) : (
                          <img src={project.media[0].url} className="w-full h-full object-cover" />
                        )}
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-[var(--secondary)] flex items-center justify-center border border-[var(--border)] text-[var(--muted-foreground)]">
                        <ImageIcon className="w-8 h-8 opacity-20" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <span className="px-3 py-0.5 rounded-full bg-[var(--blue-primary)]/5 text-[var(--blue-primary)] text-[10px] font-black uppercase tracking-wider border border-[var(--blue-primary)]/10">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-[var(--muted-foreground)] text-sm line-clamp-2 max-w-xl">{project.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="w-10 h-10 rounded-xl bg-[var(--secondary)] flex items-center justify-center hover:bg-[var(--blue-primary)] hover:text-white transition-all shadow-sm"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="w-10 h-10 rounded-xl bg-red-50 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-sm"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-lg bg-[var(--secondary)] text-[10px] font-bold text-[var(--muted-foreground)] border border-[var(--border)]">
                      {tech}
                    </span>
                  ))}
                  {project.media && project.media.length > 0 && (
                    <span className="px-2 py-1 rounded-lg bg-green-50 text-[10px] font-bold text-green-600 border border-green-100 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> {project.media.length} Media Items
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
