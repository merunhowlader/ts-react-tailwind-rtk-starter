import { Link, Outlet } from "react-router";
import { ROUTES } from "@/routes/routes.config";

export function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-6 py-3">
        <Link to={ROUTES.home.path} className="font-semibold">
          {ROUTES.home.label}
        </Link>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
