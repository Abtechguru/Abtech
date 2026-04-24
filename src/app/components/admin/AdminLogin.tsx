import { motion } from "motion/react";
import { Lock, LogIn, Eye, EyeOff, Mail } from "lucide-react";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await login(email, password);
      if (!error) {
        onLoginSuccess();
      } else {
        setError(error.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-[var(--background)] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[var(--orange)] flex items-center justify-center"
          >
            <Lock className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl mb-2">Admin Access</h1>
          <p className="text-[var(--muted-foreground)]">
            Enter your credentials to access the admin panel via Supabase
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm mb-2 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none transition-all"
                  placeholder="admin@example.com"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-[var(--orange)] text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login to Admin Panel</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] space-y-2">
              <p className="text-xs text-[var(--muted-foreground)] font-medium uppercase tracking-wider">
                Setup Instructions
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">
                1. Ensure your <code className="text-[var(--orange)]">.env</code> is configured.
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">
                2. Run the SQL schema in Supabase.
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">
                3. Create a user via Supabase Auth.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Portfolio */}
        <div className="text-center mt-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="text-[var(--muted-foreground)] hover:text-[var(--orange)] transition-colors inline-block"
          >
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}
