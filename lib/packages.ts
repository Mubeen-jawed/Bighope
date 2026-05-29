export interface PackageImage {
  src: string;
  tier: string | null;
  tierColor: string | null;
}

export interface SportPackage {
  slug: string;
  sport: string;
  shortName: string;
  href: string;
  sportHref: string;
  description: string;
  longDescription: string;
  cardImage: string;
  popular: boolean;
  images: PackageImage[];
  includes: string[];
  minOrder: string;
}

export const sportPackages: SportPackage[] = [
  {
    slug: "cricket",
    sport: "Cricket",
    shortName: "Cricket",
    href: "/packages/cricket",
    sportHref: "/sport/cricket",
    description:
      "Multiple package tiers, from a basic jersey & trousers combo all the way to full team bundles with bags and accessories.",
    longDescription:
      "Our cricket packages are built for teams at every level. Whether you need a simple jersey-and-trousers combo for a weekend league or a full premium bundle with caps, bags, and warm-ups for a competitive squad, we have you covered. Every package is fully sublimated with unlimited colors and includes free custom artwork.",
    cardImage: "/packages/soccer-package.png",
    popular: false,
    images: [
      {
        src: "/packages/soccer-package.png",
        tier: null,
        tierColor: null,
      },
    ],
    includes: [
      "Custom Cricket Jersey",
      "Custom Cricket Trousers",
      "Custom Cricket Cap",
      "Sublimated Name & Number",
      "Free Custom Artwork",
      "Unlimited Color Options",
    ],
    minOrder: "Minimum 1 unit",
  },
  {
    slug: "7v7-football",
    sport: "7v7 Football",
    shortName: "7v7 Football",
    href: "/packages/7v7-football",
    sportHref: "/sport/7v7-football",
    description:
      "Three premium package tiers built specifically for 7v7 teams. Pick the level that fits your squad.",
    longDescription:
      "Designed specifically for the 7v7 community, our packages come in three tiers, Silver, Gold, and Diamond. Each tier builds on the last, so you can start with the essentials or go all-in with a full kit including hoodies, bags, and compression gear. All packages feature full dye-sublimation and unlimited design revisions.",
    cardImage: "/packages/7v7-silver-tier.webp",
    popular: true,
    images: [
      {
        src: "/packages/7v7-silver-tier.webp",
        tier: "Silver",
        tierColor: "bg-gray-400",
      },
      {
        src: "/packages/7v7-gold-tier.webp",
        tier: "Gold",
        tierColor: "bg-yellow-500",
      },
      {
        src: "/packages/7v7-diamond-tier.webp",
        tier: "Diamond",
        tierColor: "bg-cyan-600",
      },
    ],
    includes: [
      "Custom 7v7 Jersey",
      "Custom 7v7 Shorts",
      "Custom Socks",
      "Sublimated Name & Number",
      "Multiple Tier Options (Silver / Gold / Diamond)",
      "Free Custom Artwork",
    ],
    minOrder: "Minimum 1 unit",
  },
  {
    slug: "cricket-kit",
    sport: "Cricket",
    shortName: "Cricket Kit",
    href: "/packages/cricket-kit",
    sportHref: "/sport/cricket",
    description:
      "Full-team cricket packages, jerseys, trousers, caps, hoodies, and more. Free coaches shirts on all packages.",
    longDescription:
      "Our cricket kit packages are built for the full roster. Every package includes jerseys, trousers, and caps as a foundation, then add hoodies, warm-up jackets, bags, and more depending on your budget. All packages come with free coaches shirts and full dye-sublimation printing.",
    cardImage: "/packages/baseball-package.png",
    popular: false,
    images: [
      {
        src: "/packages/baseball-package.png",
        tier: null,
        tierColor: null,
      },
    ],
    includes: [
      "Custom Cricket Jersey",
      "Custom Cricket Trousers",
      "Custom Cricket Cap",
      "Free Coaches Shirts",
      "Sublimated Name & Number",
      "Free Custom Artwork",
    ],
    minOrder: "Minimum 1 unit",
  },
];

export function getPackageBySlug(slug: string): SportPackage | undefined {
  return sportPackages.find((p) => p.slug === slug);
}

export function getAllPackageSlugs(): string[] {
  return sportPackages.map((p) => p.slug);
}
