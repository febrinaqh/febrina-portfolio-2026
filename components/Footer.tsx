import { personal } from "@/data";

const footerLinks = [
  { label: "github", href: personal.contact.github },
  { label: "linkedin", href: personal.contact.linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2.5 px-6 py-5 font-mono text-xs text-zinc-600 sm:flex-row">
        <div className="text-sm font-bold text-zinc-400">
          fq
          <span className="bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-transparent">
            .
          </span>
        </div>
        <div>© 2026 {personal.name} · Built with Next.js</div>
        <div className="flex gap-5">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition hover:text-zinc-300"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
