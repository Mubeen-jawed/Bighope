'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import Image from 'next/image';

// ─── Sport Tab Config ────────────────────────────────────────────────────────

const sportTabs = [
  { id: 'baseball',    label: 'Baseball & Softball' },
  { id: 'soccer',      label: 'Soccer' },
  { id: 'football7v7', label: '7v7 Football' },
  { id: 'basketball',  label: 'Basketball' },
  { id: 'rugby',       label: 'Rugby' },
  { id: 'mma',         label: 'Wrestling / MMA' },
  { id: 'tshirts',     label: 'T-Shirts & Shorts' },
  { id: 'hoodies',     label: 'Hoodies' },
  { id: 'quarterzip',  label: 'Quarter Zip' },
];

const templateImages: Record<string, string> = {
  baseball:    '/sizechart/football&softball/fwhcfcl2gozsrfrg7gdj-1-1200x1201.webp',
  soccer:      '/sizechart/soccer/c0sqk56orpdxilbbvufq-1200x1201.webp',
  football7v7: '/sizechart/7v7Fottball/cjshvg9ah3pyhlnvqskp-1200x1201.webp',
  basketball:  '/sizechart/basketball/gk3wo7b1tq8qws84ggub-1200x1201.webp',
  rugby:       '/sizechart/rugby/RGBY-TEMP-1200x1201.webp',
  mma:         '/sizechart/mma/SINGLET-TEMPLATE-1-1536x1536.webp',
  tshirts:     '/sizechart/tshirts&shorts/TEMPL-TS-1200x1201.webp',
};

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = { label: string; headers: string[]; rows: string[][] };
type Garment   = { name: string; measurements: string; categories: Category[] };
type SportData = { label: string; note: string; garments: Garment[] };

// ─── Size Data (extracted from official size-chart images) ───────────────────

