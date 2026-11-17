"use client";

import { motion } from "motion/react";
import { experience, organization } from "@/data";

const DOT_COLOR: Record<string, string> = {
  work: "bg-violet-400",
  education: "bg-cyan-400",
  org: "bg-zinc-500",
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

// ── Main Experience section ───────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[260px_1fr] md:gap-20">
        <motion.div {...fadeUp(0)} className="md:sticky md:top-28 md:self-start">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Where I&apos;ve worked
          </h2>
          <p className="mt-4 text-zinc-400">
            Real-world experience that shaped how I think and build.
          </p>
        </motion.div>

        <ol className="relative space-y-16 border-l border-white/10 pl-8">
          {experience.map((exp, i) => (
            <motion.li key={exp.id} {...fadeUp(i * 0.1)} className="relative">
              <span
                className={`absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-[#07070d] ${DOT_COLOR[exp.type]}`}
              />
              <p className="font-mono text-xs text-zinc-500">
                {exp.period}, {exp.location}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                {exp.role}
              </h3>
              <p className={exp.type === "work" ? "mt-1 text-violet-300" : "mt-1 text-cyan-300"}>
                {exp.company}
              </p>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-zinc-400">
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-xs text-zinc-500">
                {exp.stack.join(", ")}
              </p>
            </motion.li>
          ))}

          {/* Organization, closing the timeline */}
          <motion.li {...fadeUp(experience.length * 0.1)} className="relative">
            <span
              className={`absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-[#07070d] ${DOT_COLOR.org}`}
            />
            <p className="font-mono text-xs text-zinc-500">{organization.period}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              {organization.role}
            </h3>
            <p className="mt-1 text-zinc-300">{organization.name}</p>
            <p className="mt-5 text-[15px] leading-relaxed text-zinc-400">
              {organization.description}
            </p>
          </motion.li>
        </ol>
      </div>
    </section>
  );
}
