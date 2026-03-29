'use client';

import PageLayout from '@/components/landing/PageLayout';

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Politique de confidentialité"
      subtitle="Engagements d'Edusphère concernant la collecte et le traitement de vos données personnelles."
      badge="CONFIDENTIALITÉ"
    >
      <div className="max-w-3xl mx-auto py-12 space-y-12">
        
        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            1. Données collectées
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-4 leading-relaxed">
            <p>Dans le cadre de l'utilisation de nos services, nous sommes amenés à collecter les données suivantes :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Données d'identification :</strong> Noms, prénoms, adresses email, numéros de téléphone des élèves, parents et personnel éducatif.</li>
              <li><strong>Données scolaires :</strong> Notes, bulletins, absences, retards, emplois du temps.</li>
              <li><strong>Données financières :</strong> Historique des transactions Mobile Money (nous ne stockons aucun code secret PIN).</li>
              <li><strong>Données techniques :</strong> Adresses IP, logs de connexion, données de navigation à des fins d'audit et de sécurité.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            2. Utilisation des données
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-4 leading-relaxed">
            <p>Les données collectées sont strictement utilisées pour :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Assurer le bon fonctionnement de la plateforme de gestion scolaire.</li>
              <li>Permettre la communication entre l'établissement et les parents (alertes SMS).</li>
              <li>Générer les documents officiels (bulletins, certificats de scolarité).</li>
              <li>Assurer la sécurité et la traçabilité des actions sur la plateforme.</li>
            </ul>
            <p><strong>Edusphère s'engage à ne jamais revendre vos données à des tiers à des fins commerciales.</strong></p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            3. Stockage et sécurité
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              Les données sont stockées sur des serveurs hautement sécurisés. Nous utilisons des protocoles de chiffrement 
              standard (TLS 1.3 en transit, AES-256 au repos) pour protéger les informations sensibles. 
              Chaque base de données scolaire est isolée logiquement (Row Level Security) afin d'empêcher tout accès non autorisé.
            </p>
            <p>Des sauvegardes automatiques sont effectuées quotidiennement pour prévenir toute perte de données.</p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            4. Droits des utilisateurs
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>Conformément aux standards internationaux de protection des données (RGPD appliqués par Edusphère), vous disposez de :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Un droit d'accès et de rectification de vos données.</li>
              <li>Un droit à l'effacement (droit à l'oubli) sous réserve des obligations légales de conservation de l'établissement.</li>
              <li>Un droit à la portabilité permettant de récupérer vos données dans un format standard.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            5. Cookies
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement technique de la plateforme 
              (maintien de session sécurisée, protection contre les attaques CSRF, préférences d'interface). 
              Nous n'utilisons aucun cookie de ciblage publicitaire intrusif.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            6. Contact DPO
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, 
              vous pouvez contacter notre Délégué à la Protection des Données (DPO) à l'adresse suivante :
            </p>
            <p>
              <a href="mailto:privacy@edusphere.gn" className="text-[#009460] hover:underline font-bold">privacy@edusphere.gn</a>
            </p>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
