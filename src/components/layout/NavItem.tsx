import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "@/app/hooks";
import type { NavItem as NavItemType } from "@/routes/nav.types";
import type { RootState } from "@/app/store";

/** A nav item with no `roles` is public. One with `roles` needs an
 * authenticated user whose role is in the list. */
const canView = (item: NavItemType, auth: RootState["auth"]): boolean => {
  if (!item.roles) return true;
  return (
    auth.status === "authenticated" &&
    !!auth.user &&
    item.roles.includes(auth.user.role)
  );
};

interface NavItemProps {
  item: NavItemType;
  depth?: number;
}

export const NavItem = ({ item, depth = 0 }: NavItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const auth = useAppSelector((s) => s.auth);

  if (!canView(item, auth)) return null;

  const visibleChildren =
    item.children?.filter((child) => canView(child, auth)) ?? [];
  const hasVisibleChildren = visibleChildren.length > 0;
  const isActive = item.path === location.pathname;

  return (
    <div style={{ paddingLeft: depth * 12 }}>
      {item.path ? (
        <Link
          to={item.path}
          className={`block rounded-md px-2 py-1.5 text-sm ${
            isActive
              ? "bg-secondary font-semibold text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {item.label}
        </Link>
      ) : (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm text-foreground"
        >
          {item.label}
          {hasVisibleChildren && <span>{expanded ? "▾" : "▸"}</span>}
        </button>
      )}

      {hasVisibleChildren && (item.path || expanded) && (
        <div>
          {visibleChildren.map((child) => (
            <NavItem key={child.label} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
