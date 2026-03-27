'use client';

import { useState } from 'react';
import { signIn } from '@/lib/actions/auth';
import LoginForm from '@/components/super-admin/LoginForm';

export default function SuperAdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const err = await signIn(email, password);
    if (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />;
}
