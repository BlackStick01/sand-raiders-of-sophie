import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { WikiSidebar } from "@/components/site";
import { getCategoryMeta, getContentByCategory, getContentMeta, getContentModule, isKnownCategory } from "@/lib/content";
import messages from "@/locales/en.json";
import { absoluteUrl, titleCaseSlug } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [category, articleSlug] = slug;

  if (!category) return {};

  if (!articleSlug) {
    const categoryMeta = getCategoryMeta(category);
    if (!categoryMeta) return {};
    return {
      title: `${categoryMeta.label} - SAND: Raiders of Sophie Wiki`,
      description: categoryMeta.description,
      alternates: { canonical: absoluteUrl(`/en/${category}`) },
    };
  }

  const meta = getContentMeta(category, articleSlug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: absoluteUrl(`/en/${category}/${articleSlug}`) },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(`/en/${category}/${articleSlug}`),
      images: [{ url: absoluteUrl("/images/hero.webp"), width: 1920, height: 620, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [absoluteUrl("/images/hero.webp")],
    },
  };
}

function CategoryPage({ category }: { category: string }) {
  const categoryMeta = getCategoryMeta(category);
  const articles = getContentByCategory(category);
  if (!categoryMeta) notFound();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryMeta.label} articles`,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/en/${article.path}`),
      name: article.title,
    })),
  };

  return (
    <main className="bg-[#090806]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <section>
          <div className="rounded-lg border border-stone-800 bg-stone-950/76 p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">{messages.site.shortName}</p>
            <h1 className="mt-4 text-4xl font-black text-stone-50">{categoryMeta.label}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-stone-400">{categoryMeta.description}</p>
          </div>
          <div className="mt-6 grid gap-4">
            {articles.map((article) => (
              <Link key={article.path} href={`/en/${article.path}`} className="group rounded-lg border border-stone-800 bg-stone-950/70 p-5 transition hover:border-amber-400/50">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-xl font-black text-stone-50 group-hover:text-amber-100">{article.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-stone-400">{article.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-amber-300" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <WikiSidebar />
      </div>
    </main>
  );
}

async function ArticlePage({ category, articleSlug }: { category: string; articleSlug: string }) {
  const meta = getContentMeta(category, articleSlug);
  const mod = await getContentModule(category, articleSlug);
  if (!meta || !mod) notFound();
  const Content = mod.default;
  const categoryLabel = getCategoryMeta(category)?.label || titleCaseSlug(category);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    image: absoluteUrl("/images/hero.webp"),
    author: {
      "@type": "Organization",
      name: messages.site.name,
    },
    publisher: {
      "@type": "Organization",
      name: messages.site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/main-capsule.webp"),
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/en") },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: absoluteUrl(`/en/${category}`) },
      { "@type": "ListItem", position: 3, name: meta.title, item: absoluteUrl(`/en/${meta.path}`) },
    ],
  };

  return (
    <main className="bg-[#090806]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <article className="min-w-0">
          <div className="rounded-lg border border-stone-800 bg-stone-950/76 p-6">
            <nav className="text-sm font-bold text-stone-400">
              <Link href="/en" className="hover:text-amber-200">Home</Link>
              <span className="px-2">/</span>
              <Link href={`/en/${category}`} className="hover:text-amber-200">{categoryLabel}</Link>
            </nav>
            <h1 className="mt-5 text-4xl font-black leading-tight text-stone-50 sm:text-5xl">{meta.title}</h1>
            <p className="mt-5 text-base leading-8 text-stone-400">{meta.description}</p>
            <div className="mt-5 text-sm font-bold uppercase tracking-wide text-amber-300">Updated {meta.date}</div>
          </div>
          <div className="mt-6 rounded-lg border border-stone-800 bg-stone-950/65 p-6">
            <Content />
          </div>
        </article>
        <WikiSidebar />
      </div>
    </main>
  );
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const [category, articleSlug, extra] = slug;
  if (!category || extra || !isKnownCategory(category)) notFound();
  if (!articleSlug) return <CategoryPage category={category} />;
  return <ArticlePage category={category} articleSlug={articleSlug} />;
}
