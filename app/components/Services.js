'use client';

import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section id="services" className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              {s.tag}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {s.title}
            </h2>
          </div>
          <p className="text-gray-400 text-base max-w-sm leading-relaxed md:text-right">
            {s.description}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.items.map((item, i) => (
            <a
              key={i}
              href="#contact"
              className="group relative overflow-hidden rounded-2xl h-80 lg:h-96 flex flex-col justify-end cursor-pointer"
            >
              {/* Background image */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Permanent gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-950/95 via-gray-900/50 to-transparent" />

              {/* Hover tint */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/15 transition-colors duration-300" />

              {/* Content */}
              <div className="relative z-10 p-5">
                <h3 className="text-lg font-bold text-white mb-1.5 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4 group-hover:text-white/80 transition-colors duration-300">
                  {item.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200">
                  {s.cta}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
