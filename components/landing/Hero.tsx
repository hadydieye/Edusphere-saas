'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number }[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fill();

        particles.forEach((q) => {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.07 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const schools = useCountUp(120, 2000, statsVisible);
  const students = useCountUp(15000, 2200, statsVisible);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen pt-28 pb-24 overflow-hidden flex items-center">
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(206,17,38,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(252,209,22,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* LEFT — Text */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full relative overflow-hidden cursor-default"
              style={{
                background: 'linear-gradient(135deg, rgba(206,17,38,0.12), rgba(252,209,22,0.08), rgba(0,148,96,0.12))',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />
              <span className="relative z-10 text-xs font-bold tracking-widest text-[#FCD116] flex items-center gap-2 font-[var(--font-dm-sans)]">
                🇬🇳 Conçu pour la réalité guinéenne
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-syne)] text-[2.5rem] md:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.05] text-[#F0F4FF]"
            >
              La gestion scolaire{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #CE1126, #FCD116)' }}
              >
                réinventée
              </span>{' '}
              pour la Guinée
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-[var(--font-dm-sans)] text-lg md:text-xl text-[#6B7A99] leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Edusphère unifie élèves, enseignants et parents dans un seul outil pensé pour fonctionner
              même sans connexion stable.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/school-admin/login">
                <motion.button
                  whileHover={{ scale: 1.05, filter: 'brightness(1.12)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto relative overflow-hidden bg-[#CE1126] text-white font-[var(--font-dm-sans)] font-bold px-10 py-4 rounded-full shadow-[0_0_40px_rgba(206,17,38,0.3)] group"
                >
                  <span className="relative z-10">Accéder au Dashboard</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '150%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </Link>
              <a href="https://wa.me/224621000000" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto border border-white/20 text-[#F0F4FF] font-[var(--font-dm-sans)] font-bold px-10 py-4 rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <span>Contacter l&apos;équipe</span>
                  <span className="text-xl">💬</span>
                </motion.button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62 }}
              className="pt-10 grid grid-cols-3 gap-4 border-t border-white/5"
            >
              {[
                { value: `${schools}+`, label: 'Écoles' },
                { value: `${(students / 1000).toFixed(0)} 000+`, label: 'Élèves' },
                { value: '99%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-[var(--font-syne)] text-2xl lg:text-3xl font-extrabold text-[#F0F4FF] tabular-nums">
                    {stat.value}
                  </p>
                  <p className="font-[var(--font-dm-sans)] text-xs uppercase tracking-widest text-[#6B7A99] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 48, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 1 }}
            transition={{ delay: 0.5, duration: 0.9, type: 'spring', stiffness: 90 }}
            className="relative hidden lg:block"
          >
            {/* Floating decorations */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -right-10 z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-xl"
              style={{ background: 'rgba(252,209,22,0.12)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
            >
              📊
            </motion.div>
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-8 -left-10 z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-xl"
              style={{ background: 'rgba(0,148,96,0.12)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
            >
              ✅
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 -left-14 z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-xl"
              style={{ background: 'rgba(206,17,38,0.12)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
            >
              💬
            </motion.div>

            {/* Browser frame */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 40px 120px rgba(206,17,38,0.22)' }}
            >
              {/* Top bar */}
              <div className="bg-[#1A2540] h-10 flex items-center px-4 gap-3">
                <div className="flex gap-1.5">
                  {['#CE1126', '#FCD116', '#009460'].map((c) => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="flex-1 bg-black/30 rounded-md h-6 flex items-center px-3">
                  <span className="text-[10px] text-white/40 font-mono">app.edusphere.gn</span>
                </div>
              </div>

              {/* Dashboard content */}
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-[#0D1320] p-6 space-y-5"
                style={{ aspectRatio: '16/10' }}
              >
                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { color: '#CE1126', label: 'Élèves', val: '1 247' },
                    { color: '#FCD116', label: 'Classes', val: '38' },
                    { color: '#009460', label: 'Profs', val: '64' },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl p-3" style={{ background: `${m.color}12`, border: `1px solid ${m.color}25` }}>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{m.label}</p>
                      <p className="text-xl font-bold text-white font-[var(--font-syne)]">{m.val}</p>
                    </div>
                  ))}
                </div>
                {/* Chart bars */}
                <div className="rounded-xl p-3 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Notes moyennes — 2025–2026</p>
                  <div className="flex items-end gap-2 h-14">
                    {[65, 80, 72, 90, 78, 85, 70, 88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? '#CE1126' : i % 3 === 1 ? '#FCD116' : '#009460', opacity: 0.7 }} />
                    ))}
                  </div>
                </div>
                {/* Recent activity */}
                <div className="space-y-2">
                  {[
                    { name: 'Amadou Barry', grade: '16.5/20', class: 'Terminale A' },
                    { name: 'Mariama Diallo', grade: '18/20', class: '3ème B' },
                    { name: 'Ibrahim Camara', grade: '14/20', class: '5ème C' },
                  ].map((s) => (
                    <div key={s.name} className="flex justify-between items-center py-1.5 border-b border-white/5">
                      <div>
                        <p className="text-xs text-white/70 font-medium">{s.name}</p>
                        <p className="text-[10px] text-white/30">{s.class}</p>
                      </div>
                      <span className="text-xs font-bold text-[#009460]">{s.grade}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
