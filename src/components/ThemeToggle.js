export default function ThemeToggle({ onToggle, theme }) {
  const isDark = theme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-11 rounded-[16px] border border-[var(--border-soft)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--text-secondary)] shadow-sm shadow-[var(--shadow-soft)] transition hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45 active:scale-[0.98]"
      onClick={onToggle}
      type="button"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
