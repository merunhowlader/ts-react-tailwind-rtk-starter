import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { authSlice } from "@/features/auth/authSlice";
import {
  getCsrfToken,
  setCsrfToken,
  clearCsrfToken,
} from "@/features/auth/csrf";

const refreshMutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const csrf = getCsrfToken();
    if (csrf) headers.set("X-CSRF-Token", csrf);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await refreshMutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!refreshMutex.isLocked()) {
      const release = await refreshMutex.acquire();
      try {
        const refreshResult = await rawBaseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { csrfToken } = refreshResult.data as { csrfToken: string };
          setCsrfToken(csrfToken);
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          clearCsrfToken();
          api.dispatch(authSlice.actions.loggedOut());
        }
      } finally {
        release();
      }
    } else {
      await refreshMutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
