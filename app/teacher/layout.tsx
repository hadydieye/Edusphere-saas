import { getTeacherProfile, logoutTeacher } from '@/lib/actions/teacher-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  LogOut, 
  User, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  CheckCircle,
  LayoutDashboard
} from 'lucide-react';
import Logo from '@/components/Logo';

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const teacher = await getTeacherProfile();

  if (!teacher) {
    redirect('/teacher/login');
  }

  return (
    <div className="min-h-screen bg-[#06090F] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0D1320] border-r border-white/5 flex flex-col pt-8">
        <div className="px-6 mb-12">
          <Link href="/teacher" className="flex items-center gap-3">
            <Logo size={32} />
            <span className="font-[var(--font-syne)] font-bold text-xl text-white tracking-tight">Edusphère</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { label: 'Tableau de bord', icon: LayoutDashboard, href: '/teacher', active: true },
            { label: 'Mes Classes', icon: BookOpen, href: '/teacher/classes' },
            { label: 'Emploi du temps', icon: Calendar, href: '/teacher/schedule' },
            { label: 'Appel / Présence', icon: CheckCircle, href: '/teacher/attendance' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-[var(--font-dm-sans)] text-sm ${
                item.active 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-[#6B7A99] hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-primary font-[var(--font-syne)] text-sm">
              {teacher.first_name[0]}{teacher.last_name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{teacher.first_name} {teacher.last_name}</p>
              <p className="text-[10px] text-[#6B7A99] truncate uppercase tracking-widest">{teacher.specialty || 'Enseignant'}</p>
            </div>
          </div>
          <form action={logoutTeacher}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-danger/10 transition-all font-[var(--font-dm-sans)] text-sm">
              <LogOut size={18} />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
