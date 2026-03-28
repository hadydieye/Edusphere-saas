'use client';

import { motion } from 'framer-motion';

const points = [
  {
    icon: '📋',
    color: '#CE1126',
    title: 'Bulletins en retard, cahiers perdus',
    description: 'Des semaines à compiler les notes à la main, avec des risques d\'erreurs permanents et des parents qui attendent.',
  },
  {
    icon: '📱',
    color: '#FCD116',
    title: 'Communication chaotique',
    description: 'Les parents apprennent les absences trop tard, créant frustration, déplacements inutiles et perte de confiance.',
  },
  {
    icon: '💸',
    color: '#009460',
    title: 'Frais impayés oubliés',
    description: 'Aucun suivi centralisé des paiements de scolarité. La trésorerie souffre et personne ne sait qui a payé.',
  },
];

export default function PainPoints() {
  return (
    <section className="relative bg-[#0D1320] py-28 border-t border-[#1A2540] overflow-hidden">
      {/* African geometric watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pain-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,0 80,40 40,80 0,40" fill="none" stroke="white" strokeWidth="1" />
              <polygon points="40,10 70,40 40,70 10,40" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="4" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pain-geo)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-[var(--font-syne)] text-xs font-bold tracking-[0.25em] uppercase text-[#CE1126]"
          >
            Problème
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[var(--font-syne)] text-3xl md:text-5xl font-extrabold text-[#F0F4FF] leading-tight"
          >
            L&apos;éducation guinéenne mérite{' '}
            <span className="relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #CE1126, #FCD116)' }}
              >
                mieux
              </span>
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                height="6"
                viewBox="0 0 100 6"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4 Q25 0 50 4 T100 4"
                  fill="none"
                  stroke="url(#paint-underline)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="paint-underline" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#CE1126" />
                    <stop offset="100%" stopColor="#FCD116" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-dm-sans)] text-[#6B7A99] text-lg leading-relaxed"
          >
            Les méthodes traditionnelles ralentissent votre établissement et démotivent votre personnel.
            Il est temps de changer.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div
                className="h-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid #1A2540',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${point.color}40`;
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#1A2540';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${point.color}15` }}
                >
                  {point.icon}
                </div>

                {/* Color accent line */}
                <div
                  className="w-8 h-0.5 mb-6 rounded-full"
                  style={{ backgroundColor: point.color }}
                />

                <h3 className="font-[var(--font-syne)] text-xl font-bold text-[#F0F4FF] mb-4 leading-snug">
                  {point.title}
                </h3>
                <p className="font-[var(--font-dm-sans)] text-[#6B7A99] text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
