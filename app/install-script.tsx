"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const command = "curl -fsSL https://setup.silo.rs | sh";

export function InstallScript() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        margin: "2rem 0",
        padding: "0.75rem 1rem",
        background: "var(--bg-code)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        fontSize: "13px",
      }}
    >
      <code style={{ color: "var(--text-muted)" }}>{command}</code>
      <button
        onClick={copy}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-dimmed)",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
