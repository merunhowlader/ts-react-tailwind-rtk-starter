import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { ROUTES } from "@/routes/routes.config";

export const PublicRoute = () => {
  const auth = useAppSelector((s) => s.auth);

  if (auth.status === "authenticated") {
    return <Navigate to={ROUTES.dashboard.path} replace />;
  }

  return <Outlet />;
};
