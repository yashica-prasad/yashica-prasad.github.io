import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Code2 } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { ContactForm } from "@/components/ContactForm";
import { BlogMarkdown } from "@/components/BlogMarkdown";

type BlogPostPageProps = {
  params: Promise<{ postId: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ postId: post.id }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = await params;
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  const relatedProject = projects.find((p) => p.blogPost === postId);

  return (
    <div>
      <article className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-[#22c55e] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <header className="mb-8 border-b border-[#00f0ff]/20 pb-8">
            <h1 className="mb-4 font-mono text-3xl text-foreground sm:text-4xl">
              {post.title}
            </h1>

            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded border border-purple-400/30 bg-purple-400/10 px-2 py-1 font-mono text-xs text-purple-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {relatedProject && (
            <div className="mb-8 rounded-lg border border-[#22c55e]/20 bg-[#22c55e]/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 font-mono text-xs text-[#22c55e]">
                    RELATED PROJECT
                  </p>
                  <h3 className="mb-2 font-mono text-lg text-foreground">
                    {relatedProject.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {relatedProject.description}
                  </p>
                </div>
                <a
                  href={relatedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-[#22c55e]"
                >
                  <Code2 className="h-5 w-5" />
                </a>
              </div>
            </div>
          )}

          <BlogMarkdown content={post.content} />
        </div>
      </article>

      <ContactForm />
    </div>
  );
}