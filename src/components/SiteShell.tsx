"use client";

import { Navbar } from "@/components/Navbar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const stars = Array.from({ length: 100 }, (_, index) => ({
    x: (index * 37) % 100,
    y: (index * 53) % 100,
    size: ((index * 17) % 3) + 0.5,
    opacity: (((index * 23) % 6) + 3) / 10,
    animationDuration: `${2 + (index % 3)}s`,
    animationDelay: `${(index % 4) * 0.4}s`,
  }));

  return (
    <div className="dark min-h-screen bg-background">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-background to-background" />
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDuration: star.animationDuration,
                animationDelay: star.animationDelay,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 h-96 w-96 rounded-full bg-purple-500 blur-[120px]" />
          <div className="absolute bottom-40 left-40 h-80 w-80 rounded-full bg-blue-500 blur-[100px]" />
        </div>
      </div>

      <Navbar />

      <main className="relative z-10">{children}</main>
    </div>
  );
}
