import { lazy, Suspense, useEffect, useState } from "react";
import { ModernPortfolio } from "./components/modern/ModernPortfolio";
import { DataProvider, useData } from "./contexts/DataContext";

const CaseStudyPage = lazy(() => import("./components/modern/CaseStudyPage").then(module => ({ default: module.CaseStudyPage })));
const ModernTeaching = lazy(() => import("./components/modern/ModernTeaching").then(module => ({ default: module.ModernTeaching })));
const WhatsAppFloat = lazy(() => import("./components/modern/WhatsAppFloat").then(module => ({ default: module.WhatsAppFloat })));
const AdminPage = lazy(() => import("./components/admin/AdminPage").then(module => ({ default: module.AdminPage })));
const AdminLogin = lazy(() => import("./components/admin/AdminLogin").then(module => ({ default: module.AdminLogin })));

type AppRoute = "portfolio" | "admin" | "teaching" | "case-study";

function resolveRoute(): AppRoute {
  if (typeof window === "undefined") return "portfolio";
  const pathname = window.location.pathname;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return "admin";
  if (pathname === "/teaching" || pathname.startsWith("/teaching/")) return "teaching";
  if (pathname.startsWith("/work/")) return "case-study";
  return "portfolio";
}

function RouteLoading({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <div role="status" aria-live="polite" className="min-h-screen bg-[#101115] text-[#f3f0e9] flex items-center justify-center px-6">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="w-10 h-10 flex items-center justify-center border border-[#ff7849] rounded-lg font-black text-2xl">a<span className="text-[#ff7849]">.</span></span>
        <div>
          <p className="text-xs tracking-[.16em] uppercase text-[#ff7849] font-bold">ABTECH {isAdmin ? "STUDIO" : "ENGINEERING"}</p>
          <p className="text-sm mt-1 text-[#bdbab9]">Loading {isAdmin ? "secure workspace" : "experience"}…</p>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPath, setCurrentPath] = useState<AppRoute>(resolveRoute);
  const { isAuthenticated, isLoading, logout } = useData();

  useEffect(() => {
    const checkPath = () => setCurrentPath(resolveRoute());
    checkPath();
    window.addEventListener("popstate", checkPath);
    return () => window.removeEventListener("popstate", checkPath);
  }, []);

  const handleLoginSuccess = () => {
    window.history.pushState({}, "", "/admin");
    setCurrentPath("admin");
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.history.pushState({}, "", "/");
      setCurrentPath("portfolio");
    } catch (error) {
      console.error("Unable to sign out of portfolio studio", error);
    }
  };

  if (currentPath === "admin") {
    // Do not briefly display the login page while checking a valid owner session.
    if (isLoading) return <RouteLoading isAdmin />;
    return (
      <Suspense fallback={<RouteLoading isAdmin />}>
        {isAuthenticated ? <AdminPage onLogout={handleLogout} /> : <AdminLogin onLoginSuccess={handleLoginSuccess} />}
      </Suspense>
    );
  }

  if (currentPath === "case-study") {
    return <Suspense fallback={<RouteLoading />}><CaseStudyPage /></Suspense>;
  }

  if (currentPath === "teaching") {
    return <Suspense fallback={<RouteLoading />}>
      <ModernTeaching />
      <WhatsAppFloat />
    </Suspense>;
  }

  return <ModernPortfolio />;
}

export default function App() {
  return <DataProvider><AppContent /></DataProvider>;
}
