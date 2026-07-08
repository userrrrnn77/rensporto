import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ABOUT_CONTENT,
  ABOUT_FUN_FACTS,
  ABOUT_TIMELINE,
  SKILL_CATEGORIES,
} from "@/constants";
import { SKILL_ICONS } from "@/lib/skill-icons";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import { AnimatedStat } from "@/components/layout/AnimatedStat";
import { analyticsApi } from "@/lib/api/analitycs";
import { useAsync } from "@/hooks/useAsync";
import { Link } from "react-router-dom";
import { Title } from "@/components/common/Title";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function formatCommits(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K+`;
  return `${n}+`;
}

export function About() {
  const { repos, commits, loading, error } = useGitHubStats();

  const analytics = useAsync(() => analyticsApi.stats(), []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const stats = [
    {
      label: "Projects shipped",
      rawValue: loading ? 0 : repos,
      suffix: "+",
    },
    {
      label: "Views Web",
      rawValue: analytics.data?.totalViews ?? 0,
      suffix: "",
    },
    {
      label: "Commits this year",
      rawValue: loading ? 0 : commits,
      formatter: formatCommits,
    },
  ];

  return (
    <section className="mx-auto max-w-300 px-6 py-20 sm:py-28">
      <Title
        title="About"
        description="Kenalan lebih jauh sama Rendy — background, pengalaman, dan tools yang dipakai sehari-hari sebagai full-stack developer."
        path="/about"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
        className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
        <span className="font-sans text-xs font-medium uppercase tracking-wide text-gray-900">
          {ABOUT_CONTENT.eyebrow}
        </span>
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
        className="mt-4 max-w-150 text-3xl font-semibold tracking-[-1.28px] text-gray-1000 sm:text-4xl sm:tracking-[-2.4px]">
        {ABOUT_CONTENT.heading}
      </motion.h1>

      <motion.dl
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{
          duration: 0.4,
          delay: 0.08,
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        className="mt-10 grid max-w-150 grid-cols-3 divide-x divide-gray-alpha-400 border-y border-gray-alpha-400 py-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 px-2">
            <AnimatedStat
              value={stat.rawValue}
              suffix={stat.suffix}
              loading={loading}
              error={error}
              formatter={stat.formatter}
            />
            <dt className="text-xs text-gray-800">{stat.label}</dt>
          </div>
        ))}
      </motion.dl>

      <div
        ref={scrollRef}
        className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: [0.175, 0.885, 0.32, 1.1],
          }}
          className="space-y-5">
          {ABOUT_CONTENT.bio.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-7 text-gray-900 sm:text-lg sm:leading-8">
              {paragraph}
            </p>
          ))}

          <div className="mt-20 pt-8">
            <h2 className="font-sans text-sm font-medium uppercase tracking-wide text-gray-800">
              The journey so far
            </h2>
            <div className="mt-6 space-y-8 pl-6">
              {ABOUT_TIMELINE.map((entry) => (
                <div key={entry.year} className="relative">
                  <span className="absolute top-1 -left-6.75 h-2.5 w-2.5 rounded-full border-2 border-background-100 bg-blue-700" />
                  <span className="font-mono text-xs text-gray-800">
                    {entry.year}
                  </span>
                  <h3 className="mt-1 font-sans text-base font-semibold text-gray-1000">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 max-w-150 text-sm leading-6 text-gray-900">
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="hidden lg:block">
          <motion.div style={{ y: cardY }} className="sticky top-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{
                duration: 0.4,
                delay: 0.15,
                ease: [0.175, 0.885, 0.32, 1.1],
              }}
              className="space-y-6 rounded-md border border-gray-alpha-400 bg-background-200 p-6">
              {SKILL_CATEGORIES.map((category) => (
                <div key={category.title}>
                  <h2 className="font-sans text-sm font-medium text-gray-1000">
                    {category.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const Icon = SKILL_ICONS[skill.icon];
                      return (
                        <Link
                          key={skill.name}
                          to={skill.href}
                          target="_blank"
                          className="flex items-center gap-1.5 rounded-full border border-gray-alpha-400 bg-background-100 px-3 py-1 font-mono text-xs text-gray-900">
                          <Icon className="h-3.5 w-3.5" />
                          {skill.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.4,
            delay: 0.15,
            ease: [0.175, 0.885, 0.32, 1.1],
          }}
          className="space-y-6 rounded-md border border-gray-alpha-400 bg-background-200 p-6 lg:hidden">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title}>
              <h2 className="font-sans text-sm font-medium text-gray-1000">
                {category.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const Icon = SKILL_ICONS[skill.icon];
                  return (
                    <span
                      key={skill.name}
                      className="flex items-center gap-1.5 rounded-full border border-gray-alpha-400 bg-background-100 px-3 py-1 font-mono text-xs text-gray-900">
                      <Icon className="h-3.5 w-3.5" />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{
          duration: 0.4,
          delay: 0.25,
          ease: [0.175, 0.885, 0.32, 1.1],
        }}
        className="mt-16 rounded-md border border-gray-alpha-400 bg-background-200 p-6">
        <h2 className="font-sans text-sm font-medium uppercase tracking-wide text-gray-800">
          Fun Facts
        </h2>
        <ul className="mt-4 space-y-2">
          {ABOUT_FUN_FACTS.map((fact, index) => (
            <li
              key={index}
              className="flex gap-2 text-sm leading-6 text-gray-900">
              <span className="text-gray-700">—</span>
              {fact}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
