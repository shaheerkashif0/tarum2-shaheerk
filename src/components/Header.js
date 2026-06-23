import MediaTypeToggle from "./MediaTypeToggle";
import ThemeToggle from "./ThemeToggle";

export default function Header({ mediaType, onMediaTypeChange, onThemeToggle, theme }) {
  return (
    <header className="bg-[var(--app-bg)]/94 px-4 pb-2 pt-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent-strong)] shadow-sm shadow-[var(--shadow-soft)]">
            T
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
              Takhleeq
            </h1>
            <p className="hidden text-sm text-[var(--text-muted)] sm:block">
              A focused board for generated ideas
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <MediaTypeToggle mediaType={mediaType} onChange={onMediaTypeChange} />
          <ThemeToggle onToggle={onThemeToggle} theme={theme} />
          <button
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-[16px] bg-[var(--surface)] text-sm font-semibold text-[var(--text-secondary)] shadow-sm shadow-[var(--shadow-soft)] transition hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/35 active:scale-[0.98] sm:flex"
            type="button"
          >
            U
          </button>
        </div>
      </div>
    </header>
  );
}
