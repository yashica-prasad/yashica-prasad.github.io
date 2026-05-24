import { Code2, ExternalLink, Mail, Terminal } from "lucide-react";
import { siteConfig } from "@/config";

export function ContactForm() {
  if (!siteConfig.showContactForm) return null;

  return (
    <section className="border-t border-[#22c55e]/20 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 flex items-center gap-3">
          <Terminal className="h-6 w-6 text-[#22c55e]" />
          <h2 className="font-mono text-2xl text-[#22c55e]">
            {">"} Contact
          </h2>
        </div>
        <div className="max-w-xl space-y-3">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-[#22c55e]/20 bg-background/40 px-4 py-3 font-mono text-sm text-foreground transition-all hover:border-[#22c55e]/50 hover:bg-[#22c55e]/5"
          >
            <Code2 className="h-5 w-5 shrink-0 text-purple-400" />
            <span className="min-w-20 text-muted-foreground">GitHub</span>
            <span className="truncate text-foreground/90 group-hover:text-[#22c55e]">
              {siteConfig.github}
            </span>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="group flex items-center gap-3 rounded-lg border border-[#22c55e]/20 bg-background/40 px-4 py-3 font-mono text-sm text-foreground transition-all hover:border-[#22c55e]/50 hover:bg-[#22c55e]/5"
          >
            <Mail className="h-5 w-5 shrink-0 text-purple-400" />
            <span className="min-w-20 text-muted-foreground">Email</span>
            <span className="truncate text-foreground/90 group-hover:text-[#22c55e]">
              {siteConfig.email}
            </span>
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-[#22c55e]/20 bg-background/40 px-4 py-3 font-mono text-sm text-foreground transition-all hover:border-[#22c55e]/50 hover:bg-[#22c55e]/5"
          >
            <ExternalLink className="h-5 w-5 shrink-0 text-purple-400" />
            <span className="min-w-20 text-muted-foreground">LinkedIn</span>
            <span className="truncate text-foreground/90 group-hover:text-[#22c55e]">
              {siteConfig.linkedin}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
