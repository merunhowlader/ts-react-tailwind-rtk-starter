import type { ComponentType } from "react";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import type { Role } from "@/types";

interface RouteConfig {
  path: string;
  label: string;
  element: ComponentType;
  roles?: Role[];
}

export const ROUTES = {
  home: {
    path: "/",
    label: "Home",
    element: HomePage,
  },
  notFound: {
    path: "*",
    label: "Not Found",
    element: NotFoundPage,
  },
} as const satisfies Record<string, RouteConfig>;
