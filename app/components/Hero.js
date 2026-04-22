"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

/* ── Animated counter ── */
function CountUp({ value, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const clean = value.replace(/\s/g, "");
  const hasPlus = clean.includes("+");
  const numStr = clean.replace("+", "");
  const target = isNaN(Number(numStr)) ? null : Number(numStr);

  useEffect(() => {
    if (!isInView || target === null) return;
    const start = performance.now();
    const ms = duration * 1000;
    function tick(now) {
      const t = Math.min((now - start) / ms, 1);
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  if (target === null) return <span ref={ref}>{value}</span>;

  const formatted =
    count >= 1000
      ? `${Math.floor(count / 1000)} ${String(count % 1000).padStart(3, "0")}`
      : String(count);

  return (
    <span ref={ref}>
      {formatted}
      {hasPlus ? "+" : ""}
    </span>
  );
}

const stats = [
  { value: "2 400+", key: "stat1" },
  { value: "15+",    key: "stat2" },
  { value: "8 000+", key: "stat3" },
  { value: "24/7",   key: "stat4" },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen overflow-hidden">

      {/* ── Background photo ── */}
      <Image
        src="/plombier.jpg"
        alt="plumber working"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      {/* ── Gradient overlay: heavy on left, fades right ── */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-950/95 via-gray-900/80 to-gray-900/40" />
      {/* Bottom fade for clean section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-950/60 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 h-full pt-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              {t.hero.badge}
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6 uppercase whitespace-pre-line">
              {t.hero.headline}
            </h1>

            {/* Phone */}
            <a
              href={`tel:${t.hero.phone.replace(/[\s-]/g, "")}`}
              className="text-2xl md:text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors mb-8 w-fit block"
            >
              {t.hero.phone}
            </a>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-14">
              <a
                href="#services"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors shadow-lg shadow-blue-900/50"
              >
                {t.hero.cta1}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors backdrop-blur-sm"
              >
                {t.hero.cta2}
              </a>
            </div>

            {/* Stats */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map(({ value, key }) => (
                <div key={key}>
                  <p className="text-2xl font-bold text-white">
                    <CountUp value={value} duration={2} />
                  </p>
                  <p className="text-xs text-white/50 mt-1">{t.hero[key]}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
