import { createBrowserRouter } from "react-router";
import { Layout } from "@/components/Layout";
import { PublicRoute } from "@/components/PublicRoute";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import { ROUTES } from "./routes.config";

export const router = createBrowserRouter([
  {
    path: ROUTES.home.path,
    element: <Layout />,
    children: [
      { index: true, element: <ROUTES.home.element /> },
      {
        element: <PublicRoute />,
        children: [
          { path: ROUTES.login.path, element: <ROUTES.login.element /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.dashboard.path,
            element: <ROUTES.dashboard.element />,
          },
          {
            element: <RoleProtectedRoute allowedRoles={ROUTES.admin.roles} />,
            children: [
              { path: ROUTES.admin.path, element: <ROUTES.admin.element /> },
            ],
          },
        ],
      },
      { path: ROUTES.forbidden.path, element: <ROUTES.forbidden.element /> },
      { path: ROUTES.notFound.path, element: <ROUTES.notFound.element /> },
    ],
  },
]);
