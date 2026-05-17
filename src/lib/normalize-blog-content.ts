/**
 * Strips common leading indentation from blog post template literals.
 * Posts authored with indented lines inside backticks fail markdown parsing
 * because headings/lists must start at column 0.
 */
export function normalizeBlogContent(content: string): string {
  const lines = content.trim().split("\n");
  let minIndent = Infinity;

  for (const line of lines) {
    if (line.trim() === "") continue;
    const leading = line.match(/^(\s*)/)?.[1].length ?? 0;
    minIndent = Math.min(minIndent, leading);
  }

  if (minIndent === Infinity || minIndent === 0) {
    return content.trim();
  }

  return lines
    .map((line) => (line.trim() === "" ? "" : line.slice(minIndent)))
    .join("\n")
    .trim();
}
