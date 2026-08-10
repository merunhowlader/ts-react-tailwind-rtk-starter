import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";
import type { Role } from "@/types";
import { ROUTES } from "@/routes/routes.config";

interface RoleProtectedRouteProps {
  allowedRoles: readonly Role[];
}

export const RoleProtectedRoute = ({
  allowedRoles,
}: RoleProtectedRouteProps) => {
  const auth = useAppSelector((s) => s.auth);

  if (auth.status !== "authenticated" || !auth.user) {
    return <Navigate to={ROUTES.login.path} replace />;
  }

  if (!allowedRoles.includes(auth.user.role)) {
    return <Navigate to={ROUTES.forbidden.path} replace />;
  }

  return <Outlet />;
};
