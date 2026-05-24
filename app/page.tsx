import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import DSPBanner from "@/components/DSPBanner";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import TrustGuarantees from "@/components/TrustGuarantees";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Our Range — sport category cards */}
      <Categories />

      {/* 3. Distinct selling points poster */}
      <DSPBanner />

      {/* 4. Packages */}
      <Packages />

      {/* 5. Trust-building guarantees */}
      <TrustGuarantees />

      {/* 6. Client reviews / testimonials */}
      <Testimonials />
    </>
  );
}
