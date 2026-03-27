import Link from 'next/link';
import Logo from '@/components/Logo';

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconCheck = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-success shrink-0">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '🏫',
    title: 'Gestion des établissements',
    desc: 'Centralisez toutes vos écoles, leurs administrateurs et leurs données en un seul endroit.',
  },
  {
    icon: '👨‍🎓',
    title: 'Suivi des élèves',
    desc: 'Inscriptions, notes, absences et bulletins — tout est accessible en temps réel.',
  },
  {
    icon: '💰',
    title: 'Gestion des frais scolaires',
    desc: 'Collectez et suivez les paiements en GNF avec des reçus automatiques.',
  },
  {
    icon: '📊',
    title: 'Tableaux de bord',
    desc: 'Des statistiques claires pour les directeurs et les administrateurs régionaux.',
  },
  {
    icon: '📱',
    title: 'Accessible partout',
    desc: 'Fonctionne sur mobile, tablette et ordinateur — même avec une connexion limitée.',
  },
  {
    icon: '🔒',
    title: 'Sécurité des données',
    desc: 'Vos données sont chiffrées et hébergées de manière sécurisée, conformément aux standards internationaux.',
  },
];

const PLANS = [
  {
    name: 'Starter',
    price: '150 000',
    desc: 'Idéal pour les petits établissements',
    features: ["Jusqu'à 500 élèves", '2 administrateurs', 'Gestion des notes', 'Support email'],
    cta: 'Commencer gratuitement',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '400 000',
    desc: 'Pour les établissements en croissance',
    features: ["Jusqu'à 2 000 élèves", '10 administrateurs', 'Gestion des paiements', 'Support prioritaire', 'Rapports avancés'],
    cta: 'Essayer 30 jours gratuits',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '900 000',
    desc: 'Pour les réseaux d\'établissements',
    features: ['Élèves illimités', 'Admins illimités', 'API dédiée', 'Gestionnaire de compte', 'SLA garanti'],
    cta: 'Contacter les ventes',
    highlight: false,
  },
];

const STATS = [
  { value: '120+', label: 'Écoles partenaires' },
  { value: '45 000+', label: 'Élèves gérés' },
  { value: '8', label: 'Régions couvertes' },
  { value: '99.9%', label: 'Disponibilité' },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 backdrop-blur-md" style={{ background: 'rgba(8,12,20,0.85)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-display text-lg font-bold text-primary">Edusphère</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Fonctionnalités', 'Tarifs', 'À propos'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace('à ', '').replace(' ', '-')}`} className="font-body text-sm text-muted hover:text-text transition-colors">
              {item}
            </a>
          ))}
        </div>
        <Link
          href="/super-admin/login"
          className="font-body text-sm font-medium px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white transition-colors"
        >
          Connexion
        </Link>
      </div>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="font-body text-xs text-primary">Disponible en Guinée Conakry</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
            La plateforme numérique<br />
            <span className="text-primary">des écoles guinéennes</span>
          </h1>

          <p className="font-body text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Edusphère centralise la gestion de vos établissements scolaires — élèves, notes, paiements et communication — dans une seule plateforme simple et accessible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#tarifs"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-display font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Démarrer gratuitement
              <IconArrow />
            </a>
            <a
              href="#fonctionnalités"
              className="font-body text-sm text-muted hover:text-text border border-border hover:border-muted px-6 py-3 rounded-xl transition-colors"
            >
              Voir les fonctionnalités
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 px-6 border-y border-border/60">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center space-y-1">
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="font-body text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="fonctionnalités" className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl font-bold text-text">Tout ce dont votre école a besoin</h2>
            <p className="font-body text-muted max-w-xl mx-auto">Conçu pour les réalités du terrain guinéen — simple, rapide et fiable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-surface border border-border rounded-2xl p-6 space-y-3 hover:border-primary/40 transition-colors">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-display text-base font-semibold text-text">{f.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="tarifs" className="py-24 px-6 bg-surface/40">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl font-bold text-text">Des tarifs adaptés à chaque établissement</h2>
            <p className="font-body text-muted">Prix en Francs Guinéens (GNF) · par mois</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-surface rounded-2xl p-6 space-y-6 flex flex-col ${
                  plan.highlight
                    ? 'border-2 border-primary shadow-lg shadow-primary/10'
                    : 'border border-border'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white font-body text-xs font-semibold px-3 py-1 rounded-full">
                    Populaire
                  </div>
                )}
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-text">{plan.name}</h3>
                  <p className="font-body text-xs text-muted">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-text">{plan.price}</span>
                  <span className="font-body text-sm text-muted">GNF/mois</span>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <IconCheck />
                      <span className="font-body text-sm text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center font-display font-semibold text-sm py-3 rounded-xl transition-colors ${
                    plan.highlight
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'border border-border hover:border-muted text-muted hover:text-text'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl font-bold text-text">
            Prêt à moderniser votre école ?
          </h2>
          <p className="font-body text-muted leading-relaxed">
            Rejoignez les établissements guinéens qui font confiance à Edusphère. Démarrez avec 30 jours d'essai gratuit, sans carte bancaire.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full sm:w-auto sm:min-w-[260px] bg-surface border border-border rounded-xl px-4 py-3 text-sm font-body text-text placeholder:text-muted outline-none focus:border-accent transition-colors"
            />
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-display font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
              Demander une démo
              <IconArrow />
            </button>
          </div>
          <p className="font-body text-xs text-muted">Nous vous répondons sous 24h.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <span className="font-display text-sm font-bold text-primary">Edusphère</span>
          </div>
          <p className="font-body text-xs text-muted">© 2026 Edusphère · Conakry, Guinée · Tous droits réservés</p>
          <Link href="/super-admin/login" className="font-body text-xs text-muted hover:text-text transition-colors">
            Accès administrateur
          </Link>
        </div>
      </footer>
    </div>
  );
}
