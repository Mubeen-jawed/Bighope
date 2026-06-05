import { sanityFetch } from "@/lib/sanity/client";
import { packagesQuery, TAGS } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import type { SportPackage } from "@/lib/sanity/types";
import PackagesSlider, { type PackageSlide } from "@/components/PackagesSlider";

export default async function Packages() {
  const sportPackages = await sanityFetch<SportPackage[]>({
    query: packagesQuery,
    tags: [TAGS.package],
  });

  const slides: PackageSlide[] = sportPackages.map((pkg) => ({
    slug: pkg.slug,
    sport: pkg.sport,
    image:
      pkg.sport === "Soccer/Football"
        ? "/packages/football-package.png"
        : pkg.sport === "7v7 Football"
          ? "/packages/7v7-package.png"
          : imageUrl(pkg.cardImage, 1200),
    includes: (pkg.includes || []).slice(0, 3),
    description:
      pkg.description ||
      `Fully dye sublimated and 100% customisable to your club's colours and designs.`,
    minOrder: pkg.minOrder ? `${pkg.minOrder} per order.` : "",
  }));

  return <PackagesSlider slides={slides} />;
}
