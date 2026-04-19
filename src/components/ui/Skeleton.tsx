import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
  variant?: "dark" | "cream";
};

export function Skeleton({ className, variant = "dark" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(variant === "cream" ? "skeleton-cream" : "skeleton", className)}
    />
  );
}

export function ProductCardSkeleton({ variant = "dark" }: { variant?: "dark" | "cream" }) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border",
        variant === "dark"
          ? "bg-off-black border-white/5"
          : "bg-white border-black/5",
      )}
    >
      <Skeleton variant={variant} className="aspect-[4/5] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton variant={variant} className="h-4 w-3/4" />
        <Skeleton variant={variant} className="h-3 w-1/2" />
        <Skeleton variant={variant} className="h-6 w-2/3 mt-4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({
  count = 8,
  variant = "dark",
}: {
  count?: number;
  variant?: "dark" | "cream";
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}
