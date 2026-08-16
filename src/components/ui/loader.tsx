import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
} as const;

export const Loader = ({ size = "md", className, label }: LoaderProps) => (
  <div className="flex items-center gap-2">
    <div
      role="status"
      aria-label={label ?? "Loading"}
      className={cn(
        "animate-spin rounded-full border-muted border-t-primary",
        sizeClasses[size],
        className,
      )}
    />
    {label && <span className="text-sm text-muted-foreground">{label}</span>}
  </div>
);
