export default function ThemeToggle({ onToggle, theme }) {
  const isDark = theme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-10 rounded-[16px] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--text-secondary)] shadow-[inset_0_0_0_1px_var(--border-soft),0_8px_26px_var(--shadow-soft)] transition hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/35 active:scale-[0.98]"
      onClick={onToggle}
      type="button"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