const sizeData: Record<string, SportData> = {
  baseball: {
    label: 'Baseball & Softball',
    note: 'All sizes in inches. Contact us for CM charts. All cuts, sizes & shapes available on demand.',
    garments: [
      {
        name: 'Jersey / Top',
        measurements: 'Width = chest pit-to-pit (flat) · Height = collar to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['YXS', '15',    '23.5'],
              ['YS',  '16.5',  '24.5'],
              ['YM',  '17.5',  '25.5'],
              ['YL',  '18.5',  '26.5'],
              ['YXL', '19.5',  '27.5'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['AS',   '20.25', '30.5'],
              ['AM',   '21.25', '31.5'],
              ['AL',   '22.25', '32.75'],
              ['AXL',  '23.25', '33.75'],
              ['A2XL', '24.25', '34.75'],
              ['A3XL', '25.25', '35.5'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['WS',   '19', '26.5'],
              ['WM',   '20', '27.5'],
              ['WL',   '21', '28.5'],
              ['WXL',  '22', '29.5'],
              ['W2XL', '23', '30.5'],
              ['W3XL', '24', '31.5'],
            ],
          },
        ],
      },
      {
        name: 'Pants',
        measurements: 'Waist = flat across waistband · Length = waist to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Waist (in)', 'Length (in)'],
            rows: [
              ['YXS', '10', '30'],
              ['YS',  '11', '31.25'],
              ['YM',  '12', '32.5'],
              ['YL',  '13', '33.75'],
              ['YXL', '14', '35'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Waist (in)', 'Length (in)'],
            rows: [
              ['AS',   '15', '40.75'],
              ['AM',   '16', '42'],
              ['AL',   '17', '43.5'],
              ['AXL',  '18', '45'],
              ['A2XL', '19', '46.5'],
              ['A3XL', '20', '47.75'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Waist (in)', 'Length (in)'],
            rows: [
              ['WS',   '14', '38.25'],
              ['WM',   '15', '39.5'],
              ['WL',   '16', '41'],
              ['WXL',  '17', '42.5'],
              ['W2XL', '18', '44'],
              ['W3XL', '19', '45.25'],
            ],
          },
        ],
      },
    ],
  },

  soccer: {
    label: 'Soccer',
    note: 'All sizes in inches. Contact us for CM charts. All cuts, sizes & shapes available on demand.',
    garments: [
      {
        name: 'Jersey',
        measurements: 'Width = chest pit-to-pit (flat) · Height = collar to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['YXS', '13.5', '19.5'],
              ['YS',  '16',   '22.5'],
              ['YM',  '17',   '23.5'],
              ['YL',  '18',   '24.5'],
              ['YXL', '19',   '25.5'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['AS',   '20',   '27'],
              ['AM',   '21',   '28'],
              ['AL',   '22.5', '29'],
              ['AXL',  '24',   '30'],
              ['A2XL', '25.5', '31'],
              ['A3XL', '27',   '32'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['WS',   '18',   '25'],
              ['WM',   '19',   '26'],
              ['WL',   '20',   '27'],
              ['WXL',  '21.5', '28'],
              ['W2XL', '23',   '29'],
              ['W3XL', '24.5', '30'],
            ],
          },
        ],
      },
      {
        name: 'Shorts',
        measurements: 'Waist = flat across waistband · Outseam = waist to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['YXS', '9.5',  '10.5'],
              ['YS',  '10.5', '13'],
              ['YM',  '11.5', '13.5'],
              ['YL',  '12.5', '14.5'],
              ['YXL', '13.5', '15'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['AS',   '12.5', '18.5'],
              ['AM',   '13.5', '19'],
              ['AL',   '14.5', '19'],
              ['AXL',  '15.5', '19.5'],
              ['A2XL', '17.5', '20'],
              ['A3XL', '19',   '21'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['WS',   '13', '17'],
              ['WM',   '14', '17.5'],
              ['WL',   '15', '18'],
              ['WXL',  '16', '18.5'],
              ['W2XL', '17', '19'],
              ['W3XL', '18', '19.5'],
            ],
          },
        ],
      },
    ],
  },

  football7v7: {
    label: '7v7 Football',
    note: 'All sizes in inches. Contact us for CM charts. All cuts, sizes & shapes available on demand.',
    garments: [
      {
        name: 'Top (Hooded Vest)',
        measurements: 'Width = chest pit-to-pit (flat) · Height = collar to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['YXS', '12', '20'],
              ['YS',  '13', '21'],
              ['YM',  '14', '22'],
              ['YL',  '15', '23'],
              ['YXL', '16', '24'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['AS',   '16', '25'],
              ['AM',   '17', '26'],
              ['AL',   '18', '26'],
              ['AXL',  '19', '27'],
              ['A2XL', '20', '28'],
              ['A3XL', '21', '28'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['WS',   '17', '24'],
              ['WM',   '18', '25'],
              ['WL',   '19', '26'],
              ['WXL',  '20', '27'],
              ['W2XL', '21', '28'],
              ['W3XL', '22', '29'],
            ],
          },
        ],
      },
      {
        name: 'Shorts',
        measurements: 'Waist = flat across waistband · Outseam = waist to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['YXS', '19',    '11.5'],
              ['YS',  '20',    '12'],
              ['YM',  '21–22', '13'],
              ['YL',  '23–24', '14'],
              ['YXL', '25–26', '15'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['AS',   '28–29', '16'],
              ['AM',   '30–31', '17'],
              ['AL',   '32–33', '18'],
              ['AXL',  '34–35', '19'],
              ['A2XL', '36–37', '20'],
              ['A3XL', '38–39', '21'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['WS',   '26–27', '13'],
              ['WM',   '28–29', '14'],
              ['WL',   '30–31', '15'],
              ['WXL',  '32–33', '16'],
              ['W2XL', '34–35', '17'],
              ['W3XL', '36–37', '18'],
            ],
          },
        ],
      },
    ],
  },

  basketball: {
    label: 'Basketball',
    note: 'All sizes in inches. Contact us for CM charts. All cuts, sizes & shapes available on demand.',
    garments: [
      {
        name: 'Jersey (Sleeveless)',
        measurements: 'Width = chest pit-to-pit (flat) · Height = collar to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['YXS', '15', '20'],
              ['YS',  '16', '22'],
              ['YM',  '17', '24'],
              ['YL',  '18', '26'],
              ['YXL', '19', '26'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['AS',   '20', '28'],
              ['AM',   '21', '28'],
              ['AL',   '22', '29'],
              ['AXL',  '23', '30'],
              ['A2XL', '24', '31'],
              ['A3XL', '25', '32'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['WS',   '18', '27'],
              ['WM',   '20', '28'],
              ['WL',   '21', '29'],
              ['WXL',  '23', '30'],
              ['W2XL', '25', '31'],
              ['W3XL', '26', '32'],
            ],
          },
        ],
      },
      {
        name: 'Shorts',
        measurements: 'Waist = flat across waistband · Outseam = waist to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['YXS', '8.5',  '10.5'],
              ['YS',  '9.5',  '13'],
              ['YM',  '10.5', '13.5'],
              ['YL',  '11.5', '14.5'],
              ['YXL', '12.5', '15'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['AS',   '13.5', '19.75'],
              ['AM',   '14.5', '20.75'],
              ['AL',   '15.5', '21.75'],
              ['AXL',  '16.5', '22.75'],
              ['A2XL', '17.5', '23.75'],
              ['A3XL', '18.5', '24.75'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['WS',   '12', '16.5'],
              ['WM',   '13', '17.5'],
              ['WL',   '14', '18.5'],
              ['WXL',  '15', '19.5'],
              ['W2XL', '16', '20'],
              ['W3XL', '17', '20.5'],
            ],
          },
        ],
      },
    ],
  },

  rugby: {
    label: 'Rugby',
    note: 'All sizes in inches. Contact us for CM charts. All cuts, sizes & shapes available on demand.',
    garments: [
      {
        name: 'Jersey',
        measurements: 'Width = chest pit-to-pit (flat) · Height = collar to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['YXS', '13', '20.5'],
              ['YS',  '14', '22'],
              ['YM',  '15', '23'],
              ['YL',  '16', '24'],
              ['YXL', '17', '25'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['AS',   '21', '27'],
              ['AM',   '22', '28'],
              ['AL',   '23', '29'],
              ['AXL',  '24', '30'],
              ['A2XL', '25', '31'],
              ['A3XL', '26', '32'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['WS',   '18',   '26'],
              ['WM',   '19',   '27'],
              ['WL',   '20',   '28'],
              ['WXL',  '21.5', '29'],
              ['W2XL', '23',   '30'],
              ['W3XL', '24.5', '31'],
            ],
          },
        ],
      },
      {
        name: 'Shorts',
        measurements: 'Waist = flat across waistband · Outseam = waist to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['YXS', '10.5', '10'],
              ['YS',  '11.5', '10.5'],
              ['YM',  '13',   '11'],
              ['YL',  '14',   '11.5'],
              ['YXL', '14.5', '12'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['AS',   '13',   '13'],
              ['AM',   '13.5', '13.5'],
              ['AL',   '14.5', '14'],
              ['AXL',  '15.5', '14.5'],
              ['A2XL', '17.5', '15'],
              ['A3XL', '19',   '15.5'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['WS',   '15', '12'],
              ['WM',   '16', '12.5'],
              ['WL',   '17', '13'],
              ['WXL',  '18', '13.5'],
              ['W2XL', '19', '14'],
              ['W3XL', '20', '14.5'],
            ],
          },
        ],
      },
    ],
  },

  mma: {
    label: 'Wrestling / MMA',
    note: 'All sizes in inches. Contact us for CM charts. All cuts, sizes & shapes available on demand.',
    garments: [
      {
        name: 'Wrestling Singlet',
        measurements: 'Width = chest pit-to-pit (flat) · Height = shoulder to leg opening · Inseam = crotch to leg opening',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)', 'Inseam (in)'],
            rows: [
              ['YXS', '10', '24', '4.5'],
              ['YS',  '11', '25', '4.5'],
              ['YM',  '12', '26', '4.5'],
              ['YL',  '13', '27', '4.5'],
              ['YXL', '14', '28', '4.5'],
            ],
          },
          {
            label: 'Adult',
            headers: ['Size', 'Width (in)', 'Height (in)', 'Inseam (in)'],
            rows: [
              ['AS',   '12.5', '28', '5'],
              ['AM',   '13.5', '29', '5'],
              ['AL',   '14.5', '30', '5'],
              ['AXL',  '15.5', '31', '5'],
              ['A2XL', '16.5', '32', '5'],
              ['A3XL', '17.5', '33', '5'],
            ],
          },
        ],
      },
    ],
  },

  tshirts: {
    label: 'T-Shirts & Shorts',
    note: 'All sizes in inches. Contact us for CM charts. All cuts, sizes & shapes available on demand.',
    garments: [
      {
        name: 'T-Shirt',
        measurements: 'Width = chest pit-to-pit (flat) · Height = collar to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['YXS', '13.5', '19.5'],
              ['YS',  '16',   '22.5'],
              ['YM',  '17',   '23.5'],
              ['YL',  '18',   '24.5'],
              ['YXL', '19',   '25.5'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['AS',   '20',   '27'],
              ['AM',   '21',   '28'],
              ['AL',   '22.5', '29'],
              ['AXL',  '24',   '30'],
              ['A2XL', '25.5', '31'],
              ['A3XL', '27',   '32'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['WS',   '18',   '25'],
              ['WM',   '19',   '26'],
              ['WL',   '20',   '27'],
              ['WXL',  '21.5', '28'],
              ['W2XL', '23',   '29'],
              ['W3XL', '24.5', '30'],
            ],
          },
        ],
      },
      {
        name: 'Shorts',
        measurements: 'Waist = flat across waistband · Outseam = waist to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['YXS', '9.5',  '10.5'],
              ['YS',  '10.5', '13'],
              ['YM',  '11.5', '13.5'],
              ['YL',  '12.5', '14.5'],
              ['YXL', '13.5', '15'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['AS',   '12.5', '18.5'],
              ['AM',   '13.5', '19'],
              ['AL',   '14.5', '19'],
              ['AXL',  '15.5', '19.5'],
              ['A2XL', '17.5', '20'],
              ['A3XL', '19',   '21'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Waist (in)', 'Outseam (in)'],
            rows: [
              ['WS',   '13', '17'],
              ['WM',   '14', '17.5'],
              ['WL',   '15', '18'],
              ['WXL',  '16', '18.5'],
              ['W2XL', '17', '19'],
              ['W3XL', '18', '19.5'],
            ],
          },
        ],
      },
    ],
  },

  hoodies: {
    label: 'Hoodies',
    note: 'All sizes in inches. Unisex sizing. Contact us for CM charts.',
    garments: [
      {
        name: 'Hoodie (Unisex)',
        measurements: 'Width = chest pit-to-pit (flat) · Height = collar to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['YXS', '16', '22'],
              ['YS',  '18', '22.5'],
              ['YM',  '19', '23'],
              ['YL',  '20', '24.5'],
              ['YXL', '21', '25.5'],
            ],
          },
          {
            label: 'Adult',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['AS',   '22', '27'],
              ['AM',   '23', '28.5'],
              ['AL',   '24', '29'],
              ['AXL',  '25', '30.5'],
              ['A2XL', '26', '31.5'],
              ['A3XL', '27', '32.5'],
            ],
          },
        ],
      },
    ],
  },

  quarterzip: {
    label: 'Quarter Zip / Midlayer',
    note: 'All sizes in inches. Contact us for CM charts. All cuts, sizes & shapes available on demand.',
    garments: [
      {
        name: 'Quarter Zip / Midlayer',
        measurements: 'Width = chest pit-to-pit (flat) · Height = collar to hem',
        categories: [
          {
            label: 'Youth',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['YXS', '13.5', '19.5'],
              ['YS',  '16',   '22.5'],
              ['YM',  '17',   '23.5'],
              ['YL',  '18',   '24.5'],
              ['YXL', '19',   '25.5'],
            ],
          },
          {
            label: 'Adult Men',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['AS',   '20',   '27'],
              ['AM',   '21',   '28'],
              ['AL',   '22.5', '29'],
              ['AXL',  '24',   '30'],
              ['A2XL', '25.5', '31'],
              ['A3XL', '27',   '32'],
            ],
          },
          {
            label: 'Adult Women',
            headers: ['Size', 'Width (in)', 'Height (in)'],
            rows: [
              ['WS',   '18',   '25'],
              ['WM',   '19',   '26'],
              ['WL',   '20',   '27'],
              ['WXL',  '21.5', '28'],
              ['W2XL', '23',   '29'],
              ['W3XL', '24.5', '30'],
            ],
          },
        ],
      },
    ],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

