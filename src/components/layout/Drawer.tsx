import { NavItem } from "./NavItem";
import { navItems } from "@/routes/navItems";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

/** Mobile-only slide-over. Same nav data/component as Sidebar — just a
 * different container, so nav logic never has to be maintained twice. */
export const Drawer = ({ open, onClose }: DrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay — click to close */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="absolute left-0 top-0 h-full w-64 bg-background p-4 shadow-lg">
        <button
          onClick={onClose}
          className="mb-4 text-sm text-muted-foreground"
        >
          ✕ Close
        </button>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
      </div>
    </div>
  );
};
