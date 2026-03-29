'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    initials: 'AB',
    bg: '#CE1126',
    quote: "Avant Edusphère, je passais 3 semaines à préparer les bulletins. Maintenant c'est fait en 2 jours. Mon équipe administrative a retrouvé du temps pour accompagner les élèves.",
    name: 'Amadou Baldé',
    title: 'Directeur · École Fraternité · Conakry',
  },
  {
    initials: 'MS',
    bg: '#009460',
    highlight: true,
    quote: "Les parents reçoivent les résultats par SMS le jour même de la délibération. Plus personne ne se déplace pour rien. La confiance entre l'école et les familles s'est renforcée.",
    name: 'Mariama Souaré',
    title: 'Directrice · Collège Excellence · Kindia',
  },
  {
    initials: 'IB',
    bg: 'linear-gradient(135deg, #CE1126, #FCD116)',
    quote: "Le suivi des paiements a transformé notre trésorerie. On sait exactement qui a payé, quand, et via quel moyen. Les impayés ont chuté de 60% en 3 mois.",
    name: 'Ibrahim Barry',
    title: 'Proviseur · Lycée Horizon · Labé',
  },
]

function StarRating() {
  return (
    <div className="flex gap-1 mt-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[#FCD116] text-xl">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-[#06090F] py-24 relative overflow-hidden">
      {/* 3-color border top */}
      <div className="absolute top-0 left-0 w-full h-[3px]" 
           style={{ background: 'linear-gradient(to right, #CE1126 33%, #FCD116 33% 66%, #009460 66%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-[var(--font-playfair)] italic text-[52px] text-[#F0F4FF] leading-tight">
            Ils nous font <span className="text-[#FCD116]">confiance</span>
          </h2>
          <p className="font-[var(--font-dm-sans)] text-[#6B7A99] mt-4">
            Des directeurs d'école de toutes les régions de Guinée
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative bg-[rgba(255,255,255,0.03)] border rounded-[24px] p-8 min-h-[280px] hover:translate-y-[-4px] transition-all duration-300 group ${
                t.highlight ? 'border-[#FCD116]/30' : 'border-[rgba(255,255,255,0.08)]'
              } hover:border-[#FCD116]/30`}
            >
              <span className="font-[var(--font-playfair)] text-[80px] text-[#FCD116] opacity-30 leading-none absolute top-4 left-6">
                “
              </span>
              <div className="relative z-10 pt-8">
                <blockquote className="font-[var(--font-playfair)] italic text-[18px] text-[#F0F4FF] leading-relaxed mb-6">
                  {t.quote}
                </blockquote>
                <div className="h-[1px] bg-[rgba(255,255,255,0.08)] mb-6" />
                <div className="flex items-center gap-4">
                  <div 
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-[var(--font-syne)] font-bold text-[20px] text-white flex-shrink-0"
                    style={{ background: t.bg }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-[var(--font-dm-sans)] font-semibold text-[16px] text-[#F0F4FF]">
                      {t.name}
                    </p>
                    <p className="font-[var(--font-dm-sans)] text-[14px] text-[#6B7A99]">
                      {t.title}
                    </p>
                  </div>
                </div>
                <StarRating />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 min-h-[280px]"
              >
                <span className="font-[var(--font-playfair)] text-[80px] text-[#FCD116] opacity-30 leading-none absolute top-4 left-6">
                  “
                </span>
                <div className="relative z-10 pt-8">
                  <blockquote className="font-[var(--font-playfair)] italic text-[18px] text-[#F0F4FF] leading-relaxed mb-6">
                    {testimonials[current].quote}
                  </blockquote>
                  <div className="h-[1px] bg-[rgba(255,255,255,0.08)] mb-6" />
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-[var(--font-syne)] font-bold text-[20px] text-white flex-shrink-0"
                      style={{ background: testimonials[current].bg }}
                    >
                      {testimonials[current].initials}
                    </div>
                    <div>
                      <p className="font-[var(--font-dm-sans)] font-semibold text-[16px] text-[#F0F4FF]">
                        {testimonials[current].name}
                      </p>
                      <p className="font-[var(--font-dm-sans)] text-[14px] text-[#6B7A99]">
                        {testimonials[current].title}
                      </p>
                    </div>
                  </div>
                  <StarRating />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === i ? 'bg-[#FCD116] w-6' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
