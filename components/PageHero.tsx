interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-[#0f1830] text-white -mt-[108px] pt-[172px] pb-10 lg:-mt-[154px] lg:pt-[218px] lg:pb-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 relative">
        <p className="text-orange-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3">
          {breadcrumb}
        </p>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-[family-name:var(--font-oswald)] font-bold uppercase text-white mb-3 md:mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
