'use client';

import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={28} inverted />
              <span className="text-lg font-semibold tracking-tight">plumbr</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <a
              href="tel:18007586274"
              className="inline-flex items-center gap-2 mt-5 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              1-800-PLUMBR
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-5">
              {t.footer.links}
            </h3>
            <ul className="space-y-3">
              {[
                { label: t.footer.services, href: '#services' },
                { label: t.footer.about, href: '#about' },
                { label: t.footer.contact, href: '#contact' },
                { label: t.footer.emergency, href: 'tel:18007586274' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-5">
              {t.footer.legal}
            </h3>
            <ul className="space-y-3">
              {[
                { label: t.footer.privacy, href: '#' },
                { label: t.footer.terms, href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © {year} plumbr. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-500">Montreal, QC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
