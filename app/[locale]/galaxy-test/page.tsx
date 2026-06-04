import Galaxy from "@/components/Galaxy";

export default function GalaxyTestPage() {
  return (
    <main className="min-h-screen bg-[#16161e] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-lg font-medium text-neutral-400">
          Galaxy canvas — pixel reference test
        </h1>
        <p className="mb-6 max-w-2xl text-sm text-neutral-500">
          Compare with{" "}
          <a
            href="https://amanrwt.com/"
            className="text-sky-400 underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            amanrwt.com
          </a>{" "}
          hero (desktop, top-right). Cards use the same copy as the reference for
          comparison; pass your own <code className="text-neutral-400">cards</code> prop
          later.
        </p>
        <Galaxy className="h-[min(72vh,640px)] w-full border border-white/[0.06]" />
      </div>
    </main>
  );
}
