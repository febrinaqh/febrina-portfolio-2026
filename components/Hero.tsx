"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import { personal } from "@/data";
import { TypewriterEffect } from "./ui/typewriter-effect";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const Hero = () => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
      )}
    >
      {/* Grid */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:24px_24px] sm:[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(124,92,252,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,92,252,0.07)_1px,transparent_1px)]",
        )}
      />

      {/* Radial fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "var(--bg)",
          maskImage:
            "radial-gradient(ellipse at center, transparent 20%, black)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 20%, black)",
        }}
      />

      {/* Glow Orb Spotlight */}
      <div className="hidden md:block">
        <Spotlight className="-top-80 left-[25%]" fill="#7C5CFC" />
        <Spotlight className="top-40 left-full" fill="#2DD4BF" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        {/* Name */}
        <motion.div {...fadeUp(0)} className="w-full text-center">
          <h1
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "clamp(36px, 6vw, 52px)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "8px",
            }}
          >
            {personal.greeting}{" "}
            <span style={{ color: "var(--purple2)" }}>{personal.name}</span>
          </h1>

          <div>
            <TypewriterEffect
              words={personal.role.split(" ").map((word) => ({ text: word }))}
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontStyle: "Bold",
                fontSize: "40px",
                marginBottom: "20px",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
