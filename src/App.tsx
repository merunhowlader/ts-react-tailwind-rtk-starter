import { Provider } from "react-redux";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/app/store";
import { router } from "@/routes";
import { AuthGate } from "@/features/auth/AuthGate";
import { ErrorBoundary } from "@/components/ErrorBoundary";
export const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <AuthGate>
        <RouterProvider router={router} />
        <Toaster />
      </AuthGate>
    </Provider>
  </ErrorBoundary>
);
