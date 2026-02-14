import type { Metadata } from "next";
import { code, muted, heading } from "@/app/docs/styles";

export const metadata: Metadata = {
  title: "How silo Works | silo",
  description:
    "How silo intercepts syscalls to give each git worktree a unique loopback IP. LD_PRELOAD, eBPF, and the FNV-1a hash.",
};

export default function HowItWorksPage() {
  return (
    <article>
      <h1 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2rem", color: "var(--text-muted)" }}>
        How it works
      </h1>

      {/* Overview */}
      <section style={{ marginBottom: "3rem" }}>
        <p style={muted}>
          When you run <code>silo npm run dev</code>, three things happen:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`1. Compute a deterministic IP from the git directory
2. Configure the loopback interface (IP alias + /etc/hosts)
3. Intercept bind() and connect() syscalls in the child process`}
        </pre>
        <p style={muted}>
          Your app still thinks it&apos;s on <code>localhost:3000</code>.
          Silo rewrites the address transparently. No code changes needed.
        </p>
      </section>

      {/* IP computation */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>IP computation</h2>
        <p style={muted}>
          Silo hashes the canonical git directory path and the branch name
          with FNV-1a to produce a deterministic IP in the{" "}
          <code>127.0.0.0/8</code> range.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`input:  /home/user/myapp + "feature-auth"
          ↓ FNV-1a
hash:   0x7F_78_86_03
          ↓
ip:     127.120.134.3`}
        </pre>
        <p style={muted}>
          The first octet is always 127. Octets 2 and 4 are clamped to
          1–254 to avoid broadcast and zero addresses. This gives ~16.7
          million unique addresses, more than enough for any machine.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          Since each git worktree has a different directory path, each gets a
          different IP. Same directory + same branch = same IP, every time.
        </p>
      </section>

      {/* Session setup */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Session setup</h2>
        <p style={muted}>Before executing your command, silo:</p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`# Add a loopback alias (macOS)
sudo ifconfig lo0 alias 127.120.134.3 netmask 255.0.0.0

# Add a loopback alias (Linux)
sudo ip addr add 127.120.134.3/8 dev lo

# Add /etc/hosts entry
127.120.134.3   feature-auth.myapp.silo   # /home/user/myapp`}
        </pre>
        <p style={muted}>
          Passwordless sudo is configured once via{" "}
          <code>/etc/sudoers.d/silo</code> (silo prompts on first run).
          Aliases and hosts entries persist across runs. Use{" "}
          <code>silo prune</code> to clean up.
        </p>
      </section>

      {/* Syscall interception */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Syscall interception</h2>
        <p style={muted}>
          Silo intercepts socket syscalls to redirect network traffic to
          the assigned IP. Two backends are available:
        </p>

        <h3
          style={{
            fontSize: "13px",
            fontWeight: 600,
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
            color: "var(--text-muted)",
          }}
        >
          Preload (macOS + Linux)
        </h3>
        <p style={muted}>
          A shared library (<code>libsilo_bind</code>) is injected via{" "}
          <code>DYLD_INSERT_LIBRARIES</code> (macOS) or{" "}
          <code>LD_PRELOAD</code> (Linux). It interposes on these syscalls:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`bind()      0.0.0.0:port → SILO_IP:port
            127.0.0.1:port → SILO_IP:port

connect()   127.0.0.1:port → SILO_IP:port
            (only if a listener exists on SILO_IP:port)

sendto()    same rewriting as bind
sendmsg()   same rewriting as bind

getifaddrs()  hides other silo IPs from the interface list`}
        </pre>
        <p style={muted}>
          The <code>connect()</code> rewrite probes for a listener first.
          If nothing is bound on <code>SILO_IP:port</code>, the connection
          goes to <code>127.0.0.1</code> as usual. This prevents hijacking
          connections to databases or other services running on localhost.
        </p>

        <h3
          style={{
            fontSize: "13px",
            fontWeight: 600,
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
            color: "var(--text-muted)",
          }}
        >
          eBPF (Linux only)
        </h3>
        <p style={muted}>
          On Linux, silo can use cgroup-attached BPF programs to intercept
          at the kernel level. This works with static binaries and doesn&apos;t
          require <code>LD_PRELOAD</code>.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`# One-time setup (requires root)
sudo silo setup-ebpf

# After this, silo automatically uses the eBPF backend
silo ./my-static-binary`}
        </pre>
        <p style={muted}>
          Requires cgroup v2 and kernel 5.8+.
        </p>
      </section>

      {/* IPv6 */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>IPv6 handling</h2>
        <p style={muted}>
          When an app binds to <code>::</code> (IPv6 any) or{" "}
          <code>::1</code> (IPv6 loopback), silo rewrites it to an
          IPv4-mapped IPv6 address: <code>::ffff:127.x.y.z</code>. On
          macOS, silo replaces the IPv6 socket with an IPv4 socket
          entirely, copying all socket options.
        </p>
      </section>

      {/* SIP */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>macOS SIP bypass</h2>
        <p style={muted}>
          macOS System Integrity Protection strips{" "}
          <code>DYLD_INSERT_LIBRARIES</code> from binaries in{" "}
          <code>/usr/bin</code>, <code>/bin</code>, etc. Silo handles this
          by:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`1. Detecting SIP-protected paths
2. Searching PATH for a non-SIP alternative (e.g. Homebrew)
3. Following shebangs recursively (up to 5 levels)
4. Resolving /usr/bin/env -S invocations`}
        </pre>
        <p style={muted}>
          For example, <code>/bin/bash</code> gets resolved to{" "}
          <code>/opt/homebrew/bin/bash</code> if available.
        </p>
      </section>

      {/* Limitations */}
      <section>
        <h2 style={heading}>Limitations</h2>
        <table
          style={{
            width: "100%",
            marginTop: "0.5rem",
            fontSize: "13px",
            borderCollapse: "collapse",
          }}
        >
          <tbody style={muted}>
            <tr>
              <td style={{ padding: "0.35rem 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                Static binaries
              </td>
              <td style={{ padding: "0.35rem 0", verticalAlign: "top" }}>
                Preload can&apos;t intercept statically linked binaries. Use
                eBPF on Linux, or <code>CGO_ENABLED=1</code> for Go.
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.35rem 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                Non-git directories
              </td>
              <td style={{ padding: "0.35rem 0", verticalAlign: "top" }}>
                Silo needs a git repo to compute the IP. Use{" "}
                <code>--ip</code> for non-git dirs.
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.35rem 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                macOS SIP
              </td>
              <td style={{ padding: "0.35rem 0", verticalAlign: "top" }}>
                System binaries strip <code>DYLD_INSERT_LIBRARIES</code>.
                Install shells via Homebrew.
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0.35rem 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                IPv4 only
              </td>
              <td style={{ padding: "0.35rem 0", verticalAlign: "top" }}>
                Silo assigns IPs in <code>127.0.0.0/8</code>. Pure IPv6
                listeners are converted to IPv4-mapped addresses.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
