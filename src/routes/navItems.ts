import { ROUTES } from "./routes.config";
import type { NavItem } from "./nav.types";

export const navItems: NavItem[] = [
  { path: ROUTES.home.path, label: ROUTES.home.label },
  {
    path: ROUTES.dashboard.path,
    label: ROUTES.dashboard.label,
    roles: ROUTES.dashboard.roles,
  },
  {
    path: ROUTES.admin.path,
    label: ROUTES.admin.label,
    roles: ROUTES.admin.roles,
  },
];
