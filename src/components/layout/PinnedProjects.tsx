import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { projectsApi, type Project } from "@/lib/api/projects";

function PinnedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex items-center gap-4 rounded-md border border-gray-alpha-400 bg-background-200 p-3 shadow-raised transition-all duration-200 hover:-translate-y-0.5 hover:shadow-menu">
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border border-gray-alpha-300 bg-gray-100 sm:h-18 sm:w-28">
        <img
          src={project.card.coverCard}
          alt={project.card.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {project.private && (
          <div className="absolute top-1 right-1 flex items-center gap-0.5 rounded-full border border-gray-alpha-400 bg-background-100/90 px-1.5 py-0.5 backdrop-blur-sm">
            <Lock className="h-2 w-2 text-gray-700" strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-sans text-sm font-semibold text-gray-1000">
          {project.card.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-800">
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

function PinnedProjectSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-md border border-dashed border-gray-alpha-400 bg-background-200 p-3">
      <div className="h-16 w-24 shrink-0 rounded-sm bg-gray-alpha-100 sm:h-18 sm:w-28" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3.5 w-1/2 rounded-sm bg-gray-alpha-200" />
        <div className="h-3 w-4/5 rounded-sm bg-gray-alpha-100" />
      </div>
    </div>
  );
}

export function PinnedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    projectsApi
      .list()
      .then((data) => setProjects(data.filter((p) => p.pins)))
      .catch(() => setFetchError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && !fetchError && projects.length === 0) return null;

  return (
    <section className="border-t border-gray-alpha-200">
      <div className="mx-auto max-w-300 px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.96px] text-gray-1000">
              Pinned projects.
            </h2>
            <p className="mt-3 max-w-120 text-sm text-gray-900">
              A few things worth a closer look.
            </p>
          </div>
          <Link
            to="/projects"
            className="flex items-center gap-1.5 font-sans text-xs font-medium text-gray-800 transition-colors hover:text-gray-1000">
            View all projects
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-12">
          {fetchError ? (
            <p className="py-12 text-center text-sm text-gray-700">
              Failed to load projects. Please try again later.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {isLoading ? (
                <>
                  <PinnedProjectSkeleton />
                  <PinnedProjectSkeleton />
                </>
              ) : (
                projects.map((project) => (
                  <PinnedProjectCard key={project.slug} project={project} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
