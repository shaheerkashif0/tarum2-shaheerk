function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export default function HistoryPanel({ items, onClose, open }) {
  const historyItems = items.slice(0, 10);
  const olderCount = Math.max(items.length - historyItems.length, 0);

  return (
    <>
      <button
        aria-label="Close history"
        className={`fixed inset-0 z-40 bg-black/45 transition duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        type="button"
      />
      <aside
        aria-hidden={!open}
        className={`fixed inset-x-2 bottom-2 z-50 max-h-[76dvh] overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface)] shadow-2xl shadow-[var(--shadow-soft)] transition duration-300 md:bottom-auto md:left-auto md:right-4 md:top-4 md:h-[calc(100dvh-32px)] md:w-[360px] ${
          open
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-[110%] md:translate-x-[calc(100%+32px)] md:translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] p-5">
          <div>
            <h2 className="text-base font-semibold text-[var(--text-primary)]">History</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Latest 10 searches</p>
          </div>
          <button
            className="rounded-full border border-[var(--border-soft)] px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45 active:scale-[0.98]"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="grid max-h-[calc(76dvh-112px)] gap-2 overflow-y-auto p-3 md:max-h-[calc(100dvh-164px)]">
          {historyItems.length ? historyItems.map((item) => (
            <article
              className="rounded-[20px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-4"
              key={item.id}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 truncate text-sm font-medium text-[var(--text-primary)]">
                  {item.prompt}
                </h3>
                <span className="shrink-0 text-xs text-[var(--text-muted)]">
                  {formatDate(item.createdAt)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {item.resultCount} {item.mediaType === "image" ? "photos" : item.mediaType === "video" ? "videos" : "results"}
                {item.usedFallback ? " from fallback" : ""}
              </p>
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                {item.options.style}, {item.options.imageCount} shown
              </p>
            </article>
          )) : (
            <div className="rounded-[20px] border border-[var(--border-soft)] bg-[var(--surface-muted)] p-5 text-sm leading-6 text-[var(--text-secondary)]">
              No history yet. Generate a prompt to save the session here.
            </div>
          )}
        </div>
        <div className="border-t border-[var(--border-soft)] p-3">
          <button
            className="w-full rounded-[18px] border border-[var(--border-soft)] px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45 active:scale-[0.98]"
            type="button"
          >
            {olderCount ? `More history (${olderCount})` : "More history"}
          </button>
        </div>
      </aside>
    </>
  );
}
