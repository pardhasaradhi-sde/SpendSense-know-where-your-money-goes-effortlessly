import { Loader } from "@/components/ui/loader";

export default function MainLoading() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader size="large" />
        <p className="text-muted-foreground text-lg">Loading your data...</p>
      </div>
    </div>
  );
}
