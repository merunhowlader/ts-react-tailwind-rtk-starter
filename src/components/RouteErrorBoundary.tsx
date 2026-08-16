import { useRouteError, isRouteErrorResponse } from "react-router";
import { Button } from "@/components/ui/button";

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "An unexpected error occurred";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">{message}</p>
      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </div>
  );
};
