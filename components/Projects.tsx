"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, type Domain } from "@/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

const TABS: { label: string; value: Domain }[] = [
  { label: "software", value: "software" },
  { label: "ai / ml", value: "ai-ml" },
  { label: "others", value: "others" },
];

const TOP_BORDER: Record<string, string> = {
  software: "linear-gradient(90deg,#7c5cfc,#2dd4bf)",
  "ai-ml": "linear-gradient(90deg,#2dd4bf,#7c5cfc)",
  others: "linear-gradient(90deg,#f472b6,#a78bfa)",
};

function getDominantDomain(domains: Domain[]): string {
  if (domains.includes("ai-ml")) return "ai-ml";
  if (domains.includes("software")) return "software";
  return domains[0];
}

// ── Featured card (DIWD) ──────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      style={{ marginBottom: "14px" }}
      className="relative overflow-hidden rounded-[14px] border-[0.5px] border-(--border2) bg-(--surface)"
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-(image:--grad)" />

      <div className="grid grid-cols-[1fr_220px] gap-0">
        {/* Body */}
        <div style={{ padding: "24px 24px 20px" }}>
          <h3
            style={{ marginBottom: "6px" }}
            className="font-['IBM_Plex_Mono',monospace] text-[17px] font-bold tracking-[-0.01em] text-(--text)"
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: "12px",
              color: "var(--text2)",
              lineHeight: 1.75,
              marginBottom: "16px",
            }}
          >
            {project.description}
          </p>

          {/* Stack */}
          <div
            style={{ marginBottom: "16px" }}
            className="flex flex-wrap gap-1.25"
          >
            {project.stack.map((s) => (
              <span
                key={s}
                className={cn(
                  "pill",
                  project.stackHighlight?.includes(s) && "pill-hi",
                )}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "8px" }}>
            <a
              href={project.links?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 20px",
              }}
              className="inline-block cursor-pointer rounded-lg border-none bg-(image:--grad) font-['IBM_Plex_Mono',monospace] text-[11px] tracking-[0.04em] text-white no-underline duration-200 hover:scale-105 hover:opacity-90 hover:shadow-lg active:scale-95"
            >
              github ↗
            </a>
          </div>
        </div>

        {/* Thumbnail */}
        <div
          style={{
            position: "relative",
            background: "var(--bg3)",
            borderLeft: "0.5px solid var(--border)",
            display: project.thumbnail ? "block" : "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
            padding: project.thumbnail ? 0 : "20px",
          }}
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="220px"
            />
          ) : (
            <>
              <div
                style={{
                  fontSize: "10px",
                  color: "var(--text3)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                dashboard preview
              </div>
              {/* Mock UI bars */}
              <div
                style={{
                  width: "100%",
                  background: "var(--bg2)",
                  borderRadius: "8px",
                  border: "0.5px solid var(--border)",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {[80, 60, 40, 75, 55].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      height: "5px",
                      borderRadius: "3px",
                      width: `${w}%`,
                      background:
                        i % 2 === 0
                          ? "linear-gradient(90deg, var(--purple), var(--teal))"
                          : "var(--surface2)",
                    }}
                  />
                ))}
                <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                  <div
                    style={{
                      flex: 1,
                      height: "40px",
                      background: "var(--surface2)",
                      borderRadius: "6px",
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: "40px",
                      background: "var(--surface2)",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Regular project card ──────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const dom = getDominantDomain(project.domains);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: `0.5px solid ${hovered ? "var(--border2)" : "var(--border)"}`,
        borderRadius: "12px",
        padding: "18px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Top color bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1.5px",
          background: TOP_BORDER[dom] || "var(--grad)",
        }}
      />

      <h3
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          color: "var(--text)",
          marginBottom: "6px",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: "11px",
          color: "var(--text2)",
          lineHeight: 1.65,
          marginBottom: "12px",
        }}
      >
        {project.description}
      </p>

      {/* Stack pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom: "12px",
        }}
      >
        {project.stack.slice(0, 5).map((s) => (
          <span
            key={s}
            className={
              project.stackHighlight?.includes(s) ? "pill pill-hi" : "pill"
            }
          >
            {s}
          </span>
        ))}
        {project.stack.length > 5 && (
          <span className="pill">+{project.stack.length - 5}</span>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {project.domains.map((d) => (
            <span key={d} className="pill">
              {d}
            </span>
          ))}
        </div>
        <span
          style={{
            color: hovered ? "var(--purple2)" : "var(--text3)",
            fontSize: "14px",
            transition: "color 0.2s",
          }}
        >
          →
        </span>
      </div>
    </motion.div>
  );
}

// ── Main Projects section ─────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState<Domain>("software");

  const filtered = projects.filter((p) => p.domains.includes(active));

  const featured = filtered.find((p) => p.featured);
  const nonFeatured = filtered.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      style={{ padding: "80px 40px", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-eyebrow">projects</div>
          <h1
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontWeight: 800,
              fontSize: "clamp(24px, 4vw, 32px)",
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: "6px",
            }}
          >
            Things I&apos;ve Built
          </h1>
        </motion.div>

        {/* Domain tabs */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "11px",
                letterSpacing: "0.04em",
                cursor: "pointer",
                fontFamily: "DM Mono, monospace",
                border: "none",
                transition: "all 0.2s",
                background:
                  active === tab.value ? "var(--grad)" : "var(--surface)",
                color: active === tab.value ? "#fff" : "var(--text3)",
                outline:
                  active !== tab.value ? "0.5px solid var(--border2)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Featured */}
            {featured && <FeaturedCard project={featured} />}

            {/* Grid */}
            {nonFeatured.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "12px",
                }}
              >
                {nonFeatured.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px",
                  color: "var(--text3)",
                  fontSize: "13px",
                }}
              >
                Belum ada project di kategori ini 🐱
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
