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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 bottom-0 w-80 bg-white border-r border-[var(--border)] flex flex-col z-50 transition-all duration-700 lg:left-0 ${isOpen ? 'left-0' : '-left-80'} shadow-sm`}>
        {/* Profile Card Section */}
        <div className="p-8 pt-12 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="relative mb-8"
          >
             {/* Glow effect behind photo */}
            <div className="absolute inset-0 bg-[var(--blue-primary)] opacity-10 blur-2xl rounded-full" />
            
            <div className="relative w-40 h-40 rounded-[48px] bg-white border-4 border-white shadow-2xl overflow-hidden p-0.5 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-[44px] overflow-hidden bg-[var(--secondary)]">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt={profileData.fullName}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-[var(--muted-foreground)]/20" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          <div className="text-center w-full px-4">
              <h2 className="text-2xl font-black text-[var(--blue-dark)] leading-tight mb-2 tracking-tight">
                  {profileData.fullName}
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-[2px] bg-[var(--blue-primary)]/20 rounded-full" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--blue-primary)] bg-[var(--blue-primary)]/5 px-3 py-1 rounded-full border border-[var(--blue-primary)]/10">
                    {profileData.title || "Fullstack Engineer"}
                  </p>
                  <div className="w-8 h-[2px] bg-[var(--blue-primary)]/20 rounded-full" />
              </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-8 py-8 space-y-3">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-4 px-6 py-5 rounded-[24px] font-bold transition-all group ${
                  activeSection === item.id
                    ? "text-[var(--blue-primary)] bg-[var(--blue-primary)]/[0.04] border border-[var(--blue-primary)]/10 shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--blue-dark)] hover:bg-[var(--secondary)]"
                }`}
              >
                <item.icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${activeSection === item.id ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
                <span className="text-lg">{item.label}</span>
              </motion.a>
            ))}
        </nav>

        {/* Action Footer */}
        <div className="p-10 bg-[var(--secondary)]/30 border-t border-[var(--border)]">
          <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-[var(--border)] mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center text-[var(--blue-dark)] hover:text-[var(--blue-primary)] transition-colors"
                title={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          
          <p className="text-[10px] text-center font-black uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              © {new Date().getFullYear()} Developed by Labtech
          </p>
        </div>
      </aside>
    </>
  );
}
