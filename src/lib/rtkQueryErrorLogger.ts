import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface RtkQueryErrorPayload {
  status?: number | string;
  data?: { message?: string };
}

const LOCALLY_HANDLED_ENDPOINTS = new Set(["login", "register"]);

const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";

/** Only trust the server's message if it's a short, plain string —
 * defends against ever rendering something unexpected (a stack trace,
 * an HTML error page body, etc.) directly to the user. */
const getSafeErrorMessage = (payload: RtkQueryErrorPayload): string => {
  const message = payload?.data?.message;
  if (
    typeof message === "string" &&
    message.length > 0 &&
    message.length < 200
  ) {
    return message;
  }
  return GENERIC_ERROR_MESSAGE;
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const endpointName = (action.meta as { arg?: { endpointName?: string } })
      ?.arg?.endpointName;

    if (endpointName && LOCALLY_HANDLED_ENDPOINTS.has(endpointName)) {
      return next(action);
    }

    const payload = action.payload as RtkQueryErrorPayload;

    if (payload?.status !== 401) {
      toast.error(getSafeErrorMessage(payload));
    }

    // Verbose logging only in dev — never expose full action/payload
    // details (which may include request bodies) in production.
    if (import.meta.env.DEV) {
      console.error("RTK Query error:", action);
    }

    // Production: send to an error-tracking service instead.
    // Example (once you add Sentry or similar):
    // if (import.meta.env.PROD) {
    //   captureException(new Error(getSafeErrorMessage(payload)), { extra: { status: payload?.status } });
    // }
  }

  return next(action);
};
