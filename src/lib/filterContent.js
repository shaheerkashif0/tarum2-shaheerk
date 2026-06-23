export const defaultPromptOptions = {
  style: "Any style",
  model: "Any model",
  aspectRatio: "Any ratio",
  quality: "Any quality",
  imageCount: "8",
};

export const mediaTypes = ["all", "image", "video"];

export const optionChoices = {
  style: [
    "Any style",
    "Cinematic",
    "Editorial",
    "Product",
    "Architectural",
    "Portrait",
    "Nature",
    "Abstract",
  ],
  model: ["Any model", "Luma Base", "Luma Detail", "Luma Motion"],
  aspectRatio: ["Any ratio", "3:4", "4:5", "1:1", "16:9", "4:3", "3:2"],
  quality: ["Any quality", "Draft", "Balanced", "High"],
  imageCount: ["4", "8", "12", "16"],
};

function normalize(value) {
  return String(value || "").toLowerCase();
}

function tokenize(value) {
  return normalize(value)
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function ratioLabel(value) {
  return String(value || "").replace(/\s*\/\s*/g, ":");
}

function matchesOption(value, selected, anyLabel) {
  return selected === anyLabel || value === selected;
}

function itemSearchText(item) {
  return [
    item.title,
    item.prompt,
    item.alt,
    item.style,
    item.model,
    item.quality,
    item.type,
    ...(item.tags || []),
  ]
    .map(normalize)
    .join(" ");
}

function scoreItem(item, tokens, phrase) {
  const searchText = itemSearchText(item);
  const tags = (item.tags || []).map(normalize);
  let score = phrase && searchText.includes(phrase) ? 3 : 0;

  for (const token of tokens) {
    if (tags.some((tag) => tag === token || tag.includes(token))) {
      score += 4;
    } else if (normalize(item.title).includes(token)) {
      score += 3;
    } else if (normalize(item.prompt).includes(token)) {
      score += 2;
    } else if (searchText.includes(token)) {
      score += 1;
    }
  }

  return score;
}

function fallbackSeed(prompt, options) {
  const input = `${prompt}|${options.style}|${options.model}|${options.aspectRatio}|${options.quality}|${options.imageCount}`;
  let seed = 0;

  for (let index = 0; index < input.length; index += 1) {
    seed = (seed * 31 + input.charCodeAt(index)) >>> 0;
  }

  return seed || 1;
}

function seededShuffle(items, seed) {
  const shuffled = [...items];
  let state = seed;

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function filterByMediaType(items, mediaType) {
  if (!mediaType || mediaType === "all") {
    return items;
  }

  return items.filter((item) => item.type === mediaType);
}

export function filterGeneratedContent(items, prompt, options = defaultPromptOptions) {
  const tokens = tokenize(prompt);
  const phrase = normalize(prompt).trim();

  if (!tokens.length) {
    return [];
  }

  const maxItems = Number(options.imageCount) || Number(defaultPromptOptions.imageCount);

  return items
    .filter((item) => {
      return (
        matchesOption(item.style, options.style, "Any style") &&
        matchesOption(item.model, options.model, "Any model") &&
        matchesOption(ratioLabel(item.aspectRatio), options.aspectRatio, "Any ratio") &&
        matchesOption(item.quality, options.quality, "Any quality")
      );
    })
    .map((item, index) => ({
      item,
      index,
      score: scoreItem(item, tokens, phrase),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, maxItems)
    .map((entry) => entry.item);
}

export function getFallbackContent(items, prompt, options = defaultPromptOptions) {
  const maxItems = Number(options.imageCount) || Number(defaultPromptOptions.imageCount);
  const optionMatches = items.filter((item) => {
    return (
      matchesOption(item.style, options.style, "Any style") &&
      matchesOption(item.model, options.model, "Any model") &&
      matchesOption(ratioLabel(item.aspectRatio), options.aspectRatio, "Any ratio") &&
      matchesOption(item.quality, options.quality, "Any quality")
    );
  });
  const pool = optionMatches.length ? optionMatches : items;

  return seededShuffle(pool, fallbackSeed(prompt, options)).slice(0, maxItems);
}
