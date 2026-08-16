import type { ComponentType } from "react";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/features/auth/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { AdminPage } from "@/pages/AdminPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RegisterPage } from "@/features/auth/RegisterPage";
import type { Role } from "@/types";

export interface RouteConfig {
  path: string;
  label: string;
  element: ComponentType;
  roles?: readonly Role[];
  showInNav?: boolean; // false/undefined = not shown in sidebar (e.g. 403, 404, login)
}

export const ROUTES = {
  home: { path: "/", label: "Home", element: HomePage, showInNav: true },
  login: { path: "/login", label: "Login", element: LoginPage },
  register: { path: "/register", label: "Register", element: RegisterPage },
  dashboard: {
    path: "/dashboard",
    label: "Dashboard",
    element: DashboardPage,
    roles: ["admin", "editor", "member"],
    showInNav: true,
  },
  admin: {
    path: "/admin",
    label: "Admin Panel",
    element: AdminPage,
    roles: ["admin"],
    showInNav: true,
  },
  profile: { path: "/profile", label: "Profile", element: ProfilePage },
  forbidden: { path: "/403", label: "Forbidden", element: ForbiddenPage },
  notFound: { path: "*", label: "Not Found", element: NotFoundPage },
} as const satisfies Record<string, RouteConfig>;
