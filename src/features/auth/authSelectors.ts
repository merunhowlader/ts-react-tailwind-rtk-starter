import type { RootState } from "@/app/store";
import type { User } from "@/types";

export interface AuthenticatedUser {
  status: "authenticated";
  user: User;
}

export const selectIsAuthenticated = (
  state: RootState,
): state is RootState & { auth: { status: "authenticated" } } =>
  state.auth.status === "authenticated";

export const selectCurrentUser = (state: RootState): User | null =>
  state.auth.user;
