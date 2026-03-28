import { getStudentBulletin, getSchoolProfile } from '@/lib/actions/school-admin';
import { adminClient } from '@/lib/supabase/admin';
import DownloadBulletinButton from '@/components/school-admin/DownloadBulletinButton';

export default async function StudentBulletinPage({ 
  params, 
  searchParams 
}: { 
  params: { studentId: string },
  searchParams: { period?: string }
}) {
  const period = searchParams.period || 'T1';
  const [grades, school] = await Promise.all([
    getStudentBulletin(params.studentId, period),
    getSchoolProfile()
  ]);
  
  const { data: student } = await adminClient
    .from('students')
    .select('*, classes(name)')
    .eq('id', params.studentId)
    .single();

  const average = grades.length > 0 
    ? grades.reduce((acc, g) => acc + (Number(g.score) || 0), 0) / grades.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text">Bulletin : {student.last_name} {student.first_name}</h1>
          <p className="font-body text-sm text-muted">Classe : {student.classes?.name} | Période : {period}</p>
        </div>
        <div className="flex items-center gap-4">
          <DownloadBulletinButton 
            student={student} 
            school={school} 
            grades={grades} 
            period={period} 
          />
          <div className="flex gap-2">
            <a href={`?period=T1`} className={`px-3 py-1 text-xs rounded-lg border ${period === 'T1' ? 'bg-primary text-white border-primary' : 'bg-surface text-muted border-border'}`}>T1</a>
            <a href={`?period=T2`} className={`px-3 py-1 text-xs rounded-lg border ${period === 'T2' ? 'bg-primary text-white border-primary' : 'bg-surface text-muted border-border'}`}>T2</a>
            <a href={`?period=T3`} className={`px-3 py-1 text-xs rounded-lg border ${period === 'T3' ? 'bg-primary text-white border-primary' : 'bg-surface text-muted border-border'}`}>T3</a>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden p-6 space-y-8">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 font-body text-xs font-semibold text-muted uppercase">Matière</th>
              <th className="py-2 font-body text-xs font-semibold text-muted uppercase text-center w-32">Note / 20</th>
              <th className="py-2 font-body text-xs font-semibold text-muted uppercase">Appréciation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {grades.length === 0 ? (
              <tr><td colSpan={3} className="py-8 text-center text-muted text-sm font-body">Aucune note enregistrée pour cette période</td></tr>
            ) : grades.map((g: any) => (
              <tr key={g.id}>
                <td className="py-3 font-body text-sm text-text font-medium">{g.subjects.name}</td>
                <td className="py-3 font-mono text-sm text-text text-center">{g.score ?? '—'}</td>
                <td className="py-3 font-body text-xs text-muted italic">{g.comment ?? '—'}</td>
              </tr>
            ))}
          </tbody>
          {grades.length > 0 && (
            <tfoot>
              <tr className="bg-bg/20 font-bold border-t-2 border-border">
                <td className="py-4 px-2 font-display text-sm text-text">MOYENNE GÉNÉRALE</td>
                <td className="py-4 text-center font-mono text-base text-primary">{average.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
