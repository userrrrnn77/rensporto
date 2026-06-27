import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="relative flex h-9 w-9 items-center justify-center rounded-sm border border-gray-alpha-400 bg-background-100 text-gray-900 transition-colors hover:bg-gray-100 active:bg-gray-200">
      <Sun
        className="absolute h-4 w-4 scale-100 transition-all duration-150 dark:scale-0"
        strokeWidth={1.75}
      />
      <Moon
        className="absolute h-4 w-4 scale-0 transition-all duration-150 dark:scale-100"
        strokeWidth={1.75}
      />
    </button>
  );
}
