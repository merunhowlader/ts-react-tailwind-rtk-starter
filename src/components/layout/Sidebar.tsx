import { NavItem } from "./NavItem";
import { navItems } from "@/routes/navItems";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => (
  <>
    {/* Mobile-only overlay backdrop */}
    {open && (
      <div
        className="fixed inset-0 z-40 bg-black/40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
    )}

    <aside
      className={cn(
        "z-50 shrink-0 overflow-hidden border-r border-border bg-background transition-all duration-200",
        "fixed inset-y-0 left-0 w-64 -translate-x-full md:static md:translate-x-0",
        open && "translate-x-0",
        open ? "md:w-56" : "md:w-0 md:border-r-0",
      )}
    >
      <nav className="w-64 space-y-1 p-4 md:w-56">
        {navItems.map((item) => (
          <NavItem key={item.label} item={item} />
        ))}
      </nav>
    </aside>
  </>
);
