"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, () => document.documentElement.classList.contains("dark"), () => true);

  function toggle() {
    document.documentElement.classList.toggle("dark", !isDark);
    try { localStorage.setItem("theme", isDark ? "light" : "dark"); } catch { /* Theme still works when storage is unavailable. */ }
  }

  return (
    <button type="button" onClick={toggle} className="icon-link" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Light mode" : "Dark mode"}>
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
