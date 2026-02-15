import type { Metadata } from "next";
import { muted, heading } from "@/app/docs/styles";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/app/docs/json-ld";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Tools that create git worktrees for parallel development. Silo pairs with them to eliminate port conflicts.",
  alternates: { canonical: "/docs/ecosystem" },
  openGraph: { url: "/docs/ecosystem" },
};

const agents = [
  {
    name: "claude squad",
    url: "https://github.com/smtg-ai/claude-squad",
    desc: "TUI for running multiple Claude Code sessions in parallel worktrees.",
  },
  {
    name: "cursor",
    url: "https://cursor.com",
    desc: "up to 8 background agents, each in its own worktree.",
  },
  {
    name: "openai codex",
    url: "https://openai.com/codex",
    desc: "local worktree threads for parallel coding tasks.",
  },
  {
    name: "agor",
    url: "https://github.com/preset-io/agor",
    desc: "multiplayer canvas orchestrating Claude, Codex, and Gemini in worktrees.",
  },
  {
    name: "vibe kanban",
    url: "https://github.com/BloopAI/vibe-kanban",
    desc: "kanban board where each task runs an AI agent in its own worktree.",
  },
  {
    name: "conductor",
    url: "https://www.conductor.build",
    desc: "macOS app that orchestrates multiple Claude Code agents in parallel worktrees.",
  },
  {
    name: "crystal",
    url: "https://github.com/stravu/crystal",
    desc: "desktop app for parallel Codex and Claude Code sessions with persistent history.",
  },
  {
    name: "ccmanager",
    url: "https://github.com/kbwo/ccmanager",
    desc: "session manager for Claude Code, Gemini CLI, Codex CLI, and more.",
  },
  {
    name: "code conductor",
    url: "https://github.com/ryanmac/code-conductor",
    desc: "GitHub-native orchestration for Claude Code sub-agents in parallel worktrees.",
  },
  {
    name: "dmux",
    url: "https://github.com/formkit/dmux",
    desc: "creates a tmux pane, a git worktree, and launches an agent in it.",
  },
  {
    name: "agent of empires",
    url: "https://github.com/njbrake/agent-of-empires",
    desc: "tmux-based session manager with worktree isolation and optional Docker sandboxing.",
  },
];

const worktreeManagers = [
  {
    name: "git worktree",
    url: "https://git-scm.com/docs/git-worktree",
    desc: "built-in. multiple working trees from a single repo.",
  },
  {
    name: "agentree",
    url: "https://github.com/AryaLabsHQ/agentree",
    desc: "one-command worktree creation for AI agents with auto-setup and env copying.",
  },
  {
    name: "agent worktree",
    url: "https://github.com/nekocode/agent-worktree",
    desc: "snap mode: create worktree, run agent, merge, cleanup — in one flow.",
  },
  {
    name: "gtr",
    url: "https://github.com/coderabbitai/git-worktree-runner",
    desc: "CodeRabbit's worktree manager with VS Code, Cursor, Zed, and AI tool integration.",
  },
  {
    name: "workmux",
    url: "https://github.com/raine/workmux",
    desc: "pairs git worktrees with tmux/WezTerm/kitty windows.",
  },
  {
    name: "lazyworktree",
    url: "https://github.com/chmouel/lazyworktree",
    desc: "BubbleTea TUI with tmux/zellij, GitHub/GitLab issue integration.",
  },
  {
    name: "gwq",
    url: "https://github.com/d-kuro/gwq",
    desc: "global worktree manager with fuzzy finder and status dashboard.",
  },
  {
    name: "worktree cli",
    url: "https://github.com/johnlindquist/worktree-cli",
    desc: "interactive TUI with fuzzy search, Cursor integration, and MCP server.",
  },
];

const editors = [
  {
    name: "git worktree.nvim",
    url: "https://github.com/ThePrimeagen/git-worktree.nvim",
    desc: "neovim plugin with Telescope integration for worktree operations.",
  },
  {
    name: "vscode git worktrees",
    url: "https://github.com/alexiszamanidis/vscode-git-worktrees",
    desc: "VS Code extension wrapping git worktree operations.",
  },
  {
    name: "gitbutler",
    url: "https://github.com/gitbutlerapp/gitbutler",
    desc: "git client with virtual branches — an alternative take on parallel work.",
  },
  {
    name: "jujutsu",
    url: "https://github.com/jj-vcs/jj",
    desc: "git-compatible VCS with native workspaces.",
  },
];

const categories = [
  { title: "Agent orchestrators", items: agents },
  { title: "Worktree managers", items: worktreeManagers },
  { title: "Editors & version control", items: editors },
];

export default function EcosystemPage() {
  return (
    <article>
      <BreadcrumbJsonLd slug="ecosystem" title="Ecosystem" />
      <TechArticleJsonLd
        slug="ecosystem"
        title="Ecosystem"
        description="Tools that create git worktrees for parallel development. Silo pairs with them to eliminate port conflicts."
      />
      <h1
        style={{
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "0.5rem",
          color: "var(--text-muted)",
        }}
      >
        Ecosystem
      </h1>
      <p style={{ ...muted, marginBottom: "2rem" }}>
        Tools that create git worktrees for parallel development. Each worktree
        isolates code but shares the network. Silo fills the gap.
      </p>

      {categories.map((cat) => (
        <section key={cat.title} style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ ...heading, marginBottom: "1rem" }}>{cat.title}</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {cat.items.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
              >
                <span style={{ fontSize: "13px" }}>{tool.name}</span>
                <p style={{ fontSize: "13px", margin: 0 }}>{tool.desc}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
