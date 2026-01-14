import { Loader } from "@/components/ui/loader";

export default function CreateTransactionLoading() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-muted rounded w-2/5"></div>
          <div className="h-5 bg-muted rounded w-3/5"></div>
        </div>

        {/* Form container skeleton */}
        <div className="rounded-xl border bg-card shadow p-8 space-y-8 animate-pulse">
          {/* Receipt scanner area */}
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="h-48 bg-muted rounded border-2 border-dashed"></div>
          </div>

          <div className="h-px bg-border"></div>

          {/* Form fields skeleton */}
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
              ))}
            </div>

            {/* Description field */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-24 bg-muted rounded"></div>
            </div>

            {/* Button skeleton */}
            <div className="h-12 bg-muted rounded w-full"></div>
          </div>
        </div>

        {/* Loading overlay */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader size="default" />
            <p className="text-muted-foreground">Setting up transaction form...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
