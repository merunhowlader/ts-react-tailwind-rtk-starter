import { type ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useMeQuery } from "./authApi";
import { sessionEstablished, loggedOut } from "./authSlice";
import { setCsrfToken } from "./csrf";

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const { data, isLoading, isSuccess, isError } = useMeQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setCsrfToken(data.csrfToken);
      dispatch(sessionEstablished(data.user));
    } else if (isError) {
      dispatch(loggedOut());
    }
  }, [isSuccess, isError, data, dispatch]);

  if (isLoading || auth.status === "idle") {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading session…
      </div>
    );
  }

  return children;
};
