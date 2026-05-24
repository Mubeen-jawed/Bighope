"use client";

import { useState } from "react";
import Image from "next/image";

const partners = [
  {
    name: "Pakistan",
    flagCode: "pk",
    tileColor: "border-orange-500",
    role: "Global Headquarters & Manufacturing",
    address: "Railway Road, Sialkot, Pakistan",
    phone: "+92 (329) 976-6660",
    email: "bighopesports@gmail.com",
    hours: "Mon – Fri: 9:00 AM – 6:00 PM PKT",
    focus: [
      "Bulk & wholesale orders",
      "Private label manufacturing",
      "Global brand partnerships",
      "Production & quality control",
    ],
    cta: { label: "WhatsApp Us", href: "https://wa.me/923299766660" },
  },
  {
    name: "USA",
    flagCode: "us",
    tileColor: "border-blue-600",
    role: "US Partner & Distributor",
    address: "United States",
    phone: "+1 (747) 354-7351",
    email: "info@bighopesports.com",
    hours: "Mon – Fri: 9:00 AM – 5:00 PM EST",
    focus: [
      "US-based payment options",
      "Local buyer support",
      "North American distribution",
      "Zelle, Stripe & ACH transfers",
    ],
    cta: { label: "Call US Partner", href: "tel:+17473547351" },
  },
  {
    name: "UK",
    flagCode: "gb",
    tileColor: "border-gray-300",
    role: "UK Partner Support",
    address: "United Kingdom",
    phone: null,
    email: "info@bighopesports.com",
    hours: "Mon – Fri: 9:00 AM – 5:00 PM GMT",
    focus: [
      "UK & British Isles distribution",
      "Club & school orders",
      "Local currency support",
      "European logistics",
    ],
    cta: { label: "Email UK Team", href: "mailto:info@bighopesports.com" },
  },
  {
    name: "Germany",
    flagCode: "de",
    tileColor: "border-gray-300",
    role: "European Partner Support",
    address: "Germany, Central Europe",
    phone: null,
    email: "info@bighopesports.com",
    hours: "Mon – Fri: 9:00 AM – 5:00 PM CET",
    focus: [
      "DACH & Central Europe distribution",
      "European bulk orders",
      "EU customs & logistics",
      "German-speaking market support",
    ],
    cta: { label: "Email EU Team", href: "mailto:info@bighopesports.com" },
  },
  {
    name: "Croatia",
    flagCode: "hr",
    tileColor: "border-gray-300",
    role: "Balkan Region Partner",
    address: "Croatia, Southeast Europe",
    phone: null,
    email: "info@bighopesports.com",
    hours: "Mon – Fri: 9:00 AM – 5:00 PM CET",
    focus: [
      "Balkan & Adriatic region distribution",
      "Southeast Europe club support",
      "Regional logistics coordination",
      "Local partnership management",
    ],
    cta: { label: "Email Balkan Team", href: "mailto:info@bighopesports.com" },
  },
];

function FlagImg({ code, name, size = 28 }: { code: string; name: string; size?: number }) {
  return (
    <Image
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={`${name} flag`}
      width={size}
      height={size * 0.67}
      className="rounded-sm object-cover shadow-sm"
      unoptimized
    />
  );
}

export default function PartnersAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {partners.map((p, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={p.name}
            className={`rounded-xl border-2 overflow-hidden transition-all duration-200 ${
              isOpen ? p.tileColor + " shadow-md" : "border-gray-200"
            }`}
          >
            {/* Tile Header / Toggle */}
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-3 bg-white hover:bg-gray-50 transition-colors duration-150"
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Flag image */}
                <span className="shrink-0">
                  <FlagImg code={p.flagCode} name={p.name} size={28} />
                </span>
                <div className="min-w-0">
                  <span className="font-bold text-gray-900 text-base block leading-tight">
                    {p.name}
                  </span>
                  <span className="text-gray-500 text-xs truncate block">{p.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    isOpen ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </button>

            {/* Expanded Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="bg-gray-50 border-t border-gray-100 px-5 py-4 space-y-4">

                {/* Contact info */}
                <div className="space-y-2">
                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{p.address}</span>
                  </div>
                  {/* Phone */}
                  {p.phone && (
                    <a href={`tel:${p.phone.replace(/[\s()+-]/g, "")}`} className="flex items-center gap-2.5 text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {p.phone}
                    </a>
                  )}
                  {/* Email */}
                  <a href={`mailto:${p.email}`} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-orange-500 transition-colors">
                    <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {p.email}
                  </a>
                  {/* Hours */}
                  <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {p.hours}
                  </div>
                </div>

                {/* Focus areas */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Specialises in</p>
                  <ul className="space-y-1">
                    {p.focus.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href={p.cta.href}
                  target={p.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={p.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 w-full justify-center"
                >
                  {p.cta.label}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
