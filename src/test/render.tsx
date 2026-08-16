import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/api/baseApi";
import authReducer from "@/features/auth/authSlice";

export const renderWithProviders = (ui: ReactElement, initialPath = "/") => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

  const router = createMemoryRouter([{ path: "/", element: ui }], {
    initialEntries: [initialPath],
  });

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};
