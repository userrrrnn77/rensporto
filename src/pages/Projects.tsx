import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Smartphone, Globe } from "lucide-react";
import { PROJECTS, type ProjectCategory } from "@/constants/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

type Filter = "all" | ProjectCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
];

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const isPrivate = project.private;

  return (
    <Link
      to={isPrivate ? "#" : `/projects/${project.slug}`}
      onClick={(e) => isPrivate && e.preventDefault()}
      className={`group relative flex flex-col overflow-hidden rounded-md border bg-background-200 shadow-raised transition-all duration-300 ${
        isPrivate
          ? "cursor-default border-gray-alpha-300"
          : "border-gray-alpha-400 hover:-translate-y-1 hover:shadow-modal"
      }`}>
      {/* Cover image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={project.card.coverCard}
          alt={project.card.title}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            isPrivate ? "grayscale" : "group-hover:scale-[1.03]"
          }`}
        />

        {/* Private overlay */}
        {isPrivate && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background-100/60 backdrop-blur-[2px]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-alpha-400 bg-background-200">
              <Lock className="h-4 w-4 text-gray-700" strokeWidth={2} />
            </div>
            <span className="font-mono text-[10px] text-gray-700">private</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h2
            className={`font-sans text-base font-semibold ${
              isPrivate ? "text-gray-700" : "text-gray-1000"
            }`}>
            {project.card.title}
          </h2>
        </div>
        <p
          className={`mt-2 flex-1 text-sm leading-6 ${
            isPrivate ? "text-gray-600" : "text-gray-900"
          }`}>
          {project.card.shortDesc}
        </p>

        {!isPrivate && (
          <div className="mt-4 flex items-center gap-1 font-sans text-xs font-medium text-blue-700">
            View project
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </div>
        )}
      </div>
    </Link>
  );
}

function SkeletonCard() {
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

function Section({
  eyebrow,
  icon: Icon,
  projects,
  isSkeleton = false,
}: {
  eyebrow: string;
  icon: React.ElementType;
  projects: typeof PROJECTS;
  isSkeleton?: boolean;
}) {
  return (
    <div className="mt-16 first:mt-0">
      {/* Section label */}
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

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {isSkeleton ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const webPublic = PROJECTS.filter((p) => p.category === "web" && !p.private);
  const webPrivate = PROJECTS.filter((p) => p.category === "web" && p.private);
  const mobileProjects = PROJECTS.filter((p) => p.category === "mobile");

  const showWeb = activeFilter === "all" || activeFilter === "web";
  const showMobile = activeFilter === "all" || activeFilter === "mobile";

  return (
    <section className="mx-auto max-w-300 px-6 py-20 sm:py-28">
      {/* Eyebrow */}
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

      {/* Heading + filter row */}
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
            key={activeFilter}
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
                  />
                )}
                {webPrivate.length > 0 && (
                  <Section
                    eyebrow="Web — Private"
                    icon={Lock}
                    projects={webPrivate}
                  />
                )}
              </>
            )}

            {showMobile && (
              <Section
                eyebrow="Mobile"
                icon={Smartphone}
                projects={mobileProjects}
                isSkeleton={mobileProjects.length === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
