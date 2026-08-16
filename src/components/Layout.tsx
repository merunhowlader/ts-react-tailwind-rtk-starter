import { useState } from "react";
import { Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";

const isDesktopViewport = (): boolean =>
  typeof window !== "undefined" && window.innerWidth >= 768;

export const Layout = () => {
  const auth = useAppSelector((s) => s.auth);
  const [sidebarOpen, setSidebarOpen] = useState(isDesktopViewport);

  const isAuthenticated = auth.status === "authenticated";

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onMenuClick={() => setSidebarOpen((open) => !open)}
        showMenuButton={isAuthenticated}
      />

      <div className="flex flex-1">
        {isAuthenticated && (
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};
