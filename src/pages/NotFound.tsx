import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Title } from "@/components/common/Title";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function NotFound() {
  return (
    <>
      <Title
        title="404 — Page not found"
        description="Halaman yang lo cari nggak ketemu. Balik ke beranda atau jelajahi halaman lain."
        path="/404"
      />
      <section className="relative overflow-hidden">
        <div className="bg-grid-fade absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-160 flex-col items-center justify-center px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
            className="flex items-center gap-2 rounded-full border border-gray-alpha-400 bg-background-100 px-3 py-1 shadow-raised">
            <span className="h-1.5 w-1.5 rounded-full bg-red-700" />
            <span className="font-sans text-xs text-gray-900">Error 404</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.05,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="mt-6 font-mono text-[64px] leading-none font-semibold tracking-[-2.4px] text-gray-1000 sm:text-[96px] sm:tracking-[-4px]">
            404
          </motion.h1>

          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="mt-4 text-2xl font-semibold tracking-[-0.96px] text-gray-1000 sm:text-3xl">
            Page not found
          </motion.h2>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.15,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="mt-3 max-w-120 text-base text-gray-900">
            The link might have a typo, the page might have been moved, or it
            simply never existed here.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="flex h-10 items-center gap-1.5 rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85">
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
              Return to the homepage
            </Link>
            <Link
              to="/projects"
              className="flex h-10 items-center gap-1.5 rounded-sm border border-gray-alpha-400 bg-background-100 px-4 font-sans text-sm font-medium text-gray-1000 transition-colors hover:bg-gray-100">
              <Compass className="h-3.5 w-3.5" strokeWidth={2} />
              View projects
            </Link>
          </motion.div>

          <motion.nav
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.25,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            aria-label="Quick links"
            className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-gray-alpha-400 pt-6">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-mono text-xs text-gray-700 underline-offset-4 transition-colors hover:text-gray-1000 hover:underline">
                {link.label}
              </Link>
            ))}
          </motion.nav>
        </div>
      </section>
    </>
  );
}
