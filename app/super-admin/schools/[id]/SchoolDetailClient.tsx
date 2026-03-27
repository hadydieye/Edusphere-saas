'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SchoolDetailPage from '@/components/super-admin/SchoolDetailPage';
import type { School, SchoolAdmin, AuditLog } from '@/components/super-admin/SchoolDetailPage';
import { updateSchoolStatus } from '@/lib/actions/schools';

interface Props {
  school: School;
  admin: SchoolAdmin;
  auditLogs: AuditLog[];
}

export default function SchoolDetailClient({ school: initial, admin, auditLogs }: Props) {
  const router = useRouter();
  const [school, setSchool] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuspend = async () => {
    setIsLoading(true);
    const err = await updateSchoolStatus(school.id, 'suspended', admin.id);
    if (!err) setSchool((s) => ({ ...s, status: 'suspended' }));
    setIsLoading(false);
  };

  const handleReactivate = async () => {
    setIsLoading(true);
    const err = await updateSchoolStatus(school.id, 'active', admin.id);
    if (!err) setSchool((s) => ({ ...s, status: 'active' }));
    setIsLoading(false);
  };

  return (
    <SchoolDetailPage
      school={school}
      admin={admin}
      auditLogs={auditLogs}
      onSuspend={handleSuspend}
      onReactivate={handleReactivate}
      isLoading={isLoading}
    />
  );
}
