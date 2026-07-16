import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import type { Project } from "@/lib/api/projects";

const MAX_RELATED = 5;

/**
 * Related projects — sama category dengan project yang lagi dibuka,
 * terbaru dulu, exclude diri sendiri. Ditampilkan di sidebar kanan
 * (desktop) / stack di bawah konten utama (mobile, lihat grid di
 * ProjectDetail.tsx: grid-cols-1 lg:grid-cols-[1fr_320px]).
 */
export function getRelatedProjects(
  allProjects: Project[],
  current: Project,
): Project[] {
  return allProjects
    .filter((p) => p.category === current.category && p.slug !== current.slug)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, MAX_RELATED);
}

function RelatedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex items-center gap-3 rounded-md border border-gray-alpha-400 bg-background-200 p-2.5 transition-all duration-200 hover:shadow-menu">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-gray-alpha-300 bg-gray-100">
        <img
          src={project.card.coverCard}
          alt={project.card.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-sans text-sm font-medium text-gray-1000">
            {project.card.title}
          </span>
          {project.private && (
            <Lock
              className="h-2.5 w-2.5 shrink-0 text-gray-700"
              strokeWidth={2}
            />
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

export function RelatedProjects({
  projects,
  category,
}: {
  projects: Project[];
  category: string;
}) {
  if (projects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.25,
        ease: [0.175, 0.885, 0.32, 1.1],
      }}
      // Border-top di sini bikin sidebar punya pemisah visual yang sama
      // dengan section kiri (About/Tech stack) meskipun tingginya beda —
      // di mobile (stacked), border ini juga yang misahin dari konten atas.
      className="mt-10 border-t border-gray-alpha-400 pt-10 lg:mt-0 lg:border-t-0 lg:pt-0">
      <h2 className="font-sans text-sm font-medium uppercase tracking-wide text-gray-800">
        More {category} projects
      </h2>
      <div className="mt-4 space-y-2">
        {projects.map((project) => (
          <RelatedProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </motion.div>
  );
}
