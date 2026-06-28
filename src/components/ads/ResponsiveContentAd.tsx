"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "./AdSlot";

type ResponsiveContentAdProps = {
  label: string;
  className?: string;
};

export function ResponsiveContentAd({ label, className }: ResponsiveContentAdProps) {
  const [device, setDevice] = useState<"mobile" | "desktop" | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const updateDevice = () => setDevice(query.matches ? "mobile" : "desktop");

    updateDevice();
    query.addEventListener("change", updateDevice);
    return () => query.removeEventListener("change", updateDevice);
  }, []);

  if (!device) return null;

  return (
    <AdSlot
      slot={device === "mobile" ? "mobileBanner" : "desktopLeaderboard"}
      label={label}
      className={className}
    />
  );
}
