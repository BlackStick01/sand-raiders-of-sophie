import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";
import messages from "@/locales/en.json";
import { absoluteUrl } from "@/lib/utils";
import { SUPPORTED_LOCALES, getHomePath, isSupportedLocale } from "@/lib/content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const canonical = getHomePath(safeLocale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    keywords: messages.metadata.keywords,
    alternates: {
      canonical: absoluteUrl(canonical),
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((targetLocale) => [targetLocale, absoluteUrl(getHomePath(targetLocale))]),
      ),
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(canonical),
      siteName: messages.site.name,
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: [{ url: absoluteUrl("/images/hero.webp"), width: 1920, height: 620, alt: "SAND: Raiders of Sophie desert Trampler hero art" }],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: [absoluteUrl("/images/hero.webp")],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const intlMessages = await getMessages();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: messages.site.name,
    url: absoluteUrl(getHomePath(locale)),
    logo: absoluteUrl("/images/main-capsule.webp"),
    image: absoluteUrl("/images/hero.webp"),
    sameAs: [
      "https://sand-game.com/",
      "https://store.steampowered.com/app/1431300/SAND_Raiders_of_Sophie/",
      "https://www.youtube.com/watch?v=zkH4dKTLfr4",
    ],
  };

  return (
    <NextIntlClientProvider messages={intlMessages}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <div className="min-h-screen bg-[#090806] text-stone-100">
        <SiteHeader locale={safeLocale} />
        {children}
        <SiteFooter locale={safeLocale} />
      </div>
    </NextIntlClientProvider>
  );
}
