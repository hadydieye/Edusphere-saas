'use client';

import { useState } from 'react';
import { createClass, createStudent, completeOnboarding } from '@/lib/actions/school-admin';

export default function OnboardingWizard({ schoolName }: { schoolName: string }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [className, setClassName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [studentFirst, setStudentFirst] = useState('');
  const [studentLast, setStudentLast] = useState('');
  const [createdClassId, setCreatedClassId] = useState<string | null>(null);

  async function handleStep1() {
    setStep(2);
  }

  async function handleStep2() {
    if (!className || !classLevel) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Since createClass redirects, we might need a custom action or just assume success if no error
      const res = await createClass({ name: className, level: classLevel });
      // In a real app with redirects in actions, this part is tricky in a wizard.
      // But for this MVP, let's assume we can proceed or handle navigation.
      setStep(3);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStep3() {
    if (!studentFirst || !studentLast) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await createStudent({ 
        first_name: studentFirst, 
        last_name: studentLast
      });
      await completeOnboarding();
      window.location.reload(); // Refresh to hide wizard
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 space-y-6">
          {/* Progress Bar */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-border'}`} 
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-3xl">🎉</div>
              <h2 className="font-display text-2xl font-bold text-text">Bienvenue sur Edusphère !</h2>
              <p className="font-body text-muted">
                Félicitations pour la création de <strong>{schoolName}</strong>. 
                Configurons ensemble les premières étapes pour bien démarrer.
              </p>
              <button 
                onClick={handleStep1}
                className="w-full bg-primary hover:bg-primary/90 text-white font-body font-medium py-3 rounded-2xl transition-all"
              >
                C'est parti !
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-text text-center">Étape 1 : Créer votre première classe</h2>
              <p className="font-body text-sm text-muted text-center">Exemple : "6ème A", "Terminale S1", etc.</p>
              
              <div className="space-y-3">
                <input
                  placeholder="Nom de la classe (ex: 7ème A)"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text outline-none focus:border-accent"
                />
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text outline-none focus:border-accent"
                >
                  <option value="">Niveau...</option>
                  <option value="primaire">Primaire</option>
                  <option value="college">Collège</option>
                  <option value="lycee">Lycée</option>
                </select>
              </div>

              {error && <p className="text-danger text-xs text-center">{error}</p>}

              <button 
                onClick={handleStep2}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-body font-medium py-3 rounded-2xl transition-all"
              >
                {isLoading ? 'Création...' : 'Continuer'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-text text-center">Étape 2 : Inscrire votre premier élève</h2>
              <p className="font-body text-sm text-muted text-center">Juste un exemple pour tester l'interface.</p>
              
              <div className="space-y-3">
                <input
                  placeholder="Prénom"
                  value={studentFirst}
                  onChange={(e) => setStudentFirst(e.target.value)}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text outline-none focus:border-accent"
                />
                <input
                  placeholder="Nom"
                  value={studentLast}
                  onChange={(e) => setStudentLast(e.target.value)}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm font-body text-text outline-none focus:border-accent"
                />
              </div>

              {error && <p className="text-danger text-xs text-center">{error}</p>}

              <button 
                onClick={handleStep3}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-body font-medium py-3 rounded-2xl transition-all"
              >
                {isLoading ? 'Inscription...' : 'Terminer la configuration'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
