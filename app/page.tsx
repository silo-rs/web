import { InstallScript } from "./install-script";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontSize: "14px",
        lineHeight: 1.7,
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>
        <h1 style={{ fontSize: "14px", fontWeight: 400, marginBottom: "2rem" }}>
          silo
        </h1>

        <p style={{ color: "#666" }}>
          Run the same app on the same port, simultaneously
          -- across branches, worktrees, or AI agents.
        </p>

        <pre
          style={{
            margin: "2rem 0",
            color: "#666",
            fontSize: "13px",
          }}
        >
{`feature-a → 127.0.1.1:3000
feature-b → 127.0.1.2:3000
feature-c → 127.0.1.3:3000`}
        </pre>

        <p style={{ color: "#999", fontSize: "13px" }}>
          Zero code changes. No containers.
        </p>

        <InstallScript />

        <div
          style={{
            fontSize: "13px",
            color: "#999",
          }}
        >
          <a href="https://github.com/silo-rs/silo">github</a>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "#ccc", cursor: "default" }} title="coming soon">
            docs
          </span>
        </div>
      </div>
    </main>
  );
}
