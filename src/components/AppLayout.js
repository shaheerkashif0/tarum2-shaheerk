"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import HistoryPanel from "./HistoryPanel";
import ResultsWorkspace from "./ResultsWorkspace";
import Sidebar from "./Sidebar";
import TopPromptBar from "./TopPromptBar";
import {
  defaultPromptOptions,
  filterByMediaType,
  filterGeneratedContent,
  getFallbackContent,
} from "@/lib/filterContent";

const favoriteStorageKey = "takhleeq-favorites";
const themeStorageKey = "takhleeq-theme";

export default function AppLayout({ initialResults = [] }) {
  const [catalog, setCatalog] = useState(initialResults);
  const [results, setResults] = useState([]);
  const [fallbackActive, setFallbackActive] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [status, setStatus] = useState("ready");
  const [storageReady, setStorageReady] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [view, setView] = useState("generate");
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(defaultPromptOptions);

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
          setCatalog(data);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setStatus(initialResults.length ? "ready" : "error");
        }
      }
    }

    loadGeneratedContent();

    return () => {
      cancelled = true;
    };
  }, [initialResults.length]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    const storedFavorites = window.localStorage.getItem(favoriteStorageKey);

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }

    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);

        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        }
      } catch {
        setFavorites([]);
      }
    }

    setStorageReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (storageReady) {
      window.localStorage.setItem(themeStorageKey, theme);
    }
  }, [storageReady, theme]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(favoriteStorageKey, JSON.stringify(favorites));
    }
  }, [favorites, storageReady]);

  function getGeneratedResults(nextPrompt, nextOptions, nextMediaType) {
    const mediaCatalog = filterByMediaType(catalog, nextMediaType);
    const matchedResults = filterGeneratedContent(mediaCatalog, nextPrompt, nextOptions);
    const requestedCount = Number(nextOptions.imageCount) || Number(defaultPromptOptions.imageCount);

    if (matchedResults.length) {
      if (matchedResults.length >= requestedCount) {
        return {
          items: matchedResults,
          usedFallback: false,
        };
      }

      const matchedIds = new Set(matchedResults.map((item) => item.id));
      const topUpItems = getFallbackContent(
        mediaCatalog.filter((item) => !matchedIds.has(item.id)),
        `${nextPrompt}-top-up`,
        {
          ...nextOptions,
          imageCount: String(requestedCount - matchedResults.length),
        }
      );

      return {
        items: [...matchedResults, ...topUpItems].slice(0, requestedCount),
        usedFallback: false,
      };
    }

    return {
      items: getFallbackContent(mediaCatalog, `${nextPrompt}-${Date.now()}`, nextOptions),
      usedFallback: true,
    };
  }

  function runGeneration(nextPrompt, nextOptions = selectedOptions, nextMediaType = mediaType) {
    const generation = getGeneratedResults(nextPrompt, nextOptions, nextMediaType);

    setResults(generation.items);
    setSelectedItemId(generation.items[0]?.id || "");
    setFallbackActive(generation.usedFallback);
    setLastPrompt(nextPrompt);
    setHasGenerated(true);
    setView("generate");
    setHistoryItems((items) => [
      {
        id: `${Date.now()}-${items.length}`,
        prompt: nextPrompt,
        options: nextOptions,
        mediaType: nextMediaType,
        resultCount: generation.items.length,
        usedFallback: generation.usedFallback,
        createdAt: new Date().toISOString(),
      },
      ...items,
    ].slice(0, 24));
  }

  function handleGenerate(nextPrompt) {
    runGeneration(nextPrompt);
  }

  function handleOptionChange(name, value) {
    const nextOptions = {
      ...selectedOptions,
      [name]: value,
    };

    setSelectedOptions(nextOptions);

    if (hasGenerated && lastPrompt) {
      const generation = getGeneratedResults(lastPrompt, nextOptions, mediaType);

      setResults(generation.items);
      setSelectedItemId(generation.items[0]?.id || "");
      setFallbackActive(generation.usedFallback);
    }
  }

  function handleMediaTypeChange(nextMediaType) {
    setMediaType(nextMediaType);

    if (hasGenerated && lastPrompt && view === "generate") {
      const generation = getGeneratedResults(lastPrompt, selectedOptions, nextMediaType);

      setResults(generation.items);
      setSelectedItemId(generation.items[0]?.id || "");
      setFallbackActive(generation.usedFallback);
    }
  }

  function handleNewChat() {
    setPrompt("");
    setLastPrompt("");
    setResults([]);
    setSelectedItemId("");
    setFallbackActive(false);
    setSelectedOptions(defaultPromptOptions);
    setHasGenerated(false);
    setHistoryOpen(false);
    setView("generate");
  }

  function toggleFavorite(itemId) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(itemId)) {
        return currentFavorites.filter((favoriteId) => favoriteId !== itemId);
      }

      return [itemId, ...currentFavorites];
    });
  }

  function handleFavoritesClick() {
    setView("favorites");
    setHistoryOpen(false);
    const favoriteItems = catalog.filter((item) => favorites.includes(item.id));
    setSelectedItemId(favoriteItems[0]?.id || "");
  }

  const favoriteItems = catalog.filter((item) => favorites.includes(item.id));
  const workspaceItems = view === "favorites"
    ? filterByMediaType(favoriteItems, mediaType)
    : results;
  const selectedItem = workspaceItems.find((item) => item.id === selectedItemId) || workspaceItems[0];

  function handleThemeToggle() {
    setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <div
      className="min-h-[100dvh] overflow-x-hidden bg-[var(--app-bg)] text-[var(--text-primary)]"
      data-theme={theme}
    >
      <Sidebar
        activeView={view}
        favoriteCount={favorites.length}
        historyOpen={historyOpen}
        onFavoritesClick={handleFavoritesClick}
        onHistoryClick={() => setHistoryOpen((open) => !open)}
        onNewChat={handleNewChat}
      />
      <main className="min-w-0 pb-28 md:ml-16 md:pb-12 lg:ml-20">
        <Header
          mediaType={mediaType}
          onMediaTypeChange={handleMediaTypeChange}
          onThemeToggle={handleThemeToggle}
          theme={theme}
        />
        <TopPromptBar
          generatedPrompt={lastPrompt}
          onGenerate={handleGenerate}
          onOptionChange={handleOptionChange}
          onPromptChange={setPrompt}
          options={selectedOptions}
          prompt={prompt}
        />
        <ResultsWorkspace
          error={status === "error"}
          fallbackActive={fallbackActive && view === "generate"}
          favoriteIds={favorites}
          hasGenerated={hasGenerated}
          items={workspaceItems}
          onSelect={setSelectedItemId}
          onToggleFavorite={toggleFavorite}
          selectedItem={selectedItem}
          view={view}
        />
      </main>
      <HistoryPanel
        items={historyItems}
        onClose={() => setHistoryOpen(false)}
        open={historyOpen}
      />
    </div>
  );
}
