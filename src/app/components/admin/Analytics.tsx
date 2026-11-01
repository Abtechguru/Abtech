import { useMemo } from "react";
import { ArrowUpRight, BarChart3, Eye, FolderKanban, MessageSquare, MousePointerClick } from "lucide-react";
import { useData } from "../../contexts/DataContext";

interface AnalyticsProps {
  onNavigate: (tab: string) => void;
}

export function Analytics({ onNavigate }: AnalyticsProps) {
  const { profileData, projects, messages, isLoading } = useData();
  const totalProjectViews = projects.reduce((sum, project) => sum + (Number(project.viewCount) || 0), 0);
  const profileViews = Number(profileData.viewCount) || 0;
  const unreadMessages = messages.filter(message => !message.isRead).length;
  const sortedProjects = useMemo(
    () => [...projects].sort((left, right) => (Number(right.viewCount) || 0) - (Number(left.viewCount) || 0)),
    [projects]
  );
  const stats = [
    { label: "Profile views", value: profileViews, description: "Stored profile view counter", icon: Eye },
    { label: "Project opens", value: totalProjectViews, description: "Sum of recorded project views", icon: MousePointerClick },
    { label: "Managed projects", value: projects.length, description: "Projects in the content database", icon: FolderKanban },
    { label: "Contact inquiries", value: messages.length, description: unreadMessages + " currently unread", icon: MessageSquare }
  ];

  return (
    <div className="space-y-7">
      <div>
        <span className="text-xs font-black uppercase tracking-[.16em] text-[var(--orange)]">STUDIO / MEASUREMENT</span>
        <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-[var(--blue-dark)]">Analytics, without guesswork.</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)] max-w-3xl">
          A transparent view of available portfolio counters. These are cumulative database values, not unique visitors or verified conversion rates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map(item => <article key={item.label} className="bg-white rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-7">
            <span className="text-[10px] tracking-wider uppercase font-black text-[var(--muted-foreground)]">{item.label}</span>
            <item.icon className="text-[var(--orange)]" size={21} strokeWidth={1.7} />
          </div>
          <div className="text-4xl font-black tabular-nums text-[var(--blue-dark)]">{isLoading ? "—" : item.value.toLocaleString()}</div>
          <p className="mt-3 text-xs leading-relaxed text-[var(--muted-foreground)]">{isLoading ? "Loading your records…" : item.description}</p>
        </article>)}
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
        <section className="rounded-xl bg-white border border-[var(--border)] p-6 md:p-8">
          <div className="flex flex-wrap gap-4 items-start justify-between mb-7">
            <div>
              <span className="text-xs font-black uppercase tracking-[.14em] text-[var(--orange)]">RECORDED ACTIVITY</span>
              <h2 className="mt-2 font-bold text-2xl text-[var(--blue-dark)]">Project view counts</h2>
            </div>
            <button type="button" onClick={() => onNavigate("projects")} className="inline-flex gap-2 items-center text-xs font-bold text-[var(--orange)] hover:underline">Manage projects <ArrowUpRight size={16} /></button>
          </div>
          {isLoading ? <p className="py-12 text-[var(--muted-foreground)]" role="status">Loading project activity…</p> : sortedProjects.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-[var(--border)] rounded-lg">
              <BarChart3 size={30} className="mx-auto text-[var(--orange)] mb-3" />
              <p className="font-bold text-[var(--blue-dark)]">No database projects yet</p>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">Create a project to start collecting view counters.</p>
            </div>
          ) : <div className="space-y-5">
            {sortedProjects.map(project => {
              const views = Math.max(0, Number(project.viewCount) || 0);
              const percentage = totalProjectViews > 0 ? Math.max(0, Math.min(100, views / totalProjectViews * 100)) : 0;
              return <div key={project.id}>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div className="min-w-0"><h3 className="text-sm font-bold text-[var(--blue-dark)] truncate">{project.title}</h3><p className="text-xs text-[var(--muted-foreground)]">{project.category || "Uncategorized"}</p></div>
                  <span className="text-sm font-black text-[var(--blue-dark)] tabular-nums">{views.toLocaleString()} <span className="text-[10px] font-medium text-[var(--muted-foreground)]">views</span></span>
                </div>
                <div className="h-2 bg-[var(--secondary)] rounded-full overflow-hidden" role="progressbar" aria-label={project.title + " share of recorded project views"} aria-valuenow={Math.round(percentage)} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full rounded-full bg-[var(--orange)]" style={{ width: percentage + "%" }} />
                </div>
              </div>;
            })}
            <p className="text-xs text-[var(--muted-foreground)] pt-3 border-t border-[var(--border)]">
              Each bar shows its share of the recorded project view total, not unique people or engagement rate.
            </p>
          </div>}
        </section>

        <aside className="bg-[#232b32] text-white rounded-xl p-6 md:p-8">
          <BarChart3 className="text-[#ffa07f] mb-6" size={31} strokeWidth={1.5} />
          <h2 className="font-bold tracking-tight text-2xl mb-4">What these numbers mean</h2>
          <p className="text-sm text-white/75 leading-relaxed mb-6">
            This dashboard displays the counters already stored in Supabase. It does not claim visitor identities, session analytics, acquisition attribution or retention measurements.
          </p>
          <div className="space-y-4 pt-6 border-t border-white/15 text-xs leading-relaxed text-white/75">
            <p><strong className="block text-white mb-1">Profile views</strong>Cumulative count from the portfolio's profile view operation.</p>
            <p><strong className="block text-white mb-1">Project opens</strong>Recorded project view increments; not necessarily unique clicks.</p>
            <p><strong className="block text-white mb-1">No invented growth</strong>Period-over-period changes require timestamped events, which this schema does not yet provide.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
