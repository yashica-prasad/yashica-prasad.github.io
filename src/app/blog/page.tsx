"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { blogPosts } from "@/data/blog";
import { ContactForm } from "@/components/ContactForm";
import { SearchBar } from "@/components/SearchBar";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const featuredPosts = blogPosts.filter(p => p.featured);

  // Get all unique tags
  const allTags = (() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  })();

  const filteredPosts = blogPosts.filter(post => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesQuery = normalizedQuery === "" ||
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.excerpt.toLowerCase().includes(normalizedQuery) ||
      post.content.toLowerCase().includes(normalizedQuery);

    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => post.tags.includes(tag));

    return matchesQuery && matchesTags;
  });

  const handleSearch = (query: string, tags: string[]) => {
    setSearchQuery(query);
    setSelectedTags(tags);
  };

  return (
    <div>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 font-mono text-4xl sm:text-5xl text-[#22c55e]">
              {">"} Blog_Posts
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Technical writeups, security research, and thoughts on cybersecurity topics.
            </p>
          </div>

          {/* Search */}
          <SearchBar
            onSearch={handleSearch}
            allTags={allTags}
            placeholder="Search posts by title, content, or tags..."
          />

          {/* Featured Posts */}
          {featuredPosts.length > 0 && searchQuery === "" && selectedTags.length === 0 && (
            <div className="mb-12">
              <h2 className="mb-6 flex items-center gap-2 font-mono text-2xl text-foreground">
                <Star className="h-5 w-5 text-[#22c55e]" />
                Featured Posts
              </h2>
              <div className="space-y-6">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group block overflow-hidden rounded-lg border border-[#22c55e]/30 bg-[#22c55e]/5 p-6 backdrop-blur-sm transition-all hover:border-[#22c55e] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded border border-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 font-mono text-xs text-[#22c55e]">
                        FEATURED
                      </span>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="mb-3 font-mono text-2xl text-foreground group-hover:text-[#22c55e] transition-colors">
                      {post.title}
                    </h2>

                    <p className="mb-4 text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded border border-purple-400/30 bg-purple-400/10 px-2 py-1 font-mono text-xs text-purple-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-sm text-[#22c55e] group-hover:underline">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            {searchQuery === "" && selectedTags.length === 0 && featuredPosts.length > 0 && (
              <h2 className="mb-6 font-mono text-2xl text-foreground">All Posts</h2>
            )}

            {filteredPosts.length === 0 ? (
              <div className="rounded-lg border border-purple-400/20 bg-background/50 p-12 text-center backdrop-blur-sm">
                <p className="font-mono text-muted-foreground">No posts found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group block overflow-hidden rounded-lg border border-[#22c55e]/20 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-[#22c55e] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="mb-3 font-mono text-2xl text-foreground group-hover:text-[#22c55e] transition-colors">
                      {post.title}
                    </h2>

                    <p className="mb-4 text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded border border-purple-400/30 bg-purple-400/10 px-2 py-1 font-mono text-xs text-purple-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-sm text-[#22c55e] group-hover:underline">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
