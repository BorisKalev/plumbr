'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'plumbr_cookie_consent';

const defaultPrefs = { necessary: true, analytics: false, marketing: false };

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0
        ${checked ? 'bg-blue-600' : 'bg-white/20'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
          ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}

export default function CookieBanner() {
  const { t } = useLanguage();
  const c = t.cookies;

  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const save = (finalPrefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...finalPrefs, decided: true, date: new Date().toISOString() }));
    setVisible(false);
    setShowModal(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () => save(prefs);

  const setCategory = (key, val) => setPrefs((p) => ({ ...p, [key]: val }));

  const categories = [
    { key: 'necessary', always: true },
    { key: 'analytics', always: false },
    { key: 'marketing', always: false },
  ];

  return (
    <>
      {/* ── Banner ── */}
      <AnimatePresence>
        {visible && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 z-[100] flex justify-center pointer-events-none"
          >
            <div className="w-full max-w-4xl bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-6 pointer-events-auto">
              <div className="flex flex-col md:flex-row md:items-center gap-5">

                {/* Icon + text */}
                <div className="flex gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm mb-1">{c.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{c.description}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    onClick={() => { setPrefs(defaultPrefs); setShowModal(true); }}
                    className="text-xs font-semibold text-white/60 hover:text-white px-4 py-2 rounded-full border border-white/15 hover:border-white/30 transition-colors"
                  >
                    {c.customize}
                  </button>
                  <button
                    onClick={rejectAll}
                    className="text-xs font-semibold text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    {c.rejectAll}
                  </button>
                  <button
                    onClick={acceptAll}
                    className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full transition-colors shadow-lg shadow-blue-900/50"
                  >
                    {c.acceptAll}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Preferences modal ── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[101] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 z-[102] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">

                {/* Modal header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-sm">{c.customize}</span>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Categories */}
                <div className="px-6 py-4 space-y-4">
                  {categories.map(({ key, always }) => (
                    <div key={key} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/8">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold mb-1">
                          {c.categories[key].label}
                          {always && (
                            <span className="ml-2 text-xs font-normal text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
                              Requis
                            </span>
                          )}
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed">{c.categories[key].desc}</p>
                      </div>
                      <Toggle
                        checked={always ? true : prefs[key]}
                        onChange={(val) => setCategory(key, val)}
                        disabled={always}
                      />
                    </div>
                  ))}
                </div>

                {/* Modal footer */}
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-500">{c.poweredBy}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={rejectAll}
                      className="text-xs font-semibold text-white/60 hover:text-white px-4 py-2 rounded-full border border-white/15 hover:border-white/30 transition-colors"
                    >
                      {c.rejectAll}
                    </button>
                    <button
                      onClick={saveCustom}
                      className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full transition-colors"
                    >
                      {c.savePrefs}
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
