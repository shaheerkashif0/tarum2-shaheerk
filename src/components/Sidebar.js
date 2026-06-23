const navItems = [
  { key: "generate", label: "Generate", icon: "+" },
  { key: "history", label: "History", icon: "◷" },
  { key: "favorites", label: "Favorites", icon: "☆" },
  { key: "settings", label: "Settings", icon: "⚙" },
  { key: "account", label: "Account", icon: "A" },
];

export default function Sidebar({ historyOpen, onHistoryClick }) {
  return (
    <aside className="fixed bottom-3 left-2 right-2 z-40 flex h-16 items-center justify-between rounded-[24px] border border-white/10 bg-[#101315]/95 px-3 shadow-2xl shadow-black/35 backdrop-blur md:bottom-auto md:left-0 md:right-auto md:top-0 md:h-dvh md:w-16 md:flex-col md:rounded-none md:border-y-0 md:border-l-0 md:px-0 md:py-5 lg:w-20">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-cyan-200/20 bg-cyan-300/10 text-xs font-semibold text-cyan-100 md:h-11 md:w-11">
        LF
      </div>

      <nav className="grid flex-1 grid-cols-5 items-center gap-1 pl-2 md:mt-8 md:flex md:w-full md:flex-col md:gap-2 md:pl-0">
        {navItems.map((item) => {
          const isHistory = item.key === "history";
          const isActive = item.key === "generate" || (isHistory && historyOpen);

          return (
            <button
              key={item.key}
              aria-label={item.label}
              aria-pressed={isHistory ? historyOpen : undefined}
              className={`group flex h-11 min-w-0 items-center justify-center rounded-[16px] text-zinc-400 transition duration-200 hover:bg-white/[0.06] hover:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 active:scale-[0.98] md:w-11 lg:w-12 ${
                isActive ? "bg-cyan-300/12 text-cyan-100" : ""
              } ${item.key === "account" ? "md:mt-auto" : ""}`}
              onClick={isHistory ? onHistoryClick : undefined}
              title={item.label}
              type="button"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                {item.icon}
              </span>
              <span className="sr-only">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
