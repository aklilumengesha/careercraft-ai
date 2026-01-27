import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto py-20 text-center">
      <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  );
}
