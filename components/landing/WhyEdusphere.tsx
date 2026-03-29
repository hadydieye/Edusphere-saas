'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const cities = [
  { name: 'Conakry', cx: 78, cy: 285, r: 6, isCapital: true, delay: 0 },
  { name: 'Kindia', cx: 112, cy: 248, r: 4, delay: 0.5 },
  { name: 'Labé', cx: 168, cy: 168, r: 4, delay: 1 },
  { name: 'Mamou', cx: 195, cy: 212, r: 4, delay: 1.5 },
  { name: 'Kankan', cx: 298, cy: 195, r: 4, delay: 2 },
  { name: 'N\'Zérékoré', cx: 268, cy: 342, r: 4, delay: 2.5 },
  { name: 'Boké', cx: 88, cy: 155, r: 4, delay: 3 },
  { name: 'Faranah', cx: 235, cy: 248, r: 4, delay: 3.5 },
]

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
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative flex justify-center items-center group">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-full max-w-[500px]"
            >
              {/* Soft glow background */}
              <div 
                className="absolute inset-0 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                style={{ background: 'radial-gradient(circle, #CE1126 0%, #FCD116 50%, #009460 100%)' }}
              />
              
              <img
                src="/images/guinea_map.png"
                alt="Carte de la Guinée Edusphère"
                className="relative z-10 w-full h-auto drop-shadow-[0_0_30px_rgba(252,209,22,0.15)]"
                style={{ mixBlendMode: 'screen' }}
              />
              
              {/* Floating indicators for premium feel */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/4 left-1/4 z-20 w-3 h-3 bg-[#CE1126] rounded-full shadow-[0_0_15px_#CE1126]"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-1/3 right-1/4 z-20 w-3 h-3 bg-[#009460] rounded-full shadow-[0_0_15px_#009460]"
              />
            </motion.div>
          </div>

          {/* COLONNE DROITE — Texte */}
          <div className="space-y-8">
            <div className="space-y-4">
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

            <div className="space-y-6">
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
      </div>
    </section>
  )
}
