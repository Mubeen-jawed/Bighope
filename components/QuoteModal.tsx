'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const CATEGORIES = [
  'Soccer', 'Rugby', 'Basketball', 'Cricket',
  '7v7 Football', 'Baseball', 'MMA', 'Teamwear', 'Accessories',
];

const COLOR_SWATCHES = [
  '#1e3056', // navy
  '#374151', // charcoal
  '#3b82f6', // blue
  '#22c55e', // green
  '#f97316', // orange
  '#a855f7', // purple
  '#000000', // black
  '#ffffff', // white
];

interface QuoteModalProps {
  buttonClassName?: string;
  buttonLabel?: string;
  defaultCategory?: string;
}

const EMPTY_FORM = (defaultCategory: string) => ({
  name: '',
  email: '',
  phone: '',
  categories: defaultCategory ? [defaultCategory] : [] as string[],
  orderQuantity: '',
  teamName: '',
  primaryColor: '',
  secondaryColor: '',
  customColors: false,
  playerNames: false,
  playerNumbers: false,
  query: '',
});

export default function QuoteModal({
  buttonClassName,
  buttonLabel = 'Get a Free Quote',
  defaultCategory = '',
}: QuoteModalProps) {
  const [open, setOpen]           = useState(false);
  const [step, setStep]           = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM(defaultCategory));
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [mounted, setMounted]     = useState(false);
  const mouseDownTarget           = useRef<EventTarget | null>(null);

  // Portal needs document to exist (SSR guard)
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  }

  function validateStep1() {
    const errs: Record<string, string> = {};
    if (!form.name.trim())  errs.name  = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    return errs;
  }

  function validateStep2() {
    const errs: Record<string, string> = {};
    if (!form.categories.length) errs.category = 'Please select a category';
    return errs;
  }

  function handleNext() {
    const errs = validateStep1();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  }

  function handleClose() {
    setOpen(false);
    setSubmitted(false);
    setStep(1);
    setErrors({});
    setForm(EMPTY_FORM(defaultCategory));
  }

  // Shared input class
  const inputCls = (hasError?: boolean) =>
    `w-full rounded-2xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none border transition-all duration-200
     focus:ring-2 focus:ring-orange-100 focus:border-orange-400 bg-white
     ${hasError ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'}`;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClassName}>
        {buttonLabel}
      </button>

      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[9999] overflow-y-auto bg-black/50 backdrop-blur-sm"
          onMouseDown={e => { mouseDownTarget.current = e.target; }}
          onClick={e => {
            e.stopPropagation();
            if (mouseDownTarget.current === e.currentTarget && e.target === e.currentTarget) handleClose();
          }}
        >
          <div
            className="flex min-h-full items-center justify-center px-4 pt-20 sm:pt-24 pb-6"
            onMouseDown={e => { mouseDownTarget.current = e.target; }}
            onClick={e => {
              e.stopPropagation();
              if (mouseDownTarget.current === e.currentTarget && e.target === e.currentTarget) handleClose();
            }}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
              onMouseDown={e => e.stopPropagation()}
              onClick={e => e.stopPropagation()}
            >
              {submitted ? (
                /* ── Success ──────────────────────────────── */
                <div className="px-8 py-12 text-center">
                  <div className="flex justify-center mb-4">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1e3056] mb-1">Request sent!</h3>
                  <p className="text-gray-400 text-sm">We'll be in touch within 24 hours.</p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-7 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* ── Header ────────────────────────────── */}
                  <div className="px-7 pt-6 pb-5">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-200 ${step === 1 ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
                          {step > 1 ? '✓' : '1'}
                        </span>
                        <div className="w-8 h-px bg-gray-200" />
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-200 ${step === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          2
                        </span>
                      </div>
                      <button type="button" onClick={handleClose} className="text-gray-300 hover:text-gray-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <h2 className="text-xl font-bold text-[#1e3056]">Get a Quote</h2>
                  </div>

                  <div className="h-px bg-gray-100 mx-7" />

                  {/* ── Body ──────────────────────────────── */}
                  <div className="px-7 py-6">
                    {step === 1 ? (
                      /* Step 1 — contact */
                      <div className="flex flex-col gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Name</label>
                          <input type="text" name="name" value={form.name} onChange={handleTextChange}
                            placeholder="Full name" autoComplete="name" className={inputCls(!!errors.name)} />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                          <input type="email" name="email" value={form.email} onChange={handleTextChange}
                            placeholder="your@email.com" autoComplete="email" className={inputCls(!!errors.email)} />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Phone</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleTextChange}
                            placeholder="+1 234 567 8900" autoComplete="tel" className={inputCls()} />
                        </div>

                        <button type="button" onClick={handleNext}
                          className="w-full mt-1 bg-[#1e3056] hover:bg-[#162545] text-white font-semibold py-3.5 rounded-2xl transition-colors text-sm">
                          Continue
                        </button>
                      </div>

                    ) : (
                      /* Step 2 — project details */
                      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Category */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
                          <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => {
                              const selected = form.categories.includes(cat);
                              return (
                                <button key={cat} type="button"
                                  onClick={() => {
                                    setForm(f => ({ ...f, categories: selected ? f.categories.filter(c => c !== cat) : [...f.categories, cat] }));
                                    if (errors.category) setErrors(p => ({ ...p, category: '' }));
                                  }}
                                  className={`px-3.5 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${selected ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500'}`}>
                                  {cat}
                                </button>
                              );
                            })}
                          </div>
                          {errors.category && <p className="text-red-400 text-xs mt-1.5">{errors.category}</p>}
                        </div>

                        {/* Order Quantity */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Order Quantity *</label>
                          <input type="text" name="orderQuantity" value={form.orderQuantity} onChange={handleTextChange}
                            placeholder="Minimum 5 sets" className={inputCls()} />
                        </div>

                        {/* Team Name */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Team Name</label>
                          <input type="text" name="teamName" value={form.teamName} onChange={handleTextChange}
                            placeholder="Your team or club name" className={inputCls()} />
                        </div>

                        {/* Custom Colors toggle */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Colors</label>
                          <button
                            type="button"
                            onClick={() => setForm(f => ({
                              ...f,
                              customColors: !f.customColors,
                              primaryColor: '',
                              secondaryColor: '',
                            }))}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                              form.customColors
                                ? 'bg-orange-500 border-orange-500 text-white'
                                : 'bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                            Custom Colors
                          </button>
                          {form.customColors && (
                            <p className="text-xs text-gray-400 mt-1.5">Describe your colors in the message below</p>
                          )}
                        </div>

                        {/* Primary + Secondary Color swatches — hidden when Custom Colors is on */}
                        {!form.customColors && (
                          <>
                            {/* Primary Color */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-800 mb-2.5">Primary Color</label>
                              <div className="flex gap-2.5 flex-wrap">
                                {COLOR_SWATCHES.map(hex => (
                                  <button
                                    key={`primary-${hex}`}
                                    type="button"
                                    title={hex}
                                    onClick={() => setForm(f => ({ ...f, primaryColor: f.primaryColor === hex ? '' : hex }))}
                                    className={`w-9 h-9 rounded-full transition-all duration-150 ${
                                      form.primaryColor === hex
                                        ? 'ring-2 ring-offset-2 ring-gray-600 scale-110'
                                        : 'hover:scale-105'
                                    } ${hex === '#ffffff' ? 'border border-gray-300' : ''}`}
                                    style={{ backgroundColor: hex }}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Secondary Color */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-800 mb-2.5">Secondary Color</label>
                              <div className="flex gap-2.5 flex-wrap">
                                {COLOR_SWATCHES.map(hex => (
                                  <button
                                    key={`secondary-${hex}`}
                                    type="button"
                                    title={hex}
                                    onClick={() => setForm(f => ({ ...f, secondaryColor: f.secondaryColor === hex ? '' : hex }))}
                                    className={`w-9 h-9 rounded-full transition-all duration-150 ${
                                      form.secondaryColor === hex
                                        ? 'ring-2 ring-offset-2 ring-gray-600 scale-110'
                                        : 'hover:scale-105'
                                    } ${hex === '#ffffff' ? 'border border-gray-300' : ''}`}
                                    style={{ backgroundColor: hex }}
                                  />
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Player Names / Numbers */}
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input type="checkbox" checked={form.playerNames}
                              onChange={e => setForm(f => ({ ...f, playerNames: e.target.checked }))}
                              className="w-4 h-4 rounded border-gray-300 accent-orange-500 cursor-pointer" />
                            <span className="text-sm text-gray-600">Add Player Names</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input type="checkbox" checked={form.playerNumbers}
                              onChange={e => setForm(f => ({ ...f, playerNumbers: e.target.checked }))}
                              className="w-4 h-4 rounded border-gray-300 accent-orange-500 cursor-pointer" />
                            <span className="text-sm text-gray-600">Add Player Numbers</span>
                          </label>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-800 mb-2">Message</label>
                          <textarea name="query" value={form.query} onChange={handleTextChange} rows={3}
                            placeholder="Colours, deadline, or any other details..."
                            className="w-full rounded-2xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none border border-gray-200 bg-white resize-none transition-all duration-200 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 hover:border-gray-300" />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button type="button" onClick={() => { setStep(1); setErrors({}); }}
                            className="px-5 py-3 text-sm font-medium text-gray-500 border border-gray-200 rounded-2xl hover:border-gray-300 hover:text-gray-700 transition-colors">
                            Back
                          </button>
                          <button type="submit"
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-2xl transition-colors text-sm">
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
