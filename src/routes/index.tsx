import { createBrowserRouter } from "react-router";
import { Layout } from "@/components/Layout";
import { PublicRoute } from "@/components/PublicRoute";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { ROUTES } from "./routes.config";

export const router = createBrowserRouter([
  {
    path: ROUTES.home.path,
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <ROUTES.home.element /> },
      {
        element: <PublicRoute />,
        children: [
          { path: ROUTES.login.path, element: <ROUTES.login.element /> },
          { path: ROUTES.register.path, element: <ROUTES.register.element /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.dashboard.path,
            element: <ROUTES.dashboard.element />,
          },
          { path: ROUTES.profile.path, element: <ROUTES.profile.element /> },
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
