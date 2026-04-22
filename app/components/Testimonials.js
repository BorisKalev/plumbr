'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

/* ── Static testimonials — never affected by language toggle ── */
const TESTIMONIALS = [
  // Column 1
  { id: 1,  name: 'Sophie Tremblay',      text: 'Intervention ultra rapide un dimanche soir. Le plombier était professionnel, propre et efficace. Je recommande vivement !' },
  { id: 2,  name: 'Marc Bouchard',        text: 'Fuite sous l\'évier réparée en moins d\'une heure. Prix honnête et travail impeccable. Je n\'hésiterai pas à rappeler.' },
  { id: 3,  name: 'Isabelle Roy',         text: 'Service 24h disponible comme promis. Vraiment impressionné par la réactivité de l\'équipe lors de mon urgence.' },
  { id: 4,  name: 'Michel Lebrun',        text: 'Chauffe-eau tombé en panne un vendredi soir. Remplacé dès le lendemain matin. Service exceptionnel, équipe à l\'écoute.' },
  { id: 5,  name: 'Anne-Marie Desrosiers',text: 'Très professionnel. Le technicien a pris le temps d\'expliquer le problème et les solutions possibles avant d\'intervenir.' },
  { id: 6,  name: 'Kevin O\'Brien',       text: 'Called at 11 PM for a burst pipe. They arrived within 40 minutes and had everything fixed before midnight. Exceptional service.' },
  // Column 2
  { id: 7,  name: 'Jean-François Côté',  text: 'Ils ont remplacé notre chauffe-eau en une journée. Travail soigné, équipe courtoise. Le prix était exactement celui annoncé.' },
  { id: 8,  name: 'Camille Gagnon',       text: 'Appel d\'urgence un samedi matin traité en 45 minutes. Je ne pouvais pas espérer mieux. Merci pour le service rapide !' },
  { id: 9,  name: 'Patrick Lavoie',       text: 'Professionnels du début à la fin. Diagnostic précis, réparation durable et aucun dégât laissé derrière eux.' },
  { id: 10, name: 'Stéphane Carrier',     text: 'Deuxième fois que je fais affaire avec eux. Toujours aussi fiables et ponctuels. Mon plombier de confiance désormais.' },
  { id: 11, name: 'François Beaulieu',    text: 'Problème de pression d\'eau résolu rapidement. Tarifs transparents, aucune mauvaise surprise. Je recommande sans hésitation.' },
  { id: 12, name: 'Martine Ouellet',      text: 'Équipe très sympathique et compétente. Ils ont réparé une fuite derrière le mur sans tout démolir. Impressionnant !' },
  // Column 3
  { id: 13, name: 'Nathalie Fortin',      text: 'Devis clair, pas de mauvaises surprises sur la facture. Rare et appréciable ! Je les recommande à tous mes voisins.' },
  { id: 14, name: 'Éric Morin',           text: 'Débouchage de drain traité rapidement. L\'équipe a même nettoyé après leur passage. Service cinq étoiles mérité.' },
  { id: 15, name: 'Julie Pelletier',      text: 'Très satisfait du service. On sent que l\'expérience et la compétence sont au rendez-vous. Merci pour votre professionnalisme.' },
  { id: 16, name: 'David Chartrand',      text: 'Toilette bouchée un soir de réveillon, ils sont venus en deux heures. Sauveurs ! Tarif correct pour une urgence de nuit.' },
  { id: 17, name: 'Christine Girard',     text: 'Installation d\'un nouveau robinet faite proprement et rapidement. Le plombier était ponctuel et très respectueux de notre maison.' },
  { id: 18, name: 'Sarah Mitchell',       text: 'Great experience from start to finish. The technician was knowledgeable, friendly, and left the workspace spotless. Will definitely call again.' },
];

const COL1 = TESTIMONIALS.slice(0, 6);
const COL2 = TESTIMONIALS.slice(6, 12);
const COL3 = TESTIMONIALS.slice(12, 18);

const AVATAR_COLORS = [
  '#2563EB', '#7C3AED', '#059669', '#DC2626',
  '#D97706', '#0891B2', '#BE185D', '#65A30D', '#9333EA',
  '#2563EB', '#7C3AED', '#059669', '#DC2626',
  '#D97706', '#0891B2', '#BE185D', '#65A30D', '#9333EA',
];

function Avatar({ name, id }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('');
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
      style={{ backgroundColor: AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length] }}
    >
      {initials}
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialsColumn({ items, duration = 15, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', repeatType: 'loop', duration }}
        className="flex flex-col gap-4 pb-4"
      >
        {[0, 1].map((pass) => (
          <React.Fragment key={pass}>
            {items.map(({ id, text, name }) => (
              <div
                key={`${pass}-${id}`}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                <StarRating />
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{text}</p>
                <div className="flex items-center gap-3">
                  <Avatar name={name} id={id} />
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{name}</p>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="bg-gray-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.testimonials.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t.testimonials.description}
          </p>
        </div>

        {/* Scrolling columns */}
        <div
          className="flex gap-4 justify-center"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            maxHeight: '680px',
            overflow: 'hidden',
          }}
        >
          <TestimonialsColumn items={COL1} duration={22} className="flex-1 min-w-0" />
          <TestimonialsColumn items={COL2} duration={30} className="flex-1 min-w-0 hidden md:block" />
          <TestimonialsColumn items={COL3} duration={26} className="flex-1 min-w-0 hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
