import { SkeletonCard, SkeletonTable } from "@/components/ui/loader";

export default function AccountDetailLoading() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-8">
      <div className="space-y-8">
        {/* Back button and header skeleton */}
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-24"></div>
          <div className="h-10 bg-muted rounded w-1/3"></div>
          <div className="h-5 bg-muted rounded w-1/2"></div>
        </div>

        {/* Stats cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        {/* Account chart skeleton */}
        <div className="rounded-xl border bg-card shadow p-6 space-y-4 animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="h-8 bg-muted rounded w-32"></div>
          </div>
          <div className="h-96 bg-muted rounded"></div>
        </div>

        {/* Transaction history skeleton */}
        <div className="space-y-4">
          <div className="flex justify-between items-center animate-pulse">
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="h-10 bg-muted rounded w-40"></div>
          </div>
          <SkeletonTable />
        </div>
      </div>
    </div>
  );
}
