'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { name: 'Fonctionnalités', href: '#features' },
  { name: 'Tarifs', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 backdrop-blur-xl bg-[#06090F]/85 border-b border-[#1A2540] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group select-none">
            <span className="font-[var(--font-syne)] text-2xl font-extrabold text-[#F0F4FF] tracking-tight leading-none">
              Edusphère
            </span>
            <motion.span
              className="text-xl"
              whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              🇬🇳
            </motion.span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-[var(--font-dm-sans)] text-sm font-medium text-[#6B7A99] hover:text-[#F0F4FF] transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#CE1126] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/parent/login"
              className="font-[var(--font-dm-sans)] text-sm font-medium text-[#6B7A99] hover:text-[#F0F4FF] transition-colors"
            >
              Espace Parents
            </Link>
            <Link
              href="/school-admin/login"
              className="font-[var(--font-dm-sans)] text-sm font-bold text-[#F0F4FF] hover:text-[#CE1126] transition-colors"
            >
              Portail École
            </Link>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(206,17,38,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden bg-[#CE1126] text-white font-[var(--font-dm-sans)] text-sm font-bold px-6 py-2.5 rounded-full group"
            >
              <span className="relative z-10">Besoin d&apos;aide ?</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 text-[#F0F4FF]"
            onClick={() => setMobileMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
            aria-label="Ouvrir le menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 right-0 z-[60] w-full max-w-sm bg-[#06090F] border-l border-[#1A2540] flex flex-col"
            >
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#1A2540]">
                <span className="font-[var(--font-syne)] text-xl font-extrabold text-[#F0F4FF]">
                  Edusphère 🇬🇳
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#1A2540] text-[#6B7A99] hover:text-[#F0F4FF] transition-colors"
                  aria-label="Fermer le menu"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-4 rounded-xl font-[var(--font-syne)] text-lg font-bold text-[#F0F4FF] hover:bg-white/5 hover:text-[#FCD116] transition-all"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-6 border-t border-[#1A2540] space-y-3">
                <Link href="/parent/login" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-white/5 border border-white/10 text-white font-[var(--font-dm-sans)] text-base font-bold px-6 py-4 rounded-full transition-colors"
                  >
                    Espace Parents
                  </motion.button>
                </Link>
                <Link href="/school-admin/login" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full border border-white/10 text-white font-[var(--font-dm-sans)] text-base font-bold px-6 py-4 rounded-full transition-colors"
                  >
                    Portail École
                  </motion.button>
                </Link>
                <a href="https://wa.me/224621000000" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-[#CE1126] text-white font-[var(--font-dm-sans)] text-base font-bold px-6 py-4 rounded-full shadow-[0_0_30px_rgba(206,17,38,0.3)]"
                  >
                    Contacter l&apos;équipe
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
