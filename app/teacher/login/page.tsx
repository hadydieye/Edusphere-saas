'use client';

import { useState } from 'react';
import { Eye, EyeOff, Phone, Lock, ChevronRight, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginTeacher } from '@/lib/actions/teacher-auth';
import Logo from '@/components/Logo';

export default function TeacherLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const err = await loginTeacher(fd);
    if (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1320] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #009460 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #CE1126 0%, transparent 70%)' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="bg-[#161F32]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-inner">
                <Logo size={48} />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="font-[var(--font-syne)] text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
                <span>Espace Enseignant</span>
              </h1>
              <p className="font-[var(--font-dm-sans)] text-sm text-[#6B7A99]">Accédez à vos classes et élèves</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6B7A99] uppercase tracking-[0.2em] ml-1">Numéro de téléphone</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A99] group-focus-within:text-primary transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="6XX XX XX XX"
                    required
                    className="w-full bg-[#0D1320]/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-[var(--font-dm-sans)] text-white placeholder:text-[#6B7A99]/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:bg-[#0D1320] transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6B7A99] uppercase tracking-[0.2em] ml-1">Mot de passe</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A99] group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#0D1320]/50 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-[var(--font-dm-sans)] text-white placeholder:text-[#6B7A99]/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:bg-[#0D1320] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7A99] hover:text-white transition-colors"
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
                >
                  <p className="font-[var(--font-dm-sans)] text-xs text-danger bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-[var(--font-syne)] font-bold text-sm py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Connexion Enseignant</span>
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex justify-center gap-6 mt-12 opacity-40 grayscale grayscale-0 hover:grayscale-0 transition-all">
          <p className="font-[var(--font-dm-sans)] text-[10px] text-[#6B7A99] uppercase tracking-[0.3em]">
            Edusphère • Guinée
          </p>
        </div>
      </motion.div>
    </div>
  );
}
