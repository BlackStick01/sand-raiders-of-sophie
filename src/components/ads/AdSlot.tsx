"use client";

import { useEffect, useRef, useState } from "react";
import { adsConfig, type AdSlotKey } from "@/config/ads";
import { cn } from "@/lib/utils";

type Device = "mobile" | "desktop";

type AdSlotProps = {
  slot: AdSlotKey;
  label: string;
  className?: string;
  reserveSpace?: boolean;
};

function getDevice(): Device {
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

function createAdDocument({
  token,
  key,
  width,
  height,
}: {
  token: string;
  key: string;
  width: number;
  height: number;
}) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <style>
      html,body{margin:0;padding:0;width:${width}px;height:${height}px;overflow:hidden;background:transparent;}
    </style>
  </head>
  <body>
    <script>
      (function () {
        var token = ${JSON.stringify(token)};
        function notify(status) {
          parent.postMessage({ type: "sand-wiki-ad-slot", token: token, status: status }, "*");
        }
        window.atOptions = {
          key: ${JSON.stringify(key)},
          format: "iframe",
          height: ${height},
          width: ${width},
          params: {}
        };
        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.highperformanceformat.com/${key}/invoke.js";
        script.onerror = function () { notify("error"); };
        script.onload = function () {
          window.setTimeout(function () {
            notify(document.querySelector("iframe") ? "loaded" : "empty");
          }, 800);
        };
        document.body.appendChild(script);
        window.setTimeout(function () {
          notify(document.querySelector("iframe") ? "loaded" : "timeout");
        }, 4500);
      })();
    </script>
  </body>
</html>`;
}

export function AdSlot({ slot, label, className, reserveSpace = true }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "hidden">("idle");
  const config = adsConfig.slots[slot];

  useEffect(() => {
    if (!adsConfig.enabled || !config.enabled) {
      setStatus("hidden");
      return;
    }

    const device = getDevice();
    if (!(config.devices as readonly Device[]).includes(device)) {
      setStatus("hidden");
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let timeoutId: number | undefined;
    let cancelled = false;
    const token = `ad-${slot}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const hide = () => {
      if (cancelled) return;
      window.removeEventListener("message", handleMessage);
      setStatus("hidden");
      container.replaceChildren();
    };

    const markLoaded = () => {
      if (cancelled) return;
      setStatus("loaded");
    };

    const handleMessage = (event: MessageEvent) => {
      if (
        !event.data ||
        event.data.type !== "sand-wiki-ad-slot" ||
        event.data.token !== token
      ) {
        return;
      }

      if (event.data.status === "loaded") {
        if (timeoutId) window.clearTimeout(timeoutId);
        markLoaded();
        return;
      }

      hide();
    };

    const loadAd = () => {
      if (cancelled || startedRef.current || container.querySelector("iframe[data-ad-slot]")) return;
      startedRef.current = true;
      setStatus("loading");

      window.addEventListener("message", handleMessage);

      const frame = document.createElement("iframe");
      frame.dataset.adSlot = slot;
      frame.title = label;
      frame.width = String(config.width);
      frame.height = String(config.height);
      frame.loading = "lazy";
      frame.scrolling = "no";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.sandbox.add("allow-scripts");
      frame.style.width = `${config.width}px`;
      frame.style.height = `${config.height}px`;
      frame.style.maxWidth = "100%";
      frame.style.border = "0";
      frame.style.display = "block";
      frame.style.overflow = "hidden";
      frame.srcdoc = createAdDocument({
        token,
        key: config.key,
        width: config.width,
        height: config.height,
      });

      timeoutId = window.setTimeout(() => {
        hide();
      }, 4500);

      container.appendChild(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          loadAd();
        }
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(container);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("message", handleMessage);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [config, label, slot]);

  if (!adsConfig.enabled || !config.enabled || status === "hidden") return null;

  return (
    <div
      className={cn("mx-auto flex w-full justify-center px-4", className)}
      style={{ minHeight: reserveSpace && status !== "idle" ? config.height : undefined }}
      aria-label={label}
    >
      <div
        ref={containerRef}
        className="max-w-full overflow-hidden"
        style={{ width: config.width, minHeight: reserveSpace && status !== "idle" ? config.height : undefined }}
      />
    </div>
  );
}
