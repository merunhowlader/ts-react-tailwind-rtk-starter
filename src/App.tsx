import { Provider } from "react-redux";
import { RouterProvider } from "react-router/dom";
import { store } from "@/app/store";
import { router } from "@/routes";
import { AuthGate } from "@/features/auth/AuthGate";

export const App = () => (
  <Provider store={store}>
    <AuthGate>
      <RouterProvider router={router} />
    </AuthGate>
  </Provider>
);
