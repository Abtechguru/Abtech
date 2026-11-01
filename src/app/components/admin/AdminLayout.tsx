import { useEffect, useState, type ReactNode } from "react";
import {
  BarChart3, BookOpen, Briefcase, Code2, ExternalLink, FolderKanban,
  LayoutDashboard, LogOut, Menu, MessageSquare, PanelLeftClose,
  PanelLeftOpen, Settings, X
} from "lucide-react";
import "../../../styles/admin-studio.css";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const groups = [
  {
    label: "WORKSPACE",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "projects", label: "Projects", icon: FolderKanban },
      { id: "skills", label: "Skills", icon: Code2 },
      { id: "experience", label: "Experience", icon: Briefcase },
      { id: "teaching", label: "Teaching", icon: BookOpen }
    ]
  },
  {
    label: "OPERATIONS",
    items: [
      { id: "pricing", label: "Services & pricing", icon: Briefcase },
      { id: "messages", label: "Inquiries", icon: MessageSquare },
      { id: "analytics", label: "Analytics", icon: BarChart3 }
    ]
  },
  {
    label: "ACCOUNT",
    items: [{ id: "settings", label: "Settings", icon: Settings }]
  }
];

export function AdminLayout({ children, activeTab, onTabChange, onLogout }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const current = groups.flatMap(group => group.items).find(item => item.id === activeTab);

  useEffect(() => {
    if (!mobileOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [mobileOpen]);

  const navigate = (tab: string) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  return (
    <div className={"ip-admin" + (compact ? " ip-admin-compact" : "")}>
      {mobileOpen && <button type="button" className="ip-admin-overlay" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={"ip-admin-sidebar" + (mobileOpen ? " ip-admin-sidebar-open" : "")} aria-label="Content studio navigation">
        <div className="ip-admin-brand-row">
          <a className="ip-admin-brand" href="/" title="ABTECH portfolio home">
            <span className="ip-admin-brand-mark">a<span>.</span></span>
            <span className="ip-admin-brand-name">ABTECH <small>STUDIO</small></span>
          </a>
          <button className="ip-admin-mobile-close" type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={21} /></button>
        </div>
        <div className="ip-admin-workspace"><span className="ip-admin-workspace-dot" /> PERSONAL PORTFOLIO CMS</div>
        <nav className="ip-admin-navigation" aria-label="Admin sections">
          {groups.map(group => <div className="ip-admin-nav-group" key={group.label}>
            <span className="ip-admin-group-label">{group.label}</span>
            {group.items.map(item => <button type="button" key={item.id} title={item.label} aria-pressed={activeTab === item.id} className={"ip-admin-nav-item" + (activeTab === item.id ? " ip-admin-nav-active" : "")} onClick={() => navigate(item.id)}>
              <item.icon size={18} strokeWidth={1.8} /><span>{item.label}</span>
              {activeTab === item.id && <span className="ip-admin-active-mark" />}
            </button>)}
          </div>)}
        </nav>
        <div className="ip-admin-sidebar-bottom">
          <a href="/" target="_blank" rel="noopener noreferrer"><ExternalLink size={17} /><span>View public website</span></a>
          <button type="button" onClick={onLogout}><LogOut size={17} /><span>Sign out securely</span></button>
        </div>
        <button className="ip-admin-collapse" type="button" aria-label={compact ? "Expand sidebar" : "Collapse sidebar"} title={compact ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCompact(!compact)}>
          {compact ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
        </button>
      </aside>

      <div className="ip-admin-main">
        <header className="ip-admin-topbar">
          <div className="ip-admin-topbar-title">
            <button className="ip-admin-mobile-menu" type="button" aria-expanded={mobileOpen} aria-label="Open admin navigation" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
            <div><span className="ip-admin-topbar-eyebrow">CONTENT STUDIO / {activeTab.toUpperCase()}</span><h2>{current?.label || "Overview"}</h2></div>
          </div>
          <div className="ip-admin-topbar-actions">
            <a href="/" target="_blank" rel="noopener noreferrer">Preview site <ExternalLink size={16} /></a>
            <button type="button" onClick={onLogout} aria-label="Sign out"><LogOut size={18} /></button>
          </div>
        </header>
        <main className="ip-admin-body">{children}</main>
      </div>
    </div>
  );
}
