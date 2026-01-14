import { Loader } from "@/components/ui/loader";

export default function AuthLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader size="large" />
        <p className="text-muted-foreground text-lg">Authenticating...</p>
      </div>
    </div>
  );
}
