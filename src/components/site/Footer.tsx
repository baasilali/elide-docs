export default function Footer() {
  return (
    <footer className="flex h-14 items-center border-t border-gray-200 bg-white/80 px-4 text-sm text-gray-500 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <span>© {new Date().getFullYear()} Elide.</span>
        <span className="hidden sm:inline">Built for polyglot runtimes.</span>
      </div>
    </footer>
  );
}

