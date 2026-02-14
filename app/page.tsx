import { InstallScript } from "./install-script";
import { ThemeToggle } from "./theme-toggle";

export default function Home() {
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
            marginBottom: "2rem",
          }}
        >
          <h1 style={{ fontSize: "14px", fontWeight: 400 }}>silo</h1>
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
            color: "var(--text-dimmed)",
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
            <a href="/docs/worktrees" style={{ textDecoration: "none" }}>
              <strong style={{ color: "var(--text-muted)", fontSize: "13px" }}>Git Worktrees</strong>
              <p style={{ color: "var(--text-dimmed)", fontSize: "13px", margin: 0 }}>
                Why port conflicts happen in worktrees and how silo fixes them.
              </p>
            </a>
            <a href="/docs/how-it-works" style={{ textDecoration: "none" }}>
              <strong style={{ color: "var(--text-muted)", fontSize: "13px" }}>How it works</strong>
              <p style={{ color: "var(--text-dimmed)", fontSize: "13px", margin: 0 }}>
                IP hashing, syscall interception, and the preload/eBPF backends.
              </p>
            </a>
            <a href="/docs/reference" style={{ textDecoration: "none" }}>
              <strong style={{ color: "var(--text-muted)", fontSize: "13px" }}>CLI Reference</strong>
              <p style={{ color: "var(--text-dimmed)", fontSize: "13px", margin: 0 }}>
                Commands, flags, and environment variables.
              </p>
            </a>
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
          <a href="/docs">all docs</a>
        </div>
      </div>
    </main>
  );
}
