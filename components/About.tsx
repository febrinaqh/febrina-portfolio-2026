"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { personal } from "@/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const POINTS = [
  {
    title: "AI & machine learning",
    body: "Models integrated into products that run in production.",
  },
  {
    title: "Full-stack development",
    body: "Interfaces, APIs and data layers designed to work together.",
  },
  {
    title: "Real-time systems",
    body: "Web technologies that respond as the data changes.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[380px] w-[380px] rounded-full bg-violet-600/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-[1.25fr_0.75fr] md:gap-20">
        {/* LEFT — Text */}
        <motion.div {...fadeUp(0)}>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A bit about me
          </h2>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-zinc-200">
            {personal.bio}
          </p>

          <dl className="mt-10 max-w-xl divide-y divide-white/10 border-y border-white/10">
            {POINTS.map((p) => (
              <div
                key={p.title}
                className="grid gap-1 py-4 sm:grid-cols-[170px_1fr] sm:gap-6"
              >
                <dt className="font-mono text-sm text-violet-300">{p.title}</dt>
                <dd className="text-sm leading-relaxed text-zinc-400">{p.body}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* RIGHT — Photo + info */}
        <motion.div
          {...fadeUp(0.15)}
          className="mx-auto w-full max-w-[320px] md:max-w-none"
        >
          <div className="rounded-2xl bg-gradient-to-br from-violet-500/60 via-white/10 to-cyan-400/60 p-px shadow-2xl shadow-violet-500/10">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[15px]">
              <Image
                src={personal.avatar}
                alt={personal.name}
                fill
                sizes="(min-width: 768px) 320px, 70vw"
                className="object-cover"
              />
            </div>
          </div>

          <ul className="mt-4 space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono text-[13px]">
            <li className="flex justify-between gap-4">
              <span className="text-zinc-500">Location</span>
              <span className="text-zinc-200">{personal.location}</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-zinc-500">Focus</span>
              <span className="text-right text-zinc-200">{personal.focus}</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
