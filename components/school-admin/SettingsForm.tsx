'use client';

import { useState } from 'react';
import { updateSchoolProfile } from '@/lib/actions/school-admin';

export default function SchoolSettingsPage({ school }: { school: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Parse address if it's a string (though it should be jsonb in DB)
  const address = typeof school.address === 'string' ? JSON.parse(school.address) : (school.address || {});

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const name = formData.get('name') as string;
    const region = formData.get('region') as string;
    const city = formData.get('city') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;

    const res = await updateSchoolProfile({
      name,
      address: { ...address, region, city, phone, email },
    });

    setIsLoading(false);
    if (res) {
      setError(res);
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-text">Paramètres de l'école</h1>
        <p className="font-body text-sm text-muted mt-1">Gérez les informations de votre établissement</p>
      </div>

      <form action={handleSubmit} className="space-y-4 bg-surface border border-border rounded-2xl p-6">
        <div className="space-y-2">
          <label className="font-body text-sm font-medium text-text">Nom de l'école</label>
          <input
            name="name"
            defaultValue={school.name}
            required
            className="w-full bg-bg border border-border rounded-xl px-4 py-2 text-sm font-body text-text outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-body text-sm font-medium text-text">Région</label>
            <input
              name="region"
              defaultValue={address.region}
              className="w-full bg-bg border border-border rounded-xl px-4 py-2 text-sm font-body text-text outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="font-body text-sm font-medium text-text">Ville</label>
            <input
              name="city"
              defaultValue={address.city}
              className="w-full bg-bg border border-border rounded-xl px-4 py-2 text-sm font-body text-text outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-body text-sm font-medium text-text">Téléphone</label>
            <input
              name="phone"
              defaultValue={address.phone}
              className="w-full bg-bg border border-border rounded-xl px-4 py-2 text-sm font-body text-text outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="font-body text-sm font-medium text-text">Email de contact</label>
            <input
              name="email"
              type="email"
              defaultValue={address.email}
              className="w-full bg-bg border border-border rounded-xl px-4 py-2 text-sm font-body text-text outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {error && <p className="text-danger text-sm font-body">{error}</p>}
        {success && <p className="text-success text-sm font-body">Profil mis à jour avec succès !</p>}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-body text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
          >
            {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>

      <div className="bg-warning/10 border border-warning/20 rounded-2xl p-5">
        <h3 className="font-display text-sm font-semibold text-warning">Code de l'école : {school.code}</h3>
        <p className="font-body text-xs text-warning/80 mt-1">
          Ce code est unique et utilisé pour identifier votre établissement. Il ne peut pas être modifié.
        </p>
      </div>
    </div>
  );
}
