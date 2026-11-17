"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { projects, type Domain, type Project } from "@/data";

const TABS: { label: string; value: Domain | "all" }[] = [
  { label: "all", value: "all" },
  { label: "software", value: "software" },
  { label: "ai / ml", value: "ai-ml" },
];

const DOMAIN_LABEL: Record<Domain, string> = {
  software: "Software",
  "ai-ml": "AI/ML",
  others: "Others",
};

function StackLine({ stack, highlight }: { stack: string[]; highlight?: string[] }) {
  if (!highlight?.length) return <>{stack.join(", ")}</>;

  const rest = stack.filter((s) => !highlight.includes(s));
  return (
    <>
      <span className="text-violet-300">{highlight.join(", ")}</span>
      {rest.length > 0 && `, ${rest.join(", ")}`}
    </>
  );
}

// ── Project row, with a hover spotlight that follows the cursor ───────────────
function ProjectRow({ project }: { project: Project }) {
  const href = project.links.github ?? project.links.demo ?? project.links.case ?? "#";
  const external = href.startsWith("http");

  return (
    <li
      className="proj group"
      onMouseMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - box.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - box.top}px`);
      }}
    >
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="grid gap-4 px-2 py-9 no-underline md:grid-cols-[1fr_auto] md:gap-12 md:px-5"
      >
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-50 transition group-hover:text-violet-200 sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">
            {project.description}
          </p>
          <p className="mt-4 font-mono text-xs leading-relaxed text-zinc-500">
            <StackLine stack={project.stack} highlight={project.stackHighlight} />
          </p>
        </div>
        <div className="flex items-start justify-between gap-6 font-mono text-xs text-zinc-500 md:flex-col md:items-end">
          <span>{project.domains.map((d) => DOMAIN_LABEL[d]).join(", ")}</span>
          <span className="text-lg text-zinc-600 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300">
            ↗
          </span>
        </div>
      </a>
    </li>
  );
}

// ── Main Projects section ─────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState<Domain | "all">("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.domains.includes(active));

  return (
    <section id="projects" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Things I&apos;ve built
          </h2>
          <p className="max-w-sm text-zinc-400">
            From disaster early-warning systems to award-winning web apps: real
            problems, real solutions.
          </p>
        </motion.div>

        {/* Domain tabs */}
        <div className="mt-10 flex gap-6 font-mono text-sm">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActive(tab.value)}
              className={`ptab ${active === tab.value ? "is-on" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {filtered.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
          {filtered.length === 0 && (
            <li className="py-16 text-center text-sm text-zinc-500">
              No projects in this category yet.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
