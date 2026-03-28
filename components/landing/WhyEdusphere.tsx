'use client';

import { motion } from 'framer-motion';

const points = [
  {
    icon: '📶',
    text: 'Fonctionne hors ligne — sync automatique au retour du réseau',
  },
  {
    icon: '💳',
    text: 'Orange Money & MTN MoMo — paiements sans commission cachée',
  },
  {
    icon: '💬',
    text: 'SMS pour les parents sans smartphone ni data internet',
  },
  {
    icon: '🔒',
    text: 'Données sécurisées, conformes aux standards internationaux',
  },
];

// Guinea SVG with animated city points
function GuineaMap() {
  const cities = [
    { name: 'Conakry', cx: 22, cy: 68 },
    { name: 'Kindia', cx: 30, cy: 58 },
    { name: 'Labé', cx: 42, cy: 40 },
    { name: 'Kankan', cx: 70, cy: 44 },
    { name: 'N\'Zérékoré', cx: 62, cy: 78 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [1, 4],
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Simplified Guinea shape */}
      <path
        d="M18 65 L14 55 L16 45 L20 38 L28 30 L36 26 L45 22 L55 24 L63 20 L72 26 L80 34 L82 44 L78 52 L74 60 L68 70 L60 80 L52 88 L44 90 L36 86 L28 80 L22 72 Z"
        fill="rgba(0,148,96,0.08)"
        stroke="rgba(0,148,96,0.3)"
        strokeWidth="0.8"
      />

      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={cities[a].cx}
          y1={cities[a].cy}
          x2={cities[b].cx}
          y2={cities[b].cy}
          stroke="rgba(0,148,96,0.2)"
          strokeWidth="0.5"
          strokeDasharray="2,2"
        />
      ))}

      {/* City pulse animations */}
      {cities.map((city, i) => (
        <g key={city.name}>
          {/* Outer pulse */}
          <circle cx={city.cx} cy={city.cy} r="6" fill="none" stroke="#009460" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="4;10;4" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          {/* Inner dot */}
          <circle cx={city.cx} cy={city.cy} r="2" fill="#009460" opacity="0.9" />
          {/* City name */}
          <text
            x={city.cx + 3}
            y={city.cy - 3}
            fontSize="4"
            fill="rgba(255,255,255,0.5)"
            fontFamily="var(--font-dm-sans)"
          >
            {city.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function WhyEdusphere() {
  return (
    <section className="relative bg-[#06090F] py-28 border-t border-[#1A2540] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* LEFT — Guinea Map Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-80 lg:h-[420px] flex items-center justify-center order-2 lg:order-1"
          >
            {/* Glow behind map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,148,96,0.12) 0%, transparent 70%)' }} />
            </div>

            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <GuineaMap />
            </div>

            {/* Decorative corner badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 right-4 px-3 py-2 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(0,148,96,0.15)', border: '1px solid rgba(0,148,96,0.3)', color: '#009460', fontFamily: 'var(--font-dm-sans)' }}
            >
              🟢 Sync active
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-8 left-4 px-3 py-2 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(252,209,22,0.1)', border: '1px solid rgba(252,209,22,0.25)', color: '#FCD116', fontFamily: 'var(--font-dm-sans)' }}
            >
              5 villes connectées
            </motion.div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-2">
              <span className="font-[var(--font-syne)] text-xs font-bold tracking-[0.25em] uppercase text-[#FCD116]">
                Pourquoi Edusphère
              </span>
              <h2 className="font-[var(--font-syne)] text-3xl md:text-4xl font-extrabold text-[#F0F4FF] leading-tight">
                Pas juste un logiciel.{' '}
                <br />
                Votre{' '}
                <em style={{ fontFamily: 'var(--font-playfair)', color: '#FCD116', fontStyle: 'italic' }}>
                  partenaire.
                </em>
              </h2>
            </div>

            <div className="space-y-5">
              {points.map((point, i) => (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110"
                    style={{ background: 'rgba(252,209,22,0.1)' }}
                  >
                    {point.icon}
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <svg
                      className="flex-shrink-0 mt-0.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle cx="8" cy="8" r="7" fill="rgba(252,209,22,0.15)" />
                      <path d="M4.5 8L7 10.5L11.5 6" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="font-[var(--font-dm-sans)] text-[#6B7A99] group-hover:text-[#F0F4FF] transition-colors text-sm leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(206,17,38,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#CE1126] text-white font-[var(--font-dm-sans)] font-bold px-8 py-4 rounded-full"
            >
              En savoir plus
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
