import { motion } from "motion/react";
import { Home } from "lucide-react";

export function AdminFloatingButton() {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[var(--orange)] text-white flex items-center justify-center shadow-lg shadow-[var(--orange-glow)] hover:shadow-xl z-50"
      title="Back to Portfolio"
    >
      <Home className="w-6 h-6" />
    </motion.a>
  );
}
