'use client';

import PageLayout from '@/components/landing/PageLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';

const modules = [
  {
    id: 1,
    icon: '📚',
    title: 'Gestion des classes & élèves',
    badge: null,
    description: "Une vue d'ensemble centralisée sur votre établissement. Gérez vos effectifs, suivez les parcours scolaires et accédez instantanément aux dossiers des élèves avec une fluidité absolue.",
    features: [
      'Inscriptions et réinscriptions en ligne',
      'Gestion des niveaux et filières',
      'Transferts inter-établissements',
      'Fiches élèves complètes (photo, tuteur, contacts)',
      'Export liste classe en PDF/Excel'
    ],
  },
  {
    id: 2,
    icon: '📊',
    title: 'Notes & Bulletins PDF',
    badge: { text: 'OFFLINE FIRST', color: 'border-[#FCD116]' },
    description: "Fini les calculs manuels à la fin du trimestre. Les enseignants saisissent les notes (même hors ligne), et Edusphère génère instantanément des bulletins professionnels aux normes guinéennes.",
    features: [
      'Saisie des notes par matière et trimestre',
      'Calcul automatique des moyennes et rangs',
      'Génération bulletins PDF personnalisés',
      'Historique complet sur 5 ans',
      'Fonctionne sans connexion internet'
    ],
  },
  {
    id: 3,
    icon: '👨‍👩‍👧‍👦',
    title: 'Espace Parents',
    badge: null,
    description: "Impliquez les parents dans la réussite de leurs enfants. Un portail dédié leur permet de suivre la scolarité en temps réel et de communiquer directement avec l'établissement.",
    features: [
      'Consultation des notes en temps réel',
      'Suivi des absences et retards',
      'Paiement des frais via Mobile Money',
      'Messagerie avec les professeurs',
      'Notifications push et SMS'
    ],
  },
  {
    id: 4,
    icon: '📱',
    title: 'Notifications SMS',
    badge: { text: 'GUINÉE-READY', color: 'border-[#CE1126]' },
    description: "Atteignez 100% des parents, même sans smartphone ou forfait data actif. Les SMS critiques sont distribués instantanément sur tout le territoire guinéen.",
    features: [
      'Alertes absences automatiques',
      'Rappels paiements scolarité',
      'Convocations et réunions parents',
      'Résultats de délibérations',
      'Fonctionne sans data internet'
    ],
  },
  {
    id: 5,
    icon: '💳',
    title: 'Mobile Money intégré',
    badge: null,
    description: "Simplifiez le recouvrement des frais de scolarité. Permettez aux parents de payer facilement via les principaux opérateurs mobiles guinéens, avec réconciliation automatique.",
    features: [
      'Orange Money et MTN MoMo',
      'Reçus automatiques par SMS',
      'Tableau de bord paiements temps réel',
      'Aucune commission pour l\'école',
      'Historique des transactions complet'
    ],
  },
  {
    id: 6,
    icon: '🛡️',
    title: 'Sécurité & Audit',
    badge: null,
    description: "Vos données scolaires constituent votre capital le plus précieux. Notre architecture garantit une protection absolue et une traçabilité totale des actions de votre personnel.",
    features: [
      'Isolation totale des données par école',
      'Chiffrement AES-256',
      'Journal d\'audit de chaque action',
      'Sauvegardes automatiques quotidiennes',
      'Conformité RGPD'
    ],
  }
];

export default function FeaturesPage() {
  return (
    <PageLayout
      title="Tout ce dont votre école a besoin"
      subtitle="Chaque module est conçu pour la réalité guinéenne"
      badge="FONCTIONNALITÉS"
    >
      <div className="space-y-32">
        {modules.map((mod, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Illustration Block (pour l'instant une carte symbolique) */}
              <div className="flex-1 w-full">
                <div className="aspect-square md:aspect-[4/3] rounded-3xl relative overflow-hidden group border border-[#1A2540] bg-[#0D1320] flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(206,17,38,0.05)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(206,17,38,0.1)_0%,transparent_70%)] transition-colors duration-500" />
                  
                  {/* Icon Block */}
                  <div className="w-32 h-32 rounded-2xl bg-[rgba(206,17,38,0.10)] border border-[rgba(206,17,38,0.2)] flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(206,17,38,0.15)] group-hover:scale-105 transition-transform duration-500">
                    {mod.icon}
                  </div>
                </div>
              </div>

              {/* Text Block */}
              <div className="flex-1 space-y-6">
                {mod.badge && (
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-[var(--font-dm-sans)] tracking-widest border border-dashed ${mod.badge.color} text-[#F0F4FF] opacity-80`}>
                    {mod.badge.text}
                  </span>
                )}
                
                <h2 className="font-[var(--font-syne)] text-3xl md:text-4xl font-bold text-[#F0F4FF]">
                  {mod.title}
                </h2>
                
                <p className="font-[var(--font-dm-sans)] text-[#6B7A99] text-lg leading-relaxed">
                  {mod.description}
                </p>

                <ul className="space-y-4 pt-4">
                  {mod.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#009460]/20 flex items-center justify-center border border-[#009460]/50">
                        <svg className="w-3 h-3 text-[#009460]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-[var(--font-dm-sans)] text-[#F0F4FF]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}

        {/* Call to action final */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-32 rounded-3xl p-12 text-center relative overflow-hidden border border-[#1A2540] bg-[#0D1320]"
        >
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at top, #CE1126 0%, transparent 40%), radial-gradient(circle at bottom right, #009460 0%, transparent 40%)' }} />
           
           <h3 className="relative font-[var(--font-syne)] text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-6">
             Prêt à démarrer ?
           </h3>
           <p className="relative font-[var(--font-dm-sans)] text-[#6B7A99] text-lg mb-8 max-w-xl mx-auto">
             Prenez le contrôle de votre établissement scolaire dès aujourd'hui avec la solution N°1 en Guinée.
           </p>
           
           <Link href="#contact" className="relative cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-[#CE1126] text-white font-[var(--font-dm-sans)] font-bold rounded-full hover:bg-[#A80D1E] hover:shadow-[0_0_20px_rgba(206,17,38,0.4)] transition-all duration-300 transform hover:-translate-y-1">
              Contacter l'équipe
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
           </Link>
        </motion.div>
      </div>
    </PageLayout>
  );
}
