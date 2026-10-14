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

// ── Info card (Location / Focus / Status) ─────────────────────────────────────
function InfoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border2)",
        borderRadius: "10px",
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          fontSize: "9px",
          color: "var(--purple2)",
          letterSpacing: "0.12em",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "var(--text2)",
          fontFamily: "IBM Plex Mono, monospace",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Main About section ────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      style={{ padding: "80px 40px", background: "var(--bg)" }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto" }}
        className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-12 lg:gap-20"
      >
        {/* LEFT — Text */}
        <motion.div
          {...fadeUp(0)}
          className="w-full flex-1 order-2 sm:order-1 text-center sm:text-left"
        >
          <div className="section-eyebrow justify-center sm:justify-start">
            about me
          </div>
          <h1
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontWeight: 800,
              fontSize: "clamp(24px, 4vw, 32px)",
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            A Bit About Me
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: "var(--text2)",
              lineHeight: 1.85,
              maxWidth: "560px",
            }}
            className="mx-auto sm:mx-0"
          >
            {personal.bio}
          </p>
        </motion.div>

        {/* RIGHT — Photo Card */}
        <motion.div
          {...fadeUp(0.15)}
          className="w-[180px] xs:w-[200px] sm:w-[220px] flex-shrink-0 order-1 sm:order-2 flex flex-col gap-2.5"
        >
          {/* Foto */}
          <div
            className="relative overflow-hidden"
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border2)",
              borderRadius: "16px",
              height: "280px",
            }}
          >
            <Image
              src={personal.avatar}
              alt={personal.name}
              fill
              sizes="220px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <InfoCard label="LOCATION">{personal.location}</InfoCard>
          <InfoCard label="FOCUS">{personal.focus}</InfoCard>
          <InfoCard label="STATUS">
            <span className="inline-flex items-center gap-2">
              <span
                className="pulse-dot inline-block rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--teal)",
                }}
              />
              {personal.status}
            </span>
          </InfoCard>
        </motion.div>
      </div>
    </section>
  );
}
