"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";

import { buttonVariants } from "@/lib/button";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative text-gray-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-300",
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

