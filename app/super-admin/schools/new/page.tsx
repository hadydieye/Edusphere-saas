'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateSchoolForm from '@/components/super-admin/CreateSchoolForm';
import type { CreateSchoolInput } from '@/components/super-admin/CreateSchoolForm';
import { createSchool } from '@/lib/actions/schools';

export default function NewSchoolPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateSchoolInput) => {
    setIsLoading(true);
    setError(null);
    const err = await createSchool(data);
    if (err) {
      setError(err);
      setIsLoading(false);
    }
    // redirect handled inside createSchool on success
  };

  return (
    <CreateSchoolForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}
