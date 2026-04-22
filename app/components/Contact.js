'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function InputField({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      />
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate async send
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', phone: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* ── Left: info ── */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              {c.tag}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              {c.title}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              {c.description}
            </p>

            {/* Perks */}
            <ul className="space-y-4 mb-10">
              {c.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 font-medium text-sm">{perk}</span>
                </li>
              ))}
            </ul>

            {/* Emergency callout */}
            <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{c.emergencyLabel}</p>
                <a
                  href="tel:+18009938283"
                  className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {c.emergencyText} — +1 800-993-8283
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{c.sent}</h3>
                <p className="text-gray-500 text-sm">{c.sentSub}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-blue-600 hover:underline"
                >
                  ← {c.submit}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    id="name" label={c.name} placeholder="Jean Tremblay"
                    value={form.name} onChange={set('name')} required
                  />
                  <InputField
                    id="phone" label={c.phone} type="tel" placeholder="+1 514-000-0000"
                    value={form.phone} onChange={set('phone')}
                  />
                </div>
                <InputField
                  id="email" label={c.email} type="email" placeholder="jean@exemple.com"
                  value={form.email} onChange={set('email')} required
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    {c.message}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Ex: Fuite sous l'évier de cuisine…"
                    value={form.message}
                    onChange={set('message')}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-full text-sm transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {c.sending}
                    </>
                  ) : c.submit}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
