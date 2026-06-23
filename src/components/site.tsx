import Image from "next/image";
import Link from "next/link";
import { BookOpen, Gamepad2, Shield, Sparkles } from "lucide-react";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import messages from "@/locales/en.json";
import { getLatestContent } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-800/80 bg-stone-950/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/en" className="flex min-w-0 items-center gap-3">
          <Image src="/images/main-capsule.webp" alt="SAND: Raiders of Sophie Steam main capsule" width={92} height={53} className="h-10 w-16 rounded-sm object-cover shadow-lg shadow-black/40" priority />
          <div className="min-w-0">
            <div className="truncate text-sm font-black uppercase tracking-wide text-amber-100">{messages.site.shortName}</div>
            <div className="hidden text-xs text-stone-400 sm:block">{messages.site.tagline}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {Object.values(NAVIGATION_CONFIG).map((item) => (
            <Link key={item.key} href={item.href} className="rounded-md px-3 py-2 text-sm font-semibold text-stone-300 transition hover:bg-amber-400/10 hover:text-amber-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <a href="https://store.steampowered.com/app/1431300/SAND_Raiders_of_Sophie/" className="rounded-md bg-amber-400 px-4 py-2 text-sm font-black text-stone-950 shadow-lg shadow-amber-950/30 transition hover:bg-amber-300" target="_blank" rel="noreferrer">
          Steam
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-800 bg-[#080706]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-xl font-black text-stone-50">{messages.footer.aboutTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400">{messages.footer.about}</p>
          <p className="mt-4 text-xs text-stone-500">{messages.site.legalNotice}</p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-amber-200">Official Links</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <a className="text-stone-300 hover:text-amber-200" href="https://sand-game.com/" target="_blank" rel="noreferrer">Official Website</a>
            <a className="text-stone-300 hover:text-amber-200" href="https://discord.com/invite/zk3ZWg8Ntd" target="_blank" rel="noreferrer">{messages.footer.officialDiscord}</a>
            <a className="text-stone-300 hover:text-amber-200" href="https://www.youtube.com/watch?v=zkH4dKTLfr4" target="_blank" rel="noreferrer">{messages.footer.officialYoutube}</a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-amber-200">Site</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <Link className="text-stone-300 hover:text-amber-200" href="/en/about">About</Link>
            <Link className="text-stone-300 hover:text-amber-200" href="/en/privacy-policy">{messages.footer.privacyPolicy}</Link>
            <Link className="text-stone-300 hover:text-amber-200" href="/en/terms-of-service">{messages.footer.termsOfService}</Link>
            <Link className="text-stone-300 hover:text-amber-200" href="/en/copyright">Copyright</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WikiSidebar() {
  const latest = getLatestContent(6);
  return (
    <aside className="space-y-5">
      <div className="rounded-lg border border-stone-800 bg-stone-950/76 p-5 shadow-xl shadow-black/20">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-200">
          <BookOpen className="h-4 w-4" />
          {messages.shared.wikiNavigation}
        </div>
        <div className="mt-4 grid gap-2">
          {Object.values(NAVIGATION_CONFIG).map((item) => (
            <Link key={item.key} href={item.href} className="rounded-md border border-stone-800 bg-stone-900/50 px-3 py-2 text-sm font-semibold text-stone-300 hover:border-amber-400/50 hover:text-amber-100">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-5">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-200">
          <Sparkles className="h-4 w-4" />
          {messages.shared.activeCodes}
        </div>
        <div className="mt-4 space-y-3">
          {messages.sidebarCodes.map((code) => (
            <div key={code.reward} className="rounded-md bg-stone-950/70 p-3">
              <div className="font-mono text-sm font-black text-amber-100">{code.code}</div>
              <div className="mt-1 text-xs leading-5 text-stone-400">{code.reward}</div>
            </div>
          ))}
        </div>
        <Link href="/en/codes/sand-raiders-of-sophie-codes" className="mt-4 inline-flex text-sm font-bold text-amber-200 hover:text-amber-100">
          {messages.shared.viewAllCodes}
        </Link>
      </div>
      <div className="rounded-lg border border-stone-800 bg-stone-950/76 p-5">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-200">
          <Gamepad2 className="h-4 w-4" />
          Latest Articles
        </div>
        <div className="mt-4 space-y-3">
          {latest.map((item) => (
            <Link key={item.path} href={`/en/${item.path}`} className="block text-sm font-semibold leading-6 text-stone-300 hover:text-amber-100">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-stone-800 bg-stone-950/76 p-5 text-sm leading-7 text-stone-400">
        <div className="flex items-center gap-2 font-black uppercase tracking-wide text-amber-200">
          <Shield className="h-4 w-4" />
          Fan Notice
        </div>
        <p className="mt-3">{messages.site.legalNotice}</p>
      </div>
    </aside>
  );
}
