import { SkeletonCard, SkeletonTable } from "@/components/ui/loader";

export default function AccountLoading() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-8">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="animate-pulse space-y-3">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-5 bg-muted rounded w-1/3"></div>
        </div>

        {/* Account overview skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        {/* Chart skeleton */}
        <div className="rounded-xl border bg-card shadow p-6 space-y-4 animate-pulse">
          <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-80 bg-muted rounded"></div>
        </div>

        {/* Transactions table skeleton */}
        <SkeletonTable />
      </div>
    </div>
  );
}
