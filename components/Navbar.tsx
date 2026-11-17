"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-4"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="mx-auto mt-4 flex max-w-4xl items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 shadow-lg shadow-black/30 backdrop-blur-xl">
        <a
          href="#"
          className="font-mono text-lg font-bold tracking-tight text-zinc-100 no-underline"
        >
          fq
          <span className="bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-transparent">
            .
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-1.5 font-mono text-[13px] text-zinc-400 no-underline transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 font-mono text-[13px] text-violet-200 no-underline transition hover:bg-violet-500/20 sm:inline-block"
          >
            resume ↗
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full p-1.5 text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="mx-auto mt-2 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d17]/95 p-2 shadow-xl shadow-black/40 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3.5 py-2.5 font-mono text-sm text-zinc-300 no-underline transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-1 block rounded-xl px-3.5 py-2.5 font-mono text-sm text-violet-200 no-underline transition hover:bg-violet-500/10"
            >
              resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
