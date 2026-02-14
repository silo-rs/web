import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Guides for using silo. Transparent port isolation for dev servers and git worktrees.",
  alternates: { canonical: "/docs" },
  openGraph: { url: "/docs" },
};

const pages = [
  { href: "/docs/worktrees", title: "git worktrees", desc: "why port conflicts happen in worktrees and how silo fixes them." },
  { href: "/docs/guides", title: "guides", desc: "browser access, databases, and other things outside the silo session." },
  { href: "/docs/ecosystem", title: "ecosystem", desc: "tools that create git worktrees for parallel development." },
  { href: "/docs/how-it-works", title: "how it works", desc: "IP hashing, syscall interception, and the preload/eBPF backends." },
  { href: "/docs/troubleshooting", title: "troubleshooting", desc: "common issues and fixes." },
];


export default function DocsIndex() {
  return (
    <div>
      <h1 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2rem", color: "var(--text-muted)" }}>
        Docs
      </h1>

      <section>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {pages.map((item) => (
            <Link key={item.href} href={item.href} className="card">
              <span style={{ fontSize: "13px" }}>{item.title}</span>
              <p style={{ fontSize: "13px", margin: 0 }}>
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
