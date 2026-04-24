import { motion } from "motion/react";
import { Home, FolderKanban, User, Github, Linkedin, Mail, Dribbble } from "lucide-react";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const { profileData } = useData();

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#" },
    { id: "projects", label: "Projects", icon: FolderKanban, href: "#projects" },
    { id: "about", label: "About Me", icon: User, href: "#about" }
  ];

  const socialLinks = [
    { icon: Github, href: profileData.github, label: "GitHub" },
    { icon: Linkedin, href: profileData.linkedin, label: "LinkedIn" },
    { icon: Dribbble, href: profileData.behance, label: "Behance" },
    { icon: Mail, href: `mailto:${profileData.email}`, label: "Email" }
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[var(--border)] flex flex-col z-50">
      {/* Profile Photo */}
      <div className="p-8 pb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--blue-primary)] to-[var(--purple)] p-1"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            {profileData.profilePhoto ? (
              <img
                src={profileData.profilePhoto}
                alt={profileData.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--blue-primary)]/20 to-[var(--purple)]/20 flex items-center justify-center">
                <User className="w-16 h-16 text-[var(--blue-primary)]" />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6">
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === item.id
                  ? "text-[var(--blue-primary)] bg-[var(--accent)]"
                  : "text-[var(--foreground)] hover:text-[var(--blue-primary)] hover:bg-[var(--muted)]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.a>
          ))}
        </div>
      </nav>

      {/* Language Switcher */}
      <div className="px-6 py-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 text-sm">
          <button className="px-2 py-1 text-[var(--blue-primary)] font-semibold">EN</button>
          <span className="text-[var(--muted-foreground)]">/</span>
          <button className="px-2 py-1 text-[var(--muted-foreground)] hover:text-[var(--blue-primary)]">FR</button>
        </div>
      </div>

      {/* Social Links */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-4 gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-[var(--blue-primary)] transition-all"
              title={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </aside>
  );
}
