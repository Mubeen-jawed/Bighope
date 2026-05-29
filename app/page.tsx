import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import DSPBanner from "@/components/DSPBanner";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import B2BBanner from "@/components/B2BBanner";
import { sanityFetch } from "@/lib/sanity/client";
import { siteSettingsQuery, TAGS } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import type { SiteSettings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: [TAGS.siteSettings],
  });

  const slides = (settings?.heroSlides || []).map((h) => ({
    fullWidth: true as const,
    pcImage: imageUrl(h.desktopImage, 1920),
    mbImage: imageUrl(h.mobileImage, 900),
    topText: h.topText || "",
    mainText: h.mainText || "",
    description: h.description || "",
    link: h.link || "#",
  }));

  const dspImage =
    imageUrl(settings?.dspImage, 1000) || "/sports/rugby-kit-front.webp";

  return (
    <>
      {/* 1. Hero */}
      <Hero slides={slides} />

      {/* 2. Our Range, sport category cards */}
      <Categories />

      {/* 3. Distinct selling points poster */}
      <DSPBanner imageSrc={dspImage} />

      {/* 4. Packages */}
      <Packages />

      {/* 5. B2B partnership invitation banner */}
      <B2BBanner />

      {/* 6. Client reviews / testimonials */}
      <Testimonials />
    </>
  );
}
