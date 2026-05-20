"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid var(--c-border-md)",
        background: "var(--c-panel)",
        color: "var(--c-text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.22s ease",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--c-accent, #2DD4BF)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "#0C0C0B";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--c-panel)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border-md)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--c-text)";
      }}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
