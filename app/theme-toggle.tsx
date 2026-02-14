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
    const logo = next ? "/logo-light.png" : "/logo.png";
    const iconLink = document.querySelector('link[rel="icon"]');
    if (iconLink) iconLink.setAttribute("href", logo);
    const appleLink = document.querySelector('link[rel="apple-touch-icon"]');
    if (appleLink) appleLink.setAttribute("href", logo);
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
      {dark ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
