"use client";

import { useState } from "react";
import { Mail, Send, Terminal } from "lucide-react";
import { siteConfig } from "@/config";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!siteConfig.showContactForm) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Portfolio Contact from ${formData.name.trim() || "Visitor"}`;
    const body = [
      `Name: ${formData.name.trim() || "(not provided)"}`,
      `Email: ${formData.email.trim() || "(not provided)"}`,
      "",
      formData.message.trim(),
    ].join("\n");

    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="border-t border-[#22c55e]/20 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 flex items-center gap-3">
          <Terminal className="h-6 w-6 text-[#22c55e]" />
          <h2 className="font-mono text-2xl text-[#22c55e]">
            {">"} Contact
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <p className="mb-6 text-muted-foreground">
              Interested in collaborating on security projects or discussing
              potential opportunities? This form opens your email app and sends
              your message directly to me.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-400" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-mono text-sm text-foreground transition-colors hover:text-[#22c55e]"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                aria-label="Your name"
                autoComplete="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full rounded-lg border border-[#22c55e]/20 bg-background/50 px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>

            <div>
              <input
                type="email"
                aria-label="Your email address"
                autoComplete="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full rounded-lg border border-[#22c55e]/20 bg-background/50 px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>

            <div>
              <textarea
                aria-label="Your message"
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={4}
                className="w-full rounded-lg border border-[#22c55e]/20 bg-background/50 px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e] resize-none"
              />
            </div>

            <button
              type="submit"
              className="group flex items-center gap-2 rounded-lg bg-[#22c55e] px-6 py-2 font-mono text-sm text-background transition-all hover:bg-[#22c55e]/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              Send Message
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
