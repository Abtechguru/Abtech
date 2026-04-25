import { motion, AnimatePresence } from "motion/react";
import { Home, FolderKanban, User, Github, Linkedin, Mail, Instagram, Music, Menu, X } from "lucide-react";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const { profileData } = useData();

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#" },
    { id: "projects", label: "Projects", icon: FolderKanban, href: "#projects" },
    { id: "services", label: "Services", icon: User, href: "#services" },
    { id: "about", label: "About", icon: User, href: "#about" },
    { id: "contact", label: "Contact", icon: Mail, href: "#contact" }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: profileData.linkedin, label: "LinkedIn" },
    { icon: Music, href: "#", label: "TikTok" },
    { icon: Github, href: profileData.github, label: "GitHub" }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-[60] w-14 h-14 rounded-2xl bg-white shadow-2xl border border-[var(--border)] flex items-center justify-center text-[var(--blue-dark)] hover:text-[var(--blue-primary)] transition-all"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 bottom-0 w-64 bg-white border-r border-[var(--border)] flex flex-col z-50 transition-all duration-700 lg:left-0 ${isOpen ? 'left-0' : '-left-64'}`}>
        {/* Profile Section */}
        <div className="p-8 pt-12 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-12"
          >
            <div className="w-44 h-44 rounded-full overflow-hidden border-[12px] border-[var(--secondary)]/30 group">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt={profileData.fullName}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--secondary)] flex items-center justify-center">
                    <User className="w-16 h-16 text-[var(--muted-foreground)]/20" />
                  </div>
                )}
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-6 px-8 py-5 rounded-2xl group transition-all ${
                  activeSection === item.id
                    ? "text-[var(--blue-dark)] bg-[var(--secondary)]/30"
                    : "text-[var(--muted-foreground)] hover:text-[var(--blue-dark)]"
                }`}
              >
                {/* Active Indicator Line on the left */}
                {activeSection === item.id && (
                    <motion.div
                        layoutId="active-bar"
                        className="absolute left-0 top-1/4 bottom-1/4 w-[4px] bg-[var(--blue-dark)] rounded-r-full"
                    />
                )}
                
                <item.icon className={`w-8 h-8 transition-transform group-hover:scale-105 ${activeSection === item.id ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
                <span className="text-xl font-bold">{item.label}</span>
              </motion.a>
            ))}
        </nav>

        {/* Action Footer */}
        <div className="p-12 space-y-8">
            <div className="flex items-center justify-center gap-2 text-lg font-black tracking-widest text-[var(--muted-foreground)]">
                <span className="text-[var(--blue-dark)]">EN</span>
                <span className="opacity-20">/</span>
                <span className="hover:text-[var(--blue-dark)] cursor-pointer transition-colors">FR</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center text-[var(--blue-dark)] hover:bg-[var(--blue-dark)] hover:text-white transition-all shadow-sm"
                    title={social.label}
                >
                    <social.icon className="w-7 h-7" />
                </motion.a>
                ))}
            </div>
        </div>
      </aside>
    </>
  );
}
