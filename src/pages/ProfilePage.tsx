import { useAppSelector } from "@/app/hooks";

export const ProfilePage = () => {
  const auth = useAppSelector((s) => s.auth);
  if (auth.status !== "authenticated" || !auth.user) return null; // guaranteed by ProtectedRoute

  const { name, email, role } = auth.user;

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="space-y-2 rounded-lg border border-border p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Name</span>
          <span>{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Email</span>
          <span>{email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Role</span>
          <span className="capitalize">{role}</span>
        </div>
      </div>
    </div>
  );
};
