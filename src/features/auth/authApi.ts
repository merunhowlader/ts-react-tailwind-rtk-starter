import { baseApi } from "@/api/baseApi";
import { setCsrfToken, clearCsrfToken } from "./csrf";
import type { User } from "@/types";

interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  user: User;
  csrfToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        const { data } = await queryFulfilled;
        setCsrfToken(data.csrfToken);
      },
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        await queryFulfilled;
        clearCsrfToken();
      },
      invalidatesTags: ["User"],
    }),
    me: builder.query<LoginResponse, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi;
