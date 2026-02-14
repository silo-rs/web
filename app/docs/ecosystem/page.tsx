import type { Metadata } from "next";
import { muted, heading } from "@/app/docs/styles";

export const metadata: Metadata = {
  title: "Ecosystem | silo",
  description:
    "Tools that create git worktrees for parallel development. Silo pairs with them to eliminate port conflicts.",
};

const tools = [
  {
    name: "git worktree",
    url: "https://git-scm.com/docs/git-worktree",
    desc: "Built-in. Multiple working trees from a single repo.",
  },
  {
    name: "claude-squad",
    url: "https://github.com/smtg-ai/claude-squad",
    desc: "Manage multiple Claude Code sessions in parallel worktrees with a TUI.",
  },
  {
    name: "Cursor",
    url: "https://cursor.com",
    desc: "Up to 8 background agents, each in its own worktree.",
  },
  {
    name: "OpenAI Codex",
    url: "https://openai.com/codex",
    desc: "Local worktree threads for parallel coding tasks.",
  },
  {
    name: "workmux",
    url: "https://github.com/raine/workmux",
    desc: "Pairs git worktrees with tmux windows. One terminal per branch.",
  },
  {
    name: "Agor",
    url: "https://github.com/preset-io/agor",
    desc: "Multiplayer canvas orchestrating Claude, Codex, and Gemini in worktrees.",
  },
  {
    name: "ccmanager",
    url: "https://github.com/kbwo/ccmanager",
    desc: "Session manager for coding agents with auto-generated worktree paths.",
  },
];

export default function EcosystemPage() {
  return (
    <article>
      <h1 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-muted)" }}>
        Ecosystem
      </h1>
      <p style={{ ...muted, marginBottom: "2rem" }}>
        Tools that create git worktrees for parallel development. Each
        worktree isolates code but shares the network. Silo fills the gap.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <strong style={{ color: "var(--text-muted)", fontSize: "13px" }}>{tool.name}</strong>
            <p style={{ color: "var(--text-dimmed)", fontSize: "13px", margin: 0 }}>
              {tool.desc}
            </p>
          </a>
        ))}
      </div>
    </article>
  );
}
