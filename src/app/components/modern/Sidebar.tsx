import { motion, AnimatePresence } from "motion/react";
import { Home, FolderKanban, User, Github, Linkedin, Mail, Dribbble, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useData } from "../../contexts/DataContext";

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
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

  // Close sidebar on navigation (for mobile)
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-[60] w-12 h-12 rounded-2xl bg-white shadow-xl border border-[var(--border)] flex items-center justify-center text-[var(--blue-dark)] hover:text-[var(--blue-primary)] transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 bottom-0 w-72 bg-white border-r border-[var(--border)] flex flex-col z-50 transition-all duration-500 lg:left-0 ${isOpen ? 'left-0' : '-left-72'}`}>
        {/* Profile Photo Section */}
        <div className="p-10 pb-6 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative group mb-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue-primary)] to-[var(--purple)] rounded-[32px] rotate-6 blur-md opacity-20 group-hover:rotate-12 transition-transform duration-500" />
            
            <div className="relative w-36 h-36 rounded-[32px] bg-white border-4 border-white shadow-xl overflow-hidden p-0.5">
              <div className="w-full h-full rounded-[28px] overflow-hidden bg-[var(--secondary)]">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt={profileData.fullName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-[var(--muted-foreground)]/20" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          <h2 className="text-xl font-bold text-[var(--blue-dark)] text-center">{profileData.fullName}</h2>
          <p className="text-sm text-[var(--muted-foreground)] text-center mt-1">{profileData.title}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-8 mt-4">
          <div className="space-y-3">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                  activeSection === item.id
                    ? "text-[var(--blue-primary)] bg-[var(--blue-primary)]/5 shadow-[0_0_20px_rgba(59,77,201,0.05)] border border-[var(--blue-primary)]/10"
                    : "text-[var(--muted-foreground)] hover:text-[var(--blue-primary)] hover:bg-[var(--secondary)]"
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
                <span>{item.label}</span>
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Footer Info */}
        <div className="px-10 py-8 border-t border-[var(--border)]">
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-[var(--secondary)] flex items-center justify-center text-[var(--blue-dark)] hover:bg-[var(--blue-primary)] hover:text-white transition-all shadow-sm"
                title={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-3 text-xs font-bold text-[var(--muted-foreground)]">
            <span className="cursor-pointer hover:text-[var(--blue-primary)] transition-colors">EN</span>
            <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <span className="cursor-pointer hover:text-[var(--blue-primary)] transition-colors">FR</span>
          </div>
        </div>
      </aside>
    </>
  );
}
