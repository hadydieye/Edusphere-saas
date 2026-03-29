'use client'

import { motion } from 'framer-motion'

const points = [
  {
    icon: '📶',
    title: 'Offline-first natif',
    desc: 'Données stockées localement, sync automatique au retour du réseau.',
    color: 'rgba(0,148,96,0.15)',
    border: '#009460',
  },
  {
    icon: '💳',
    title: 'Mobile Money sans commission',
    desc: 'Orange Money & MTN MoMo directement intégrés. Zéro frais cachés.',
    color: 'rgba(252,209,22,0.15)',
    border: '#FCD116',
  },
  {
    icon: '💬',
    title: 'SMS sans data internet',
    desc: 'Les parents reçoivent les alertes même sans forfait data actif.',
    color: 'rgba(206,17,38,0.15)',
    border: '#CE1126',
  },
  {
    icon: '🔒',
    title: 'Sécurité internationale',
    desc: 'Données isolées par école, chiffrées et conformes aux standards RGPD.',
    color: 'rgba(0,148,96,0.15)',
    border: '#009460',
  },
]

export default function WhyEdusphere() {
  return (
    <section className="bg-[#0D1320] py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-16">
          
          {/* HEADER — Texte */}
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs tracking-widest text-[#CE1126] uppercase font-bold">
              POURQUOI EDUSPHÈRE
            </span>
            <h2 className="font-[var(--font-syne)] text-[48px] leading-tight text-[#F0F4FF] font-extrabold">
              Pas juste un logiciel.<br />
              Votre <span className="font-[var(--font-playfair)] italic text-[#FCD116]">partenaire.</span>
            </h2>
            <p className="font-[var(--font-dm-sans)] text-[#6B7A99] text-xl">
              Conçu pour la réalité du terrain guinéen, pas copié sur un modèle étranger.
            </p>
          </div>

          {/* GRID DES POINTS */}
          <div className="grid sm:grid-cols-2 gap-8 text-left w-full">
              {points.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex gap-4 items-start"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 border"
                    style={{ 
                      backgroundColor: point.color, 
                      borderColor: `${point.border}4d` 
                    }}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-[var(--font-dm-sans)] font-semibold text-[#F0F4FF] text-lg">
                      {point.title}
                    </h3>
                    <p className="font-[var(--font-dm-sans)] text-[#6B7A99]">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
