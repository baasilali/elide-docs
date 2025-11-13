import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold text-gray-900">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-gray-600">
        We could not locate that document. It may have been moved or renamed. Please pick another entry
        from the sidebar or return to the homepage.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
      >
        Back to overview
      </Link>
    </div>
  );
}

