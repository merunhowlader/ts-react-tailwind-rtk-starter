import type { ComponentType } from "react";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/features/auth/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { AdminPage } from "@/pages/AdminPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import type { Role } from "@/types";

interface RouteConfig {
  path: string;
  label: string;
  element: ComponentType;
  roles?: readonly Role[];
}

export const ROUTES = {
  home: { path: "/", label: "Home", element: HomePage },
  login: { path: "/login", label: "Login", element: LoginPage },
  dashboard: {
    path: "/dashboard",
    label: "Dashboard",
    element: DashboardPage,
    roles: ["admin", "editor", "member"],
  },
  admin: {
    path: "/admin",
    label: "Admin Panel",
    element: AdminPage,
    roles: ["admin"],
  },
  forbidden: { path: "/403", label: "Forbidden", element: ForbiddenPage },
  notFound: { path: "*", label: "Not Found", element: NotFoundPage },
} as const satisfies Record<string, RouteConfig>;
