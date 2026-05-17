import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { normalizeBlogContent } from "@/lib/normalize-blog-content";
import { withBasePath } from "@/config";

function isSafeHttpUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function sanitizeLinkHref(href?: string) {
  if (!href) return undefined;

  if (href.startsWith("/")) return withBasePath(href);
  if (href.startsWith("#")) return href;
  if (href.startsWith("mailto:")) return href;
  if (isSafeHttpUrl(href)) return href;

  return undefined;
}

function sanitizeImageSrc(src?: string | Blob) {
  if (typeof src !== "string") return undefined;

  if (src.startsWith("/")) return withBasePath(src);
  if (isSafeHttpUrl(src)) return src;

  return undefined;
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-4 font-mono text-3xl text-[#22c55e]">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 font-mono text-2xl text-purple-400">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-6 font-mono text-xl text-blue-400">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="leading-relaxed text-muted-foreground">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="ml-6 list-disc space-y-2 text-muted-foreground">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="ml-6 list-decimal space-y-2 text-muted-foreground">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#22c55e]/40 pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    const safeHref = sanitizeLinkHref(href);
    const isExternal = safeHref?.startsWith("http");

    if (!safeHref) {
      return <span className="text-muted-foreground">{children}</span>;
    }

    return (
      <a
        href={safeHref}
        className="text-[#22c55e] underline underline-offset-2 hover:text-[#22c55e]/80"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    const safeSrc = sanitizeImageSrc(src);

    if (!safeSrc) {
      return null;
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={safeSrc}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="my-4 w-full rounded-lg border border-[#22c55e]/20"
      />
    );
  },
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-lg border border-[#22c55e]/20 bg-background/80 p-4 font-mono text-sm text-[#22c55e]">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="font-mono text-sm text-[#22c55e]">{children}</code>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};

type BlogMarkdownProps = {
  content: string;
};

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <div className="prose prose-invert prose-cyan max-w-none space-y-6 [&_p>code]:rounded [&_p>code]:bg-background/80 [&_p>code]:px-1.5 [&_p>code]:py-0.5">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {normalizeBlogContent(content)}
      </ReactMarkdown>
    </div>
  );
}
