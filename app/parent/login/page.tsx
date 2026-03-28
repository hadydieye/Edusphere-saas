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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10 space-y-4">
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Logo size={48} />
            </motion.div>
          </div>
          <div className="space-y-1">
            <h1 className="font-display text-2xl font-bold tracking-tight text-text">Espace Parents</h1>
            <p className="font-body text-sm text-muted">Suivez la scolarité de vos enfants</p>
          </div>
        </div>

        <div className="bg-surface/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl shadow-primary/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {/* Phone Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider ml-1">Numéro de téléphone</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="ex: 620 00 00 00"
                    required
                    className="w-full bg-bg/50 border border-border rounded-2xl pl-12 pr-4 py-3.5 text-sm font-body text-text placeholder:text-muted/50 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider ml-1">Mot de passe</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    className="w-full bg-bg/50 border border-border rounded-2xl pl-12 pr-12 py-3.5 text-sm font-body text-text placeholder:text-muted/50 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-xs text-danger bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-danger animate-pulse" />
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-display font-bold text-sm py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                <>
                  <span>Accéder à mon espace</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-8 font-body text-xs text-muted">
          Besoin d'aide ? Contactez l'administration de votre école.
        </p>
      </motion.div>
    </div>
  );
}
