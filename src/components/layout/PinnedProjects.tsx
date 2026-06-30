import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { projectsApi, type Project } from "@/lib/api/projects";

function PinnedProjectCard({ project }: { project: Project }) {
  const isMobile = project.category === "mobile";
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-md border border-gray-alpha-400 bg-background-200 shadow-raised transition-all duration-300 hover:-translate-y-1 hover:shadow-modal">
      <div
        className={`relative w-full overflow-hidden bg-gray-100 ${isMobile ? "aspect-9/16" : "aspect-video"}`}>
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
        <h3 className="font-sans text-base font-semibold text-gray-1000">
          {project.card.title}
        </h3>
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

function PinnedProjectSkeleton() {
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
            <div className="grid gap-4 sm:grid-cols-2">
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
