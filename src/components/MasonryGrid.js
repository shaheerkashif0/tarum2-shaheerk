import ResultCard from "./ResultCard";
import styles from "./MasonryGrid.module.css";

const skeletons = ["2 / 3", "1 / 1", "3 / 4", "16 / 9", "4 / 5", "5 / 6"];

export default function MasonryGrid({ error, isLoading, items }) {
  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
        <div aria-hidden="true" className={styles.grid}>
          {skeletons.map((ratio) => (
            <div className={styles.item} key={ratio}>
              <div
                className={styles.skeleton}
                style={{ aspectRatio: ratio }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="mx-auto flex min-h-[45dvh] w-full max-w-[760px] items-center px-4 py-12 text-center">
        <div className="w-full rounded-[28px] border border-white/10 bg-white/[0.035] p-8">
          <h1 className="text-xl font-semibold text-zinc-100">No results yet</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Add a prompt above to start filling the board.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8">
      {error ? (
        <p className="mb-4 rounded-[18px] border border-cyan-200/20 bg-cyan-200/10 px-4 py-3 text-sm text-cyan-50">
          Showing saved results while the generator route is unavailable.
        </p>
      ) : null}
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div className={styles.item} key={item.id}>
            <ResultCard item={item} priority={index < 2} />
          </div>
        ))}
      </div>
    </section>
  );
}
