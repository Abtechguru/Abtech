import { useState, useEffect } from "react";
import { ModernPortfolio } from "./components/modern/ModernPortfolio";
import { CaseStudyPage } from "./components/modern/CaseStudyPage";
import { ModernTeaching } from "./components/modern/ModernTeaching";
import { AdminPage } from "./components/admin/AdminPage";
import { AdminLogin } from "./components/admin/AdminLogin";
import { WhatsAppFloat } from "./components/modern/WhatsAppFloat";
import { DataProvider, useData } from "./contexts/DataContext";
import { initErrorHandler } from "./utils/errorHandler";

// Initialize error handler to suppress extension errors
if (typeof window !== 'undefined') {
  initErrorHandler();
}

type AppRoute = "portfolio" | "admin" | "teaching" | "case-study";

function resolveRoute(): AppRoute {
  if (typeof window === "undefined") return "portfolio";
  const pathname = window.location.pathname;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return "admin";
  if (pathname === "/teaching" || pathname.startsWith("/teaching/")) return "teaching";
  if (pathname.startsWith("/work/")) return "case-study";
  return "portfolio";
}

function AppContent() {
  const [currentPath, setCurrentPath] = useState<AppRoute>(resolveRoute);
  const { isAuthenticated, logout } = useData();

  useEffect(() => {
    // Initialize error handler early
    initErrorHandler();

    const checkPath = () => setCurrentPath(resolveRoute());

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

  if (currentPath === "case-study") return <CaseStudyPage />;

  if (currentPath === "teaching") {
    return (
      <>
        <ModernTeaching />
        <WhatsAppFloat />
      </>
    );
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