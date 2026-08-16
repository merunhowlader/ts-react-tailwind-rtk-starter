import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "@/app/hooks";
import { ROUTES } from "@/routes/routes.config";
import { Loader } from "./ui/loader";

export const ProtectedRoute = () => {
  const auth = useAppSelector((s) => s.auth);
  const location = useLocation();

  if (auth.status === "loading" || auth.status === "idle") {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        <Loader label="Loading…" />
      </div>
    );
  }

  if (auth.status !== "authenticated") {
    return (
      <Navigate to={ROUTES.login.path} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};
