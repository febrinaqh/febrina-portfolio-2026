"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  CodeXml,
  Copy,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { personal } from "@/data";

// ── Contact link row (Email copies, others open in new tab) ───────────────────
function ContactLink({
  icon: Icon,
  label,
  value,
  href,
  copyable = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (copyable) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const TrailIcon = copyable ? (copied ? Check : Copy) : ArrowUpRight;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-400">
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-zinc-500">{label}</div>
        <div className="truncate font-mono text-[13px] text-zinc-300">
          {copied ? "✓ copied!" : value}
        </div>
      </div>
      <TrailIcon
        size={14}
        className="shrink-0 text-zinc-600 transition-colors group-hover:text-violet-300"
      />
    </button>
  );
}

// ── Main Contact section ──────────────────────────────────────────────────────
export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-2">
          {/* LEFT — Pitch + links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-transparent">
                meaningful
              </span>{" "}
              together.
            </h2>

            <p className="mt-6 max-w-md leading-relaxed text-zinc-400">
              I&apos;m looking for opportunities as a Software Engineer or
              AI/ML Engineer. Open to full-time roles, contracts, or just a
              chat about collaboration.
            </p>

            <div className="mt-8 flex flex-col gap-2">
              <ContactLink
                icon={Mail}
                label="Email"
                value={personal.contact.email}
                href={`mailto:${personal.contact.email}`}
                copyable
              />
              <ContactLink
                icon={Briefcase}
                label="LinkedIn"
                value={personal.contact.linkedin.replace("https://", "")}
                href={personal.contact.linkedin}
              />
              <ContactLink
                icon={CodeXml}
                label="GitHub"
                value={personal.contact.github.replace("https://", "")}
                href={personal.contact.github}
              />
            </div>
          </motion.div>

          {/* RIGHT — Availability + Fely CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-sm font-semibold text-zinc-100">
                  Available for opportunities
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {personal.availability.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-400"
                  >
                    <Check size={14} className="shrink-0 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-400/5 p-5 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xl">
                🐱
              </div>
              <div className="mt-3 font-mono text-sm font-semibold text-zinc-100">
                Have a specific question?
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                Ask Fely — my cat assistant who knows all about me.
              </p>
              <button
                type="button"
                onClick={() =>
                  document.dispatchEvent(new CustomEvent("open-fely"))
                }
                className="mt-4 w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 py-2.5 font-mono text-sm font-medium text-black transition hover:opacity-90"
              >
                ask fely now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
