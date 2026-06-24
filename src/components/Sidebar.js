// "use client";
import { Plus, History as HistoryIcon, Heart, Settings, User } from "lucide-react";

const navItems = [
  { key: "generate", label: "Generate", icon: Plus },
  { key: "history", label: "History", icon: HistoryIcon },
  { key: "favorites", label: "Favorites", icon: Heart },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "account", label: "Account", icon: User },
];

export default function Sidebar({
  activeView,
  favoriteCount,
  historyOpen,
  onFavoritesClick,
  onHistoryClick,
  onNewChat,
}) {
  return (
    <aside className="fixed bottom-3 left-2 right-2 z-40 flex h-16 items-center justify-between rounded-[24px] bg-[var(--surface)]/92 px-3 shadow-[0_18px_70px_var(--shadow-deep),inset_0_0_0_1px_var(--border-soft)] backdrop-blur md:bottom-auto md:left-0 md:right-auto md:top-0 md:h-dvh md:w-16 md:flex-col md:rounded-none md:px-0 md:py-5 lg:w-20">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent-strong)] shadow-sm shadow-[var(--shadow-soft)] md:h-11 md:w-11">
        LF
      </div>

      <nav className="grid flex-1 grid-cols-5 items-center gap-1 pl-2 md:mt-8 md:flex md:w-full md:flex-col md:gap-2 md:pl-0">
        {navItems.map((item) => {
          const isGenerate = item.key === "generate";
          const isFavorites = item.key === "favorites";
          const isHistory = item.key === "history";
          const isActive =
            (isGenerate && activeView === "generate") ||
            (isFavorites && activeView === "favorites") ||
            (isHistory && historyOpen);

          return (
            <button
              aria-label={item.label}
              aria-pressed={isHistory ? historyOpen : undefined}
              className={`group relative flex h-11 w-full min-w-0 items-center justify-center rounded-[16px] text-[var(--text-muted)] transition duration-200 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/35 active:scale-[0.98] md:w-11 lg:w-12 ${isActive ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]" : ""
                } ${item.key === "account" ? "md:mt-auto" : ""}`}
              key={item.key}
              onClick={
                isGenerate
                  ? onNewChat
                  : isHistory
                    ? onHistoryClick
                    : isFavorites
                      ? onFavoritesClick
                      : undefined
              }
              title={item.label}
              type="button"
            >
              <item.icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
              {isFavorites && favoriteCount ? (
                <span className="absolute right-1 top-1 min-w-4 rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold leading-4 text-[#071011]">
                  {favoriteCount}
                </span>
              ) : null}
              <span className="sr-only">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
