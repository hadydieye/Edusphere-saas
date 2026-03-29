# Edusphère SaaS 🏫 🇬🇳
*La révolution numérique de l'éducation en Guinée.*

**Edusphère** est une plateforme SaaS de gestion scolaire de "nouvelle génération", conçue spécifiquement pour l'écosystème éducatif guinéen. C'est une solution 360° qui connecte les chefs d'établissement, les enseignants et les parents pour une transparence totale et une réussite scolaire accrue.

---

## 🏗️ Architecture des Portails & Espaces

### 🌍 1. Landing Page (Public)
- **Esthétique Premium** : Design moderne, animations fluides (Framer Motion) et mode sombre natif.
- **Convertisseur local** : Argumentaire centré sur la connectivité guinéenne et le support des paiements locaux.

### 👑 2. Super Admin (Plateforme)
- **Monitoring Global** : Vue centrale des statistiques de toutes les écoles partenaires (revenus, volumes d'élèves).
- **Gestion des Établissements** : Création, validation et audit des comptes écoles.
- **Sécurité** : Accès restreint via `app_metadata.superadmin` sur Supabase.

### 🏫 3. School Admin (Espace École)
- **Tableau de Bord Financier** : Suivi des recettes (scolarités) vs Dépenses (salaires, logistique).
- **Gestion Administrative** : Inscriptions, classes, matières et dossiers élèves.
- **Management Staff** : Contrôle des accès et mots de passe des enseignants.
- **Contrôle Académique** : Validation des notes et clôture des périodes.

### 🧑‍🏫 4. Espace Enseignant (Nouveau)
- **Interface Dédiée** : Connexion simplifiée via numéro de téléphone.
- **Vie de Classe** : Marquage des présences en temps réel.
- **Évaluation** : Saisie rapide des notes et commentaires pédagogiques.
- **Session Légère** : Authentification ultra-performante basée sur JWT (`jose`).

### 👨‍👩‍👧‍👦 5. Portail Parent
- **Multi-Enfants** : Un compte parent unique pour suivre tous ses enfants, même s'ils sont dans des classes différentes.
- **Notifications Directes** : Consultation des absences et des notes dès leur publication.
- **Suivi Financier** : Historique des paiements et reliquats de scolarité.

---

## 🇬🇳 Les "Killer Features" Spécial Guinée (MVP)

### 1. 📲 Alerte Absence SMS
- **Sécurité Maximale** : Dès qu'un enseignant marque un élève absent, le parent reçoit un SMS automatique (Simulation intégrée, prête pour API Orange/MTN).
- **Communication Directe** : Réduit l'absentéisme et rassure les familles sur la sécurité de leurs enfants.

### 2. 💰 Gestion des Impayés & Relances
- **Dashboard Dette** : Vue filtrée des élèves n'ayant pas réglé la scolarité du mois en cours.
- **Relance en 1 Clic** : Envoi groupé de SMS de rappel à tous les parents débiteurs simultanément.

### 3. 📄 Bulletins de Notes & Classement (Rang)
- **Design Institutionnel** : Génération de bulletins PDF professionnels aux couleurs de la Guinée.
- **Calcul du Rang** : Algorithme automatique déterminant la position de l'élève par rapport à sa classe (Rang 1er, 2ème, etc.).
- **Moyennes Automatisées** : Calculs précis basés sur les coefficients (configurables).

---

## ⚡ Performance & Expérience Utilisateur
- **Streaming & Skeletons** : Utilisation intensive de `loading.tsx` pour un affichage instantané de la structure du site.
- **Parallélisation** : Optimisation des requêtes Supabase via `Promise.all` pour un chargement 2x plus rapide.
- **Mode PWA** : Installable sur iPhone et Android; icône personnalisée et offline support partiel.

---

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router).
- **Styling** : Tailwind CSS, Framer Motion, Vanilla CSS.
- **Base de données** : Supabase (PostgreSQL, RLS pour la séparation des écoles).
- **Auth** : Mixte (Supabase Identity pour Admin, JWT Manuel pour Staff/Parents).
- **PDF** : `@react-pdf/renderer` pour les reports officiels.

---

## ⚙️ Installation & Configuration

### 1. Pré-requis
- Node.js 18+
- Un compte Supabase

### 2. Installation
```bash
git clone https://github.com/hadydieye/Edusphere-saas.git
cd Edusphere-saas
npm install
```

### 3. Variables d'Environnement (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 4. Base de Données
Appliquer les migrations SQL dans le dossier `supabase/migrations` (Init -> Modules -> Auth).

---

## 🛤️ État du Projet
- [x] Landing Page & Branding Edusphère
- [x] Dashboards Admin & Super Admin
- [x] Espace Enseignant & Espace Parent
- [x] MVP SMS & Impayés
- [x] Génération PDF Bulletins & Factures
- [x] Optimisations Performance (Skeletons)

---
*Edusphère - Moderniser l'éducation, un élève à la fois.* 🚀🇬🇳
