import { useAppSelector } from "@/app/hooks";

export const DashboardPage = () => {
  const auth = useAppSelector((s) => s.auth);

  if (auth.status !== "authenticated" || !auth.user) return null; // narrowed by ProtectedRoute, this is just a type-safety guard

  return <h1 className="text-2xl font-semibold">Welcome, {auth.user.name}</h1>;
};
