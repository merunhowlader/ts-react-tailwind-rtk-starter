import { createBrowserRouter } from "react-router";
import { Layout } from "@/components/Layout";
import { ROUTES } from "./routes.config";

export const router = createBrowserRouter([
  {
    path: ROUTES.home.path,
    element: <Layout />,
    children: [
      { index: true, element: <ROUTES.home.element /> },
      { path: ROUTES.notFound.path, element: <ROUTES.notFound.element /> },
    ],
  },
]);
