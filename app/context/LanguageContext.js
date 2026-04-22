"use client";

import { createContext, useContext, useState } from "react";

const translations = {
  fr: {
    nav: {
      services: "Services",
      about: "À propos",
      contact: "Contact",
      emergency: "Urgence",
      phone: "1-800-PLUMBR",
      cta: "Demander un devis",
    },
    hero: {
      badge: "Service disponible 24h/7j",
      headline: "Appelez-nous",
      phone: "+1 800-993-8283",
      cta1: "Voir tous nos services",
      cta2: "Demander un devis",
      stat1: "Clients satisfaits",
      stat2: "Années d'expérience",
      stat3: "Interventions réalisées",
      stat4: "Disponibilité",
    },
    testimonials: {
      tag: 'Témoignages',
      title: 'Ce que disent nos clients',
      description: 'Des centaines de familles et entreprises nous font confiance pour leurs besoins en plomberie.',
    },
    faq: {
      tag: 'FAQ',
      title: 'Questions fréquentes',
      description: 'Tout ce que vous devez savoir avant de nous appeler.',
      items: [
        { q: 'Offrez-vous des services d\'urgence 24h/24 ?', a: 'Oui, nous sommes disponibles 24h/24, 7j/7 pour toute urgence plomberie. Un technicien peut être chez vous en moins d\'une heure selon votre secteur.' },
        { q: 'Quelles zones desservez-vous ?', a: 'Nous couvrons Montréal et ses environs, incluant Laval, Longueuil, la Rive-Nord et la Rive-Sud.' },
        { q: 'Êtes-vous licenciés et assurés ?', a: 'Oui, tous nos plombiers sont certifiés par la Régie du bâtiment du Québec (RBQ) et nous détenons une assurance responsabilité complète.' },
        { q: 'Comment fonctionne la tarification ?', a: 'Nous proposons un devis gratuit avant tout travail. Nos tarifs sont transparents, sans frais cachés. Le déplacement d\'urgence peut entraîner un supplément.' },
        { q: 'Offrez-vous une garantie sur vos travaux ?', a: 'Oui, tous nos travaux sont garantis 1 an pièces et main-d\'œuvre. En cas de problème, nous revenons sans frais supplémentaires.' },
        { q: 'Que faire en cas de dégât des eaux ?', a: 'Coupez l\'alimentation en eau principale immédiatement, puis appelez-nous. Notre équipe d\'urgence interviendra rapidement pour limiter les dégâts.' },
      ],
    },
    contact: {
      tag: 'Contact',
      title: 'Demandez un devis gratuit',
      description: 'Remplissez le formulaire et nous vous recontacterons dans les 24 heures.',
      name: 'Nom complet',
      phone: 'Numéro de téléphone',
      email: 'Adresse courriel',
      message: 'Décrivez votre problème',
      submit: 'Envoyer la demande',
      sending: 'Envoi en cours…',
      sent: 'Demande envoyée !',
      sentSub: 'Nous vous recontacterons très bientôt.',
      emergencyLabel: 'Urgence ?',
      emergencyText: 'Appelez-nous directement',
      perks: [
        'Disponible 24h/24, 7j/7',
        'Devis gratuit et sans engagement',
        'Intervention rapide garantie',
        'Plombiers certifiés RBQ',
      ],
    },
    footer: {
      tagline:
        "Des solutions plomberie de confiance, disponibles quand vous en avez besoin.",
      links: "Liens rapides",
      services: "Services",
      about: "À propos",
      contact: "Contact",
      emergency: "Urgence",
      legal: "Légal",
      privacy: "Confidentialité",
      terms: "Conditions d'utilisation",
      copyright: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      services: "Services",
      about: "About",
      contact: "Contact",
      emergency: "Emergency",
      phone: "1-800-PLUMBR",
      cta: "Get a Quote",
    },
    hero: {
      badge: "Available 24/7",
      headline: "Call Us",
      phone: "+1 800-993-8283",
      cta1: "See All Services",
      cta2: "Get a Quote",
      stat1: "Happy Clients",
      stat2: "Years Experience",
      stat3: "Jobs Completed",
      stat4: "Availability",
    },
    testimonials: {
      tag: 'Testimonials',
      title: 'What our clients say',
      description: 'Hundreds of families and businesses trust us for all their plumbing needs.',
    },
    faq: {
      tag: 'FAQ',
      title: 'Frequently asked questions',
      description: 'Everything you need to know before calling us.',
      items: [
        { q: 'Do you offer 24/7 emergency services?', a: 'Yes, we are available 24/7 for any plumbing emergency. A technician can be at your door in under an hour depending on your area.' },
        { q: 'Which areas do you serve?', a: 'We cover Montreal and surrounding areas including Laval, Longueuil, North Shore, and South Shore.' },
        { q: 'Are you licensed and insured?', a: 'Yes, all our plumbers are certified by the Régie du bâtiment du Québec (RBQ) and we carry full liability insurance.' },
        { q: 'How does pricing work?', a: 'We provide a free quote before any work begins. Our rates are transparent with no hidden fees. Emergency call-outs may incur an additional charge.' },
        { q: 'Do you offer a warranty on your work?', a: 'Yes, all our work comes with a 1-year parts and labour warranty. If an issue arises, we come back at no extra cost.' },
        { q: 'What should I do in case of a water leak?', a: 'Shut off the main water supply immediately, then call us. Our emergency team will respond quickly to minimize damage.' },
      ],
    },
    contact: {
      tag: 'Contact',
      title: 'Get a Free Quote',
      description: 'Fill in the form and we\'ll get back to you within 24 hours.',
      name: 'Full name',
      phone: 'Phone number',
      email: 'Email address',
      message: 'Describe your issue',
      submit: 'Send Request',
      sending: 'Sending…',
      sent: 'Request sent!',
      sentSub: 'We\'ll be in touch very soon.',
      emergencyLabel: 'Emergency?',
      emergencyText: 'Call us directly',
      perks: [
        'Available 24/7',
        'Free, no-obligation quote',
        'Fast response guaranteed',
        'RBQ-certified plumbers',
      ],
    },
    footer: {
      tagline: "Trusted plumbing solutions, available whenever you need us.",
      links: "Quick Links",
      services: "Services",
      about: "About",
      contact: "Contact",
      emergency: "Emergency",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      copyright: "All rights reserved.",
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");

  const toggleLang = () => setLang((l) => (l === "fr" ? "en" : "fr"));
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
