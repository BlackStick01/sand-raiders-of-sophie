"use client";

import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AdSlot } from "./AdSlot";

type ArticleMidAdInserterProps = {
  contentSelector: string;
};

function pickInsertionTarget(content: HTMLElement) {
  const candidates = Array.from(
    content.querySelectorAll<HTMLElement>("h2, h3, p, ul, ol"),
  ).filter((element) => element.textContent?.trim());

  if (candidates.length < 4) return null;
  return candidates[Math.max(1, Math.floor(candidates.length * 0.3))];
}

export function ArticleMidAdInserter({ contentSelector }: ArticleMidAdInserterProps) {
  useEffect(() => {
    const content = document.querySelector<HTMLElement>(contentSelector);
    if (!content || content.querySelector("[data-article-mid-ad]")) return;

    const target = pickInsertionTarget(content);
    if (!target) return;

    const mount = document.createElement("div");
    mount.dataset.articleMidAd = "true";
    mount.className = "not-prose";
    target.insertAdjacentElement("afterend", mount);

    const root: Root = createRoot(mount);
    root.render(
      <AdSlot
        slot="contentRectangle"
        label="In-article advertisement"
        className="my-8"
      />,
    );

    return () => {
      root.unmount();
      mount.remove();
    };
  }, [contentSelector]);

  return null;
}
