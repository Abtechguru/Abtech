import { motion } from "motion/react";
import { Plus, Edit, Trash2, Save, X, Code2, Server, Brain, Database, Cloud } from "lucide-react";
import { useState } from "react";

interface SkillCategory {
  id: string;
  icon: string;
  title: string;
  skills: string[];
}

const iconMap: Record<string, any> = {
  Code2,
  Server,
  Brain,
  Database,
  Cloud
};

export function SkillsManager() {
  const [categories, setCategories] = useState<SkillCategory[]>([
    {
      id: "1",
      icon: "Code2",
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"]
    },
    {
      id: "2",
      icon: "Server",
      title: "Backend",
      skills: ["Node.js", "Python", "Django", "Express", "FastAPI"]
    },
    {
      id: "3",
      icon: "Brain",
      title: "AI / ML",
      skills: ["LangChain", "OpenAI", "RAG Systems", "Vector DBs", "LLM Integration"]
    },
    {
      id: "4",
      icon: "Database",
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Pinecone", "OpenSearch"]
    },
    {
      id: "5",
      icon: "Cloud",
      title: "DevOps",
      skills: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Vercel"]
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<SkillCategory>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<SkillCategory>>({
    icon: "Code2",
    title: "",
    skills: []
  });
  const [newSkillInput, setNewSkillInput] = useState("");
  const [editSkillInput, setEditSkillInput] = useState("");

  const handleEdit = (category: SkillCategory) => {
    setEditingId(category.id);
    setEditForm(category);
  };

  const handleSave = (id: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, ...editForm } : c));
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this skill category?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleAddCategory = () => {
    const id = Date.now().toString();
    setCategories([...categories, { ...newCategory, id } as SkillCategory]);
    setShowAddForm(false);
    setNewCategory({ icon: "Code2", title: "", skills: [] });
  };

  const addSkillToNew = () => {
    if (newSkillInput.trim()) {
      setNewCategory({
        ...newCategory,
        skills: [...(newCategory.skills || []), newSkillInput.trim()]
      });
      setNewSkillInput("");
    }
  };

  const addSkillToEdit = () => {
    if (editSkillInput.trim()) {
      setEditForm({
        ...editForm,
        skills: [...(editForm.skills || []), editSkillInput.trim()]
      });
      setEditSkillInput("");
    }
  };

  const removeSkillFromEdit = (skill: string) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills?.filter(s => s !== skill)
    });
  };

  const removeSkillFromNew = (skill: string) => {
    setNewCategory({
      ...newCategory,
      skills: newCategory.skills?.filter(s => s !== skill)
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Skills Management</h1>
          <p className="text-[var(--muted-foreground)]">Manage your technical skills and categories</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
        >
          <Plus className="w-5 h-5" /> Add Category
        </motion.button>
      </div>

      {/* Add New Category Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 rounded-2xl bg-[var(--card)] border-2 border-[var(--orange)]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl">Add New Skill Category</h3>
            <button onClick={() => setShowAddForm(false)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category Title"
                value={newCategory.title}
                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
              <select
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              >
                <option value="Code2">Code (Frontend)</option>
                <option value="Server">Server (Backend)</option>
                <option value="Brain">Brain (AI/ML)</option>
                <option value="Database">Database</option>
                <option value="Cloud">Cloud (DevOps)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkillToNew()}
                  className="flex-1 px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
                <button
                  onClick={addSkillToNew}
                  className="px-4 py-3 bg-[var(--secondary)] rounded-xl hover:bg-[var(--muted)] transition-all"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newCategory.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[var(--secondary)] text-sm border border-[var(--border)] flex items-center gap-2"
                  >
                    {skill}
                    <button onClick={() => removeSkillFromNew(skill)} className="text-red-500 hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddCategory}
              className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
            >
              Save Category
            </button>
          </div>
        </motion.div>
      )}

      {/* Categories List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon];
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
            >
              {editingId === category.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                  />
                  <div>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add skill"
                        value={editSkillInput}
                        onChange={(e) => setEditSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkillToEdit()}
                        className="flex-1 px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none text-sm"
                      />
                      <button
                        onClick={addSkillToEdit}
                        className="px-3 py-2 bg-[var(--secondary)] rounded-lg hover:bg-[var(--muted)] transition-all text-sm"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {editForm.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-md bg-[var(--secondary)] text-xs border border-[var(--border)] flex items-center gap-1"
                        >
                          {skill}
                          <button onClick={() => removeSkillFromEdit(skill)} className="text-red-500 hover:text-red-400">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(category.id)}
                      className="px-4 py-2 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg transition-all text-sm"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-[var(--secondary)] rounded-xl flex items-center gap-2 hover:bg-[var(--muted)] transition-all text-sm"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[var(--orange)]" />
                      </div>
                      <h3 className="text-xl">{category.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="w-8 h-8 rounded-lg bg-[var(--secondary)] flex items-center justify-center hover:bg-[var(--muted)] transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[var(--secondary)] text-sm border border-[var(--border)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
