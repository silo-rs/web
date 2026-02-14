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
      <h1 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "2rem", color: "var(--text-muted)" }}>
        Guides
      </h1>

      <p style={{ ...muted, marginBottom: "3rem" }}>
        Silo intercepts syscalls inside the session. Things outside the
        session&mdash;browsers, GUI database clients, other tools&mdash;need
        to reach the right IP on their own. These patterns help.
      </p>

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
          Environment variables like <code>NEXT_PUBLIC_API_URL</code> get baked
          into the browser bundle at build time. If they point to{" "}
          <code>localhost:8080</code>, the browser sends requests
          to <code>127.0.0.1:8080</code>&mdash;where nothing is listening.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          <strong>Fix: proxy through the dev server.</strong> The dev server runs
          inside silo, so its outbound <code>connect()</code> calls are
          intercepted automatically.
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`// next.config.js
async rewrites() {
  return [{
    source: "/api/:path*",
    destination: "http://localhost:8080/:path*",
  }];
}`}
        </pre>
        <p style={muted}>
          The browser hits <code>/api/...</code> on the same origin. Next.js
          proxies it to <code>localhost:8080</code>, which silo rewrites to the
          session IP. No <code>NEXT_PUBLIC_</code> variable needed.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          Most frameworks have an equivalent: Vite&apos;s{" "}
          <code>server.proxy</code>, webpack <code>devServer.proxy</code>,
          Angular <code>proxy.conf.json</code>.
        </p>
        <p style={{ ...muted, marginTop: "0.75rem" }}>
          If a proxy isn&apos;t an option, point the variable at{" "}
          <code>SILO_HOST</code> in your dev script:
        </p>
        <pre style={{ ...code, color: "var(--text-muted)" }}>
          {`# dev.sh
export NEXT_PUBLIC_API_URL="http://\${SILO_HOST}:8080"
next dev`}
        </pre>
      </section>

      {/* Databases */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={heading}>Database isolation</h2>
        <p style={muted}>
          Multiple worktrees often share a single database server. Migrations on
          one branch can break another. Silo doesn&apos;t intercept connections to
          external databases, but <code>SILO_NAME</code> gives you a stable,
          per-branch identifier you can use to separate them.
        </p>

        <h3 style={{ fontSize: "13px", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--text-muted)" }}>
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
          Branch <code>main</code> connects to <code>myapp_main</code>,
          branch <code>feature-auth</code> to{" "}
          <code>myapp_feature-auth</code>. Migrations stay isolated.
        </p>

        <h3 style={{ fontSize: "13px", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--text-muted)" }}>
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
          Both processes share the same session IP. Your app connects
          to <code>localhost:5432</code> and silo routes it to the right
          instance.
        </p>

        <h3 style={{ fontSize: "13px", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem", color: "var(--text-muted)" }}>
          Shared database
        </h3>
        <p style={muted}>
          If branches don&apos;t touch the schema, sharing is fine. No
          changes needed&mdash;your app connects to the real database address
          as usual, and silo only rewrites loopback addresses.
        </p>
      </section>

      {/* GUI tools */}
      <section>
        <h2 style={heading}>GUI database clients &amp; other tools</h2>
        <p style={muted}>
          Tools like TablePlus, pgAdmin, or Postman run outside silo. To
          connect to a silo&apos;d service, use the session IP or hostname
          directly:
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
