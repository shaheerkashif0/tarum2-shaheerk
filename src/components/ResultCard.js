import Image from "next/image";

export default function ResultCard({ item, priority }) {
  const isVideo = item.type === "video";
  const poster = item.poster || item.src;

  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#111416] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/20 hover:shadow-cyan-950/20">
      <div
        className="relative overflow-hidden rounded-[24px] bg-[#111416]"
        style={{ aspectRatio: item.aspectRatio }}
      >
        {isVideo ? (
          <video
            aria-label={item.alt}
            className="h-full w-full object-cover"
            muted
            playsInline
            poster={poster}
            preload="none"
          >
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            alt={item.alt}
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
            fill
            priority={priority}
            sizes="(max-width: 639px) 100vw, (max-width: 979px) 50vw, (max-width: 1319px) 33vw, 25vw"
            src={item.src}
          />
        )}

        {isVideo ? (
          <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-zinc-100 backdrop-blur">
            Video
          </div>
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 flex translate-y-0 flex-col gap-3 p-4 opacity-100 transition duration-300 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          <div>
            <h2 className="text-sm font-semibold text-zinc-50">{item.title}</h2>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-300">
              {item.prompt}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["View", "Remix", "Save"].map((action) => (
              <button
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-zinc-50 backdrop-blur transition hover:bg-cyan-200 hover:text-[#071011] focus:outline-none focus:ring-2 focus:ring-cyan-300/60 active:scale-[0.98]"
                key={action}
                type="button"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
