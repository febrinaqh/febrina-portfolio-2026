"use client";

import { motion } from "motion/react";
import { skills } from "@/data";

const HIGHLIGHT: Record<string, string[]> = {
  "Software Engineering": ["React.js", "Next.js", "Node.js", "TypeScript"],
  "AI / ML": ["Python", "SVM", "XGBoost", "Flask"],
};

function SkillLine({ category, items }: { category: string; items: string[] }) {
  const hi = HIGHLIGHT[category] ?? [];
  return (
    <p className="text-2xl leading-snug text-zinc-600 sm:text-3xl">
      {items.map((skill, i) => (
        <span key={skill}>
          {hi.includes(skill) ? (
            <b className="font-medium text-zinc-100">{skill}</b>
          ) : (
            skill
          )}
          {i < items.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}

// ── Main Skills section ───────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          What I work with
        </motion.h2>

        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid gap-4 py-9 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <h3 className="font-mono text-sm text-zinc-500">{category}</h3>
              <SkillLine category={category} items={items} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
