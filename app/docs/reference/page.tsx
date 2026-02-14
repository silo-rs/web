import type { Metadata } from "next";
import { code, muted, heading } from "@/app/docs/styles";
import { BreadcrumbJsonLd } from "@/app/docs/json-ld";

export const metadata: Metadata = {
  title: "CLI Reference",
  description:
    "Complete reference for silo commands, flags, and environment variables.",
  alternates: { canonical: "/docs/reference" },
  openGraph: { url: "/docs/reference" },
};

const h2 = { ...heading, marginTop: "2rem" };

const cell: React.CSSProperties = {
  padding: "0.35rem 0",
  verticalAlign: "top",
};

const cellCode: React.CSSProperties = {
  ...cell,
  whiteSpace: "nowrap" as const,
};

export default function ReferencePage() {
  return (
    <article>
      <BreadcrumbJsonLd slug="reference" title="CLI Reference" />
      <h1 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2rem", color: "var(--text-muted)" }}>
        CLI Reference
      </h1>

      {/* silo run */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>silo run</h2>
        <p style={muted}>
          Run a command with automatic <code>bind()</code> interception.
          Shorthand: <code>silo &lt;cmd&gt;</code> is equivalent to{" "}
          <code>silo run &lt;cmd&gt;</code>.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`silo npm run dev
silo run --name my-session -- npm run dev
silo run --ip 127.0.5.1 -- cargo run`}
        </pre>
        <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
          <tbody style={muted}>
            <tr>
              <td style={cellCode}><code>--name, -n</code></td>
              <td style={cell}>Override session name (default: git branch)</td>
            </tr>
            <tr>
              <td style={cellCode}><code>--ip</code></td>
              <td style={cell}>Override IP address (must be in 127.0.0.0/8)</td>
            </tr>
            <tr>
              <td style={cellCode}><code>--quiet, -q</code></td>
              <td style={cell}>Suppress the silo banner</td>
            </tr>
            <tr>
              <td style={cellCode}><code>--emit-json</code></td>
              <td style={cell}>Emit session info as JSON to stderr before exec</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* silo env */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>silo env</h2>
        <p style={muted}>
          Print environment variables for shell eval or programmatic use.
          Activates the session (IP alias, /etc/hosts) but doesn&apos;t exec a
          command.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`eval "$(silo env)"
silo env --json | jq .SILO_IP`}
        </pre>
        <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
          <tbody style={muted}>
            <tr>
              <td style={cellCode}><code>--name, -n</code></td>
              <td style={cell}>Override session name</td>
            </tr>
            <tr>
              <td style={cellCode}><code>--ip</code></td>
              <td style={cell}>Override IP address</td>
            </tr>
            <tr>
              <td style={cellCode}><code>--json</code></td>
              <td style={cell}>Output as JSON instead of shell exports</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* silo ip */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>silo ip</h2>
        <p style={muted}>
          Show the resolved IP for the current directory. No side effects, just
          prints the address.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`$ silo ip
127.120.134.3

$ silo ip --json
{
  "ip": "127.120.134.3",
  "name": "main",
  "hostname": "main.myapp.silo",
  "dir": "/home/user/myapp"
}`}
        </pre>
      </section>

      {/* silo ls */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>silo ls</h2>
        <p style={muted}>
          List active silo sessions. Shows IP aliases on the loopback
          interface, their hostnames, directories, and listening ports.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`$ silo ls
  ● 2 active alias(es)
    127.0.1.1 · main.myapp.silo  /home/user/myapp
      :3000  :3001
    127.0.1.2 · feat.myapp.silo  /home/user/myapp/.worktrees/feat
      :3000`}
        </pre>
      </section>

      {/* silo doctor */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>silo doctor</h2>
        <p style={muted}>
          Check environment and diagnose common problems. Verifies: silo
          version, OS, git, sudoers config, bind library, /etc/hosts entries,
          and on Linux: cgroup v2, kernel version, eBPF state.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`$ silo doctor
  ✓ silo: v0.2.4
  ✓ os: macOS 15.2
  ✓ git: git version 2.47.1
  ✓ sudoers: /etc/sudoers.d/silo configured
  ✓ bind lib: /Users/you/.silo/lib/libsilo_bind.dylib
  ✓ hosts: 3 silo entry(ies) in /etc/hosts`}
        </pre>
      </section>

      {/* silo prune */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>silo prune</h2>
        <p style={muted}>
          Remove unused loopback aliases and /etc/hosts entries. By default,
          only removes aliases with no listening ports.
        </p>
        <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
          <tbody style={muted}>
            <tr>
              <td style={cellCode}><code>--all</code></td>
              <td style={cell}>Remove all aliases, even those with active ports</td>
            </tr>
            <tr>
              <td style={cellCode}><code>--yes, -y</code></td>
              <td style={cell}>Skip confirmation prompt</td>
            </tr>
            <tr>
              <td style={cellCode}><code>--json</code></td>
              <td style={cell}>Output as JSON (implies --yes)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Environment variables */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Environment variables</h2>
        <p style={muted}>Set automatically inside every silo session:</p>
        <table
          style={{
            width: "100%",
            marginTop: "1rem",
            fontSize: "13px",
            borderCollapse: "collapse",
          }}
        >
          <tbody style={muted}>
            <tr>
              <td style={cellCode}><code>SILO_IP</code></td>
              <td style={cell}>Assigned loopback IP (e.g. <code>127.120.134.3</code>)</td>
            </tr>
            <tr>
              <td style={cellCode}><code>SILO_NAME</code></td>
              <td style={cell}>Sanitized session name (e.g. <code>feature-auth</code>)</td>
            </tr>
            <tr>
              <td style={cellCode}><code>SILO_DIR</code></td>
              <td style={cell}>Git repository root path</td>
            </tr>
            <tr>
              <td style={cellCode}><code>SILO_HOST</code></td>
              <td style={cell}>Hostname (e.g. <code>feature-auth.myapp.silo</code>)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Linux-only */}
      <section>
        <h2 style={heading}>Linux only</h2>
        <p style={muted}>
          <code>silo setup-ebpf</code>: load and pin eBPF programs for
          rootless operation (requires sudo once).
        </p>
        <p style={{ ...muted, marginTop: "0.5rem" }}>
          <code>silo teardown-ebpf</code>: remove pinned eBPF programs.
        </p>
      </section>
    </article>
  );
}
