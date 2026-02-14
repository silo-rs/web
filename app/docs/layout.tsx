"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/app/theme-toggle";

const segments: Record<string, string> = {
  worktrees: "Git Worktrees",
  "how-it-works": "How it works",
  reference: "CLI Reference",
  troubleshooting: "Troubleshooting",
  ecosystem: "Ecosystem",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const slug = pathname.replace("/docs/", "").replace("/docs", "");
  const title = segments[slug];

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        fontSize: "14px",
        lineHeight: 1.7,
      }}
    >
      <div style={{ maxWidth: "520px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "3rem",
          }}
        >
          <nav style={{ fontSize: "13px", color: "var(--text-dimmed)" }}>
            <a href="/">silo</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <a href="/docs" style={{ color: title ? "var(--text-dimmed)" : "var(--text-muted)" }}>
              docs
            </a>
            {title && (
              <>
                <span style={{ margin: "0 0.5rem" }}>/</span>
                <span style={{ color: "var(--text-muted)" }}>{title}</span>
              </>
            )}
          </nav>
          <ThemeToggle />
        </div>

        {children}

        {title && (
          <nav
            style={{
              marginTop: "3rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
              fontSize: "13px",
              color: "var(--text-dimmed)",
            }}
          >
            <a href="/docs">&larr; docs</a>
          </nav>
        )}
      </div>
    </main>
  );
}
