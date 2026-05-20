import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";

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
    </section>
  );
};

export default Hero;
