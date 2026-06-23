"use client";

import { useEffect, useRef, useState } from "react";
import OptionsPopover from "./OptionsPopover";

export default function TopPromptBar({
  generatedPrompt,
  onGenerate,
  onOptionChange,
  onPromptChange,
  options,
  prompt,
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function submitPrompt(event) {
    event.preventDefault();

    const cleanPrompt = prompt.trim();

    if (!cleanPrompt) {
      return;
    }

    setIsGenerating(true);
    onGenerate(cleanPrompt);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setIsGenerating(false);
    }, 900);
  }

  return (
    <section className="sticky top-0 z-30 bg-[var(--app-bg)]/90 px-4 pb-5 pt-2 backdrop-blur-xl sm:px-6 lg:px-8">
      <form
        className="mx-auto flex w-full max-w-[1480px] flex-col gap-3"
        onSubmit={submitPrompt}
      >
        <div className="relative flex min-w-0 flex-col gap-2 rounded-[30px] bg-[var(--surface)] p-2 shadow-[0_18px_70px_var(--shadow-soft),inset_0_0_0_1px_var(--border-soft)] sm:flex-row sm:items-center sm:rounded-[34px]">
          <label className="sr-only" htmlFor="prompt">
            Prompt
          </label>
          <input
            autoComplete="off"
            className="min-h-12 min-w-0 flex-1 rounded-[22px] bg-transparent px-4 text-base text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/45 sm:px-5"
            id="prompt"
            onChange={(event) => onPromptChange(event.target.value)}
            placeholder="Describe an image to generate..."
            type="text"
            value={prompt}
          />
          <div className="flex shrink-0 gap-2">
            <button
              aria-expanded={optionsOpen}
              className="h-11 rounded-[18px] bg-[var(--surface-muted)] px-4 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/35 active:scale-[0.98]"
              onClick={() => setOptionsOpen((open) => !open)}
              type="button"
            >
              Options
            </button>
            <button
              className="h-11 rounded-[18px] bg-[var(--accent)] px-5 text-sm font-semibold text-[#071011] shadow-sm shadow-[var(--shadow-soft)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/55 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isGenerating || !prompt.trim()}
              type="submit"
            >
              {isGenerating ? "Generating" : "Generate"}
            </button>
          </div>
          <OptionsPopover
            onOptionChange={onOptionChange}
            open={optionsOpen}
            options={options}
          />
        </div>

        <p
          aria-live="polite"
          className="min-h-5 px-2 text-xs text-[var(--text-muted)] sm:px-4"
        >
          {generatedPrompt
            ? `Latest prompt: ${generatedPrompt}`
            : "Generated results will appear here."}
        </p>
      </form>
    </section>
  );
}
