const optionGroups = [
  {
    label: "Style",
    options: ["Editorial calm", "Product study", "Architecture", "Atmospheric"],
  },
  {
    label: "Model",
    options: ["Luma Base", "Luma Detail", "Luma Motion"],
  },
  {
    label: "Aspect Ratio",
    options: ["4:5", "1:1", "16:9", "3:4"],
  },
  {
    label: "Quality",
    options: ["Balanced", "High", "Draft"],
  },
  {
    label: "Image Count",
    options: ["4", "6", "8"],
  },
];

export default function OptionsPopover({ open }) {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute left-2 right-2 top-[calc(100%+8px)] z-40 rounded-[24px] border border-white/10 bg-[#111416] p-3 shadow-2xl shadow-black/40 sm:left-auto sm:right-2 sm:w-[360px]">
      <div className="grid gap-2">
        {optionGroups.map((group) => (
          <label
            className="grid grid-cols-[104px_1fr] items-center gap-3 rounded-[16px] bg-white/[0.035] px-3 py-2 text-sm text-zinc-400"
            key={group.label}
          >
            <span>{group.label}</span>
            <select className="h-10 min-w-0 rounded-[14px] border border-white/10 bg-[#0c0f10] px-3 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-cyan-300/45">
              {group.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}
