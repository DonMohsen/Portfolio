import Link from "next/link";
import { Button } from "@/components/ui/button";

/** No framer-motion — Next ships not-found into every route's client graph. */
export default function NotFound() {
  return (
    <div className="relative flex min-h-[101vh] flex-col items-center justify-center overflow-hidden bg-gray-900 px-6 text-center text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-lg"
        aria-hidden
      />
      <h1 className="relative z-10 animate-in fade-in slide-in-from-top-2 text-7xl font-bold tracking-tight duration-500">
        404
      </h1>
      <p className="relative z-10 mt-4 animate-in fade-in slide-in-from-bottom-2 text-lg text-gray-400 duration-500 delay-150">
        Oops! The page you are looking for does not exist.
      </p>
      <div className="relative z-10 mt-6 animate-in fade-in zoom-in-95 duration-500 delay-300">
        <Link href="/">
          <Button
            variant="default"
            className="rounded-lg px-6 py-2 text-lg font-medium"
          >
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
