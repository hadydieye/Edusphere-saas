import { notFound } from 'next/navigation';
import SchoolDetailClient from './SchoolDetailClient';
import { getSchool } from '@/lib/actions/schools';
import { adminClient } from '@/lib/supabase/admin';

export default async function SchoolDetailRoute({ params }: { params: { id: string } }) {
  const [school, adminData, logs] = await Promise.all([
    getSchool(params.id).catch(() => null),
    adminClient
      .from('school_admins')
      .select('id, email, user_id')
      .eq('school_id', params.id)
      .limit(1)
      .single()
      .then((r) => r.data),
    adminClient
      .from('audit_logs')
      .select('id, action, metadata, created_at')
      .eq('target_id', params.id)
      .order('created_at', { ascending: false })
      .limit(20)
      .then((r) => r.data ?? []),
  ]);

  if (!school) notFound();

  return (
    <SchoolDetailClient
      school={{
        id: school.id,
        name: school.name,
        code: school.code,
        region: (school.address as any)?.region ?? '',
        city: (school.address as any)?.city ?? '',
        phone: (school.address as any)?.phone ?? '',
        email: (school.address as any)?.email ?? '',
        plan: (school as any).plan ?? 'starter',
        status: school.status as 'active' | 'suspended',
        created_at: school.created_at,
        trial_ends_at: (school as any).trial_ends_at ?? school.created_at,
      }}
      admin={adminData ? { id: adminData.user_id, name: adminData.email, email: adminData.email } : { id: '', name: '—', email: '—' }}
      auditLogs={logs.map((l) => ({
        id: l.id,
        action: l.action,
        description: JSON.stringify(l.metadata ?? {}),
        timestamp: l.created_at,
      }))}
    />
  );
}
