'use client';

import PageLayout from '@/components/landing/PageLayout';
import { motion } from 'framer-motion';

const securityBlocks = [
  {
    title: 'Isolation multi-tenant',
    icon: '🏛️',
    color: '#CE1126',
    items: [
      'Chaque école est un tenant isolé',
      'Aucun accès croisé entre établissements possible',
      'Row Level Security (RLS) Supabase actif sur chaque table de la base de données'
    ]
  },
  {
    title: 'Chiffrement de bout en bout',
    icon: '🔐',
    color: '#009460',
    items: [
      'Données chiffrées au repos (AES-256) et en transit',
      'Certificats HTTPS/TLS 1.3 sur toutes les connexions',
      'Mots de passe hachés cryptographiquement (bcrypt)'
    ]
  },
  {
    title: 'Audit & Traçabilité tactique',
    icon: '📋',
    color: '#FCD116',
    items: [
      'Chaque action est enregistrée : qui, quoi, quand (IP, timestamp, ID utilisateur)',
      'Détection automatique des modifications suspectes (ex: notes changées à 2h du matin)',
      'Export complet du journal d\'audit en CSV pour la direction'
    ]
  },
  {
    title: 'Sauvegardes automatiques',
    icon: '💾',
    color: '#4B6BFB', // Bleu tech pour contraster légèrement
    items: [
      'Sauvegardes automatiques incrémentales toutes les 24h',
      'Rétention garantie sur 30 jours glissants',
      'Restauration possible et granulaire à tout moment par l\'équipe support'
    ]
  }
];

export default function SecurityPage() {
  return (
    <PageLayout
      title="Vos données sont entre de bonnes mains"
      subtitle="Une architecture cloud de niveau entreprise, conçue pour protéger les informations de chaque école individuellement."
      badge="SÉCURITÉ"
    >
      <div className="space-y-24">
        
        <div className="grid md:grid-cols-2 gap-8">
          {securityBlocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#0D1320] rounded-3xl p-8 border border-[#1A2540] hover:border-[#FCD116]/30 transition-colors duration-300 relative overflow-hidden group"
            >
              {/* Subtle background glow based on icon color */}
              <div 
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: block.color }}
              />

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 border"
                   style={{ backgroundColor: `${block.color}15`, borderColor: `${block.color}30` }}>
                {block.icon}
              </div>

              <h3 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF] mb-6">
                {block.title}
              </h3>

              <ul className="space-y-4">
                {block.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: block.color }} />
                    <span className="font-[var(--font-dm-sans)] text-[#6B7A99] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* RGPD Compliance Badge Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl p-10 bg-gradient-to-br from-[#0D1320] to-[#0A0E17] border border-[#009460]/30 relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          
          <div className="w-24 h-24 flex-shrink-0 rounded-full bg-[#009460]/10 border border-[#009460]/30 flex items-center justify-center relative z-10">
            <svg className="w-12 h-12 text-[#009460]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          <div className="relative z-10 flex-1 text-center md:text-left">
            <h3 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF] mb-2">Conforme aux standards RGPD</h3>
            <p className="font-[var(--font-dm-sans)] text-[#6B7A99] mb-4">
              Bien que basée en Guinée, Edusphère applique les principes de la réglementation européenne sur la protection des données appliqués au milieu scolaire.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {['Droit à l\'oubli', 'Portabilité des données', 'Consentement transparent', 'Privacy by design'].map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#009460]/10 text-[#009460] text-xs font-bold font-[var(--font-dm-sans)] border border-[#009460]/20">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </PageLayout>
  );
}
