import Link from "next/link";
import {
  Shield,
  Code2,
  ExternalLink,
  ArrowRight,
  Terminal,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config";
import { projects } from "@/data/projects";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        {/* Orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border-2 border-[#22c55e] animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-purple-400 animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
        </div>

        <div className="mx-auto max-w-4xl relative">
          {/* Terminal prompt */}
          <div className="mb-6 flex items-center gap-2 font-mono text-sm text-[#22c55e]">
            <Terminal className="h-4 w-4" />
            <span>~/yashicaprasad</span>
          </div>

          {/* Name with space gradient */}
          <h1 className="mb-6 font-mono text-5xl sm:text-7xl font-bold">
            <span className="bg-gradient-to-r from-[#22c55e] via-purple-400 to-blue-400 bg-clip-text text-transparent">
              YASHICA PRASAD
            </span>
          </h1>

          {/* Subtitle */}
          <div className="mb-8 space-y-2">
            <p className="font-mono text-xl text-foreground flex items-center gap-2">
              {">"} Full-Stack Developer
              <Sparkles className="h-4 w-4 text-[#22c55e]" />
            </p>
            <p className="font-mono text-xl text-muted-foreground">
              {">"} B.S. Computer Science and Engineering · UCLA
            </p>
          </div>

          <p className="mb-12 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Computer science student at UCLA, graduating{" "}
            <span className="text-[#22c55e]">Spring 2026</span>. I build{" "}
            <span className="text-purple-400">secure, practical software</span> across
            full-stack development, systems, cybersecurity, and applied machine learning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#22c55e] px-6 py-3 font-mono text-sm text-background transition-all hover:bg-[#22c55e]/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#22c55e] px-6 py-3 font-mono text-sm text-[#22c55e] transition-all hover:bg-[#22c55e]/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-center gap-3">
            <Shield className="h-6 w-6 text-purple-400" />
            <h2 className="font-mono text-3xl text-foreground">
              {">"} Featured_Projects
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-lg border border-[#22c55e]/20 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-[#22c55e] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
              >
                {/* Corner accent */}
                <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-br from-[#22c55e]/20 to-transparent" />

                <div className="mb-4 flex items-start justify-between">
                  <Shield className="h-5 w-5 text-[#22c55e]" />
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-[#22c55e]"
                  >
                    <Code2 className="h-5 w-5" />
                  </a>
                </div>

                <Link href="/projects">
                  <h3 className="mb-3 font-mono text-lg text-foreground group-hover:text-[#22c55e] transition-colors">
                    {project.title}
                  </h3>
                </Link>

                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="rounded border border-purple-400/30 bg-purple-400/10 px-2 py-1 font-mono text-xs text-purple-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#22c55e] hover:underline"
            >
              View all projects
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
