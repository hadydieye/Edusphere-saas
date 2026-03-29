'use client';

import PageLayout from '@/components/landing/PageLayout';

export default function CGUPage() {
  return (
    <PageLayout
      title="Conditions Générales d'Utilisation"
      subtitle="Règles encadrant l'utilisation de la plateforme Edusphère par les établissements scolaires et les parents."
      badge="CGU"
    >
      <div className="max-w-3xl mx-auto py-12 space-y-12">
        
        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            1. Objet
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») ont pour objet de définir 
              les modalités et conditions dans lesquelles Edusphère met à la disposition des écoles, enseignants, 
              élèves et parents ses outils de gestion scolaire et de communication.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            2. Accès au service
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              L'accès à la plateforme est réservé aux utilisateurs ayant reçu des identifiants (email, téléphone, mot de passe) 
              de la part de l'administration de l'établissement scolaire souscripteur. L'établissement souscripteur s'engage 
              à faire respecter les présentes CGU par l'ensemble de ses utilisateurs finaux.
            </p>
            <p>
              L'accès nécessite une connexion internet. Les frais d'équipements et de connexion sont à la charge exclusive de l'utilisateur.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            3. Obligations de l'utilisateur
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-4 leading-relaxed">
            <p>L'utilisateur s'engage expressément à :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Garder son mot de passe strictement confidentiel.</li>
              <li>Ne pas utiliser la plateforme à des fins illicites, discriminatoires ou frauduleuses.</li>
              <li>Saisir des informations exactes et à jour le concernant (notamment les numéros de téléphone pour les alertes SMS).</li>
              <li>Avertir immédiatement l'administration de l'école en cas de vol ou d'usurpation de ses identifiants.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            4. Responsabilité
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              Edusphère met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité 
              au service (obligation de moyens). Cependant, Edusphère ne saurait être tenue responsable des dommages 
              liés à une inaccessibilité temporaire du service causée par une maintenance planifiée ou un cas de force majeure 
              (coupures réseau au niveau national, pannes serveurs hébergeur).
            </p>
            <p>
              L'école reste seule responsable des données qu'elle saisit (notes, appréciations, montants à payer). Edusphère n'édite 
              pas ce contenu.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            5. Prix et paiement
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              L'accès à l'espace Parent et Élève est gratuit pour ces derniers. Seul l'établissement scolaire est redevable 
              de l'abonnement mensuel ou annuel au service (Starter, Pro, Enterprise), selon le contrat commercial signé avec Edusphère.
            </p>
            <p>
              Concernant le module Mobile Money : Edusphère ne prélève **aucune commission additionnelle** sur le traitement des paiements des frais de scolarité. 
              Les conditions d'utilisation d'Orange Money ou MTN MoMo restent cependant applicables.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            6. Résiliation
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              L'établissement peut résilier son abonnement à tout moment selon les modalités de son contrat. À la résiliation, 
              l'accès au service est coupé. Une sauvegarde intégrale des données de l'école (notes, listes d'élèves, historique comptable) 
              sera fournie dans un format ouvert (CSV, JSON) gratuitement, sur simple demande, dans un délai de 30 jours après la résiliation, 
              avant suppression définitive de nos serveurs.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            7. Droit applicable et juridiction compétente
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              Les présentes CGU sont soumises au **Droit Guinéen**. En cas de litige n'ayant pu trouver une issue amiable, 
              les tribunaux de Conakry seront seuls compétents pour en connaître.
            </p>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
