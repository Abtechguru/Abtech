import { motion } from "motion/react";
import { BarChart3, Briefcase, Code2, Eye, FolderKanban, MessageSquare, Plus, ArrowUpRight, GraduationCap, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useData } from "../../contexts/DataContext";

interface OverviewProps {
  onNavigate: (tab: string) => void;
}

export function Overview({ onNavigate }: OverviewProps) {
  const { projects, messages, profileData, skills, experience, isLoading } = useData();
  const unread = messages.filter(message => !message.isRead).length;
  const projectViews = projects.reduce((total, project) => total + (Number(project.viewCount) || 0), 0);
  const stats = [
    { label: "Projects in studio", value: projects.length, note: "Database-backed entries", icon: FolderKanban },
    { label: "Total inquiries", value: messages.length, note: unread + " currently unread", icon: MessageSquare },
    { label: "Portfolio visits", value: Number(profileData.viewCount) || 0, note: "Stored profile view counter", icon: Eye },
    { label: "Project opens", value: projectViews, note: "Sum of project view counters", icon: BarChart3 }
  ];
  const actions = [
    { id: "projects", label: "Manage projects", subtitle: "Add, review and edit work", icon: Plus },
    { id: "experience", label: "Experience", subtitle: "Update your journey", icon: Briefcase },
    { id: "skills", label: "Technical skills", subtitle: "Maintain your stack", icon: Code2 },
    { id: "teaching", label: "Teaching", subtitle: "Education and media", icon: GraduationCap }
  ];

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[.18em] font-black text-[var(--orange)]">PORTFOLIO OPERATIONS</span>
        <h1 className="text-3xl md:text-4xl mt-3 mb-2 font-black tracking-tight">Your content, under control.</h1>
        <p className="text-[var(--muted-foreground)]">Welcome back{profileData.fullName ? ", " + profileData.fullName.split(" ")[0] : ""}. A focused view of your actual portfolio records.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {stats.map((item, index) => <motion.div key={item.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }} className="p-6 rounded-xl bg-white border border-[var(--border)]">
          <div className="flex items-center justify-between mb-8"><span className="uppercase text-[10px] tracking-[.11em] font-black text-[var(--muted-foreground)]">{item.label}</span><item.icon size={20} className="text-[var(--orange)]" /></div>
          <div className="text-4xl font-black tracking-tight text-[var(--blue-dark)] tabular-nums">{isLoading ? "—" : item.value.toLocaleString()}</div>
          <p className="text-xs text-[var(--muted-foreground)] mt-2">{isLoading ? "Loading portfolio data…" : item.note}</p>
        </motion.div>)}
      </div>

      <div className="grid xl:grid-cols-[.95fr_1.05fr] gap-6">
        <div className="space-y-6">
          <section className="rounded-xl bg-[#232b32] p-7 text-white">
            <div className="flex items-center justify-between gap-4 mb-6"><h2 className="font-bold text-2xl tracking-tight">Content coverage</h2><BarChart3 size={22} className="text-[#f69877]" /></div>
            <p className="text-sm text-white/65 max-w-lg mb-7 leading-relaxed">Your published experience and technology records are managed through the connected database, not generated statistics.</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/5 border border-white/10 p-5"><div className="text-3xl font-black">{isLoading ? "—" : skills.length}</div><span className="text-[11px] uppercase tracking-wide text-white/65">Skill groups</span></div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-5"><div className="text-3xl font-black">{isLoading ? "—" : experience.length}</div><span className="text-[11px] uppercase tracking-wide text-white/65">Experience entries</span></div>
            </div>
          </section>
          <section className="rounded-xl bg-white border border-[var(--border)] p-7">
            <div className="flex items-center justify-between gap-4 mb-6"><h2 className="text-2xl font-bold tracking-tight text-[var(--blue-dark)]">Quick actions</h2><span className="text-[10px] font-black uppercase tracking-widest text-[var(--orange)]">Edit content</span></div>
            <div className="grid sm:grid-cols-2 gap-3">
              {actions.map(action => <button type="button" key={action.id} onClick={() => onNavigate(action.id)} className="flex flex-col items-start gap-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)] p-4 text-left hover:border-[var(--orange)] hover:bg-white transition-all">
                <action.icon size={21} className="text-[var(--orange)]" />
                <span className="font-bold text-sm text-[var(--blue-dark)]">{action.label}</span>
                <span className="text-xs text-[var(--muted-foreground)]">{action.subtitle}</span>
              </button>)}
            </div>
          </section>
        </div>

        <section className="rounded-xl bg-white border border-[var(--border)] p-7">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div><span className="text-[10px] uppercase tracking-[.16em] font-black text-[var(--orange)]">INBOX</span><h2 className="text-2xl font-bold tracking-tight text-[var(--blue-dark)] mt-2">Recent inquiries</h2></div>
            <button type="button" onClick={() => onNavigate("messages")} className="flex items-center gap-1 text-xs font-bold text-[var(--orange)] hover:underline">View all <ArrowUpRight size={15} /></button>
          </div>
          {isLoading ? <p className="text-sm text-[var(--muted-foreground)] py-12" role="status">Loading messages…</p> : messages.length === 0 ? (
            <div className="py-16 flex flex-col items-center text-center text-[var(--muted-foreground)]"><MessageSquare size={34} className="opacity-40 mb-4" /><h3 className="font-bold text-[var(--blue-dark)]">Your inbox is clear</h3><p className="text-sm mt-2">When visitors get in touch, their submissions will appear here.</p></div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 7).map(message => {
                const received = new Date(message.createdAt);
                const relativeTime = Number.isFinite(received.getTime()) ? formatDistanceToNow(received, { addSuffix: true }) : "Date unavailable";
                return <button key={message.id} onClick={() => onNavigate("messages")} type="button" className="block w-full text-left rounded-lg border border-[var(--border)] p-4 hover:border-[var(--orange)] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0"><span className={"h-2 w-2 rounded-full shrink-0 " + (message.isRead ? "bg-slate-200" : "bg-[var(--orange)]")} /><h3 className="font-bold text-sm text-[var(--blue-dark)] truncate">{message.name}</h3></div>
                    <span className="shrink-0 inline-flex gap-1 items-center text-[10px] text-[var(--muted-foreground)]"><Clock size={12} />{relativeTime}</span>
                  </div>
                  <p className="text-xs font-bold text-[var(--muted-foreground)] my-2">{message.subject}</p>
                  <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{message.message}</p>
                </button>;
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
