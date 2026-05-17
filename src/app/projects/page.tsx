"use client";

import Link from "next/link";
import { Shield, Code2, FileText, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { projects } from "@/data/projects";
import { ContactForm } from "@/components/ContactForm";
import { SearchBar } from "@/components/SearchBar";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // Filter projects based on search
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesQuery = searchQuery.toLowerCase() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.longDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => project.tags.includes(tag));

      return matchesQuery && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const handleSearch = (query: string, tags: string[]) => {
    setSearchQuery(query);
    setSelectedTags(tags);
  };

  return (
    <div>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 font-mono text-4xl sm:text-5xl text-[#22c55e]">
              {">"} All_Projects
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              A collection of security tools, research projects, and experiments in offensive and defensive cybersecurity.
            </p>
          </div>

          {/* Search */}
          <SearchBar
            onSearch={handleSearch}
            allTags={allTags}
            placeholder="Search projects by title, description, or tags..."
          />

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="rounded-lg border border-purple-400/20 bg-background/50 p-12 text-center backdrop-blur-sm">
              <p className="font-mono text-muted-foreground">No projects found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-lg border border-[#22c55e]/20 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-[#22c55e] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
              >
                {/* Corner accent */}
                <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-br from-[#22c55e]/20 to-transparent" />

                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#22c55e]" />
                    {project.featured && (
                      <span className="rounded border border-purple-400 bg-purple-400/10 px-2 py-0.5 font-mono text-xs text-purple-400">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.blogPost && (
                      <Link
                        href={`/blog/${project.blogPost}`}
                        className="text-muted-foreground transition-colors hover:text-purple-400"
                        title="Read blog post"
                      >
                        <FileText className="h-5 w-5" />
                      </Link>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-[#22c55e]"
                      title="View on GitHub"
                    >
                      <Code2 className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 font-mono text-xl text-foreground group-hover:text-[#22c55e] transition-colors">
                  {project.title}
                </h3>

                <p className="mb-4 text-sm text-muted-foreground">
                  {project.longDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded border border-blue-400/30 bg-blue-400/10 px-2 py-1 font-mono text-xs text-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-4 flex gap-3 border-t border-[#22c55e]/10 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#22c55e] hover:underline"
                  >
                    View Code <ExternalLink className="h-3 w-3" />
                  </a>
                  {project.blogPost && (
                    <Link
                      href={`/blog/${project.blogPost}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-purple-400 hover:underline"
                    >
                      Read Article <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
