import type { ComponentType } from "react";
import type { Role } from "@/types";

export interface NavItem {
  path?: string;
  label: string;
  icon?: ComponentType;
  roles?: readonly Role[];
  children?: NavItem[];
}
