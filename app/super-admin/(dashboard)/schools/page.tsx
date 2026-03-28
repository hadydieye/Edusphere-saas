'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SchoolsPage from '@/components/super-admin/SchoolsPage';
import type { School } from '@/components/super-admin/SchoolsPage';
import { getSchools, updateSchoolStatus } from '@/lib/actions/schools';

export default function AdminSchoolsPage() {
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async (p: number, q: string, s: string) => {
    setIsLoading(true);
    try {
      const res = await getSchools({ page: p, search: q, status: s });
      setSchools(res.schools);
      setTotal(res.total);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(page, search, status); }, [page, search, status, load]);

  const handleSearch = useCallback((q: string) => { setSearch(q); setPage(1); }, []);
  const handleFilter = useCallback((s: string) => { setStatus(s); setPage(1); }, []);

  const handleSuspend = useCallback(async (id: string) => {
    await updateSchoolStatus(id, 'suspended', '');
    load(page, search, status);
  }, [page, search, status, load]);

  const handleActivate = useCallback(async (id: string) => {
    await updateSchoolStatus(id, 'active', '');
    load(page, search, status);
  }, [page, search, status, load]);

  return (
    <SchoolsPage
      schools={schools}
      total={total}
      page={page}
      isLoading={isLoading}
      onSearch={handleSearch}
      onFilter={handleFilter}
      onPageChange={setPage}
      onCreateNew={() => router.push('/super-admin/schools/new')}
      onView={(id) => router.push(`/super-admin/schools/${id}`)}
      onSuspend={handleSuspend}
      onActivate={handleActivate}
    />
  );
}
