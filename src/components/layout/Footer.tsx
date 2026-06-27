import { Link } from "react-router-dom";
import { FOOTER_COLUMNS, FOOTER_NOTE, SITE_CONFIG, SOCIAL_LINKS } from "@/constants";
import { SOCIAL_ICONS } from "@/lib/social-icons";

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-alpha-400 bg-background-200">
      <div className="mx-auto max-w-300 px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              to="/"
              className="font-mono text-sm font-medium text-gray-1000"
            >
              {SITE_CONFIG.initials}
            </Link>
            <p className="mt-3 max-w-50 text-sm text-gray-900">
              {SITE_CONFIG.tagline}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target={isExternalHref(social.href) ? "_blank" : undefined}
                    rel={
                      isExternalHref(social.href)
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-sm text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-1000"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-sans text-sm font-medium text-gray-1000">
                {column.title}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-900 transition-colors hover:text-gray-1000"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-900 transition-colors hover:text-gray-1000"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-gray-alpha-400 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-800">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-800">{FOOTER_NOTE}</p>
        </div>
      </div>
    </footer>
  );
}