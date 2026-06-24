import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ onToggle, theme }) {
  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[var(--surface)] text-[var(--text-secondary)] shadow-[inset_0_0_0_1px_var(--border-soft),0_8px_26px_var(--shadow-soft)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/35 active:scale-[0.98]"
      onClick={onToggle}
      type="button"
    >
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
