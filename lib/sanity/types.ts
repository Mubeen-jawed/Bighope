import type { SanityImageSource } from "@sanity/image-url";

/** A Sanity image reference as returned by GROQ (pass to urlFor). */
export type SanityImage = SanityImageSource;

export interface SportCard {
  _id: string;
  title: string;
  slug: string;
  cardImage: SanityImage;
}

export interface ProductCard {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  mainImage: SanityImage;
  alt?: string;
  fabric?: string;
  productCode?: string;
}

export interface SportPage {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  quoteCategory?: string;
  products: ProductCard[];
}

export interface ProductSpecs {
  minOrder?: string;
  turnaround?: string;
  sizes?: string;
  printing?: string;
}

export interface ProductDetail {
  _id: string;
  slug: string;
  productCode?: string;
  name: string;
  description?: string;
  longDescription?: string;
  idealFor?: string;
  mainImage: SanityImage;
  gallery?: SanityImage[];
  alt?: string;
  fabric?: string;
  specs?: ProductSpecs;
  features?: string[];
  customOptions?: string[];
  sportTitle?: string;
  sportSlug?: string;
  sportId?: string;
  quoteCategory?: string;
}

export interface RangePage {
  title: string;
  slug: string;
  category?: string;
  description?: string;
  products: ProductCard[];
}

export interface PackageTierImage {
  image: SanityImage;
  tier?: string;
  tierColor?: string;
}

export interface SportPackage {
  _id: string;
  sport: string;
  shortName?: string;
  slug: string;
  description?: string;
  longDescription?: string;
  cardImage: SanityImage;
  popular?: boolean;
  images?: PackageTierImage[];
  includes?: string[];
  minOrder?: string;
}

export interface HeroSlide {
  desktopImage: SanityImage;
  mobileImage: SanityImage;
  topText?: string;
  mainText?: string;
  description?: string;
  link?: string;
}

export interface SiteSettings {
  heroSlides?: HeroSlide[];
  dspImage?: SanityImage;
}
