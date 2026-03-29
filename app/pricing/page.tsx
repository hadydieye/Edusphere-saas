'use client';

import PageLayout from '@/components/landing/PageLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    desc: 'Idéal pour les petits établissements (jusqu\'à 200 élèves)',
    priceMonthly: '490 000',
    priceAnnual: '392 000',
    popular: false,
    color: '#FCD116',
    features: [
      'Gestion jusqu\'à 200 élèves',
      'Bulletins PDF',
      'Support par email',
      'Application web uniquement'
    ]
  },
  {
    name: 'Pro',
    desc: 'Le choix standard pour la majorité des écoles guinéennes',
    priceMonthly: '990 000',
    priceAnnual: '792 000',
    popular: true,
    color: '#009460',
    features: [
      'Élèves illimités',
      'Paiements Mobile Money',
      'Portail Parents complet',
      'Alertes SMS (1000 inclus) / mois',
      'Support prioritaire WhatsApp'
    ]
  },
  {
    name: 'Enterprise',
    desc: 'Pour les grands groupes scolaires et réseaux d\'écoles',
    priceMonthly: 'Sur mesure',
    priceAnnual: 'Sur mesure',
    popular: false,
    color: '#CE1126',
    features: [
      'Multi-campus',
      'Marque blanche',
      'SSO & API Accès',
      'SMS illimités',
      'Développements personnalisés',
      'Chef de projet dédié'
    ]
  }
];

const compareFeatures = [
  { name: 'Nombre d\'élèves',                 starter: 'Jusqu\'à 200', pro: 'Illimité', enterprise: 'Illimité' },
  { name: 'Bulletins automatiques PDF',       starter: true,         pro: true,       enterprise: true },
  { name: 'Espace Professeurs',               starter: true,         pro: true,       enterprise: true },
  { name: 'Tableau de bord financier',        starter: true,         pro: true,       enterprise: true },
  { name: 'Espace Parents',                   starter: false,        pro: true,       enterprise: true },
  { name: 'Paiement Mobile Money (0% frais)', starter: false,        pro: true,       enterprise: true },
  { name: 'Notifications SMS automatiques',   starter: false,        pro: '1000/mois',enterprise: 'Illimité' },
  { name: 'API et Intégration sur mesure',    starter: false,        pro: false,      enterprise: true },
  { name: 'Marque blanche (votre logo)',      starter: false,        pro: false,      enterprise: true },
  { name: 'Niveau de support',                starter: 'Email (48h)',pro: 'WhatsApp (2h)', enterprise: 'Développeur dédié' },
];

