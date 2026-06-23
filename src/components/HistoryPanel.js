function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export default function HistoryPanel({ items, onClose, open }) {
  const historyItems = items.slice(0, 6);

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
        className={`fixed inset-x-2 bottom-2 z-50 max-h-[76dvh] overflow-hidden rounded-[28px] border border-white/10 bg-[#101315] shadow-2xl shadow-black/45 transition duration-300 md:bottom-auto md:left-auto md:right-4 md:top-4 md:h-[calc(100dvh-32px)] md:w-[360px] ${
          open
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-[110%] md:translate-x-[calc(100%+32px)] md:translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
          <div>
            <h2 className="text-base font-semibold text-zinc-50">History</h2>
            <p className="mt-1 text-sm text-zinc-500">Recent generated ideas</p>
          </div>
          <button
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 active:scale-[0.98]"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="grid max-h-[calc(76dvh-96px)] gap-2 overflow-y-auto p-3 md:max-h-[calc(100dvh-132px)]">
          {historyItems.map((item) => (
            <article
              className="rounded-[20px] border border-white/[0.06] bg-white/[0.035] p-4"
              key={item.id}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium text-zinc-100">{item.title}</h3>
                <span className="shrink-0 text-xs text-zinc-500">
                  {formatDate(item.createdAt)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{item.prompt}</p>
            </article>
          ))}
        </div>
      </aside>
    </>
  );
}
