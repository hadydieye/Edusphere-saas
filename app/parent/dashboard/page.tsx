'use server';

import { getParentStudents } from '@/lib/actions/parent-auth';
import { LayoutDashboard, GraduationCap, Calendar, CreditCard, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';
import { logoutParent } from '@/lib/actions/parent-auth';

export default async function ParentDashboardPage() {
  const children = await getParentStudents();

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div>
              <h1 className="font-display font-bold text-text">Mon Espace</h1>
              <p className="font-body text-[10px] text-muted uppercase tracking-wider">{children.length} enfant{children.length > 1 ? 's' : ''} inscrit{children.length > 1 ? 's' : ''}</p>
            </div>
          </div>
          <form action={logoutParent}>
            <button className="text-xs font-body text-danger px-3 py-1.5 rounded-lg hover:bg-danger/5 transition-colors">Déconnexion</button>
          </form>
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <section className="py-4">
          <h2 className="font-display text-2xl font-bold text-text">Bienvenue 👋</h2>
          <p className="font-body text-sm text-muted mt-1">Retrouvez ici toutes les informations de vos enfants.</p>
        </section>

        {/* Children List */}
        <section className="space-y-4">
          {children.length === 0 ? (
            <div className="bg-surface border border-border rounded-3xl p-8 text-center space-y-3">
              <p className="font-body text-sm text-muted">Aucun enfant trouvé pour ce numéro.</p>
            </div>
          ) : (
            children.map((child: any) => (
              <Link 
                key={child.id} 
                href={`/parent/student/${child.id}`}
                className="block group"
              >
                <div className="bg-surface border border-border rounded-3xl p-5 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden">
                  {/* Glass background decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors" />

                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold ${
                        child.gender === 'female' ? 'bg-pink-500/10 text-pink-500' : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {child.first_name[0]}{child.last_name[0]}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-text group-hover:text-primary transition-colors">
                          {child.first_name} {child.last_name}
                        </h3>
                        <p className="font-body text-xs text-muted flex items-center gap-1.5">
                          <GraduationCap size={14} className="text-primary" />
                          {child.classes?.name || 'Classe non assignée'}
                        </p>
                        <p className="font-body text-[10px] text-muted/60">
                          {child.school?.name}
                        </p>
                      </div>
                    </div>
                    <div className="bg-bg p-2 rounded-xl text-muted group-hover:text-primary group-hover:bg-primary/5 transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <div className="bg-bg/50 rounded-2xl p-3 text-center border border-border/50">
                      <p className="text-[10px] font-body text-muted uppercase tracking-tighter mb-1">Moyenne</p>
                      <p className="font-display font-bold text-text">--/20</p>
                    </div>
                    <div className="bg-bg/50 rounded-2xl p-3 text-center border border-border/50">
                      <p className="text-[10px] font-body text-muted uppercase tracking-tighter mb-1">Absences</p>
                      <p className="font-display font-bold text-text">0</p>
                    </div>
                    <div className={`rounded-2xl p-3 text-center border ${
                      child.status === 'active' ? 'bg-success/5 border-success/20' : 'bg-danger/5 border-danger/20'
                    }`}>
                      <p className="text-[10px] font-body text-muted uppercase tracking-tighter mb-1">Statut</p>
                      <p className={`font-display font-bold ${
                        child.status === 'active' ? 'text-success' : 'text-danger'
                      }`}>
                        {child.status === 'active' ? 'Actif' : 'Inactif'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </section>

        {/* Action Quick Links */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface border border-border rounded-3xl p-4 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Calendar size={20} />
            </div>
            <p className="font-display text-xs font-bold text-text">Calendrier</p>
          </div>
          <div className="bg-surface border border-border rounded-3xl p-4 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
              <CreditCard size={20} />
            </div>
            <p className="font-display text-xs font-bold text-text">Paiements</p>
          </div>
        </section>
      </main>

      {/* Floating Bottom Nav (Mobile style) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full h-16 shadow-2xl z-50 flex items-center justify-around px-8">
        <Link href="/parent/dashboard" className="text-primary p-2">
          <LayoutDashboard size={24} />
        </Link>
        <div className="text-white/40 p-2 cursor-not-allowed">
          <Calendar size={24} />
        </div>
        <div className="text-white/40 p-2 cursor-not-allowed">
          <CreditCard size={24} />
        </div>
        <div className="text-white/40 p-2 cursor-not-allowed">
          <User size={24} />
        </div>
      </nav>
      {/* Background glass overlay for bottom nav blur enhancement */}
      <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none z-40" />
    </div>
  );
}
