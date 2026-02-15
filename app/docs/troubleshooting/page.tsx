import type { Metadata } from "next";
import { code, muted, heading } from "@/app/docs/styles";
import { BreadcrumbJsonLd, TechArticleJsonLd, FaqJsonLd } from "@/app/docs/json-ld";

const faqItems = [
  {
    question: 'macOS: "running SIP-protected binary"',
    answer:
      "macOS strips DYLD_INSERT_LIBRARIES from binaries in /usr/bin, /bin, etc. Install a shell via Homebrew (brew install bash or brew install zsh) and silo will use it automatically.",
  },
  {
    question: '"password required" on every run',
    answer:
      "Silo needs sudo for adding loopback IP aliases and writing to /etc/hosts. Run 'sudo rm /etc/sudoers.d/silo' then 'silo doctor' to re-trigger passwordless setup.",
  },
  {
    question: '"not a git repository"',
    answer:
      "Silo derives the session IP from the git directory. Use --ip to set an address manually in non-git directories: silo run --ip 127.0.5.1 -- npm run dev",
  },
  {
    question: "Port still in use after stopping a server",
    answer:
      "IP aliases and /etc/hosts entries persist intentionally to avoid setup overhead. Run 'silo prune' to remove aliases with no listening ports, or 'silo prune --all' to remove everything.",
  },
  {
    question: "IP collision between worktrees",
    answer:
      "The FNV-1a hash has ~16.5 million possible addresses. Collisions are rare but possible. Override with: silo run --ip 127.0.99.1 -- npm run dev",
  },
  {
    question: "Statically linked binaries are not intercepted",
    answer:
      "The preload backend only works with dynamically linked binaries. On Linux, use the eBPF backend (sudo silo setup-ebpf). On macOS, use CGO_ENABLED=1 or bind to $SILO_IP directly.",
  },
  {
    question: '"already inside a silo session"',
    answer:
      "Nesting silo sessions is not supported. The inner session would override the outer one. Remove the SILO_IP environment variable if it was set accidentally.",
  },
  {
    question: "Linux: eBPF setup",
    answer:
      "The eBPF backend requires cgroup v2 and kernel 5.8+. Run 'silo doctor' to check availability, then 'sudo silo setup-ebpf' to enable it. After setup, silo uses eBPF automatically.",
  },
];

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "Common issues and fixes for silo. SIP warnings, sudoers setup, port conflicts, and more.",
  alternates: { canonical: "/docs/troubleshooting" },
  openGraph: { url: "/docs/troubleshooting" },
};

export default function TroubleshootingPage() {
  return (
    <article>
      <BreadcrumbJsonLd slug="troubleshooting" title="Troubleshooting" />
      <TechArticleJsonLd slug="troubleshooting" title="Troubleshooting" description="Common issues and fixes for silo. SIP warnings, sudoers setup, port conflicts, and more." />
      <FaqJsonLd items={faqItems} />
      <h1 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2rem", color: "var(--text-muted)" }}>
        Troubleshooting
      </h1>

      <p style={{ ...muted, marginBottom: "2rem" }}>
        Start with <code>silo doctor</code>. It checks your environment and
        flags issues.
      </p>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          macOS: &quot;running SIP-protected binary&quot;
        </h2>
        <p style={muted}>
          macOS strips <code>DYLD_INSERT_LIBRARIES</code> from binaries
          in <code>/usr/bin</code>, <code>/bin</code>, etc. Silo tries to
          find a non-SIP alternative from your PATH automatically, but warns
          when it can&apos;t.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          <strong>Fix:</strong> install a shell via Homebrew.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`brew install bash
# or
brew install zsh`}
        </pre>
        <p style={muted}>
          Silo will automatically pick the Homebrew version over the
          system one.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          &quot;password required&quot; on every run
        </h2>
        <p style={muted}>
          Silo needs sudo for two things: adding loopback IP aliases and
          writing to <code>/etc/hosts</code>. On first run, it installs
          passwordless sudo rules in <code>/etc/sudoers.d/silo</code>.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          If this didn&apos;t happen, or the rules are stale:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`# Remove and re-trigger setup
sudo rm /etc/sudoers.d/silo
silo doctor`}
        </pre>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          &quot;not a git repository&quot;
        </h2>
        <p style={muted}>
          Silo derives the session IP from the git directory. It won&apos;t
          work outside a git repo. If you need to run in a non-git directory,
          use <code>--ip</code> to set an address manually:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`silo run --ip 127.0.5.1 -- npm run dev`}
        </pre>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          Port still in use after stopping a server
        </h2>
        <p style={muted}>
          The IP alias and /etc/hosts entry persist after the process exits.
          This is intentional. It avoids setup overhead on the next run.
          To clean up:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`# Remove aliases with no listening ports
silo prune

# Remove everything
silo prune --all`}
        </pre>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          IP collision between worktrees
        </h2>
        <p style={muted}>
          The FNV-1a hash has ~16.5 million possible addresses in{" "}
          <code>127.0.0.0/8</code>. Collisions are rare but possible. If two
          worktrees get the same IP, override one:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`silo run --ip 127.0.99.1 -- npm run dev`}
        </pre>
        <p style={muted}>
          <code>silo run</code> will also warn about IP collisions
          in <code>/etc/hosts</code> at startup.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          Statically linked binaries
        </h2>
        <p style={muted}>
          The preload backend (<code>DYLD_INSERT_LIBRARIES</code> /{" "}
          <code>LD_PRELOAD</code>) only works with dynamically linked
          binaries. Static Go binaries with <code>CGO_ENABLED=0</code> won&apos;t
          be intercepted.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          <strong>Fix (Linux):</strong> use the eBPF backend, which intercepts
          at the kernel level:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`sudo silo setup-ebpf
silo ./my-static-binary`}
        </pre>
        <p style={muted}>
          On macOS, there is no eBPF alternative. Use{" "}
          <code>CGO_ENABLED=1</code> or bind to <code>$SILO_IP</code>{" "}
          directly in your code.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>
          &quot;already inside a silo session&quot;
        </h2>
        <p style={muted}>
          Silo warns when <code>SILO_IP</code> is already set in the
          environment. Nesting silo sessions is not supported. The inner
          session would override the outer one.
        </p>
      </section>

      <section>
        <h2 style={heading}>
          Linux: eBPF setup
        </h2>
        <p style={muted}>
          The eBPF backend requires cgroup v2 and kernel 5.8+. Check with:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`silo doctor --json | jq '.checks[] | select(.name | startswith("ebpf"))'`}
        </pre>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          If eBPF is available but not set up:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`sudo silo setup-ebpf`}
        </pre>
        <p style={muted}>
          After setup, silo will use eBPF automatically. No{" "}
          <code>LD_PRELOAD</code> needed, works with static binaries.
        </p>
      </section>
    </article>
  );
}
