import MainPreview from "./MainPreview";
import ThumbnailRail from "./ThumbnailRail";

export default function ResultsWorkspace({
  error,
  fallbackActive,
  favoriteIds,
  hasGenerated,
  items,
  onSelect,
  onToggleFavorite,
  selectedItem,
  view,
}) {
  const isFavoritesView = view === "favorites";

  if (!items.length) {
    return (
      <section className="mx-auto flex min-h-[45dvh] w-full max-w-[760px] items-center px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="w-full rounded-[30px] bg-[var(--surface)] p-8 shadow-[0_18px_70px_var(--shadow-soft),inset_0_0_0_1px_var(--border-soft)]">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {isFavoritesView
              ? "No favorites yet"
              : hasGenerated
                ? "Nothing to show here"
                : "Start by describing an image"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {isFavoritesView
              ? "Save generated results and they will appear in this view."
              : hasGenerated
                ? "Try switching the Photo or Video filter."
                : "Generated results will appear here."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1480px] px-4 py-7 sm:px-6 lg:px-8">
      {error ? (
        <p className="mb-4 rounded-[18px] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-[inset_0_0_0_1px_var(--border-soft)]">
          Showing saved results while the generator route is unavailable.
        </p>
      ) : null}
      {fallbackActive ? (
        <p className="mb-4 rounded-[18px] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-secondary)] shadow-[inset_0_0_0_1px_var(--border-soft)]">
          No exact match found. Showing a curated random set from the library.
        </p>
      ) : null}
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_300px]">
        <MainPreview
          favoriteIds={favoriteIds}
          item={selectedItem}
          onToggleFavorite={onToggleFavorite}
        />
        <ThumbnailRail
          favoriteIds={favoriteIds}
          items={items}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          selectedId={selectedItem?.id}
        />
      </div>
    </section>
  );
}
