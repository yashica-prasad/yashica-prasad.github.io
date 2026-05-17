import Link from "next/link";
import { Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-6 flex items-center justify-center gap-2 font-mono text-purple-400">
          <Terminal className="h-6 w-6" />
          <span className="text-2xl">ERROR</span>
        </div>

        <h1 className="mb-4 font-mono text-8xl text-[#22c55e]">404</h1>

        <p className="mb-2 font-mono text-xl text-foreground">Page Not Found</p>
        <p className="mb-8 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist in this hyperspace.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#22c55e] px-6 py-3 font-mono text-sm text-background transition-all hover:bg-[#22c55e]/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
