import { getStudentDetails, getStudentBulletin, getRankInClass, getSchoolProfile } from '@/lib/actions/school-admin';
import { ArrowLeft, User, BookOpen, GraduationCap, MapPin, Phone as PhoneIcon, Mail } from 'lucide-react';
import Link from 'next/link';
import BulletinButton from '@/components/school-admin/BulletinButton';

export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  const student = await getStudentDetails(params.id);
  const school = await getSchoolProfile();
  const period = '1er Trimestre'; // Mock for now, can be dynamic
  const grades = await getStudentBulletin(params.id, period);
  const rankData = await getRankInClass(params.id, student.class_id, period);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/school-admin/students" className="p-2 hover:bg-surface rounded-lg transition-colors border border-border">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 font-display text-2xl font-bold">
               {student.last_name[0]}{student.first_name[0]}
             </div>
             <div>
               <h1 className="text-2xl font-bold font-display text-text">{student.last_name.toUpperCase()} {student.first_name}</h1>
               <div className="flex items-center gap-3 mt-1">
                 <span className="bg-bg border border-border px-3 py-1 rounded-full text-[11px] font-bold text-text uppercase italic">
                   {student.classes?.name}
                 </span>
                 <span className={`w-2 h-2 rounded-full ${student.status === 'active' ? 'bg-success' : 'bg-danger'}`} />
                 <span className="text-xs text-muted capitalize">{student.status}</span>
               </div>
             </div>
          </div>
        </div>

        <BulletinButton 
          student={student} 
          school={school} 
          grades={grades} 
          period={period} 
          rankData={rankData} 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Col: Info */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-3xl p-6 space-y-6 shadow-sm">
            <h2 className="font-display font-bold text-lg text-text border-b border-border pb-4">Informations Personnelles</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-muted">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Sexe</p>
                  <p className="text-sm font-medium text-text">{student.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-muted">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Tuteur</p>
                  <p className="text-sm font-medium text-text">{student.guardian_name || '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-muted">
                  <PhoneIcon size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Téléphone Tuteur</p>
                  <p className="text-sm font-medium text-text">{student.guardian_phone || '—'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Grades */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <h2 className="font-display font-bold text-lg text-text">Notes — {period}</h2>
               <div className="flex items-center gap-4">
                 <div className="text-right">
                    <p className="text-[10px] text-muted font-bold uppercase">Moyenne</p>
                    <p className="text-xl font-bold text-primary">{(rankData?.avg || 0).toFixed(2)}</p>
                 </div>
                 <div className="w-[1px] h-8 bg-border" />
                 <div className="text-right">
                    <p className="text-[10px] text-muted font-bold uppercase">Rang</p>
                    <p className="text-xl font-bold text-accent">{rankData?.rank || '—'} / {rankData?.total || '—'}</p>
                 </div>
               </div>
             </div>

             <div className="space-y-3">
               {grades.length === 0 ? (
                 <div className="py-12 text-center text-muted border-2 border-dashed border-border rounded-2xl">
                   Aucune note enregistrée pour cette période.
                 </div>
               ) : (
                 grades.map((g: any) => (
                   <div key={g.id} className="flex items-center justify-between p-4 bg-bg rounded-2xl border border-border group hover:border-primary/30 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {g.subjects?.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-text">{g.subjects?.name}</p>
                          <p className="text-xs text-muted italic">"{g.comment || '—'}"</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className={`text-lg font-bold ${g.score >= 10 ? 'text-success' : 'text-danger'}`}>{g.score}/20</p>
                     </div>
                   </div>
                 ))
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
