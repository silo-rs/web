import type { Metadata } from "next";
import { InstallScript } from "@/app/install-script";
import { code, muted, heading } from "@/app/docs/styles";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/app/docs/json-ld";

export const metadata: Metadata = {
  title: "Git Worktrees without Port Conflicts",
  description:
    "Run dev servers in multiple git worktrees simultaneously without port conflicts. Each worktree gets its own loopback IP. No config, no containers.",
  alternates: { canonical: "/docs/worktrees" },
  openGraph: { url: "/docs/worktrees" },
};

export default function WorktreesGuide() {
  return (
    <article>
      <BreadcrumbJsonLd slug="worktrees" title="Git Worktrees" />
      <TechArticleJsonLd slug="worktrees" title="Git Worktrees without Port Conflicts" description="Run dev servers in multiple git worktrees simultaneously without port conflicts. Each worktree gets its own loopback IP. No config, no containers." />
      <h1 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2rem", color: "var(--text-muted)" }}>
        Git Worktrees without Port Conflicts
      </h1>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          The problem
        </h2>
        <p style={muted}>
          Git worktrees isolate your code, but not the network. Every worktree
          shares the same localhost, so when two dev servers try to bind port
          3000, one fails.
        </p>
        <pre style={{ ...code, color: "var(--text-dimmed)" }}>
          {`~/project/.worktrees/feature-a $ npm run dev
→ listening on localhost:3000       ✓

~/project/.worktrees/feature-b $ npm run dev
→ Error: port 3000 already in use  ✗`}
        </pre>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          The fix
        </h2>
        <p style={muted}>Prefix your command with silo.</p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`~/project/.worktrees/feature-a $ silo npm run dev
→ listening on localhost:3000       ✓  (127.0.1.1)

~/project/.worktrees/feature-b $ silo npm run dev
→ listening on localhost:3000       ✓  (127.0.1.2)`}
        </pre>
        <p style={muted}>
          Each worktree gets its own loopback IP. Your app still thinks it
          binds to <code>localhost:3000</code>. Silo transparently rewrites
          the address at the syscall level. No code changes, no config files,
          no containers.
        </p>
      </section>

      <section>
        <h2 style={heading}>
          Install
        </h2>
        <InstallScript />
      </section>
    </article>
  );
}
