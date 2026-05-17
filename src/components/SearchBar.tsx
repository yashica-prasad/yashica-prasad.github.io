"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, selectedTags: string[]) => void;
  allTags: string[];
  placeholder?: string;
}

export function SearchBar({ onSearch, allTags, placeholder = "Search..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState(false);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    onSearch(value, selectedTags);
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onSearch(query, newTags);
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedTags([]);
    onSearch("", []);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#22c55e]/20 bg-background/50 px-12 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
        />
        {(query || selectedTags.length > 0) && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#22c55e] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter by Tags */}
      <div>
        <button
          onClick={() => setShowTags(!showTags)}
          className="mb-3 font-mono text-sm text-muted-foreground hover:text-[#22c55e] transition-colors"
        >
          {showTags ? "▼" : "▶"} Filter by tags {selectedTags.length > 0 && `(${selectedTags.length})`}
        </button>

        {showTags && (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded border px-3 py-1 font-mono text-xs transition-all ${
                  selectedTags.includes(tag)
                    ? "border-[#22c55e] bg-[#22c55e]/20 text-[#22c55e]"
                    : "border-purple-400/30 bg-purple-400/10 text-purple-400 hover:border-purple-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active filters display */}
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-mono">Active filters:</span>
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded border border-[#22c55e]/30 bg-[#22c55e]/10 px-2 py-0.5 font-mono text-xs text-[#22c55e]"
            >
              {tag}
              <button onClick={() => toggleTag(tag)} className="hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
