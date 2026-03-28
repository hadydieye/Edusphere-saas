'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    id: 'admin',
    label: 'Admin',
    url: 'app.edusphere.gn/admin',
    content: (
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { color: '#CE1126', label: 'Écoles', val: '14' },
            { color: '#FCD116', label: 'Élèves', val: '2 481' },
            { color: '#009460', label: 'Profs', val: '124' },
            { color: '#CE1126', label: 'Classes', val: '68' },
          ].map((m) => (
            <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: `${m.color}12`, border: `1px solid ${m.color}25` }}>
              <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">{m.label}</p>
              <p className="text-lg font-bold text-white font-[var(--font-syne)]">{m.val}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3">Liste des établissements</p>
          {['Lycée Horizon — Labé', 'Collège Excellence — Kindia', 'École Fraternité — Conakry', 'Institut Avenir — Kankan'].map((school) => (
            <div key={school} className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-xs text-white/70">🏫 {school}</span>
              <span className="text-[10px] text-[#009460] font-bold">Actif</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[9px] text-white/40 uppercase mb-2">Revenus / mois</p>
            <p className="text-base font-bold text-[#FCD116] font-[var(--font-syne)]">8 400 000 <span className="text-xs text-white/30">GNF</span></p>
          </div>
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[9px] text-white/40 uppercase mb-2">Taux de paiement</p>
            <p className="text-base font-bold text-[#009460] font-[var(--font-syne)]">87%</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'teacher',
    label: 'Enseignant',
    url: 'app.edusphere.gn/enseignant',
    content: (
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-bold text-white font-[var(--font-syne)]">Classe 3ème A — Mathématiques</p>
            <p className="text-[10px] text-white/40">28 élèves · Semestre 2</p>
          </div>
          <button className="text-[10px] font-bold bg-[#CE1126] text-white px-3 py-1.5 rounded-lg">+ Saisir</button>
        </div>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="grid grid-cols-3 bg-white/5 px-4 py-2">
            <span className="text-[9px] text-white/40 uppercase tracking-wider">Élève</span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider text-center">Note</span>
            <span className="text-[9px] text-white/40 uppercase tracking-wider text-right">Statut</span>
          </div>
          {[
            { name: 'Aissatou Bah', note: '18.5', status: 'excellent' },
            { name: 'Mamadou Sylla', note: '14.0', status: 'bien' },
            { name: 'Fatoumata Camara', note: '11.5', status: 'moyen' },
            { name: 'Ibrahima Barry', note: '16.0', status: 'bien' },
            { name: 'Djenab Diallo', note: '9.5', status: 'insuffisant' },
          ].map((s) => (
            <div key={s.name} className="grid grid-cols-3 px-4 py-2.5 border-t border-white/5">
              <span className="text-xs text-white/70">{s.name}</span>
              <span className="text-xs font-bold text-[#FCD116] text-center">{s.note}/20</span>
              <span className={`text-[9px] font-bold text-right ${s.status === 'excellent' ? 'text-[#009460]' : s.status === 'insuffisant' ? 'text-[#CE1126]' : 'text-white/50'}`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {['Absences', 'Bulletins PDF', 'SMS Parents'].map((btn) => (
            <button key={btn} className="flex-1 text-[10px] font-bold py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'parent',
    label: 'Parent',
    url: 'app.edusphere.gn/parent',
    content: (
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-10 h-10 rounded-full bg-[#009460]/20 flex items-center justify-center font-bold text-[#009460] text-sm">AB</div>
          <div>
            <p className="text-sm font-bold text-white font-[var(--font-syne)]">Aissatou Bah</p>
            <p className="text-[10px] text-white/40">3ème A · Collège Excellence · Kindia</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-lg font-bold text-[#009460] font-[var(--font-syne)]">16.8</p>
            <p className="text-[9px] text-white/40">Moyenne</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Dernières notes</p>
          {[
            { matiere: 'Mathématiques', note: '18.5', prof: 'M. Soumah' },
            { matiere: 'Français', note: '15.0', prof: 'Mme Diallo' },
            { matiere: 'Sciences', note: '17.0', prof: 'M. Bah' },
          ].map((n) => (
            <div key={n.matiere} className="flex justify-between items-center py-2 border-b border-white/5">
              <div>
                <p className="text-xs text-white/70 font-medium">{n.matiere}</p>
                <p className="text-[9px] text-white/30">{n.prof}</p>
              </div>
              <span className="text-sm font-bold text-[#FCD116] font-[var(--font-syne)]">{n.note}/20</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(0,148,96,0.1)', border: '1px solid rgba(0,148,96,0.2)' }}>
            <p className="text-[9px] text-white/40 mb-1">Absences</p>
            <p className="text-xl font-bold text-[#009460] font-[var(--font-syne)]">0</p>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(252,209,22,0.08)', border: '1px solid rgba(252,209,22,0.2)' }}>
            <p className="text-[9px] text-white/40 mb-1">Paiement</p>
            <p className="text-xl font-bold text-[#FCD116] font-[var(--font-syne)]">✓</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function MockupTabs() {
  const [activeTab, setActiveTab] = useState('admin');

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="relative bg-[#0D1320] py-28 border-t border-[#1A2540] overflow-hidden">
      {/* Radial gradient bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(0,148,96,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 space-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-[var(--font-syne)] text-3xl md:text-5xl font-extrabold text-[#F0F4FF]"
          >
            Trois espaces, une{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #CE1126, #FCD116)' }}
            >
              plateforme
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-[var(--font-dm-sans)] text-[#6B7A99] text-lg"
          >
            Chaque profil dispose de son expérience sur mesure.
          </motion.p>
        </div>

        {/* Tabs pills */}
        <div className="flex justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.95 }}
              className={`relative font-[var(--font-dm-sans)] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#CE1126] text-white shadow-[0_0_20px_rgba(206,17,38,0.35)]'
                  : 'border border-white/20 text-[#6B7A99] hover:bg-white/5 hover:text-[#F0F4FF]'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Browser frame with tab content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          {/* Browser bar */}
          <div className="bg-[#1A2540] h-11 flex items-center px-4 gap-3 border-b border-white/5">
            <div className="flex gap-1.5">
              {['#CE1126', '#FCD116', '#009460'].map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="flex-1 bg-black/30 rounded-md h-6 flex items-center px-3">
              <span className="text-[10px] text-white/40 font-mono">{current.url}</span>
            </div>
          </div>

          {/* Tab content */}
          <div className="bg-[#0D1320] min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {current.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
