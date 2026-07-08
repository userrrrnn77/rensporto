import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT, HERO_HIGHLIGHTS, STACK_FEATURES } from "@/constants";
import { FEATURE_ICONS } from "@/lib/feature-icons";
import { PinnedProjects } from "@/components/layout/PinnedProjects";
import { Title } from "@/components/common/Title";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function Home() {
  return (
    <>
      <Title title="Rendy — Full-Stack Developer" raw path="/" />
      <section className="relative overflow-hidden">
        <div className="bg-grid-fade absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-300 flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
            className="flex items-center gap-2 rounded-full border border-gray-alpha-400 bg-background-100 px-3 py-1 shadow-raised">
            <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
            <span className="font-sans text-xs text-gray-900">
              {HERO_CONTENT.eyebrow}
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
            className="mt-6 max-w-175 text-[40px] font-semibold tracking-[-2.4px] text-gray-1000 sm:text-[56px] sm:tracking-[-3.36px]">
            {HERO_CONTENT.heading}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="mt-5 max-w-140 text-base text-gray-900 sm:text-lg">
            {HERO_CONTENT.subheading}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.15,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={HERO_CONTENT.primaryCta.href}
              className="flex h-10 items-center gap-1.5 rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85">
              {HERO_CONTENT.primaryCta.label}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <Link
              to={HERO_CONTENT.secondaryCta.href}
              className="flex h-10 items-center rounded-sm border border-gray-alpha-400 bg-background-100 px-4 font-sans text-sm font-medium text-gray-1000 transition-colors hover:bg-gray-100">
              {HERO_CONTENT.secondaryCta.label}
            </Link>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="mt-16 flex flex-wrap justify-center w-full max-w-140 divide-x divide-gray-alpha-400 border-t border-gray-alpha-400 pt-8">
            {HERO_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 px-2">
                <dt className="text-xs text-gray-800">{item.label}</dt>
                <dd className="font-mono text-sm text-gray-1000">
                  {item.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <section className="border-t border-gray-alpha-200">
        <div className="mx-auto max-w-300 px-6 py-20">
          <h2 className="text-center text-2xl font-semibold tracking-[-0.96px] text-gray-1000">
            One stack, every screen.
          </h2>
          <p className="mx-auto mt-3 max-w-120 text-center text-sm text-gray-900">
            The same product, built consistently from the server to the browser
            to the device in your pocket.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {STACK_FEATURES.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <div
                  key={feature.title}
                  className="rounded-md border border-gray-alpha-400 bg-background-200 p-6 shadow-raised ">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-100 text-blue-700">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 font-sans text-base font-semibold text-gray-1000">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-900">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <PinnedProjects />
    </>
  );
}
