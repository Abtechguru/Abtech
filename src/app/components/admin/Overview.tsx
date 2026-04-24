import { motion } from "motion/react";
import { TrendingUp, Users, FolderKanban, MessageSquare, Eye, Clock, MousePointer, Plus, GraduationCap, Briefcase } from "lucide-react";
import { useData } from "../../contexts/DataContext";
import { formatDistanceToNow } from "date-fns";

export function Overview() {
  const { projects, messages, profileData, skills, experience } = useData();

  const totalProjectViews = projects.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);
  const unreadMessages = messages.filter(m => !m.isRead).length;

  const stats = [
    { 
        icon: FolderKanban, 
        label: "Total Projects", 
        value: projects.length.toString(), 
        change: `${projects.length > 0 ? '+1' : '0'} recently`, 
        trend: "up" 
    },
    { 
        icon: MessageSquare, 
        label: "Messages", 
        value: messages.length.toString(), 
        change: `${unreadMessages} unread`, 
        trend: unreadMessages > 0 ? "up" : "down" 
    },
    { 
        icon: Eye, 
        label: "Profile Views", 
        value: profileData.viewCount > 1000 ? (profileData.viewCount / 1000).toFixed(1) + "K" : profileData.viewCount.toString(), 
        change: "+5% overall", 
        trend: "up" 
    },
    { 
        icon: MousePointer, 
        label: "Project Views", 
        value: totalProjectViews > 1000 ? (totalProjectViews / 1000).toFixed(1) + "K" : totalProjectViews.toString(), 
        change: "Real-time sync", 
        trend: "up" 
    }
  ];

  const recentActivity = messages.slice(0, 8);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2 font-black tracking-tight">Dashboard Overview</h1>
        <p className="text-[var(--muted-foreground)]">Welcome back, {profileData.fullName.split(' ')[0]}! Here's your real-time performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white border border-[var(--border)] hover:border-[var(--blue-primary)] hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--blue-primary)]/5 flex items-center justify-center group-hover:bg-[var(--blue-primary)]/10 transition-colors">
                <stat.icon className="w-6 h-6 text-[var(--blue-primary)]" />
              </div>
              {stat.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
            </div>
            <div className="text-3xl font-black mb-1 text-[var(--blue-dark)]">{stat.value}</div>
            <div className="text-sm font-bold text-[var(--muted-foreground)] mb-2 uppercase tracking-wider text-[10px]">{stat.label}</div>
            <div className={`text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-blue-400'}`}>{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Summary */}
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-3xl bg-[var(--blue-dark)] text-white relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h2 className="text-2xl font-bold mb-6 relative z-10">Portfolio Health</h2>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                        <div className="text-2xl font-black mb-1">{skills.length}</div>
                        <div className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Tech Skills</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                        <div className="text-2xl font-black mb-1">{experience.length}</div>
                        <div className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Work History</div>
                    </div>
                </div>
                <div className="mt-8 flex items-center gap-4 text-white/60">
                    <div className="h-[2px] flex-1 bg-white/10" />
                    <span className="text-xs uppercase font-bold tracking-widest">Global Status: Active</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-3xl bg-white border border-[var(--border)]"
            >
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 rounded-2xl bg-[var(--blue-primary)] text-white hover:bg-[var(--blue-dark)] transition-all flex flex-col items-center gap-2 group shadow-lg shadow-blue-900/10">
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Project</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-[var(--secondary)] text-[var(--blue-dark)] hover:bg-[var(--blue-primary)] hover:text-white transition-all flex flex-col items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Experience</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-[var(--secondary)] text-[var(--blue-dark)] hover:bg-[var(--blue-primary)] hover:text-white transition-all flex flex-col items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Skill</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-[var(--secondary)] text-[var(--blue-dark)] hover:bg-[var(--blue-primary)] hover:text-white transition-all flex flex-col items-center gap-2">
                        <Eye className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Preview</span>
                    </button>
                </div>
            </motion.div>
        </div>

        {/* Recent Activity (Messages) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-3xl bg-white border border-[var(--border)] flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Inquiries</h2>
            <span className="px-3 py-1 rounded-full bg-[var(--blue-primary)]/10 text-[var(--blue-primary)] text-[10px] font-black uppercase tracking-wider">
                {unreadMessages} New
            </span>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 max-h-[480px]">
            {recentActivity.length > 0 ? (
                recentActivity.map((msg, index) => (
                    <div key={msg.id} className="p-4 rounded-2xl border border-[var(--border)] hover:border-[var(--blue-primary)]/30 hover:bg-[var(--blue-primary)]/[0.02] transition-all group">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${!msg.isRead ? 'bg-[var(--blue-primary)] scale-125' : 'bg-[var(--border)]'}`} />
                                <h4 className="font-bold text-[var(--blue-dark)]">{msg.name}</h4>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--muted-foreground)] uppercase">
                                <Clock className="w-3 h-3" />
                                {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                            </div>
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)] font-bold mb-1 italic">{msg.subject}</p>
                        <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{msg.message}</p>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-[var(--muted-foreground)]">
                    <MessageSquare className="w-12 h-12 mb-4 opacity-10" />
                    <p className="text-sm font-bold uppercase tracking-widest">No recent messages</p>
                </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
