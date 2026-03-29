import { getTeacherProfile } from '@/lib/actions/teacher-auth';
import { 
  Users, 
  BookOpen, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default async function TeacherDashboard() {
  const teacher = await getTeacherProfile();

  if (!teacher) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="font-[var(--font-syne)] text-3xl font-extrabold text-white">
          Bienvenue, <span className="text-primary italic">M. {teacher.last_name}</span> 👋
        </h1>
        <p className="font-[var(--font-dm-sans)] text-[#6B7A99] mt-2">
          {Array.isArray(teacher.school) ? teacher.school[0]?.name : (teacher.school as any)?.name} • {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Classes actives', val: '4', icon: BookOpen, color: '#009460' },
          { label: 'Total Élèves', val: '128', icon: Users, color: '#FCD116' },
          { label: 'Heures / semaine', val: '22h', icon: Clock, color: '#CE1126' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0D1320] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-10 pointer-events-none" 
                 style={{ background: stat.color }} />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-[#6B7A99] uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1 font-[var(--font-syne)]">{stat.val}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Today's Schedule (Mock) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-[var(--font-syne)] text-xl font-bold text-white">Cours aujourd'hui</h2>
            <button className="text-primary text-xs font-bold hover:underline">Voir tout</button>
          </div>
          <div className="space-y-3">
            {[
              { class: 'Terminale SM', subject: 'Mathématiques', time: '08:00 - 10:00', room: 'Salle 12' },
              { class: '10ème Année A', subject: 'Physique', time: '10:15 - 12:15', room: 'Laboratoire' },
              { class: '3ème Année B', subject: 'Mathématiques', time: '14:30 - 16:30', room: 'Salle 05' },
            ].map((c, i) => (
              <div key={i} className="bg-[#0D1320] border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-10 rounded-full bg-primary/30" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{c.class}</h3>
                    <p className="text-xs text-[#6B7A99]">{c.subject} • {c.room}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-white/80">{c.time}</p>
                  <ArrowRight size={14} className="text-[#6B7A99] ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity / Announcements (Mock) */}
        <div className="space-y-4">
          <h2 className="font-[var(--font-syne)] text-xl font-bold text-white">Notifications</h2>
          <div className="bg-[#0D1320] border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                < Award size={18} className="text-accent" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white font-medium">Réunion pédagogique</p>
                <p className="text-xs text-[#6B7A99]">Demain à 17h00 en salle des profs pour discuter des examens de fin de trimestre.</p>
                <p className="text-[10px] text-white/20">Il y a 2 heures</p>
              </div>
            </div>
            <div className="h-[1px] bg-white/5" />
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                < TrendingUp size={18} className="text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white font-medium">Bilan mi-trimestre</p>
                <p className="text-xs text-[#6B7A99]">Veuillez finaliser la saisie des notes pour les classes de Terminale avant vendredi.</p>
                <p className="text-[10px] text-white/20">Hier à 09:45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
