import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

interface AuthSliceState {
  status: "idle" | "loading" | "authenticated" | "unauthenticated" | "error";
  user: User | null;
  error: string | null;
}

const initialState: AuthSliceState = {
  status: "idle",
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStarted: (state) => {
      state.status = "loading";
      state.error = null;
    },
    sessionEstablished: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.user = null;
      state.error = action.payload;
    },
    loggedOut: (state) => {
      state.status = "unauthenticated";
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginStarted, sessionEstablished, loginFailed, loggedOut } =
  authSlice.actions;
export default authSlice.reducer;
