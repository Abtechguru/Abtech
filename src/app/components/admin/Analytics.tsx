import { motion } from "motion/react";
import { TrendingUp, Users, Eye, MousePointer, Clock, Globe } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Analytics() {
  const stats = [
    { icon: Eye, label: "Total Views", value: "12.4K", change: "+18%", trend: "up" },
    { icon: Users, label: "Unique Visitors", value: "3.2K", change: "+12%", trend: "up" },
    { icon: MousePointer, label: "Total Clicks", value: "5.8K", change: "+22%", trend: "up" },
    { icon: Globe, label: "Countries", value: "42", change: "+5", trend: "up" }
  ];

  const viewsData = [
    { date: "Apr 17", views: 340, visitors: 120 },
    { date: "Apr 18", views: 420, visitors: 150 },
    { date: "Apr 19", views: 380, visitors: 135 },
    { date: "Apr 20", views: 510, visitors: 180 },
    { date: "Apr 21", views: 470, visitors: 165 },
    { date: "Apr 22", views: 590, visitors: 210 },
    { date: "Apr 23", views: 680, visitors: 245 },
    { date: "Apr 24", views: 720, visitors: 260 }
  ];

  const topPages = [
    { page: "Home", views: 3420, percentage: 28 },
    { page: "Projects", views: 2850, percentage: 23 },
    { page: "AI Engineering", views: 2340, percentage: 19 },
    { page: "About", views: 1890, percentage: 15 },
    { page: "Contact", views: 1850, percentage: 15 }
  ];

  const topProjects = [
    { name: "Somietech Connect", views: 1240, clicks: 342, ctr: "27.6%" },
    { name: "Intelleva", views: 890, clicks: 234, ctr: "26.3%" },
    { name: "VeritusNews", views: 720, clicks: 189, ctr: "26.2%" },
    { name: "Extodus Car Hire", views: 580, clicks: 156, ctr: "26.9%" }
  ];

  const clicksByElement = [
    { element: "Projects - View Live", clicks: 1842 },
    { element: "Contact Form Submit", clicks: 892 },
    { element: "Download CV", clicks: 645 },
    { element: "Projects - Case Study", clicks: 523 },
    { element: "Social Links", clicks: 412 },
    { element: "Email Contact", clicks: 389 }
  ];

  const trafficSources = [
    { source: "Direct", visits: 1200 },
    { source: "LinkedIn", visits: 890 },
    { source: "GitHub", visits: 650 },
    { source: "Google Search", visits: 420 },
    { source: "Twitter", visits: 280 }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Analytics Dashboard</h1>
        <p className="text-[var(--muted-foreground)]">Track your portfolio performance and visitor insights</p>
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
            <div className="text-xs text-green-500">{stat.change} vs last week</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Views Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <h3 className="text-xl mb-6">Views & Visitors (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px'
                }}
              />
              <Line type="monotone" dataKey="views" stroke="var(--orange)" strokeWidth={2} />
              <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--orange)]" />
              <span className="text-sm text-[var(--muted-foreground)]">Total Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-[var(--muted-foreground)]">Unique Visitors</span>
            </div>
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <h3 className="text-xl mb-6">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trafficSources}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="source" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="visits" fill="var(--orange)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <h3 className="text-xl mb-6">Top Pages</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{page.page}</span>
                    <span className="text-sm text-[var(--muted-foreground)]">{page.views} views</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--orange)] rounded-full"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <h3 className="text-xl mb-6">Top Projects</h3>
          <div className="space-y-4">
            {topProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)]"
              >
                <div className="flex-1">
                  <h4 className="mb-1">{project.name}</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">{project.views} views</p>
                </div>
                <div className="text-right">
                  <div className="text-lg text-[var(--orange)]">{project.clicks}</div>
                  <p className="text-xs text-[var(--muted-foreground)]">clicks</p>
                  <p className="text-xs text-green-500 mt-1">{project.ctr} CTR</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Click Tracking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center">
            <MousePointer className="w-6 h-6 text-[var(--orange)]" />
          </div>
          <div>
            <h3 className="text-xl">Click Tracking</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Most clicked elements on your portfolio</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clicksByElement.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.05 }}
              className="p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)] hover:border-[var(--orange)] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">{item.element}</span>
                <MousePointer className="w-4 h-4 text-[var(--orange)]" />
              </div>
              <div className="text-2xl text-[var(--orange)]">{item.clicks.toLocaleString()}</div>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">total clicks</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
