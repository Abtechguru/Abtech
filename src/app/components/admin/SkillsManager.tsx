import { motion } from "motion/react";
import { Plus, Trash2, Save, X, Code2, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

interface Skill {
  id: string;
  category: string;
  name: string;
  tools: string[];
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({
    category: "Frontend",
    name: "",
    tools: ""
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
    if (data) setSkills(data);
    setIsLoading(false);
  };

  const handleAdd = async () => {
    if (!newSkill.name) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase.from('skills').insert({
      user_id: session.user.id,
      name: newSkill.name,
      category: newSkill.category,
      tools: newSkill.tools.split(',').map(t => t.trim()).filter(t => t !== "")
    }).select().single();

    if (data) {
      setSkills([...skills, data]);
      setIsAdding(false);
      setNewSkill({ category: "Frontend", name: "", tools: "" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Remove this skill?")) {
      await supabase.from('skills').delete().eq('id', id);
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 font-bold">Skills Management</h1>
          <p className="text-[var(--muted-foreground)]">Manage your technical expertise and tools</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-[var(--blue-primary)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg transition-all font-bold"
        >
          <Plus className="w-5 h-5" /> Add Skill Category
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-white border-2 border-[var(--blue-primary)] shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">New Technical Category</h3>
                <button onClick={() => setIsAdding(false)}><X className="w-5 h-5 text-[var(--muted-foreground)]" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-1 block">Category Name</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g. Backend Development"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border-none outline-none focus:ring-2 focus:ring-[var(--blue-primary)]/20"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-1 block">Level / Group</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border-none outline-none focus:ring-2 focus:ring-[var(--blue-primary)]/20"
                >
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>AI Engineering</option>
                  <option>Mobile</option>
                  <option>DevOps</option>
                  <option>Design</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-1 block">Tools (comma separated)</label>
                <textarea
                  value={newSkill.tools}
                  onChange={(e) => setNewSkill({ ...newSkill, tools: e.target.value })}
                  placeholder="React, TypeScript, Next.js"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] border-none outline-none focus:ring-2 focus:ring-[var(--blue-primary)]/20 min-h-[100px]"
                />
              </div>
              <button
                onClick={handleAdd}
                className="w-full py-4 bg-[var(--blue-primary)] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[var(--blue-dark)] transition-all"
              >
                <Save className="w-5 h-5" /> Create Category
              </button>
            </div>
          </motion.div>
        )}

        {skills.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-white border border-[var(--border)] shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--blue-primary)]/5 flex items-center justify-center text-[var(--blue-primary)] group-hover:bg-[var(--blue-primary)] group-hover:text-white transition-all">
                <Code2 className="w-6 h-6" />
              </div>
              <button
                onClick={() => handleDelete(s.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-[var(--blue-dark)] mb-1">{s.name}</h3>
            <p className="text-xs font-black uppercase tracking-widest text-[var(--blue-primary)] mb-4">{s.category}</p>
            
            <div className="flex flex-wrap gap-2">
              {s.tools.map((tool, idx) => (
                <span key={idx} className="px-3 py-1 bg-[var(--secondary)] text-[var(--blue-dark)] text-xs rounded-lg font-bold border border-[var(--border)]">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
