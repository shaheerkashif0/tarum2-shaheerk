import Image from "next/image";

export default function ThumbnailRail({
  favoriteIds,
  items,
  onSelect,
  onToggleFavorite,
  selectedId,
}) {
  return (
    <aside className="min-w-0 rounded-[28px] bg-[var(--surface)] p-3 shadow-[0_18px_70px_var(--shadow-soft),inset_0_0_0_1px_var(--border-soft)] lg:max-h-[calc(100dvh-230px)] lg:overflow-y-auto">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Generated set
        </h3>
        <span className="text-xs text-[var(--text-muted)]">{items.length} items</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {items.map((item, index) => {
          const isSelected = item.id === selectedId;
          const isFavorite = favoriteIds.includes(item.id);
          const previewSrc = item.poster || item.src;

          return (
            <article
              className={`group overflow-hidden rounded-[20px] bg-[var(--surface-strong)] transition ${
                isSelected
                  ? "shadow-[0_10px_34px_var(--shadow-soft),inset_0_0_0_1px_var(--accent)]"
                  : "shadow-[inset_0_0_0_1px_var(--border-soft)] hover:shadow-[inset_0_0_0_1px_var(--border-strong)]"
              }`}
              key={item.id}
            >
              <button
                className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45"
                onClick={() => onSelect(item.id)}
                type="button"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    alt={item.alt}
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 280px"
                    src={previewSrc}
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-black/45 px-2 py-1 text-[10px] font-semibold text-white/90 backdrop-blur">
                    {index + 1}
                  </span>
                  {item.type === "video" ? (
                    <span className="absolute right-2 top-2 rounded-full bg-black/45 px-2 py-1 text-[10px] font-semibold text-white/90 backdrop-blur">
                      Video
                    </span>
                  ) : null}
                </div>
              </button>
              <div className="flex items-center justify-between gap-2 p-3">
                <button
                  className="min-w-0 flex-1 truncate text-left text-xs font-semibold text-[var(--text-primary)]"
                  onClick={() => onSelect(item.id)}
                  type="button"
                >
                  {item.title}
                </button>
                <button
                  aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
                  aria-pressed={isFavorite}
                  className={`h-8 w-8 shrink-0 rounded-full text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45 active:scale-[0.98] ${
                    isFavorite
                      ? "bg-[var(--accent)] text-[#071011]"
                      : "bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-[inset_0_0_0_1px_var(--border-soft)] hover:bg-[var(--surface-hover)]"
                  }`}
                  onClick={() => onToggleFavorite(item.id)}
                  type="button"
                >
                  F
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
