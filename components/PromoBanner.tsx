export default function PromoBanner() {
  return (
    <section className="bg-[#1e3056] text-white py-20 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-400 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600 translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Large decorative quote */}
        <div
          className="text-blue-400 text-9xl font-serif leading-none mb-2 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
          You Imagine, <span className="text-blue-400">We Create</span>
        </h2>

        <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
          We create custom sports uniforms and teamwear and take care of the
          whole process, Design, Manufacturing, and Shipping. Ignite your
          team&apos;s unique style with fully customizable sportswear. Every
          detail is in your hands.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 sm:px-10 py-3 sm:py-4 rounded-lg text-sm sm:text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 text-center"
          >
            Request a Quote
          </a>
          <a
            href="#"
            className="inline-block bg-transparent border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold px-7 sm:px-10 py-3 sm:py-4 rounded-lg text-sm sm:text-base md:text-lg transition-all duration-200 hover:-translate-y-0.5 text-center"
          >
            How It Works
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
          {[
            { value: "10,000+", label: "Kits Delivered" },
            { value: "50+", label: "Countries Shipped" },
            { value: "2–4 Weeks", label: "Avg. Turnaround" },
            { value: "100%", label: "Custom Every Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-blue-400">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
