'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "Est-ce que ça fonctionne sans internet ?",
    a: "Oui. Edusphère est conçu offline-first. Les données sont stockées localement et synchronisées automatiquement dès le retour de la connexion.",
  },
  {
    q: "Comment se fait le paiement de l'abonnement ?",
    a: "Via Orange Money ou MTN MoMo. Vous recevez une confirmation par SMS immédiatement après le paiement.",
  },
  {
    q: "Puis-je importer mes données existantes ?",
    a: "Oui, notre équipe vous accompagne pour importer vos listes d'élèves et données historiques lors de l'onboarding.",
  },
  {
    q: "Y a-t-il une formation pour le personnel ?",
    a: "Chaque école bénéficie d'une session de formation en ligne. Le plan Enterprise inclut une formation sur site à Conakry ou en région.",
  },
  {
    q: "Que se passe-t-il si je veux annuler ?",
    a: "Vous pouvez annuler à tout moment. Vos données vous appartiennent et vous pouvez les exporter en CSV ou PDF avant de partir.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-[#0D1320] py-28 border-t border-[#1A2540] overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="font-[var(--font-syne)] text-xs font-bold tracking-[0.25em] uppercase text-[#6B7A99]">FAQ</span>
          <h2 className="font-[var(--font-syne)] text-3xl md:text-4xl font-extrabold text-[#F0F4FF]">
            Questions fréquentes
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="divide-y divide-[#1A2540]">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  className="w-full py-6 flex items-center justify-between text-left gap-4 group"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={`font-[var(--font-syne)] text-base md:text-lg font-semibold transition-colors ${isOpen ? 'text-[#FCD116]' : 'text-[#F0F4FF] group-hover:text-[#FCD116]'}`}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full border border-[#1A2540] flex items-center justify-center text-[#6B7A99] group-hover:border-[#FCD116]/40 group-hover:text-[#FCD116] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-[var(--font-dm-sans)] text-[#6B7A99] text-sm leading-relaxed pb-6 pr-10">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
