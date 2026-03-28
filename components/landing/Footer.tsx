import Link from 'next/link';

const columns = [
  {
    title: 'Produit',
    links: ['Fonctionnalités', 'Tarifs', 'Sécurité', 'Roadmap'],
  },
  {
    title: 'Légal',
    links: ['Mentions légales', 'Politique de confidentialité', 'CGU'],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#040608] border-t-0 overflow-hidden">
      {/* Guinea tricolor top bar */}
      <div className="h-[3px] flex">
        <div className="flex-1 bg-[#CE1126]" />
        <div className="flex-1 bg-[#FCD116]" />
        <div className="flex-1 bg-[#009460]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2">
              <span className="font-[var(--font-syne)] text-2xl font-extrabold text-[#F0F4FF]">
                Edusphère
              </span>
              <span className="text-xl">🇬🇳</span>
            </div>
            <p className="font-[var(--font-dm-sans)] text-[#6B7A99] text-sm leading-relaxed">
              La plateforme de gestion scolaire nouvelle génération, conçue pour la Guinée.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              {[
                { label: 'WhatsApp', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.855L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.369l-.359-.213-3.724.977.997-3.642-.235-.374A9.818 9.818 0 1112 21.818z" />
                  </svg>
                )},
                { label: 'Facebook', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )},
                { label: 'LinkedIn', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )},
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6B7A99] hover:text-[#F0F4FF] transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 & 3 — Links */}
          {columns.map((col) => (
            <div key={col.title} className="space-y-5">
              <h4 className="font-[var(--font-syne)] text-sm font-bold text-[#F0F4FF] uppercase tracking-widest">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="font-[var(--font-dm-sans)] text-sm text-[#6B7A99] hover:text-[#F0F4FF] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Col 4 — Contact */}
          <div id="contact" className="space-y-5">
            <h4 className="font-[var(--font-syne)] text-sm font-bold text-[#F0F4FF] uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
              {[
                { icon: '✉️', text: 'contact@edusphere.gn' },
                { icon: '💬', text: 'WhatsApp : +224 XXX XXX XXX' },
                { icon: '📍', text: 'Conakry, Guinée' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="text-base">{icon}</span>
                  <span className="font-[var(--font-dm-sans)] text-sm text-[#6B7A99]">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#1A2540] text-center">
          <p className="font-[var(--font-dm-sans)] text-[#6B7A99] text-sm">
            © 2026 Edusphère · Conakry, Guinée 🇬🇳 · Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