const faqs = [
  {
    q: 'Peut-on changer de plan en cours d\'année ?',
    a: 'Absolument. Vous pouvez passer du plan Starter au plan Pro à tout moment. Le montant déjà payé sera déduit au prorata de votre nouvelle facture.'
  },
  {
    q: 'Comment se passe le paiement mensuel ?',
    a: 'Vous pouvez régler votre abonnement mensuel directement via Orange Money, MTN MoMo, ou virement bancaire. Une facture électronique vous est envoyée chaque mois.'
  },
  {
    q: 'Y a-t-il des frais d\'installation ?',
    a: 'Non, la création de votre espace et la configuration initiale sont 100% gratuites sur tous nos plans. Vous ne payez que votre abonnement.'
  },
  {
    q: 'Que se passe-t-il après la période d\'essai ?',
    a: 'Après vos 30 jours d\'essai gratuit, vous pourrez choisir le plan qui vous correspond le mieux. Si vous décidez de ne pas continuer, vous pourrez exporter gratuitement toutes vos données.'
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <PageLayout
      title="Des prix adaptés à votre réalité"
      subtitle="En Francs Guinéens. Sans frais cachés. Annulable à tout moment."
      badge="TARIFS"
    >
      <div className="space-y-32">
        
        {/* Toggle & Cards Section */}
        <div className="space-y-16">
          {/* Toggle Mensuel/Annuel */}
          <div className="flex justify-center">
            <div className="bg-[#0D1320] p-1.5 rounded-full inline-flex border border-[#1A2540] relative">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative z-10 px-8 py-3 rounded-full font-[var(--font-syne)] font-bold text-sm transition-colors duration-300 ${!isAnnual ? 'text-white' : 'text-[#6B7A99] hover:text-[#F0F4FF]'}`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative z-10 px-8 py-3 rounded-full font-[var(--font-syne)] font-bold text-sm transition-colors duration-300 flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-[#6B7A99] hover:text-[#F0F4FF]'}`}
              >
                Annuel
                <span className="bg-[#009460]/20 text-[#009460] text-[10px] px-2 py-0.5 rounded-full border border-[#009460]/30 hidden sm:inline-block">
                  -20%
                </span>
              </button>
              {/* Highlight background */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 rounded-full bg-[#1A2540] z-0"
                initial={false}
                animate={{
                  left: isAnnual ? '50%' : '6px',
                  width: isAnnual ? 'calc(50% - 6px)' : 'calc(50% - 6px)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`relative rounded-3xl p-8 flex flex-col h-full bg-[#0D1320] border transition-transform duration-300 hover:-translate-y-2 ${
                  plan.popular ? 'border-[#009460] shadow-[0_0_30px_rgba(0,148,96,0.15)]' : 'border-[#1A2540]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#009460] text-white text-xs font-bold tracking-widest px-4 py-1.5 rounded-full uppercase">
                    Le plus choisi
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF] mb-2">{plan.name}</h3>
                  <p className="text-[#6B7A99] text-sm font-[var(--font-dm-sans)] h-10">{plan.desc}</p>
                </div>

                <div className="mb-8">
                  {plan.priceMonthly === 'Sur mesure' ? (
                    <div className="text-4xl font-extrabold text-[#F0F4FF] font-[var(--font-syne)]">Sur mesure</div>
                  ) : (
                    <div className="flex flex-col">
                       {isAnnual && (
                         <div className="text-[#6B7A99] line-through text-sm font-[var(--font-dm-sans)] mb-1">
                           {plan.priceMonthly} GNF / mois
                         </div>
                       )}
                       <div className="flex items-baseline gap-2">
                         <span className="text-4xl font-extrabold text-[#F0F4FF] font-[var(--font-syne)]">
                           {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                         </span>
                         <span className="text-[#6B7A99] font-[var(--font-dm-sans)]">GNF / mois</span>
                       </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3 text-sm text-[#F0F4FF] font-[var(--font-dm-sans)]">
                      <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center border" style={{ borderColor: plan.color, backgroundColor: `${plan.color}20` }}>
                        <svg className="w-2.5 h-2.5" style={{ color: plan.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="#contact" 
                  className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${
                    plan.popular 
                      ? 'bg-[#009460] text-white hover:bg-[#007A4F] hover:shadow-[0_0_15px_rgba(0,148,96,0.4)]' 
                      : 'bg-[#1A2540] text-[#F0F4FF] hover:bg-[#253454]'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Parler aux ventes' : 'Démarrer l\'essai gratuit'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tableau Comparatif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h3 className="font-[var(--font-syne)] text-3xl font-bold text-[#F0F4FF] mb-4">Comparez les fonctionnalités</h3>
            <p className="text-[#6B7A99] font-[var(--font-dm-sans)]">Le détail complet de ce qui est inclus dans chaque plan.</p>
          </div>

          <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b border-[#1A2540] text-[#6B7A99] font-[var(--font-dm-sans)] font-medium w-1/3"></th>
                  <th className="p-4 border-b border-[#1A2540] text-[#F0F4FF] font-[var(--font-syne)] font-bold text-center w-2/9">Starter</th>
                  <th className="p-4 border-b border-[#1A2540] text-[#009460] font-[var(--font-syne)] font-bold text-center w-2/9">Pro</th>
                  <th className="p-4 border-b border-[#1A2540] text-[#F0F4FF] font-[var(--font-syne)] font-bold text-center w-2/9">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? 'bg-[#0D1320]' : 'bg-transparent'}>
                    <td className="p-4 border-b border-[#1A2540]/30 text-[#F0F4FF] font-[var(--font-dm-sans)] text-sm">{row.name}</td>
                    
                    {/* Starter */}
                    <td className="p-4 border-b border-[#1A2540]/30 text-center text-sm font-[var(--font-dm-sans)] text-[#6B7A99]">
                      {typeof row.starter === 'boolean' ? (
                        row.starter 
                          ? <span className="text-[#009460] font-bold">✓</span>
                          : <span className="text-[#CE1126] font-bold">✗</span>
                      ) : row.starter}
                    </td>

                    {/* Pro */}
                    <td className="p-4 border-b border-[#1A2540]/30 text-center text-sm font-[var(--font-dm-sans)] text-[#009460] font-medium bg-[#009460]/[0.02]">
                      {typeof row.pro === 'boolean' ? (
                        row.pro 
                          ? <span className="text-[#009460] font-bold">✓</span>
                          : <span className="text-[#CE1126] font-bold">✗</span>
                      ) : row.pro}
                    </td>

                    {/* Enterprise */}
                    <td className="p-4 border-b border-[#1A2540]/30 text-center text-sm font-[var(--font-dm-sans)] text-[#6B7A99]">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise 
                          ? <span className="text-[#009460] font-bold">✓</span>
                          : <span className="text-[#CE1126] font-bold">✗</span>
                      ) : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Tarifs */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-12"
        >
          <div className="text-center">
            <h3 className="font-[var(--font-syne)] text-3xl font-bold text-[#F0F4FF]">Questions Fréquentes</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0D1320] p-8 rounded-2xl border border-[#1A2540]">
                <h4 className="text-[#F0F4FF] font-[var(--font-syne)] font-bold text-lg mb-4">{faq.q}</h4>
                <p className="text-[#6B7A99] font-[var(--font-dm-sans)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl p-12 text-center relative overflow-hidden border border-[#009460]/30 bg-[#009460]/10"
        >
           <h3 className="relative font-[var(--font-syne)] text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-6">
             Révolutionnez la gestion de votre école
           </h3>
           <p className="relative font-[var(--font-dm-sans)] text-[#F0F4FF]/70 text-lg mb-8 max-w-xl mx-auto">
             1 mois d'essai offert. Pas de carte de crédit requise. Configuration express en 48h.
           </p>
           
           <Link href="#contact" className="relative inline-flex items-center gap-3 px-8 py-4 bg-[#009460] text-white font-[var(--font-dm-sans)] font-bold rounded-full hover:bg-[#007A4F] hover:shadow-[0_0_20px_rgba(0,148,96,0.4)] transition-all transform hover:-translate-y-1">
              Commencer l'essai gratuit 30 jours
           </Link>
        </motion.div>

      </div>
    </PageLayout>
  );
}
