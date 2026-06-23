import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-black text-stone-50">Page not found</h1>
      <p className="mt-4 text-stone-400">This route does not match an existing SAND: Raiders of Sophie wiki page.</p>
      <Link href="/" className="mt-7 rounded-md bg-amber-400 px-5 py-3 text-sm font-black text-stone-950 hover:bg-amber-300">
        Back to home
      </Link>
    </main>
  );
}
