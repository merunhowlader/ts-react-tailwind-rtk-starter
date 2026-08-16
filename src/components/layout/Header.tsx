import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { buttonVariants } from "@/lib/button-variants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/routes/routes.config";
import { loggedOut } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/features/auth/authApi";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton: boolean;
}

export const Header = ({ onMenuClick, showMenuButton }: HeaderProps) => {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(loggedOut());
    toast.success("Logged out");
    navigate(ROUTES.login.path);
  };

  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="text-lg"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        )}
        <Link to={ROUTES.home.path} className="font-semibold">
          Starter
        </Link>
      </div>

      {auth.status === "authenticated" && auth.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {auth.user.name.charAt(0).toUpperCase()}
            </span>
            <span className="hidden sm:inline">{auth.user.name}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(ROUTES.profile.path)}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          to={ROUTES.login.path}
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Login
        </Link>
      )}
    </header>
  );
};
