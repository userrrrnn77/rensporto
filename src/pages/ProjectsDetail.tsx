import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Lock, Download } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { projectsApi, type Project } from "@/lib/api/projects";
import * as SiIcons from "react-icons/si";
import type { IconType } from "react-icons";
import { Title } from "@/components/common/Title";

function resolveTechIcon(iconKey: string): IconType | null {
  return (SiIcons as Record<string, IconType>)[iconKey] ?? null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <section className="mx-auto max-w-300 px-6 py-20 sm:py-28">
      <div className="h-4 w-12 animate-pulse rounded-sm bg-gray-alpha-200" />
      <div className="mt-6 space-y-3">
        <div className="h-8 w-2/3 animate-pulse rounded-sm bg-gray-alpha-200" />
        <div className="h-4 w-1/3 animate-pulse rounded-sm bg-gray-alpha-100" />
      </div>
      <div className="mt-8 aspect-video w-full animate-pulse rounded-md bg-gray-alpha-100" />
      <div className="mt-10 space-y-3 border-t border-gray-alpha-400 pt-10">
        <div className="h-4 w-32 animate-pulse rounded-sm bg-gray-alpha-200" />
        <div className="h-3 w-full animate-pulse rounded-sm bg-gray-alpha-100" />
        <div className="h-3 w-4/5 animate-pulse rounded-sm bg-gray-alpha-100" />
        <div className="h-3 w-3/4 animate-pulse rounded-sm bg-gray-alpha-100" />
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    setNotFound(false);
    setActiveImage(0);
    projectsApi
      .getBySlug(slug)
      .then(setProject)
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) return <DetailSkeleton />;

  if (notFound || !project) {
    return (
      <section className="mx-auto flex max-w-300 flex-col items-center px-6 py-40 text-center">
        <p className="text-base text-gray-900">Project not found.</p>
        <Link
          to="/projects"
          className="mt-6 flex items-center gap-1.5 font-sans text-sm font-medium text-blue-700 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to projects
        </Link>
      </section>
    );
  }

  const { details, private: isPrivate, category } = project;

  const isMobile = category === "mobile";

  function handleDemoClick() {
    if (!details.demo?.href) {
      toast("Demo is not publicly available for this project.", {
        description: "This is a private internal tool.",
      });
      return;
    }
    window.open(details.demo.href, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="mx-auto max-w-300 px-6 py-20 sm:py-28">
      <Title
        title={details.title} // ganti: project.title
        description={details.description.slice(0, 10)} // ganti: project.desc
        path={`/projects/${slug}`}
      />

      {/* Back */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 font-sans text-xs font-medium text-gray-800 transition-colors hover:text-gray-1000">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      </motion.div>

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{
          duration: 0.4,
          delay: 0.05,
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
            <span className="font-sans text-xs font-medium uppercase tracking-wide text-gray-900">
              Projects
            </span>
            {isPrivate && (
              <span className="flex items-center gap-1 rounded-full border border-gray-alpha-400 bg-background-200 px-2 py-0.5 font-mono text-[10px] text-gray-700">
                <Lock className="h-2.5 w-2.5" strokeWidth={2} />
                private
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-1.28px] text-gray-1000 sm:text-4xl sm:tracking-[-2.4px]">
            {details.title}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {isMobile ? (
            <button
              onClick={handleDemoClick}
              className="flex h-9 items-center gap-1.5 rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85">
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              {details.demo?.href ? "Download APK" : "Not available"}
            </button>
          ) : (
            <button
              onClick={handleDemoClick}
              className="flex h-9 items-center gap-1.5 rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85">
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              {details.demo?.href ? "Live demo" : "No demo"}
            </button>
          )}
          {details.repo?.href && (
            <a
              href={details.repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center gap-1.5 rounded-sm border border-gray-alpha-400 bg-background-100 px-4 font-sans text-sm font-medium text-gray-1000 transition-colors hover:bg-gray-100">
              <FaGithub className="h-3.5 w-3.5" />
              Repository
            </a>
          )}
        </div>
      </motion.div>

      {/* Images */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        className="mt-8">
        {isMobile ? (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {details.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 ${
                  i === activeImage
                    ? "h-120 w-55 border-blue-700 shadow-modal"
                    : "h-80 w-36.75 border-gray-alpha-300 opacity-60 hover:opacity-80"
                }`}>
                <img
                  src={img}
                  alt={`${details.title} screen ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-md border border-gray-alpha-400 bg-gray-100">
              <img
                src={details.images[activeImage]}
                alt={`${details.title} screenshot ${activeImage + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            {details.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {details.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border-2 transition-colors ${
                      i === activeImage
                        ? "border-blue-700"
                        : "border-gray-alpha-300 hover:border-gray-alpha-500"
                    }`}>
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Description */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{
          duration: 0.4,
          delay: 0.15,
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        className="mt-10 max-w-200 border-t border-gray-alpha-400 pt-10">
        <h2 className="font-sans text-sm font-medium uppercase tracking-wide text-gray-800">
          About this project
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-900 sm:text-lg sm:leading-8">
          {details.description}
        </p>
      </motion.div>

      {/* Tech stack */}
      {details.techStack && details.techStack.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: [0.175, 0.885, 0.32, 1.1],
          }}
          className="mt-10 max-w-200 border-t border-gray-alpha-400 pt-10">
          <h2 className="font-sans text-sm font-medium uppercase tracking-wide text-gray-800">
            Tech stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {details.techStack.map((tech, i) => {
              const Icon = resolveTechIcon(tech.icon);
              return (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-full border border-gray-alpha-400 bg-background-100 px-3 py-1.5 font-sans text-sm text-gray-900">
                  {Icon && <Icon className="h-4 w-4" />}
                  {tech.name}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </section>
  );
}
