"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";

const languages = [
  { locale: "en", label: "English" },
  { locale: "es", label: "Español" },
  { locale: "de", label: "Deutsch" },
  { locale: "fr", label: "Français" },
  { locale: "pt", label: "Português" },
];

function stripLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];

  if (first && languages.some((language) => language.locale === first)) {
    const pathWithoutLocale = parts.slice(1).join("/");
    return pathWithoutLocale ? `/${pathWithoutLocale}` : "/";
  }

  return pathname || "/";
}

function hrefForLocale(locale: string, pathname: string) {
  const basePath = stripLocale(pathname);
  if (locale === "en") return basePath;
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <details className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-stone-700 bg-stone-950/70 px-3 text-sm font-black text-stone-100 transition hover:border-amber-300/60 hover:text-amber-100">
        <Globe2 className="h-4 w-4 text-amber-300" />
        <span className="hidden sm:inline">Language</span>
      </summary>
      <div className="absolute right-0 top-12 z-50 grid min-w-40 gap-1 rounded-md border border-stone-700 bg-stone-950 p-2 shadow-2xl shadow-black/40">
        {languages.map((language) => (
          <Link
            key={language.locale}
            href={hrefForLocale(language.locale, pathname)}
            className="rounded px-3 py-2 text-sm font-bold text-stone-300 hover:bg-amber-400/10 hover:text-amber-100"
            hrefLang={language.locale}
          >
            {language.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
