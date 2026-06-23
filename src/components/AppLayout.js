"use client";

import { useEffect, useState } from "react";
import HistoryPanel from "./HistoryPanel";
import MasonryGrid from "./MasonryGrid";
import Sidebar from "./Sidebar";
import TopPromptBar from "./TopPromptBar";

export default function AppLayout({ initialResults = [] }) {
  const [results, setResults] = useState(initialResults);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [status, setStatus] = useState(initialResults.length ? "ready" : "loading");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadGeneratedContent() {
      try {
        const response = await fetch("/api/generated-content");

        if (!response.ok) {
          throw new Error("Generated content request failed");
        }

        const data = await response.json();

        if (!cancelled) {
          setResults(data);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    loadGeneratedContent();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleGenerate(prompt) {
    setGeneratedPrompt(prompt);
  }

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#080a0b] text-zinc-100">
      <Sidebar
        historyOpen={historyOpen}
        onHistoryClick={() => setHistoryOpen((open) => !open)}
      />
      <main className="min-w-0 pb-28 md:ml-16 md:pb-12 lg:ml-20">
        <TopPromptBar
          generatedPrompt={generatedPrompt}
          onGenerate={handleGenerate}
        />
        <MasonryGrid
          error={status === "error"}
          isLoading={status === "loading" && results.length === 0}
          items={results}
        />
      </main>
      <HistoryPanel
        items={results}
        onClose={() => setHistoryOpen(false)}
        open={historyOpen}
      />
    </div>
  );
}
