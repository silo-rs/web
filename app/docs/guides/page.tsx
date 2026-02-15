import type { Metadata } from "next";
import { code, muted, heading } from "@/app/docs/styles";
import { BreadcrumbJsonLd } from "@/app/docs/json-ld";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical patterns for browser access, databases, and other things outside silo's interception layer.",
  alternates: { canonical: "/docs/guides" },
  openGraph: { url: "/docs/guides" },
};

export default function GuidesPage() {
  return (
    <article>
      <BreadcrumbJsonLd slug="guides" title="Guides" />
      <h1
        style={{
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "2rem",
          color: "var(--text-muted)",
        }}
      >
        Guides
      </h1>

      <p style={{ ...muted, marginBottom: "3rem" }}>
        Silo intercepts syscalls inside the session. Things outside the session
        - browsers, GUI database clients, other tools - need to reach the right
        IP on their own. These patterns help.
      </p>

      {/* AI & parallel dev */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Parallel AI coding</h2>
        <p style={muted}>
          Tools like{" "}
          <a href="https://github.com/BloopAI/vibe-kanban">vibe-kanban</a> spawn
          multiple AI agents that each work on a separate branch. Every agent
          needs its own dev server - on the same port.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          Wrap the dev command with silo and each agent gets an isolated
          loopback IP. No port&nbsp;conflicts, no configuration:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`agent-1 (feature-auth)  $ silo npm run dev   # 127.0.1.1:3000
agent-2 (feature-cart)  $ silo npm run dev   # 127.0.1.2:3000
agent-3 (fix-header)    $ silo npm run dev   # 127.0.1.3:3000`}
        </pre>
        <p style={muted}>
          Silo pairs naturally with any tool that creates worktrees for parallel
          development - AI-driven or otherwise.
        </p>
      </section>

      {/* Multi-service */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Multi-service</h2>
        <p style={muted}>
          Child processes inherit the silo session. Wrap your process manager
          and every service shares the same isolated IP:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`silo make dev             # Makefile
silo just dev             # Justfile
silo overmind start       # Procfile
silo turbo run dev        # Turborepo`}
        </pre>
      </section>

      {/* Browser access */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Browser access</h2>
        <p style={muted}>
          Your dev server binds to <code>127.x.x.x:3000</code>, not{" "}
          <code>127.0.0.1:3000</code>. The browser is outside silo, so{" "}
          <code>localhost:3000</code> won&apos;t reach it.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          Use the hostname that silo adds to <code>/etc/hosts</code>:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`$ silo ip
127.185.176.25  feature-auth.my-app.silo

# open in browser:
http://feature-auth.my-app.silo:3000`}
        </pre>
      </section>

      {/* Client-side API URLs */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Client-side API URLs</h2>
        <p style={muted}>
          Browser code runs outside silo, so <code>localhost</code> in the
          browser resolves to <code>127.0.0.1</code>, not your silo IP.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          Use the <code>SILO_HOST</code> environment variable to point
          client-side API URLs at the right address:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`NEXT_PUBLIC_API_URL="http://\${SILO_HOST}:8080" next dev
VITE_API_URL="http://\${SILO_HOST}:8080" vite dev`}
        </pre>
        <p style={muted}>
          Alternatively, use your framework&apos;s dev server proxy. The dev
          server runs inside silo, so its outbound requests are intercepted
          automatically.
        </p>
      </section>

      {/* Databases */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Database isolation</h2>
        <p style={muted}>
          Multiple worktrees often share a single database server. Migrations on
          one branch can break another. Silo doesn&apos;t intercept connections
          to external databases, but <code>SILO_NAME</code> gives you a stable,
          per-branch identifier you can use to separate them.
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
          Database per branch
        </h3>
        <p style={muted}>
          Use <code>SILO_NAME</code> as a suffix in your connection string:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`# dev.sh
export DATABASE_URL="postgres://localhost:5432/myapp_\${SILO_NAME}"
silo npm run dev`}
        </pre>
        <p style={muted}>
          Branch <code>main</code> connects to <code>myapp_main</code>, branch{" "}
          <code>feature-auth</code> to <code>myapp_feature-auth</code>.
          Migrations stay isolated.
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
          Database server per branch
        </h3>
        <p style={muted}>
          If you run a local database per worktree, silo handles the port
          conflict:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`silo postgres -p 5432 -D ./data &
silo npm run dev`}
        </pre>
        <p style={muted}>
          Both processes share the same session IP. Your app connects to{" "}
          <code>localhost:5432</code> and silo routes it to the right instance.
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
          Shared database
        </h3>
        <p style={muted}>
          If branches don&apos;t touch the schema, sharing is fine. No changes
          needed - your app connects to the real database address as usual, and
          silo only rewrites loopback addresses.
        </p>
      </section>

      {/* GUI tools */}
      <section>
        <h2 style={heading}>GUI database clients &amp; other tools</h2>
        <p style={muted}>
          Tools like TablePlus, pgAdmin, or Postman run outside silo. To connect
          to a silo&apos;d service, use the session IP or hostname directly:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`$ silo ip
127.185.176.25  feature-auth.my-app.silo

# In TablePlus:
Host: 127.185.176.25  (or feature-auth.my-app.silo)
Port: 5432`}
        </pre>
        <p style={muted}>
          <code>silo ls</code> shows all active sessions and their ports.
        </p>
      </section>
    </article>
  );
}
