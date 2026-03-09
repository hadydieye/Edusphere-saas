// Dummy data for Edusphère

export interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  classe: string;
  classeId: string;
  moyenne: number;
  statut: 'actif' | 'inactif';
  notes: Record<string, number>;
}

export interface Classe {
  id: string;
  nom: string;
  niveau: string;
  nbEleves: number;
  professeurPrincipal: string;
}

export interface Matiere {
  id: string;
  nom: string;
  coefficient: number;
}

export interface Activity {
  id: string;
  action: string;
  date: string;
  user: string;
}

export const ecole = {
  nom: "Lycée Moderne de Conakry",
  ville: "Conakry",
  pays: "Guinée",
};

export const matieres: Matiere[] = [
  { id: "m1", nom: "Mathématiques", coefficient: 4 },
  { id: "m2", nom: "Français", coefficient: 3 },
  { id: "m3", nom: "Physique", coefficient: 3 },
  { id: "m4", nom: "Histoire-Géo", coefficient: 2 },
  { id: "m5", nom: "Anglais", coefficient: 2 },
];

export const classes: Classe[] = [
  { id: "c1", nom: "3ème A", niveau: "Collège", nbEleves: 5, professeurPrincipal: "M. Camara" },
  { id: "c2", nom: "Seconde B", niveau: "Lycée", nbEleves: 5, professeurPrincipal: "Mme Diallo" },
  { id: "c3", nom: "Terminale C", niveau: "Lycée", nbEleves: 5, professeurPrincipal: "M. Bah" },
];

export const eleves: Eleve[] = [
  // 3ème A
  { id: "e1", nom: "Camara", prenom: "Mamadou", classe: "3ème A", classeId: "c1", moyenne: 14.5, statut: "actif", notes: { m1: 15, m2: 13, m3: 16, m4: 12, m5: 14 } },
  { id: "e2", nom: "Diallo", prenom: "Fatoumata", classe: "3ème A", classeId: "c1", moyenne: 16.2, statut: "actif", notes: { m1: 17, m2: 16, m3: 15, m4: 18, m5: 14 } },
  { id: "e3", nom: "Barry", prenom: "Ibrahima", classe: "3ème A", classeId: "c1", moyenne: 11.8, statut: "actif", notes: { m1: 10, m2: 12, m3: 11, m4: 13, m5: 12 } },
  { id: "e4", nom: "Soumah", prenom: "Aissatou", classe: "3ème A", classeId: "c1", moyenne: 13.0, statut: "actif", notes: { m1: 14, m2: 13, m3: 12, m4: 13, m5: 11 } },
  { id: "e5", nom: "Condé", prenom: "Ousmane", classe: "3ème A", classeId: "c1", moyenne: 12.5, statut: "inactif", notes: { m1: 12, m2: 11, m3: 14, m4: 13, m5: 12 } },
  // Seconde B
  { id: "e6", nom: "Bah", prenom: "Mariama", classe: "Seconde B", classeId: "c2", moyenne: 15.3, statut: "actif", notes: { m1: 16, m2: 15, m3: 14, m4: 16, m5: 15 } },
  { id: "e7", nom: "Sylla", prenom: "Abdoulaye", classe: "Seconde B", classeId: "c2", moyenne: 13.7, statut: "actif", notes: { m1: 14, m2: 13, m3: 15, m4: 12, m5: 14 } },
  { id: "e8", nom: "Touré", prenom: "Kadiatou", classe: "Seconde B", classeId: "c2", moyenne: 17.1, statut: "actif", notes: { m1: 18, m2: 17, m3: 16, m4: 17, m5: 18 } },
  { id: "e9", nom: "Keita", prenom: "Mohamed", classe: "Seconde B", classeId: "c2", moyenne: 10.5, statut: "actif", notes: { m1: 9, m2: 11, m3: 10, m4: 12, m5: 10 } },
  { id: "e10", nom: "Bangoura", prenom: "Aminata", classe: "Seconde B", classeId: "c2", moyenne: 14.0, statut: "actif", notes: { m1: 15, m2: 14, m3: 13, m4: 14, m5: 13 } },
  // Terminale C
  { id: "e11", nom: "Diakité", prenom: "Sékou", classe: "Terminale C", classeId: "c3", moyenne: 15.8, statut: "actif", notes: { m1: 17, m2: 14, m3: 16, m4: 15, m5: 16 } },
  { id: "e12", nom: "Sacko", prenom: "Fanta", classe: "Terminale C", classeId: "c3", moyenne: 12.3, statut: "actif", notes: { m1: 11, m2: 13, m3: 12, m4: 13, m5: 12 } },
  { id: "e13", nom: "Cissé", prenom: "Boubacar", classe: "Terminale C", classeId: "c3", moyenne: 16.5, statut: "actif", notes: { m1: 18, m2: 15, m3: 17, m4: 16, m5: 15 } },
  { id: "e14", nom: "Sow", prenom: "Hawa", classe: "Terminale C", classeId: "c3", moyenne: 14.2, statut: "actif", notes: { m1: 15, m2: 14, m3: 13, m4: 15, m5: 13 } },
  { id: "e15", nom: "Kaba", prenom: "Alpha", classe: "Terminale C", classeId: "c3", moyenne: 11.0, statut: "inactif", notes: { m1: 10, m2: 11, m3: 12, m4: 10, m5: 11 } },
];

export const activites: Activity[] = [
  { id: "a1", action: "Nouvel élève inscrit: Camara Mamadou", date: "2024-03-08", user: "Admin" },
  { id: "a2", action: "Notes saisies: Maths - 3ème A", date: "2024-03-07", user: "M. Camara" },
  { id: "a3", action: "Bulletin généré: Seconde B", date: "2024-03-06", user: "Admin" },
  { id: "a4", action: "Nouvelle classe créée: Terminale C", date: "2024-03-05", user: "Admin" },
  { id: "a5", action: "Notes modifiées: Français - Seconde B", date: "2024-03-04", user: "Mme Diallo" },
];

export const pricingTiers = [
  {
    nom: "Starter",
    prix: "500 000",
    periode: "GNF / an",
    description: "Pour les petites écoles",
    features: ["Jusqu'à 200 élèves", "3 utilisateurs", "Bulletins PDF", "Support email"],
  },
  {
    nom: "Professionnel",
    prix: "1 000 000",
    periode: "GNF / an",
    description: "Pour les écoles en croissance",
    features: ["Jusqu'à 1 000 élèves", "10 utilisateurs", "Bulletins PDF", "Portail parents", "Support prioritaire"],
    popular: true,
  },
  {
    nom: "Établissement",
    prix: "2 000 000",
    periode: "GNF / an",
    description: "Pour les grands établissements",
    features: ["Élèves illimités", "Utilisateurs illimités", "Bulletins PDF", "Portail parents", "API & intégrations", "Support dédié"],
  },
];
