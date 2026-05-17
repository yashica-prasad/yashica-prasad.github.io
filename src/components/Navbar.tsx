"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Home, Folder, FileText, User } from "lucide-react";
import { siteConfig } from "@/config";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/about", label: "About", icon: User },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-[#22c55e]/20 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#22c55e] transition-colors hover:text-[#22c55e]/80"
          >
            <Terminal className="h-6 w-6" />
            <span className="hidden font-mono text-lg font-bold sm:inline">
              {siteConfig.name}
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-sm transition-all ${
                    isActive
                      ? "bg-[#22c55e]/10 text-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                      : "text-muted-foreground hover:bg-[#22c55e]/5 hover:text-[#22c55e]"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}