'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    initials: 'AB',
    bg: '#CE1126',
    quote: 'Avant Edusphère, je passais 3 semaines à préparer les bulletins. Maintenant c\'est fait en 2 jours.',
    name: 'Amadou Baldé',
    role: 'Directeur',
    school: 'École Fraternité',
    city: 'Conakry',
  },
  {
    initials: 'MS',
    bg: '#009460',
    quote: 'Les parents reçoivent les résultats par SMS le jour même. Plus personne ne se déplace pour rien.',
    name: 'Mariama Souaré',
    role: 'Directrice',
    school: 'Collège Excellence',
    city: 'Kindia',
  },
  {
    initials: 'IB',
    bg: 'linear-gradient(135deg, #CE1126, #FCD116)',
    quote: 'Le suivi des paiements a éliminé tous nos impayés. On sait exactement qui a payé et qui ne l\'a pas fait.',
    name: 'Ibrahim Barry',
    role: 'Proviseur',
    school: 'Lycée Horizon',
    city: 'Labé',
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FCD116">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4000);
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    start();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative bg-[#0D1320] py-28 border-t border-[#1A2540] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-[var(--font-playfair)] italic text-3xl md:text-5xl font-bold text-[#F0F4FF]">
            Ils nous font confiance
          </h2>
          {/* 3-color underline */}
          <div className="flex justify-center">
            <div className="h-1 w-48 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-[#CE1126]" />
              <div className="flex-1 bg-[#FCD116]" />
              <div className="flex-1 bg-[#009460]" />
            </div>
          </div>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-3xl p-8 flex flex-col gap-6"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid #1A2540',
              }}
            >
              <StarRating />
              <blockquote
                className="font-[var(--font-playfair)] italic text-[#F0F4FF] text-base leading-relaxed flex-1"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: t.bg }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-[var(--font-syne)] font-bold text-sm text-[#F0F4FF]">{t.name}</p>
                  <p className="font-[var(--font-dm-sans)] text-xs text-[#6B7A99]">
                    {t.role} · {t.school} · {t.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div
          className="md:hidden relative"
          onMouseEnter={stop}
          onMouseLeave={start}
        >
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="p-8 flex flex-col gap-6"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1A2540', borderRadius: '1.5rem' }}
              >
                <StarRating />
                <blockquote className="font-[var(--font-playfair)] italic text-[#F0F4FF] text-base leading-relaxed">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: testimonials[current].bg }}
                  >
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <p className="font-[var(--font-syne)] font-bold text-sm text-[#F0F4FF]">{testimonials[current].name}</p>
                    <p className="font-[var(--font-dm-sans)] text-xs text-[#6B7A99]">
                      {testimonials[current].role} · {testimonials[current].school} · {testimonials[current].city}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? 'w-6 bg-[#CE1126]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
