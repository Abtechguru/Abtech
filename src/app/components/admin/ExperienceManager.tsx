import { motion } from "motion/react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useState } from "react";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  contributions: string[];
  impact: string;
}

export function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      role: "Lead Developer",
      company: "Caremandate",
      period: "2023 - Present",
      type: "Full-time",
      contributions: [
        "Architected and deployed scalable healthcare management system",
        "Implemented AI-powered features using RAG and LLM integrations",
        "Led team of 4 developers using Agile methodologies",
        "Reduced system response time by 60% through optimization"
      ],
      impact: "Serving 10,000+ active users with 99.9% uptime"
    },
    {
      id: "2",
      role: "Software Developer",
      company: "MavenCode",
      period: "2021 - 2023",
      type: "Full-time",
      contributions: [
        "Developed production fintech applications handling real transactions",
        "Built RESTful APIs and integrated third-party payment gateways",
        "Implemented comprehensive testing and CI/CD pipelines",
        "Mentored junior developers and conducted code reviews"
      ],
      impact: "Processed over $500K in transactions monthly"
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Experience>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    role: "",
    company: "",
    period: "",
    type: "Full-time",
    contributions: [],
    impact: ""
  });
  const [newContributionInput, setNewContributionInput] = useState("");
  const [editContributionInput, setEditContributionInput] = useState("");

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setEditForm(exp);
  };

  const handleSave = (id: string) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, ...editForm } : e));
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      setExperiences(experiences.filter(e => e.id !== id));
    }
  };

  const handleAddExperience = () => {
    const id = Date.now().toString();
    setExperiences([...experiences, { ...newExperience, id } as Experience]);
    setShowAddForm(false);
    setNewExperience({
      role: "",
      company: "",
      period: "",
      type: "Full-time",
      contributions: [],
      impact: ""
    });
  };

  const addContributionToNew = () => {
    if (newContributionInput.trim()) {
      setNewExperience({
        ...newExperience,
        contributions: [...(newExperience.contributions || []), newContributionInput.trim()]
      });
      setNewContributionInput("");
    }
  };

  const addContributionToEdit = () => {
    if (editContributionInput.trim()) {
      setEditForm({
        ...editForm,
        contributions: [...(editForm.contributions || []), editContributionInput.trim()]
      });
      setEditContributionInput("");
    }
  };

  const removeContributionFromNew = (contribution: string) => {
    setNewExperience({
      ...newExperience,
      contributions: newExperience.contributions?.filter(c => c !== contribution)
    });
  };

  const removeContributionFromEdit = (contribution: string) => {
    setEditForm({
      ...editForm,
      contributions: editForm.contributions?.filter(c => c !== contribution)
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Experience Management</h1>
          <p className="text-[var(--muted-foreground)]">Manage your work experience and professional journey</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
        >
          <Plus className="w-5 h-5" /> Add Experience
        </motion.button>
      </div>

      {/* Add New Experience Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 rounded-2xl bg-[var(--card)] border-2 border-[var(--orange)]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl">Add New Experience</h3>
            <button onClick={() => setShowAddForm(false)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Role/Position"
                value={newExperience.role}
                onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Period (e.g., 2021 - 2023)"
                value={newExperience.period}
                onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
              <select
                value={newExperience.type}
                onChange={(e) => setNewExperience({ ...newExperience, type: e.target.value })}
                className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Key Contributions</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a contribution"
                  value={newContributionInput}
                  onChange={(e) => setNewContributionInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addContributionToNew()}
                  className="flex-1 px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
                <button
                  onClick={addContributionToNew}
                  className="px-4 py-3 bg-[var(--secondary)] rounded-xl hover:bg-[var(--muted)] transition-all"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {newExperience.contributions?.map((contribution, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange)] mt-2 flex-shrink-0" />
                    <p className="flex-1 text-sm">{contribution}</p>
                    <button onClick={() => removeContributionFromNew(contribution)} className="text-red-500 hover:text-red-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Impact/Achievements"
              value={newExperience.impact}
              onChange={(e) => setNewExperience({ ...newExperience, impact: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
            />

            <button
              onClick={handleAddExperience}
              className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
            >
              Save Experience
            </button>
          </div>
        </motion.div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
          >
            {editingId === exp.id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editForm.period}
                    onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                  />
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Contributions</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add contribution"
                      value={editContributionInput}
                      onChange={(e) => setEditContributionInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addContributionToEdit()}
                      className="flex-1 px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                    />
                    <button
                      onClick={addContributionToEdit}
                      className="px-4 py-3 bg-[var(--secondary)] rounded-xl hover:bg-[var(--muted)] transition-all"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editForm.contributions?.map((contribution, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange)] mt-2 flex-shrink-0" />
                        <p className="flex-1 text-sm">{contribution}</p>
                        <button onClick={() => removeContributionFromEdit(contribution)} className="text-red-500 hover:text-red-400">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={editForm.impact}
                  onChange={(e) => setEditForm({ ...editForm, impact: e.target.value })}
                  placeholder="Impact"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(exp.id)}
                    className="px-4 py-2 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
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
                      <h3 className="text-xl">{exp.role}</h3>
                      <span className="px-3 py-1 rounded-lg bg-[var(--orange-glow)] text-[var(--orange)] text-sm">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-[var(--muted-foreground)]">{exp.company} • {exp.period}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="w-10 h-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center hover:bg-[var(--muted)] transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm text-[var(--muted-foreground)]">Key Contributions</h4>
                  {exp.contributions.map((contribution, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange)] mt-2 flex-shrink-0" />
                      <p className="text-[var(--foreground)]">{contribution}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-sm">
                    <span className="text-[var(--muted-foreground)]">Impact: </span>
                    <span className="text-[var(--orange)]">{exp.impact}</span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
