"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { personal } from "@/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

// ── Classic type/delete rotating headline ──────────────────────────────────────
function TypedRoles({ words }: { words: string[] }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let word = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = words[word];
      setText(current.slice(0, char));

      if (!deleting && char === current.length) {
        deleting = true;
        timer = setTimeout(tick, 1600);
        return;
      }
      if (deleting && char === 0) {
        deleting = false;
        word = (word + 1) % words.length;
      }
      char += deleting ? -1 : 1;
      timer = setTimeout(tick, deleting ? 40 : 80);
    };

    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <p className="mt-5 h-9 font-mono text-xl text-zinc-300 sm:text-2xl">
      {text}
      <span
        aria-hidden="true"
        className="caret ml-0.5 inline-block h-6 w-[2px] translate-y-1 bg-cyan-400"
      />
    </p>
  );
}

export default function Hero() {
  const tags = personal.focus.split(" · ");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="glow-float pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-violet-600/25 blur-[120px]" />
      <div
        className="glow-float pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[120px]"
        style={{ animationDelay: "-3s", animationDuration: "11s" }}
      />

      {/* Status badge — lives only in Hero, scrolls away with the section */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute bottom-6 left-4 z-10 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] text-emerald-300 backdrop-blur-sm sm:bottom-8 sm:left-6 sm:px-4 sm:py-2 sm:text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {personal.status}
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.p {...fadeUp(0)} className="mb-3 font-mono text-sm text-zinc-500">
          {personal.greeting}
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-6xl md:text-7xl"
        >
          {personal.name}
        </motion.h1>

        <motion.div {...fadeUp(0.2)}>
          <TypedRoles words={personal.roles} />
        </motion.div>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {personal.bio}
        </motion.p>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 font-mono text-sm font-medium text-black no-underline shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/40"
          >
            view projects →
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-sm text-zinc-200 no-underline transition hover:border-white/25 hover:bg-white/[0.06]"
          >
            contact me
          </a>
        </motion.div>

        <motion.ul
          {...fadeUp(0.5)}
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-zinc-500"
            >
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600 no-underline"
      >
        scroll
        <div className="mx-auto mt-2 h-8 w-px animate-pulse bg-gradient-to-b from-zinc-500 to-transparent" />
      </motion.a>
    </section>
  );
}