type Unit = 'in' | 'cm';

function inchesToCm(value: string): string {
  if (value.includes('–')) {
    const [a, b] = value.split('–').map((v) => (parseFloat(v.trim()) * 2.54).toFixed(1));
    return `${a}–${b}`;
  }
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return (num * 2.54).toFixed(1);
}

function convertHeader(header: string, unit: Unit): string {
  if (unit === 'cm') {
    return header.replace('(in)', '(cm)');
  }
  return header;
}

function convertCell(cell: string, colIndex: number, unit: Unit): string {
  if (colIndex === 0 || unit === 'in') return cell;
  return inchesToCm(cell);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function UnitToggle({ unit, onChange }: { unit: Unit; onChange: (u: Unit) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <button
        onClick={() => onChange('in')}
        className={`px-4 py-2 text-sm font-bold transition-all duration-200 ${
          unit === 'in'
            ? 'bg-[#1e3056] text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        Inches
      </button>
      <button
        onClick={() => onChange('cm')}
        className={`px-4 py-2 text-sm font-bold transition-all duration-200 ${
          unit === 'cm'
            ? 'bg-[#1e3056] text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        Centimeters
      </button>
    </div>
  );
}

function SizeTable({ category, unit }: { category: Category; unit: Unit }) {
  return (
    <div>
      <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
        {category.label}
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#1e3056] text-white">
              {category.headers.map((h) => (
                <th key={h} className="px-5 py-4 text-left font-bold text-sm tracking-wide whitespace-nowrap">
                  {convertHeader(h, unit)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {category.rows.map((row, i) => (
              <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-5 py-4 border-b border-gray-100 ${
                      j === 0 ? 'font-bold text-orange-500' : 'text-gray-700'
                    }`}
                  >
                    {convertCell(cell, j, unit)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SizeChartPage() {
  const [activeSport, setActiveSport] = useState('baseball');
  const [unit, setUnit] = useState<Unit>('in');
  const sport = sizeData[activeSport];

  return (
    <>
      <PageHero
        title="Size Chart"
        subtitle="Find the perfect fit for your team. Select your sport below and toggle between inches and centimeters."
        breadcrumb="Home / Size Chart"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-12">

          {/* ── Sport Selector ── */}
          <div>
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4">
              Select Sport
            </p>
            <div className="flex flex-wrap gap-2">
              {sportTabs.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSport(s.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                    activeSport === s.id
                      ? 'bg-[#1e3056] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Unit Toggle ── */}
          <div className="flex items-center gap-4">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest">
              Unit
            </p>
            <UnitToggle unit={unit} onChange={setUnit} />
          </div>

          {/* ── Sport Content ── */}
          <div key={activeSport}>
            <h2 className="text-2xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-1">
              {sport.label}
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded mb-3" />
            <p className="text-xs text-gray-500 mb-8">
              <span className="font-semibold text-orange-500">Note: </span>
              {unit === 'in'
                ? 'All sizes in inches. All cuts, sizes & shapes available on demand.'
                : 'All sizes in centimeters (converted from inches). All cuts, sizes & shapes available on demand.'}
            </p>

            {/* ── Template image (measurement diagram) ── */}
            {templateImages[activeSport] && (
              <div className="mb-10 flex justify-center">
                <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src={templateImages[activeSport]}
                    alt={`${sport.label} measurement template`}
                    width={1200}
                    height={1200}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            )}

            <div className="space-y-12">
              {sport.garments.map((garment) => (
                <div key={garment.name}>
                  <h3 className="text-lg font-[family-name:var(--font-oswald)] font-bold text-gray-800 uppercase mb-1">
                    {garment.name}
                  </h3>
                  <p className="text-xs text-gray-400 italic mb-5">{garment.measurements}</p>
                  {garment.categories.map((cat) => (
                    <SizeTable key={cat.label} category={cat} unit={unit} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── Tips ── */}
          <div className="bg-orange-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2">Measurement Tips</h4>
            <ul className="text-gray-600 text-sm space-y-1.5">
              <li>All measurements are taken <strong>flat (half-body)</strong>. Double the width for full chest circumference.</li>
              <li>Contact us for custom sizing outside the ranges shown above.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-3">
            Need Custom Sizes?
          </h3>
          <p className="text-gray-500 mb-6">
            We accommodate custom sizing for any team. Get in touch and we&apos;ll find the perfect fit.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
