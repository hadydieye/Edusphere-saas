'use client';

import PageLayout from '@/components/landing/PageLayout';

export default function MentionsLegalesPage() {
  return (
    <PageLayout
      title="Mentions légales"
      subtitle="Informations juridiques concernant l'éditeur et l'hébergeur de la plateforme Edusphère."
      badge="LÉGAL"
    >
      <div className="max-w-3xl mx-auto py-12 space-y-12">
        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            1. Éditeur du site
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p><strong>Raison sociale :</strong> Edusphère SAS</p>
            <p><strong>Siège social :</strong> Commune de Kaloum, Conakry, République de Guinée</p>
            <p><strong>Email :</strong> contact@edusphere.gn</p>
            <p><strong>Capital social :</strong> [Montant du capital] GNF</p>
            <p><strong>Immatriculation :</strong> RCCM GC-KAL-[Numéro]</p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            2. Hébergement
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>Ce site est hébergé par :</p>
            <p><strong>Vercel Inc.</strong></p>
            <p>340 S Lemon Ave #4133</p>
            <p>Walnut, CA 91789, États-Unis</p>
            <p><strong>Site web :</strong> https://vercel.com</p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            3. Directeur de publication
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>Le directeur de la publication est le Représentant Légal d'Edusphère.</p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            4. Propriété intellectuelle
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              L'ensemble de ce site relève de la législation guinéenne et internationale sur le droit d'auteur 
              et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
              les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p>
              Toute reproduction totale ou partielle de ce site ou de son contenu, par quelque procédé que ce soit, 
              sans l'autorisation expresse d'Edusphère est interdite et constituerait une contrefaçon sanctionnée 
              par la loi.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            5. Limitation de responsabilité
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              Edusphère s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour 
              des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment 
              et sans préavis, le contenu.
            </p>
            <p>
              Toutefois, Edusphère ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations 
              mises à la disposition sur ce site. En conséquence, Edusphère décline toute responsabilité pour toute 
              interruption du site, survenance de bogues, inxactitude ou omission portant sur des informations 
              disponibles sur le site.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-[#1A2540] pl-6">
          <h2 className="font-[var(--font-syne)] text-2xl font-bold text-[#F0F4FF]">
            6. Contact
          </h2>
          <div className="font-[var(--font-dm-sans)] text-[#6B7A99] space-y-2 leading-relaxed">
            <p>
              Pour toute question ou demande d'information concernant le site, ou tout signalement de contenu ou 
              d'activités illicites, l'utilisateur peut contacter l'éditeur à l'adresse email : 
              <br/><a href="mailto:contact@edusphere.gn" className="text-[#CE1126] hover:underline">contact@edusphere.gn</a>
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
