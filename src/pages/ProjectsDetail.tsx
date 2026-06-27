import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { PROJECTS } from "@/constants/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!project) {
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

  const { details, private: isPrivate } = project;

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

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={handleDemoClick}
            className="flex h-9 items-center gap-1.5 rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85">
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
            {details.demo?.href ? "Live demo" : "No demo"}
          </button>
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

      {/* Main image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        className="mt-8 overflow-hidden rounded-md border border-gray-alpha-400 bg-gray-100">
        <img
          src={details.images[activeImage]}
          alt={`${details.title} screenshot ${activeImage + 1}`}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Thumbnail strip */}
      {details.images.length > 1 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.4,
            delay: 0.13,
            ease: [0.175, 0.885, 0.32, 1.1],
          }}
          className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {details.images.map((img: string, i: number) => (
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
        </motion.div>
      )}

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
    </section>
  );
}
