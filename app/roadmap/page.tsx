'use client';

import PageLayout from '@/components/landing/PageLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';

const timelineData = [
  {
    status: 'Livré',
    quarter: 'Q1 2026',
    color: '#009460', // Vert
    icon: '✅',
    items: [
      'Gestion élèves & classes',
      'Notes & bulletins PDF',
      'Auth multi-rôles',
      'Landing page'
    ]
  },
  {
    status: 'En cours',
    quarter: 'Q2 2026',
    color: '#4B6BFB', // Bleu
    icon: '🔄',
    items: [
      'Mobile Money (Orange Money + MTN MoMo)',
      'Notifications SMS',
      'Espace parents',
      'Mode offline complet'
    ]
  },
  {
    status: 'Prévu',
    quarter: 'Q3 2026',
    color: '#FCD116', // Orange/Or
    icon: '🔜',
    items: [
      'Application mobile (Android)',
      'Emploi du temps interactif',
      'Messagerie interne',
      'Rapports statistiques avancés'
    ]
  },
  {
    status: 'Vision',
    quarter: 'Q4 2026+',
    color: '#9D4EDD', // Violet
    icon: '🔮',
    items: [
      'IA : détection élèves en difficulté',
      'Intégration Ministère de l\'Éducation',
      'Extension Afrique de l\'Ouest'
    ]
  }
];

export default function RoadmapPage() {
  return (
    <PageLayout
      title="Ce qui arrive bientôt"
      subtitle="Edusphère évolue avec vos besoins. Découvrez les prochaines fonctionnalités qui transformeront votre gestion."
      badge="ROADMAP"
    >
      <div className="relative py-16 max-w-4xl mx-auto">
        
        {/* Ligne centrale verticalisée (gradient rouge->or->vert) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 rounded-full" 
             style={{ background: 'linear-gradient(to bottom, #CE1126 0%, #FCD116 50%, #009460 100%)', opacity: 0.3 }} />

        {/* Conteneur des items */}
        <div className="space-y-16">
          {timelineData.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.quarter}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative flex items-center justify-between md:justify-normal flex-col md:flex-row w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Espaceur invisible pour pousser le bloc (desktop seulement) */}
                <div className="hidden md:block w-5/12" />

                {/* Point central (pastille sur la ligne) */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full border-4 border-[#06090F] flex items-center justify-center z-10 -translate-x-3.5 md:-translate-x-1/2"
                     style={{ backgroundColor: step.color, boxShadow: `0 0 15px ${step.color}66` }}>
                  <span className="text-xs">{step.icon}</span>
                </div>

                {/* Carte de contenu (glassmorphism) */}
                <div className="w-full pl-20 md:pl-0 md:w-5/12">
                  <div className={`p-6 rounded-2xl border border-[#1A2540] bg-[#0D1320]/80 backdrop-blur-sm shadow-xl relative overflow-hidden group hover:border-[${step.color}]/50 transition-colors duration-300`}>
                    
                    {/* Background glow subtil */}
                    <div className="absolute -inset-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                         style={{ background: `radial-gradient(circle at ${isEven ? 'top right' : 'top left'}, ${step.color}, transparent 60%)` }} />

                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold font-[var(--font-dm-sans)] text-[#F0F4FF] border"
                            style={{ backgroundColor: `${step.color}20`, borderColor: `${step.color}40` }}>
                        {step.status}
                      </span>
                      <h3 className="font-[var(--font-syne)] text-xl font-bold text-[#F0F4FF]">
                        {step.quarter}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                          <span className="font-[var(--font-dm-sans)] text-[#6B7A99] leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA final suggérer une fonctionnalité */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-32 rounded-3xl p-10 text-center relative overflow-hidden border border-[#FCD116]/30 bg-[#FCD116]/5 max-w-4xl mx-auto"
      >
         <h3 className="font-[var(--font-syne)] text-2xl md:text-3xl font-bold text-[#F0F4FF] mb-4">
           Une fonctionnalité vous manque ?
         </h3>
         <p className="font-[var(--font-dm-sans)] text-[#F0F4FF]/70 mb-8 max-w-lg mx-auto">
           Edusphère est créé en collaboration avec les écoles guinéennes. Votre avis façonne notre avenir.
         </p>
         
         <Link href="mailto:contact@edusphere.gn?subject=Suggestion%20de%20fonctionnalité" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FCD116] text-[#06090F] font-[var(--font-dm-sans)] font-bold rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(252,209,22,0.4)] transition-all transform hover:-translate-y-0.5">
            Suggérer une fonctionnalité
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
         </Link>
      </motion.div>
    </PageLayout>
  );
}
