import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Smartphone,
  Globe,
  LayoutGrid,
  List,
  AlignJustify,
} from "lucide-react";
import { PROJECTS, type ProjectCategory } from "@/constants/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

type Filter = "all" | ProjectCategory;
type ViewMode = "grid" | "list" | "detail";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
];

const VIEW_MODES: {
  icon: React.ElementType;
  value: ViewMode;
  label: string;
}[] = [
  { icon: LayoutGrid, value: "grid", label: "Grid" },
  { icon: List, value: "list", label: "List" },
  { icon: AlignJustify, value: "detail", label: "Detail" },
];

// ─── Card variants ────────────────────────────────────────────────────────────

function ProjectCardGrid({ project }: { project: (typeof PROJECTS)[number] }) {
  const isMobile = project.category === "mobile";

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-md border border-gray-alpha-400 bg-background-200 shadow-raised transition-all duration-300 hover:-translate-y-1 hover:shadow-modal">
      {/* Cover — portrait untuk mobile, landscape untuk web */}
      <div
        className={`relative w-full overflow-hidden bg-gray-100 ${
          isMobile ? "aspect-9/16" : "aspect-video"
        }`}>
        <img
          src={project.card.coverCard}
          alt={project.card.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {project.private && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-gray-alpha-400 bg-background-100/90 px-2 py-1 backdrop-blur-sm">
            <Lock className="h-2.5 w-2.5 text-gray-700" strokeWidth={2} />
            <span className="font-mono text-[10px] text-gray-700">private</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-sans text-base font-semibold text-gray-1000">
          {project.card.title}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-6 text-gray-900">
          {project.card.shortDesc}
        </p>
        <div className="mt-4 flex items-center gap-1 font-sans text-xs font-medium text-blue-700">
          View project
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </div>
      </div>
    </Link>
  );
}

function ProjectCardList({ project }: { project: (typeof PROJECTS)[number] }) {
  const isMobile = project.category === "mobile";

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex items-center gap-4 rounded-md border border-gray-alpha-400 bg-background-200 p-3 shadow-raised transition-all duration-200 hover:shadow-menu">
      {/* Thumbnail */}
      <div
        className={`shrink-0 overflow-hidden rounded-sm border border-gray-alpha-300 bg-gray-100 ${
          isMobile ? "h-16 w-9" : "h-12 w-20"
        }`}>
        <img
          src={project.card.coverCard}
          alt={project.card.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-sans text-sm font-semibold text-gray-1000">
            {project.card.title}
          </span>
          {project.private && (
            <span className="flex shrink-0 items-center gap-1 rounded-full border border-gray-alpha-400 bg-background-100 px-2 py-0.5 font-mono text-[10px] text-gray-700">
              <Lock className="h-2.5 w-2.5" strokeWidth={2} />
              private
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-gray-800">
          {project.card.shortDesc}
        </p>
      </div>

      <ArrowRight
        className="h-3.5 w-3.5 shrink-0 text-gray-600 transition-transform group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </Link>
  );
}

function ProjectCardDetail({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  const isMobile = project.category === "mobile";

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex gap-6 rounded-md border border-gray-alpha-400 bg-background-200 p-5 shadow-raised transition-all duration-200 hover:shadow-menu">
      {/* Cover */}
      <div
        className={`shrink-0 overflow-hidden rounded-sm border border-gray-alpha-300 bg-gray-100 ${
          isMobile ? "h-40 w-22.5" : "h-32 w-52"
        }`}>
        <img
          src={project.card.coverCard}
          alt={project.card.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-sans text-base font-semibold text-gray-1000">
              {project.card.title}
            </h2>
            {project.private && (
              <span className="flex items-center gap-1 rounded-full border border-gray-alpha-400 bg-background-100 px-2 py-0.5 font-mono text-[10px] text-gray-700">
                <Lock className="h-2.5 w-2.5" strokeWidth={2} />
                private
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-6 text-gray-900">
            {project.card.shortDesc}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-700">
            <span className="capitalize">{project.category}</span>
            {project.details.demo?.href && (
              <span className="text-green-700">Live demo</span>
            )}
            {project.details.repo?.href && <span>Repo available</span>}
          </div>
          <div className="flex items-center gap-1 font-sans text-xs font-medium text-blue-700">
            View project
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <div className="flex items-center gap-4 rounded-md border border-dashed border-gray-alpha-400 bg-background-200 p-3">
        <div className="h-12 w-20 shrink-0 rounded-sm bg-gray-alpha-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded-sm bg-gray-alpha-200" />
          <div className="h-3 w-2/3 rounded-sm bg-gray-alpha-100" />
        </div>
      </div>
    );
  }
  if (viewMode === "detail") {
    return (
      <div className="flex gap-6 rounded-md border border-dashed border-gray-alpha-400 bg-background-200 p-5">
        <div className="h-32 w-52 shrink-0 rounded-sm bg-gray-alpha-100" />
        <div className="flex-1 space-y-3 pt-1">
          <div className="h-4 w-1/3 rounded-sm bg-gray-alpha-200" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded-sm bg-gray-alpha-100" />
            <div className="h-3 w-4/5 rounded-sm bg-gray-alpha-100" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-dashed border-gray-alpha-400 bg-background-200">
      <div className="aspect-video w-full bg-gray-alpha-100" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-4 w-2/3 rounded-sm bg-gray-alpha-200" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded-sm bg-gray-alpha-100" />
          <div className="h-3 w-4/5 rounded-sm bg-gray-alpha-100" />
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({
  eyebrow,
  icon: Icon,
  projects,
  viewMode,
  isSkeleton = false,
}: {
  eyebrow: string;
  icon: React.ElementType;
  projects: typeof PROJECTS;
  viewMode: ViewMode;
  isSkeleton?: boolean;
}) {
  const isMobileSection = eyebrow === "Mobile";

  // Grid layout: mobile projects lebih ramping — 3 kolom di sm, web tetap 2
  const gridClass =
    viewMode === "grid"
      ? isMobileSection
        ? "grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        : "grid gap-4 sm:grid-cols-2"
      : "flex flex-col gap-3";

  return (
    <div className="mt-16 first:mt-0">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-gray-700" strokeWidth={2} />
          <span className="font-sans text-xs font-medium uppercase tracking-wide text-gray-800">
            {eyebrow}
          </span>
        </div>
        <div className="h-px flex-1 bg-gray-alpha-300" />
        <span className="font-mono text-[10px] tabular-nums text-gray-600">
          {isSkeleton
            ? "coming soon"
            : `${String(projects.length).padStart(2, "0")} projects`}
        </span>
      </div>

      <div className={gridClass}>
        {isSkeleton ? (
          <>
            <SkeletonCard viewMode={viewMode} />
            <SkeletonCard viewMode={viewMode} />
          </>
        ) : (
          projects.map((project) => {
            if (viewMode === "list")
              return <ProjectCardList key={project.slug} project={project} />;
            if (viewMode === "detail")
              return <ProjectCardDetail key={project.slug} project={project} />;
            return <ProjectCardGrid key={project.slug} project={project} />;
          })
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const webPublic = PROJECTS.filter((p) => p.category === "web" && !p.private);
  const webPrivate = PROJECTS.filter((p) => p.category === "web" && p.private);
  const mobileProjects = PROJECTS.filter((p) => p.category === "mobile");

  const showWeb = activeFilter === "all" || activeFilter === "web";
  const showMobile = activeFilter === "all" || activeFilter === "mobile";

  return (
    <section className="mx-auto max-w-300 px-6 py-20 sm:py-28">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
        className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
        <span className="font-sans text-xs font-medium uppercase tracking-wide text-gray-900">
          Projects
        </span>
      </motion.div>

      {/* Heading + controls row */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{
          duration: 0.4,
          delay: 0.05,
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-[-1.28px] text-gray-1000 sm:text-4xl sm:tracking-[-2.4px]">
          Things I've built.
        </h1>

        <div className="flex items-center gap-2">
          {/* Filter pills */}
          <div className="flex items-center gap-1 rounded-sm border border-gray-alpha-400 bg-background-200 p-1">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`rounded-xs px-3 py-1 font-sans text-xs font-medium transition-colors duration-150 ${
                  activeFilter === f.value
                    ? "bg-gray-1000 text-background-100"
                    : "text-gray-800 hover:text-gray-1000"
                }`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 rounded-sm border border-gray-alpha-400 bg-background-200 p-1">
            {VIEW_MODES.map(({ icon: Icon, value, label }) => (
              <button
                key={value}
                onClick={() => setViewMode(value)}
                aria-label={label}
                className={`flex h-6 w-7 items-center justify-center rounded-xs transition-colors duration-150 ${
                  viewMode === value
                    ? "bg-gray-1000 text-background-100"
                    : "text-gray-800 hover:text-gray-1000"
                }`}>
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sections */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        className="mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${viewMode}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}>
            {showWeb && (
              <>
                {webPublic.length > 0 && (
                  <Section
                    eyebrow="Web — Public"
                    icon={Globe}
                    projects={webPublic}
                    viewMode={viewMode}
                  />
                )}
                {webPrivate.length > 0 && (
                  <Section
                    eyebrow="Web — Private"
                    icon={Lock}
                    projects={webPrivate}
                    viewMode={viewMode}
                  />
                )}
              </>
            )}

            {showMobile && (
              <Section
                eyebrow="Mobile"
                icon={Smartphone}
                projects={mobileProjects}
                viewMode={viewMode}
                isSkeleton={mobileProjects.length === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
