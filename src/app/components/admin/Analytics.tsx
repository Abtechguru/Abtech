import { motion } from "motion/react";
import { Eye, TrendingUp, Users, Target, BarChart3, ArrowUpRight } from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function Analytics() {
  const { profileData, projects } = useData();

  const totalProjectViews = projects.reduce((acc, p) => acc + (p.viewCount || 0), 0);

  const stats = [
    { label: "Profile Views", value: profileData.viewCount, icon: Users, color: "bg-blue-500", trend: "+12%" },
    { label: "Project Clicks", value: totalProjectViews, icon: Eye, color: "bg-purple-500", trend: "+24%" },
    { label: "Retention Rate", value: "68%", icon: TrendingUp, color: "bg-green-500", trend: "+5%" },
    { label: "Reach", value: "2.4K", icon: Target, color: "bg-orange-500", trend: "+18%" }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2 font-bold">Analytics Dashboard</h1>
        <p className="text-[var(--muted-foreground)]">Real-time performance tracking for your portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white border border-[var(--border)] shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-bold">
                <ArrowUpRight className="w-4 h-4" />
                {stat.trend}
              </div>
            </div>
            <h3 className="text-[var(--muted-foreground)] text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-4xl font-black text-[var(--blue-dark)]">{stat.value.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Projects */}
        <div className="lg:col-span-2 p-8 rounded-[32px] bg-white border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[var(--blue-primary)]" />
              Project Performance
            </h3>
            <button className="text-sm font-bold text-[var(--blue-primary)] hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            {projects.slice(0, 5).sort((a, b) => b.viewCount - a.viewCount).map((project, i) => (
              <div key={project.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--secondary)] flex items-center justify-center font-black text-[var(--blue-primary)]">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--blue-dark)] group-hover:text-[var(--blue-primary)] transition-colors">{project.title}</h4>
                    <p className="text-xs text-[var(--muted-foreground)] font-bold">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((project.viewCount / totalProjectViews) * 100 || 0, 100)}%` }}
                        className="h-full bg-[var(--blue-primary)] rounded-full"
                    />
                  </div>
                  <span className="font-black text-[var(--blue-dark)] min-w-[3ch]">{project.viewCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="p-8 rounded-[32px] bg-[var(--blue-dark)] text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6">Audience Insights</h3>
            <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Peak Activity</p>
                    <p className="font-bold">Tuesday, 4:00 PM - 8:00 PM</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Top Referral</p>
                    <p className="font-bold">LinkedIn (42%)</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Top Device</p>
                    <p className="font-bold">Desktop (64%)</p>
                </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest">Analytics Online</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
