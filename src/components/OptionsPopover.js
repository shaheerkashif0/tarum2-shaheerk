import { optionChoices } from "@/lib/filterContent";

const optionGroups = [
  { key: "style", label: "Style" },
  { key: "model", label: "Model" },
  { key: "aspectRatio", label: "Aspect Ratio" },
  { key: "quality", label: "Quality" },
  { key: "imageCount", label: "Image Count" },
];

export default function OptionsPopover({ onOptionChange, open, options }) {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute left-2 right-2 top-[calc(100%+8px)] z-40 rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface)] p-3 shadow-2xl shadow-[var(--shadow-soft)] sm:left-auto sm:right-2 sm:w-[360px]">
      <div className="grid gap-2">
        {optionGroups.map((group) => (
          <label
            className="grid grid-cols-[104px_1fr] items-center gap-3 rounded-[16px] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--text-secondary)]"
            key={group.key}
          >
            <span>{group.label}</span>
            <select
              className="h-10 min-w-0 rounded-[14px] border border-[var(--border-soft)] bg-[var(--surface)] px-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/45"
              onChange={(event) => onOptionChange(group.key, event.target.value)}
              value={options[group.key]}
            >
              {optionChoices[group.key].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}
