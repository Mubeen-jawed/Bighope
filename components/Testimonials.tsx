const testimonials = [
  {
    quote:
      "The quality of our soccer kits exceeded all expectations. The turnaround time was impressive and the free design service made the whole process easy. We'll be back every season!",
    name: "Marcus T.",
    club: "FC United",
    rating: 5,
  },
  {
    quote:
      "Big Hope Sports delivered exactly what our rugby club needed. The attention to detail in the design process was outstanding and the finished product was perfect.",
    name: "Sarah J.",
    club: "Riverside Rugby Club",
    rating: 5,
  },
  {
    quote:
      "We've ordered multiple times and every batch comes out perfect. The customization options are incredible and the prices are very competitive. Highly recommend!",
    name: "Ahmed K.",
    club: "Al-Noor Basketball Club",
    rating: 5,
  },
];

const trustIndicators = [
  {
    iconClass: "text-yellow-400",
    label: "4.9 / 5 Average Rating",
    path: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
  },
  {
    iconClass: "text-blue-500",
    label: "500+ Happy Customers",
    path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    iconClass: "text-green-500",
    label: "85% Repeat Orders",
    path: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

export default function Testimonials() {
  return (
    <section className="content-visibility-auto bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <div className="mx-auto w-16 h-1 bg-blue-600 rounded" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d={trustIndicators[0].path} />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.club}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-10">
          {trustIndicators.map((item) => (
            <div key={item.label} className="text-gray-600 text-sm">
              <svg
                className={`w-7 h-7 ${item.iconClass} mx-auto mb-1`}
                fill={item.iconClass === "text-yellow-400" ? "currentColor" : "none"}
                stroke={item.iconClass === "text-yellow-400" ? undefined : "currentColor"}
                viewBox={item.iconClass === "text-yellow-400" ? "0 0 20 20" : "0 0 24 24"}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.path}
                />
              </svg>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
