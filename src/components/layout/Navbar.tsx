import { useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-alpha-400 bg-background-100/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-300 items-center justify-between px-6">
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="font-mono text-sm font-medium tracking-tight text-gray-1000">
          {SITE_CONFIG.initials}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <RouterNavLink
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-sm px-3 py-2 font-sans text-sm text-gray-900 transition-colors hover:text-gray-1000",
                    isActive && "text-gray-1000",
                  )
                }>
                {link.label}
              </RouterNavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-gray-1000 hover:bg-gray-100">
            {isMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <ul className="flex flex-col border-t border-gray-alpha-400 bg-background-100 px-6 py-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <RouterNavLink
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-sm px-2 py-3 font-sans text-sm text-gray-900",
                    isActive && "text-gray-1000",
                  )
                }>
                {link.label}
              </RouterNavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
