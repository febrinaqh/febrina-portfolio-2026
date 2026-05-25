import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { personal } from "@/data";
import { TypewriterEffect } from "./ui/typewriter-effect";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-auto items-center justify-center",
        "-mx-5 sm:-mx-10",
        "px-5 sm:px-10",
        "overflow-hidden",
      )}
    >
      {/* Grid */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
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
      <Spotlight className="-top-60 left-[25%]" fill="#7C5CFC" />

      <Spotlight className="-top-15 left-[95%]" fill="#2DD4BF" />

      {/* Content wrapper — 2 kolom */}
      <div className="relative z-10 flex w-full max-w-5xl items-center gap-16">
        {/* LEFT — Bio */}

        {/* Name */}
        <div>
          <h1
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "clamp(36px, 6vw, 52px)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "8px",
              textAlign: "left",
            }}
          >
            {personal.greeting}{" "}
            <span style={{ color: "var(--purple2)" }}>{personal.name}</span>
          </h1>

          <TypewriterEffect
            words={personal.role.split(" ").map((word) => ({ text: word }))}
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontStyle: "Bold",
              fontSize: "40px",
              marginBottom: "20px",
              textAlign: "left",
            }}
          />
        </div>

        {/* RIGHT — Photo Card */}
        <div
          style={{
            width: "220px",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Foto */}
          <div
            style={{
              background: "var(--surface)",
              border: "0.5px solid var(--border2)",
              borderRadius: "16px",
              overflow: "hidden",
              height: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <Image
                src={personal.avatar}
                alt={personal.name}
                width={220}
                height={280}
                priority
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              
            </div>
          </div>

          {/* Info card — Location */}
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
              LOCATION
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text2)",
                fontFamily: "IBM Plex Mono, monospace",
              }}
            >
              {personal.location}
            </div>
          </div>

          {/* Info card — Status */}
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
              FOCUS
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text2)",
                fontFamily: "IBM Plex Mono, monospace",
              }}
            >
              {personal.focus}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Avatar */}
      <div className="flex-shrink-0">{/* foto nanti di sini */}</div>
    </section>
  );
};

export default Hero;
