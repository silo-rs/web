import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "silo – transparent port isolation for git worktrees";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0a0a0a",
          fontFamily: "monospace",
          color: "#e5e5e5",
        }}
      >
        <img
          src={logoBase64}
          width={96}
          height={96}
          style={{ borderRadius: 20, marginBottom: 32 }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          silo
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#737373",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Run the same app on the same port, simultaneously
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 48,
            fontSize: 16,
            color: "#525252",
          }}
        >
          <span>git worktrees</span>
          <span>/</span>
          <span>AI agents</span>
          <span>/</span>
          <span>parallel dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
