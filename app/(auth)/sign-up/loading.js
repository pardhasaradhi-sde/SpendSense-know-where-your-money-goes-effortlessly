import { Loader } from "@/components/ui/loader";

export default function SignUpLoading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
      <div className="flex flex-col items-center gap-4">
        <Loader size="large" />
        <p className="text-muted-foreground text-lg">Loading sign up...</p>
      </div>
    </div>
  );
}
