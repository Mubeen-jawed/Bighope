import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SiteChrome from "@/components/SiteChrome";
import { sanityFetch } from "@/lib/sanity/client";
import { navRangeQuery, TAGS } from "@/lib/sanity/queries";

type NavGroup = { label: string; slug: string }[];

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Big Hope Sports | Custom Sports Uniforms & Teamwear",
    template: "%s | Big Hope Sports",
  },
  description:
    "Big Hope Sports is a direct manufacturer of premium custom sports uniforms and teamwear. Free artwork, competitive pricing, low minimums, 2–4 week turnaround. Rugby, Soccer, Basketball, Cricket and more. Worldwide shipping.",
  keywords:
    "custom sports uniforms, custom teamwear, rugby kits, soccer uniforms, basketball jerseys, cricket kits, sublimated sportswear",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Big Hope Sports, Custom Sports Uniforms & Teamwear",
    description:
      "Premium custom sports uniforms and teamwear. Free artwork, worldwide shipping, 2–4 week turnaround.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // "Our Range" navbar dropdown is built from Sanity so newly-added sports
  // and ranges appear in the menu automatically.
  const nav = await sanityFetch<{
    uniforms: NavGroup;
    teamwear: NavGroup;
    accessories: NavGroup;
    packages: NavGroup;
  } | null>({
    query: navRangeQuery,
    tags: [TAGS.sport, TAGS.range, TAGS.package],
  });

  const toItems = (group: NavGroup | undefined, base: string) =>
    (group ?? []).map((x) => ({ label: x.label, href: `${base}/${x.slug}` }));

  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <SiteChrome
          header={
            <Header
              uniforms={toItems(nav?.uniforms, "/sport")}
              teamwear={toItems(nav?.teamwear, "/range")}
              accessories={toItems(nav?.accessories, "/range")}
              packages={toItems(nav?.packages, "/packages")}
            />
          }
          footer={<Footer />}
          whatsapp={<WhatsAppButton />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
