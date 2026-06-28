"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BadgeCheck, BookOpen, Boxes, CirclePlay, Compass, Fuel, ShieldAlert } from "lucide-react";
import { ResponsiveContentAd } from "@/components/ads/ResponsiveContentAd";
import messages from "@/locales/en.json";
import { cn } from "@/lib/utils";

const iconByIndex = [BookOpen, Boxes, BadgeCheck, Compass, Fuel, ShieldAlert, CirclePlay, ArrowRight];
const localizedHomeCopy = {
  es: {
    hero: {
      eyebrow: "Wiki comunitaria hecha por fans",
      title: "SAND: Raiders of Sophie",
      description: "Construye tu Trampler, recorre las dunas de Sophie, saquea ciudades en ruinas y extrae antes de que otros raiders se lleven todo.",
      primaryCta: "Empezar guía inicial",
      secondaryCta: "Construir tu Trampler",
      tertiaryCta: "Ver códigos activos",
      videoLabel: "Tráiler oficial",
      stats: messages.home.hero.stats,
    },
    trailerTitle: "Mira el tráiler oficial de SAND: Raiders of Sophie",
    trailerDescription: "Observa la escala de los Tramplers, los raids del desierto, el combate en primera persona y la presión de extracción antes de entrar a las guías.",
  },
  de: {
    hero: {
      eyebrow: "Fan-Wiki der Community",
      title: "SAND: Raiders of Sophie",
      description: "Baue deinen Trampler, durchstreife Sophies Dünen, plündere Ruinenstädte und extrahiere, bevor rivalisierende Raider alles mitnehmen.",
      primaryCta: "Einsteiger-Guide starten",
      secondaryCta: "Trampler bauen",
      tertiaryCta: "Aktive Codes prüfen",
      videoLabel: "Offizieller Trailer",
      stats: messages.home.hero.stats,
    },
    trailerTitle: "Sieh dir den offiziellen SAND: Raiders of Sophie Trailer an",
    trailerDescription: "Erlebe Trampler-Größe, Wüstenraids, First-Person-Kämpfe und Extraktionsdruck, bevor du in die Wiki-Bereiche eintauchst.",
  },
  fr: {
    hero: {
      eyebrow: "Wiki communautaire créé par les fans",
      title: "SAND: Raiders of Sophie",
      description: "Construisez votre Trampler, parcourez les dunes de Sophie, fouillez les villes en ruine et extrayez avant que les raiders rivaux ne prennent tout.",
      primaryCta: "Commencer le guide débutant",
      secondaryCta: "Construire votre Trampler",
      tertiaryCta: "Voir les codes actifs",
      videoLabel: "Bande-annonce officielle",
      stats: messages.home.hero.stats,
    },
    trailerTitle: "Regardez la bande-annonce officielle de SAND: Raiders of Sophie",
    trailerDescription: "Découvrez l'échelle des Tramplers, les raids du désert, le combat à la première personne et la pression d'extraction avant d'ouvrir les guides.",
  },
  pt: {
    hero: {
      eyebrow: "Wiki comunitária feita por fãs",
      title: "SAND: Raiders of Sophie",
      description: "Construa seu Trampler, percorra as dunas de Sophie, saqueie cidades em ruínas e extraia antes que raiders rivais levem tudo.",
      primaryCta: "Começar guia inicial",
      secondaryCta: "Construir seu Trampler",
      tertiaryCta: "Ver códigos ativos",
      videoLabel: "Trailer oficial",
      stats: messages.home.hero.stats,
    },
    trailerTitle: "Assista ao trailer oficial de SAND: Raiders of Sophie",
    trailerDescription: "Veja a escala dos Tramplers, os raids no deserto, o combate em primeira pessoa e a pressão da extração antes de entrar nas seções do wiki.",
  },
} as const;

