import { useState, useEffect } from "react";
import { ModernPortfolio } from "./components/modern/ModernPortfolio";
import { ModernTeaching } from "./components/modern/ModernTeaching";
import { AdminPage } from "./components/admin/AdminPage";
import { AdminLogin } from "./components/admin/AdminLogin";
import { DataProvider, useData } from "./contexts/DataContext";
import { initErrorHandler } from "./utils/errorHandler";

// Initialize error handler to suppress extension errors
if (typeof window !== 'undefined') {
  initErrorHandler();
}

function AppContent() {
  const [currentPath, setCurrentPath] = useState<"portfolio" | "admin" | "teaching">("portfolio");
  const { isAuthenticated, logout } = useData();

  useEffect(() => {
    // Initialize error handler early
    initErrorHandler();

    const checkPath = () => {
      const path = window.location.pathname;
      if (path === "/admin" || path.startsWith("/admin")) {
        setCurrentPath("admin");
      } else if (path === "/teaching") {
        setCurrentPath("teaching");
      } else {
        setCurrentPath("portfolio");
      }
    };

    checkPath();

    window.addEventListener("popstate", checkPath);
    return () => window.removeEventListener("popstate", checkPath);
  }, []);

  const handleLoginSuccess = () => {
    window.history.pushState({}, "", "/admin");
    setCurrentPath("admin");
  };

  const handleLogout = () => {
    logout();
    window.history.pushState({}, "", "/");
    setCurrentPath("portfolio");
  };

  if (currentPath === "admin") {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }
    return <AdminPage onLogout={handleLogout} />;
  }

  if (currentPath === "teaching") {
    return <ModernTeaching />;
  }

  return <ModernPortfolio />;
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}