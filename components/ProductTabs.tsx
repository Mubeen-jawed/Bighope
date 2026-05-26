"use client";
import { useState } from "react";
import Link from "next/link";

interface Specs {
  minOrder: string;
  turnaround: string;
  sizes: string;
  printing: string;
}

interface Props {
  description: string;
  longDescription: string;
  idealFor: string;
  features: string[];
  customOptions: string[];
  specs: Specs;
}

type Tab = "overview" | "features" | "customisation" | "sizing";

const CHECK_ICON = (
  <svg
    className="w-4 h-4 text-orange-500 mt-0.5 shrink-0"
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
);

export default function ProductTabs({
  description,
  longDescription,
  idealFor,
  features,
  customOptions,
  specs,
}: Props) {
  const [active, setActive] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Key Features" },
    { id: "customisation", label: "Customisation" },
    { id: "sizing", label: "Sizing & Ordering" },
  ];

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-5 gap-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
              active === tab.id
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "overview" && (
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="text-gray-700">{description}</p>
          {longDescription && (
            <p className="text-gray-500">{longDescription}</p>
          )}
          {idealFor && (
            <p className="text-gray-600">
              <span className="font-semibold text-[#1e3056]">Ideal for: </span>
              {idealFor}
            </p>
          )}
        </div>
      )}

      {active === "features" && (
        <ul className="space-y-2.5">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {CHECK_ICON}
              <span className="text-sm text-gray-700">{feat}</span>
            </li>
          ))}
        </ul>
      )}

      {active === "customisation" && (
        <ul className="space-y-2.5">
          {customOptions.map((opt, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {CHECK_ICON}
              <span className="text-sm text-gray-700">{opt}</span>
            </li>
          ))}
        </ul>
      )}

      {active === "sizing" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Minimum Order", value: specs.minOrder },
              { label: "Turnaround Time", value: specs.turnaround },
              { label: "Sizes Available", value: specs.sizes },
              { label: "Printing Method", value: specs.printing },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            For detailed size charts, visit our{" "}
            <Link href="/size-chart" className="text-orange-500 underline hover:text-orange-600">
              size chart page
            </Link>{" "}
            or contact us for team sizing assistance.
          </p>
        </div>
      )}
    </div>
  );
}
