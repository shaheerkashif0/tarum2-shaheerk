const mediaOptions = [
  { value: "all", label: "All" },
  { value: "image", label: "Photo" },
  { value: "video", label: "Video" },
];

export default function MediaTypeToggle({ mediaType, onChange }) {
  return (
    <div className="flex rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface)] p-1 shadow-sm shadow-[var(--shadow-soft)]">
      {mediaOptions.map((option) => {
        const active = mediaType === option.value;

        return (
          <button
            aria-pressed={active}
            className={`h-9 rounded-[14px] px-3 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45 active:scale-[0.98] sm:text-sm ${
              active
                ? "bg-[var(--accent)] text-[#071011]"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
            }`}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
