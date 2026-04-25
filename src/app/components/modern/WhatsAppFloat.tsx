import { MessageCircle } from "lucide-react";
import { useData } from "../../contexts/DataContext";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export function WhatsAppFloat() {
  const { profileData } = useData();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!profileData.whatsapp) return null;

  const whatsappUrl = `https://wa.me/${profileData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hi Lateef, I'm interested in working with you on a project.")}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-3xl shadow-green-900/40 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 rotate-12" />
          <MessageCircle className="w-8 h-8 relative z-10" />
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: 'auto', opacity: 1 }}
            className="absolute right-full mr-4 bg-white text-[var(--blue-dark)] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest pointer-events-none shadow-xl border border-[var(--border)] whitespace-nowrap overflow-hidden"
          >
            Message Lateef Direct
          </motion.div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
