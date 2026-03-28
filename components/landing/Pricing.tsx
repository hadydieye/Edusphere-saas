'use client';

import { motion } from 'framer-motion';

const plans = [
  {
    id: 'starter',
    label: 'Starter',
    price: '150 000',
    sub: "Jusqu'à 200 élèves",
    featured: false,
    features: [
      'Gestion classes & élèves',
      'Notes & bulletins PDF',
      '1 administrateur',
      'Support email',
    ],
    cta: "Contacter l'équipe",
    ctaStyle: 'border',
  },
  {
    id: 'pro',
    label: 'Pro',
    price: '400 000',
    sub: "Jusqu'à 800 élèves",
    featured: true,
    badge: 'Le plus populaire',
    features: [
      'Tout Starter +',
      'Mobile Money intégré',
      'Notifications SMS',
      'Espace parents',
      '5 administrateurs',
      'Support prioritaire',
    ],
    cta: "Contacter l'équipe",
    ctaStyle: 'filled',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    price: '900 000',
    sub: 'Élèves illimités',
    featured: false,
    features: [
      'Tout Pro +',
      'Multi-établissements',
      'API personnalisée',
      'Administrateurs illimités',
      'Support dédié 24/7',
      'Formation sur site',
    ],
    cta: "Contacter l'équipe",
    ctaStyle: 'border',
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <circle cx="8" cy="8" r="7" fill="rgba(0,148,96,0.15)" />
      <path d="M4.5 8L7 10.5L11.5 6" stroke="#009460" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative bg-[#06090F] py-28 border-t border-[#1A2540] overflow-hidden"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(26,37,64,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(26,37,64,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-[var(--font-syne)] text-xs font-bold tracking-[0.25em] uppercase text-[#FCD116]"
          >
            Tarifs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[var(--font-syne)] text-3xl md:text-5xl font-extrabold text-[#F0F4FF] leading-tight"
          >
            Des prix adaptés à votre{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #CE1126, #FCD116)' }}
            >
              réalité
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-dm-sans)] text-[#6B7A99] text-lg"
          >
            Pas de frais cachés. En Francs Guinéens.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`relative rounded-3xl p-8 flex flex-col ${plan.featured ? 'md:scale-105' : ''}`}
              style={
                plan.featured
                  ? {
                      background: 'rgba(255,255,255,0.03)',
                      boxShadow: '0 0 40px rgba(206,17,38,0.2), 0 0 0 2px transparent',
                      backgroundClip: 'padding-box',
                      border: '2px solid transparent',
                      backgroundImage: 'linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #CE1126, #FCD116)',
                      backgroundOrigin: 'border-box',
                    }
                  : {
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid #1A2540',
                    }
              }
            >
              {/* Badge */}
              {plan.featured && plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FCD116] text-black font-[var(--font-dm-sans)] font-bold text-xs px-4 py-1.5 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Label */}
              <p className="font-[var(--font-syne)] text-sm font-bold text-[#6B7A99] uppercase tracking-widest mb-4">
                {plan.label}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span className="font-[var(--font-syne)] text-4xl font-extrabold text-[#F0F4FF]">
                  {plan.price}
                </span>
                <span className="font-[var(--font-dm-sans)] text-[#6B7A99] text-sm ml-1">GNF/mois</span>
              </div>
              <p className="font-[var(--font-dm-sans)] text-[#6B7A99] text-xs mb-8">{plan.sub}</p>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="font-[var(--font-dm-sans)] text-sm text-[#6B7A99]">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full font-[var(--font-dm-sans)] font-bold text-sm py-4 rounded-2xl transition-all ${
                  plan.ctaStyle === 'filled'
                    ? 'bg-[#CE1126] text-white hover:shadow-[0_0_30px_rgba(206,17,38,0.4)]'
                    : 'border border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126]/10'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
