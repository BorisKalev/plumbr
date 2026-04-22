"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { lang, t, toggleLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.about, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      {/* ── Glassmorphism pill ── */}
      <header
        className={`w-full max-w-7xl rounded-2xl border border-white/15 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/80 backdrop-blur-xl shadow-xl shadow-black/30"
            : "bg-white/10 backdrop-blur-md shadow-lg shadow-black/20"
        }`}
      >
        <div className="px-5 h-14 flex items-center justify-between">
          {/* Logo + wordmark */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <Logo size={26} inverted />
            <span className="text-lg font-semibold tracking-tight text-white">
              plumbr
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/70 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors px-2 py-1 rounded-lg cursor-pointer"
              aria-label="Toggle language"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center border border-white/30 hover:border-white/60 hover:bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
            >
              {t.nav.cta}
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu — inside the pill */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex justify-center border border-white/30 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors hover:bg-white/10"
            >
              {t.nav.cta}
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
