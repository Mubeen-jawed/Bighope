import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FeatureBar from "@/components/FeatureBar";
import {
  getPackageBySlug,
  getAllPackageSlugs,
  sportPackages,
} from "@/lib/packages";

export function generateStaticParams() {
  return getAllPackageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.sport} Packages`,
    description: pkg.description,
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const otherPackages = sportPackages.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHero
        title={`${pkg.sport} Packages`}
        subtitle={pkg.description}
        breadcrumb={`Home / Packages / ${pkg.sport}`}
      />

      <FeatureBar />

      {/* Package detail, text left, image right */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left, text */}
            <div>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
                Package Details
              </p>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
                What&apos;s Included
              </h2>
              <div className="w-16 h-1 bg-orange-500 rounded mb-6" />

              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {pkg.longDescription}
              </p>

              <div className="space-y-3 mb-8">
                {pkg.includes.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-50 rounded-lg px-4 py-2.5 w-fit mb-8">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {pkg.minOrder}
              </div>

              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1e3056] hover:bg-[#162440] text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg text-sm sm:text-base"
              >
                Request a Quote, {pkg.sport}
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Right, image (no background, transparent) */}
            <div className="relative flex items-center justify-center">
              <Image
                src={pkg.cardImage}
                alt={`${pkg.sport} Package`}
                width={600}
                height={600}
                className="object-contain w-full h-auto max-h-[550px]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other packages */}
      {otherPackages.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
                More Options
              </p>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
                Other Packages
              </h2>
              <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {otherPackages.map((other) => (
                <Link
                  key={other.slug}
                  href={other.href}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-2 group-hover:text-orange-500 transition-colors">
                      {other.sport}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {other.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500">
                      View Package
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom CTA */}
      <section className="bg-[#0f1830] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase mb-3 md:mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto">
            We can build a package for any sport, any team size, any budget.
            Tell us what you need.
          </p>
          <a
            href="/contact"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base md:text-lg"
          >
            Build a Custom Package
          </a>
        </div>
      </section>
    </>
  );
}
