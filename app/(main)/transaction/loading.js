import { Loader } from "@/components/ui/loader";

export default function TransactionLoading() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Form skeleton */}
        <div className="rounded-xl border bg-card shadow p-6 space-y-6 animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          
          {/* Form fields skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-10 bg-muted rounded"></div>
              </div>
            ))}
          </div>

          {/* Button skeleton */}
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex flex-col items-center gap-4">
            <Loader size="default" />
            <p className="text-muted-foreground">Preparing transaction form...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
