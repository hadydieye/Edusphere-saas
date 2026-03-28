import { getStudents } from '@/lib/actions/school-admin';
import Link from 'next/link';

export default async function BulletinsListPage() {
  const { students } = await getStudents({ page: 1 });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-text">Bulletins de notes</h1>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-bg/30">
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase">Élève</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase">Classe</th>
              <th className="px-6 py-4 font-body text-xs font-semibold text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((s: any) => (
              <tr key={s.id} className="hover:bg-bg/40 transition-colors">
                <td className="px-6 py-4 font-body text-sm text-text font-medium">{s.last_name} {s.first_name}</td>
                <td className="px-6 py-4 font-body text-sm text-muted">{s.classes?.name ?? '—'}</td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/school-admin/bulletins/${s.id}`}
                    className="text-accent hover:underline font-body text-sm font-medium"
                  >
                    Voir bulletin
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
