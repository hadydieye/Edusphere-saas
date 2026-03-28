'use client';

import { motion } from 'framer-motion';

// African geometric overlay SVG pattern
function AfricanPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" opacity="0.08">
        <defs>
          <pattern id="af-cta" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,4 76,40 40,76 4,40" fill="none" stroke="white" strokeWidth="1.2" />
            <polygon points="40,18 62,40 40,62 18,40" fill="none" stroke="white" strokeWidth="0.7" />
            <circle cx="40" cy="40" r="5" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="4" r="2" fill="white" />
            <circle cx="76" cy="40" r="2" fill="white" />
            <circle cx="40" cy="76" r="2" fill="white" />
            <circle cx="4" cy="40" r="2" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#af-cta)" />
      </svg>
    </div>
  );
}

export default function CTAFinal() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #CE1126 0%, #8B0A1A 100%)' }}
    >
      <AfricanPattern />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(252,209,22,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <h2 className="font-[var(--font-syne)] text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-tight">
            Prêt à moderniser votre école ?
          </h2>
          <p className="font-[var(--font-dm-sans)] text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed">
            Rejoignez les écoles guinéennes qui font confiance à Edusphère
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-[#CE1126] font-[var(--font-dm-sans)] font-extrabold px-10 py-5 rounded-full text-base hover:shadow-xl transition-all"
            >
              Contacter l&apos;équipe
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.97 }}
              className="border border-white/40 text-white font-[var(--font-dm-sans)] font-bold px-10 py-5 rounded-full text-base transition-colors"
            >
              Voir une démo
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            {[
              '🔒 Données sécurisées',
              '📶 Offline-first',
              '💳 Mobile Money',
              '🇬🇳 Made for Guinea',
            ].map((badge) => (
              <span key={badge} className="font-[var(--font-dm-sans)] text-sm text-white/60">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
