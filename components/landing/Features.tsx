'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '📚',
    color: '#CE1126',
    title: 'Gestion des classes & élèves',
    description: 'Inscriptions, niveaux, transferts en quelques clics via une interface intuitive.',
    badge: 'Essentiel',
    badgeClass: 'bg-white/10 text-white/60',
  },
  {
    icon: '📊',
    color: '#FCD116',
    title: 'Notes & bulletins PDF',
    description: 'Saisie offline, génération automatique de bulletins professionnels en un clic.',
    badge: 'OFFLINE FIRST',
    badgeClass: 'bg-[#009460]/20 text-[#009460] animate-pulse',
  },
  {
    icon: '👨‍👩‍👧',
    color: '#009460',
    title: 'Espace parents',
    description: 'Résultats, absences et paiements consultables en temps réel par les familles.',
    badge: null,
    badgeClass: '',
  },
  {
    icon: '💬',
    color: '#CE1126',
    title: 'Notifications SMS',
    description: 'Alertes même sans data internet. Restez en contact permanent avec les parents.',
    badge: 'Guinée-ready',
    badgeClass: 'bg-white/10 text-white/60',
  },
  {
    icon: '💰',
    color: '#FCD116',
    title: 'Mobile Money intégré',
    description: 'Orange Money & MTN MoMo acceptés sans commission cachée pour l\'école.',
    badge: null,
    badgeClass: '',
  },
  {
    icon: '🔒',
    color: '#009460',
    title: 'Sécurité & audit',
    description: 'Données isolées par école et cryptées. Traçabilité complète de chaque action.',
    badge: null,
    badgeClass: '',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-[#06090F] py-28 border-t border-[#1A2540] overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#1A2540 1px, transparent 1px), linear-gradient(90deg, #1A2540 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.18,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block font-[var(--font-syne)] text-xs font-bold tracking-[0.25em] uppercase text-[#009460]"
          >
            Solution
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[var(--font-syne)] text-3xl md:text-5xl font-extrabold text-[#F0F4FF] leading-tight"
          >
            Tout ce dont votre école a{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #009460, #00E5FF)' }}
            >
              besoin
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-dm-sans)] text-[#6B7A99] text-lg leading-relaxed"
          >
            Une plateforme complète, offline-first, pensée pour les infrastructures locales guinéennes.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative h-full"
            >
              <div
                className="h-full rounded-[1.5rem] p-7 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${feature.color}38`;
                  el.style.boxShadow = `0 8px 32px ${feature.color}1F`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(255,255,255,0.06)';
                  el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
                }}
              >
                {/* Top row */}
                <div className="flex justify-between items-start mb-7">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}18` }}
                  >
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase ${feature.badgeClass}`}>
                      {feature.badge}
                    </span>
                  )}
                </div>

                {/* Text */}
                <h3 className="font-[var(--font-syne)] text-lg font-bold text-[#F0F4FF] mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="font-[var(--font-dm-sans)] text-[#6B7A99] text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="mt-6 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                  style={{ backgroundColor: feature.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