function ModuleHighlights({ module }: { module: (typeof messages.home.explore.modules)[number] }) {
  if (module.displayType === "tier-grid") {
    return (
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {module.highlights.map((item) => (
          <div key={item.label} className="rounded-md border border-stone-700 bg-stone-950/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-8 w-8 place-items-center rounded bg-amber-400 font-black text-stone-950">{item.label}</span>
              {"badge" in item && <span className="text-xs font-bold uppercase tracking-wide text-amber-200">{item.badge}</span>}
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-300">{item.detail}</p>
          </div>
        ))}
      </div>
    );
  }

  if (module.displayType === "code-cards") {
    return (
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {module.highlights.map((item) => (
          <div key={item.label} className="rounded-md border border-amber-500/30 bg-amber-950/30 p-4">
            <div className="font-mono text-lg font-black text-amber-100">{item.label}</div>
            {"badge" in item && <div className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-300">{item.badge}</div>}
            <p className="mt-3 text-sm leading-6 text-stone-300">{item.detail}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("mt-5 grid gap-3", module.displayType === "step-by-step" ? "sm:grid-cols-2" : "")}>
      {module.highlights.map((item) => (
        <div key={item.label} className="flex gap-3 rounded-md bg-stone-950/60 p-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded bg-stone-800 text-sm font-black text-amber-200">{item.label}</span>
          <p className="text-sm leading-6 text-stone-300">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomePageClient() {
  const pathname = usePathname();
  const locale = pathname.split("/").filter(Boolean)[0];
  const prefix = ["es", "de", "fr", "pt"].includes(locale) ? `/${locale}` : "";
  const copy = localizedHomeCopy[locale as keyof typeof localizedHomeCopy];
  const hero = copy?.hero || messages.home.hero;
  const href = (path: string) => `${prefix}${path}`;

  return (
    <main>
      <section className="relative overflow-hidden border-b border-stone-800 bg-[#090806]">
        <Image src="/images/hero.webp" alt="SAND: Raiders of Sophie desert Trampler hero art" fill priority className="object-cover opacity-48" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#090806_0%,rgba(9,8,6,0.88)_35%,rgba(9,8,6,0.35)_70%,#090806_100%)]" />
        <div className="relative mx-auto grid min-h-[690px] max-w-7xl content-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">{hero.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] text-stone-50 sm:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">{hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href("/beginner-guide")} className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-sm font-black text-stone-950 shadow-xl shadow-amber-950/30 transition hover:bg-amber-300">
                {hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={href("/trampler-builds")} className="inline-flex items-center gap-2 rounded-md border border-amber-300/40 bg-stone-950/50 px-5 py-3 text-sm font-black text-amber-100 transition hover:bg-amber-400/10">
                {hero.secondaryCta}
              </Link>
              <Link href={href("/codes")} className="inline-flex items-center gap-2 rounded-md border border-stone-700 bg-stone-950/50 px-5 py-3 text-sm font-black text-stone-200 transition hover:border-amber-300/50 hover:text-amber-100">
                {hero.tertiaryCta}
              </Link>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-5">
              {hero.stats.map((stat) => (
                <div key={stat} className="rounded-md border border-stone-700/80 bg-stone-950/70 px-3 py-3 text-sm font-bold text-stone-200">
                  {stat}
                </div>
              ))}
            </div>
          </div>
          <div className="self-end rounded-lg border border-amber-500/30 bg-stone-950/75 p-4 shadow-2xl shadow-black/50">
            <Image src="/images/main-capsule.webp" alt="SAND: Raiders of Sophie Steam main capsule" width={616} height={353} className="rounded-md object-cover" priority />
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-stone-300">
              <div className="rounded-md bg-stone-900/70 p-3"><span className="block text-amber-200">Developer</span>Hologryph, TowerHaus</div>
              <div className="rounded-md bg-stone-900/70 p-3"><span className="block text-amber-200">Publisher</span>tinyBuild</div>
            </div>
          </div>
        </div>
      </section>

      <ResponsiveContentAd label="Advertisement" className="my-6" />

      <section className="border-b border-stone-800 bg-[#11100d]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">{hero.videoLabel}</p>
            <h2 className="mt-4 text-3xl font-black text-stone-50">{copy?.trailerTitle || "Watch the official SAND: Raiders of Sophie trailer"}</h2>
            <p className="mt-4 text-base leading-8 text-stone-400">{copy?.trailerDescription || "See the Trampler scale, desert raids, first-person combat, and extraction pressure before diving into the wiki sections."}</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-stone-700 bg-black shadow-2xl shadow-black/50">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/zkH4dKTLfr4"
              srcDoc={`<style>*{box-sizing:border-box}body{margin:0;background:#080706;font-family:Arial,sans-serif}a{position:relative;display:block;height:100vh;color:white;text-decoration:none;background:url('/images/trailer-still.webp') center/cover no-repeat}a:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,7,6,.72),rgba(8,7,6,.1))}span{position:absolute;left:32px;bottom:28px;display:inline-flex;align-items:center;gap:12px;border-radius:6px;background:#f2b632;color:#090806;padding:14px 18px;font-weight:900;font-size:14px}span:before{content:'\\25B6';font-size:18px}</style><a href="https://www.youtube.com/embed/zkH4dKTLfr4?autoplay=1" aria-label="Play official SAND Raiders of Sophie trailer"><span>Play official trailer</span></a>`}
              title="Official SAND: Raiders of Sophie trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-[#090806]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">{messages.home.start.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black text-stone-50">{messages.home.start.title}</h2>
            </div>
            <Link href={href("/guide")} className="inline-flex items-center gap-2 text-sm font-black text-amber-200 hover:text-amber-100">
              Browse Guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {messages.home.start.cards.map((card) => (
              <div key={card.number} className="rounded-lg border border-stone-800 bg-stone-950/76 p-5">
                <span className="grid h-9 w-9 place-items-center rounded bg-amber-400 font-black text-stone-950">{card.number}</span>
                <h3 className="mt-5 text-lg font-black text-stone-50">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-800 bg-[#15130f]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-stone-50">{messages.home.aboutGame.title}</h2>
            {messages.home.aboutGame.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-8 text-stone-300">{paragraph}</p>
            ))}
            <Link href={href("/guide")} className="mt-7 inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-sm font-black text-stone-950 hover:bg-amber-300">
              {messages.home.aboutGame.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {messages.home.aboutGame.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-stone-800 bg-stone-950/70 p-4">
                <div className="text-xs font-black uppercase tracking-wide text-amber-300">{stat.label}</div>
                <div className="mt-2 text-base font-bold text-stone-100">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090806]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-stone-50">{messages.home.explore.title}</h2>
            <p className="mt-4 text-base leading-8 text-stone-400">{messages.home.explore.description}</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {messages.home.explore.modules.map((module, index) => {
              const Icon = iconByIndex[index] || BookOpen;
              return (
                <article key={module.name} className="rounded-lg border border-stone-800 bg-stone-950/76 p-5 shadow-xl shadow-black/20">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-amber-400 text-stone-950">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-stone-50">{module.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-stone-400">{module.description}</p>
                    </div>
                  </div>
                  <ModuleHighlights module={module} />
                  <Link href={href(module.href)} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-200 hover:text-amber-100">
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-800 bg-[#15130f]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-stone-50">SAND: Raiders of Sophie FAQ</h2>
            <p className="mt-4 text-base leading-8 text-stone-400">Short answers for the questions players usually ask before their first raid.</p>
          </div>
          <div className="grid gap-4">
            {messages.home.faq.map((item) => (
              <details key={item.question} className="rounded-lg border border-stone-800 bg-stone-950/70 p-5">
                <summary className="cursor-pointer text-base font-black text-stone-50">{item.question}</summary>
                <p className="mt-4 text-sm leading-7 text-stone-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(120deg,#d9961f,#7a3b13)]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-stone-950">{messages.home.finalCta.title}</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone-900">{messages.home.finalCta.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={href("/beginner-guide")} className="rounded-md bg-stone-950 px-5 py-3 text-sm font-black text-amber-100 hover:bg-stone-900">
              {messages.home.finalCta.primary}
            </Link>
            <a href="https://store.steampowered.com/app/1431300/SAND_Raiders_of_Sophie/" target="_blank" rel="noreferrer" className="rounded-md border border-stone-950 px-5 py-3 text-sm font-black text-stone-950 hover:bg-stone-950/10">
              {messages.home.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
