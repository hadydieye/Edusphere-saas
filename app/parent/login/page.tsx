'use client';

import { useState } from 'react';
import { Eye, EyeOff, Phone, Lock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginParent } from '@/lib/actions/parent-auth';
import Logo from '@/components/Logo';

export default function ParentLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const err = await loginParent(fd);
    if (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-surface border border-border rounded-2xl p-8 space-y-6 shadow-xl">
          <div className="text-center space-y-1">
            <div className="flex justify-center mb-1">
              <Logo size={40} />
            </div>
            <h1 className="font-display text-xl font-bold tracking-tight text-text">Espace Parents</h1>
            <p className="font-body text-sm text-muted">Connectez-vous à la scolarité</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* Phone Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Téléphone</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                    <Phone size={16} />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="6XX XX XX XX"
                    required
                    className="w-full bg-bg border border-border rounded-xl pl-11 pr-4 py-3 text-sm font-body text-text placeholder:text-muted/50 outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Mot de passe</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                    <Lock size={16} />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    className="w-full bg-bg border border-border rounded-xl pl-11 pr-11 py-3 text-sm font-body text-text placeholder:text-muted/50 outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="font-body text-[11px] text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-display font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Accéder à mon espace</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 font-body text-[10px] text-muted uppercase tracking-tighter">
          Edusphère • Plateforme de Gestion Scolaire
        </p>
      </motion.div>
    </div>
  );
}
