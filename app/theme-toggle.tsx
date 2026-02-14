"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
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
      {dark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
