"use client";

import { useState, useEffect, useCallback } from "react";

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
  {
    quote:
      "From design to delivery, the whole experience was seamless. Our cricket team loves the new kits, the quality is exceptional and they arrived ahead of schedule!",
    name: "David P.",
    club: "County Cricket Club",
    rating: 5,
  },
  {
    quote:
      "Outstanding service and quality. The team was very responsive, accommodated our last-minute changes, and the uniforms arrived before our tournament. Couldn't be happier!",
    name: "Coach Williams",
    club: "Thunder FC",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 200);
    },
    [animating],
  );

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <div className="mx-auto w-16 h-1 bg-blue-600 rounded" />
        </div>

        {/* Testimonial card */}
        <div className="relative">
          <div
            className={`bg-gray-50 rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 transition-opacity duration-300 ${
              animating ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(t.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote mark */}
            <div
              className="text-blue-500 text-7xl font-serif leading-none mb-4 text-center select-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Quote text */}
            <blockquote className="text-gray-700 text-lg sm:text-xl italic text-center leading-relaxed mb-8 max-w-2xl mx-auto">
              {t.quote}
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.club}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 bg-white border border-gray-200 hover:border-blue-400 text-gray-600 hover:text-blue-600 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 bg-white border border-gray-200 hover:border-blue-400 text-gray-600 hover:text-blue-600 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`rounded-full h-2.5 transition-all duration-300 ${
                idx === current
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 w-2.5 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-10">
          {[
            {
              icon: (
                <svg className="w-7 h-7 text-yellow-400 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ),
              label: "4.9 / 5 Average Rating",
            },
            {
              icon: (
                <svg className="w-7 h-7 text-blue-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              label: "500+ Happy Customers",
            },
            {
              icon: (
                <svg className="w-7 h-7 text-green-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
              label: "85% Repeat Orders",
            },
          ].map((item) => (
            <div key={item.label} className="text-gray-600 text-sm">
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
