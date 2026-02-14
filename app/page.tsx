import type { Metadata } from "next";
import Link from "next/link";
import { InstallScript } from "./install-script";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "silo",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux",
  url: "https://www.silo.rs",
  downloadUrl: "https://github.com/silo-rs/silo",
  description:
    "Transparent port isolation for git worktrees. Run the same app on the same port, simultaneously -- across branches, worktrees, or AI agents.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            alignItems: "center",
            fontSize: "13px",
            marginBottom: "3rem",
          }}
        >
          <Logo />
          <ThemeToggle />
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
          Git worktrees let you work on multiple branches at once,
          but every worktree shares the same <code>localhost</code>.
          When two dev servers try to bind the same port, one fails.
        </p>

        <pre
          style={{
            margin: "1.5rem 0",
            padding: "0.75rem 1rem",
            background: "var(--bg-code)",
            borderRadius: "8px",
            color: "var(--text-muted)",
            fontSize: "13px",
          }}
        >
{`worktree-a $ npm run dev
→ listening on localhost:3000       ✓

worktree-b $ npm run dev
→ Error: port 3000 already in use  ✗`}
        </pre>

        <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
          Silo gives each worktree its own loopback IP.
          Prefix your command with <code>silo</code> and every worktree
          can bind the same port without conflict.
        </p>

        <pre
          style={{
            margin: "1.5rem 0",
            padding: "0.75rem 1rem",
            background: "var(--bg-code)",
            borderRadius: "8px",
            color: "var(--text-muted)",
            fontSize: "13px",
          }}
        >
{`worktree-a $ silo npm run dev
→ listening on localhost:3000       ✓  (127.0.1.1)

worktree-b $ silo npm run dev
→ listening on localhost:3000       ✓  (127.0.1.2)`}
        </pre>

        <p style={{ color: "var(--text-dimmed)", fontSize: "13px" }}>
          No code changes. No config files. No containers.
        </p>

        <InstallScript />

        {/* Docs */}
        <section style={{ marginTop: "3rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href="/docs/worktrees" className="card">
              <span style={{ fontSize: "13px" }}>git worktrees</span>
              <p style={{ fontSize: "13px", margin: 0 }}>
                why port conflicts happen in worktrees and how silo fixes them.
              </p>
            </Link>
            <Link href="/docs/how-it-works" className="card">
              <span style={{ fontSize: "13px" }}>how it works</span>
              <p style={{ fontSize: "13px", margin: 0 }}>
                IP hashing, syscall interception, and the preload/eBPF backends.
              </p>
            </Link>
            <Link href="/docs/reference" className="card">
              <span style={{ fontSize: "13px" }}>cli reference</span>
              <p style={{ fontSize: "13px", margin: 0 }}>
                commands, flags, and environment variables.
              </p>
            </Link>
          </div>
        </section>

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            fontSize: "13px",
            color: "var(--text-dimmed)",
          }}
        >
          <a href="https://github.com/silo-rs/silo">github</a>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <Link href="/docs">all docs</Link>
        </div>
      </div>
    </main>
    </>
  );
}
