import HomePageClient from "./[locale]/HomePageClient";
import { SiteFooter, SiteHeader } from "@/components/site";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-[#090806] text-stone-100">
      <SiteHeader />
      <HomePageClient />
      <SiteFooter />
    </div>
  );
}
