import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "docs | silo",
  description:
    "Guides for using silo. Transparent port isolation for dev servers and git worktrees.",
};

const pages = [
  { href: "/docs/worktrees", title: "Git Worktrees", desc: "Why port conflicts happen in worktrees and how silo fixes them." },
  { href: "/docs/reference", title: "CLI Reference", desc: "Commands, flags, and environment variables." },
  { href: "/docs/how-it-works", title: "How it works", desc: "IP hashing, syscall interception, and the preload/eBPF backends." },
  { href: "/docs/ecosystem", title: "Ecosystem", desc: "Tools that create git worktrees for parallel development." },
  { href: "/docs/troubleshooting", title: "Troubleshooting", desc: "Common issues and fixes." },
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
            <a key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <strong style={{ color: "var(--text-muted)", fontSize: "13px" }}>{item.title}</strong>
              <p style={{ color: "var(--text-dimmed)", fontSize: "13px", margin: 0 }}>
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
