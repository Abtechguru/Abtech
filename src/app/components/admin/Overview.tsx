import { motion } from "motion/react";
import { TrendingUp, Users, FolderKanban, MessageSquare, Eye, Clock, MousePointer } from "lucide-react";

export function Overview() {
  const stats = [
    { icon: FolderKanban, label: "Total Projects", value: "4", change: "+2 this month", trend: "up" },
    { icon: MessageSquare, label: "New Messages", value: "12", change: "+5 today", trend: "up" },
    { icon: Eye, label: "Page Views", value: "2.4K", change: "+12% this week", trend: "up" },
    { icon: MousePointer, label: "Total Clicks", value: "5.8K", change: "+22% this week", trend: "up" }
  ];

  const recentActivity = [
    { type: "message", user: "John Doe", action: "sent a message", time: "5 mins ago" },
    { type: "click", user: "Anonymous", action: "clicked View Live on Somietech", time: "8 mins ago" },
    { type: "view", user: "Anonymous", action: "viewed Somietech project", time: "12 mins ago" },
    { type: "click", user: "Anonymous", action: "clicked Download CV button", time: "45 mins ago" },
    { type: "message", user: "Sarah Smith", action: "sent a message", time: "1 hour ago" },
    { type: "view", user: "Anonymous", action: "viewed AI Engineering section", time: "2 hours ago" },
    { type: "click", user: "Anonymous", action: "clicked Contact button", time: "2 hours ago" },
    { type: "message", user: "Mike Johnson", action: "sent a message", time: "3 hours ago" }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard Overview</h1>
        <p className="text-[var(--muted-foreground)]">Welcome back, Lateef! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[var(--orange)]" />
              </div>
              {stat.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
            </div>
            <div className="text-3xl mb-1">{stat.value}</div>
            <div className="text-sm text-[var(--muted-foreground)] mb-2">{stat.label}</div>
            <div className="text-xs text-green-500">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <h2 className="text-xl mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 rounded-xl bg-[var(--orange)] text-white text-left hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all">
              + Add New Project
            </button>
            <button className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] text-left hover:bg-[var(--muted)] transition-all">
              + Add New Skill
            </button>
            <button className="w-full px-4 py-3 rounded-xl bg-[var(--secondary)] text-left hover:bg-[var(--muted)] transition-all">
              + Add Experience Entry
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <h2 className="text-xl mb-4">Recent Activity</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-[var(--border)] last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'message' ? 'bg-[var(--orange)]' :
                  activity.type === 'click' ? 'bg-green-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="text-[var(--foreground)]">{activity.user}</span>
                    <span className="text-[var(--muted-foreground)]"> {activity.action}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-[var(--muted-foreground)]">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--orange)]" />
                <span className="text-[var(--muted-foreground)]">Messages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[var(--muted-foreground)]">Clicks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[var(--muted-foreground)]">Views</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
