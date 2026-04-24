import { motion } from "motion/react";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Briefcase,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "pricing", label: "Pricing", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="dark min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 bottom-0 bg-[var(--card)] border-r border-[var(--border)] z-40 transition-all"
      >
        <div className="p-6 flex items-center justify-between border-b border-[var(--border)]">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--orange)] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg">Admin Panel</h2>
                <p className="text-xs text-[var(--muted-foreground)]">Portfolio Manager</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-8 h-8 rounded-lg bg-[var(--secondary)] flex items-center justify-center hover:bg-[var(--muted)] transition-all"
          >
            {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-[var(--orange)] text-white"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span>{item.label}</span>}
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-4">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </a>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all ${isSidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
