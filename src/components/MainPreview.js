import Image from "next/image";

export default function MainPreview({ favoriteIds, item, onToggleFavorite }) {
  if (!item) {
    return null;
  }

  const isVideo = item.type === "video";
  const isFavorite = favoriteIds.includes(item.id);
  const poster = item.poster || item.src;

  return (
    <article className="overflow-hidden rounded-[32px] bg-[var(--surface)] shadow-[0_24px_90px_var(--shadow-deep),inset_0_0_0_1px_var(--border-soft)]">
      <div
        className="relative min-h-[360px] overflow-hidden bg-[var(--surface-strong)] sm:min-h-[520px] lg:min-h-[650px]"
        style={{ aspectRatio: item.aspectRatio }}
      >
        {isVideo ? (
          <video
            aria-label={item.alt}
            className="h-full w-full object-cover"
            controls
            muted
            playsInline
            poster={poster}
            preload="metadata"
          >
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            alt={item.alt}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 70vw"
            src={item.src}
          />
        )}
        <div className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
          {isVideo ? "Video" : "Photo"}
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:p-6">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-[-0.01em] text-[var(--text-primary)] sm:text-2xl">
            {item.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
            {item.prompt}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[item.style, item.model, item.quality].map((label) => (
              <span
                className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)] shadow-[inset_0_0_0_1px_var(--border-soft)]"
                key={label}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <button
          aria-pressed={isFavorite}
          className={`h-11 rounded-[18px] px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45 active:scale-[0.98] ${
            isFavorite
              ? "bg-[var(--accent)] text-[#071011]"
              : "bg-[var(--surface-muted)] text-[var(--text-primary)] shadow-[inset_0_0_0_1px_var(--border-soft)] hover:bg-[var(--surface-hover)]"
          }`}
          onClick={() => onToggleFavorite(item.id)}
          type="button"
        >
          {isFavorite ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
