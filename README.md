# Edusphère SaaS 🏫 🇬🇳

**Edusphère** est une plateforme SaaS de gestion scolaire de pointe, conçue spécifiquement pour l'écosystème éducatif guinéen. C'est une solution tout-en-un qui connecte les parents, les écoles et les administrateurs pour une transparence totale et une gestion simplifiée.

---

## 🏗️ Architecture des Portails

### 🌍 1. Landing Page (Public)
- **Design Moderne** : Site responsive avec 11 sections interactives (Navbar, Hero, Features, Pricing, FAQ, etc.).
- **Marketing** : Mise en avant de la solution Mobile Money et de la conformité avec les réalités locales de connectivité.

### 👑 2. Super Admin (Plateforme)
- **Monitoring Global** : Vue centrale des statistiques de toutes les écoles partenaires.
- **Gestion des Établissements** : Création, suspension et audit des comptes écoles.
- **Sécurité** : Accès restreint via `app_metadata.superadmin`.

### 🏫 3. School Admin (Espace École)
- **Tableau de Bord** : Indicateurs de performance financière (revenus vs dépenses) et académique.
- **Inscriptions & Scolarité** : Gestion complète du cycle de vie des élèves et suivi des paiements Mobile Money.
- **Pédagogie** : Saisie des notes, gestion des matières et classes, et génération automatique de bulletins.
- **Vie Scolaire** : Pointage des absences avec notifications automatiques et gestion des enseignants.
- **Finance** : Suivi des dépenses opérationnelles (loyer, salaires, matériel).

### 👨‍👩‍👧‍👦 4. Portail Parent (Nouveau)
- **Suivi Multi-Enfants** : Un parent peut suivre tous ses enfants inscrits via son numéro de téléphone unique.
- **Temps Réel** : Consultation instantanée des notes, absences et états de paiement.
- **Authentification Légère** : Système de session sécurisé par JWT via numéro de téléphone et mot de passe.
- **Mobile First** : Interface ultra-optimisée pour une utilisation sur smartphone.

---

## 📱 Fonctionnalités Avancées

- **🛒 Mode PWA (Progressive Web App)** :
  - Installable immédiatement sur Android et iOS comme une application native.
  - Fonctionne avec une icône personnalisée et un écran de démarrage premium.
  - Support hors-ligne partiel via Service Worker.
- **✨ Responsivité Totale** : Tous les tableaux et menus (burger menus pour admin) sont optimisés pour les écrans tactiles.
- **🔒 Sécurité Avancée** : Row Level Security (RLS) sur Supabase pour garantir qu'une école ne voit jamais les données d'une autre.

---

## 🛠️ Stack Technique

- **Frontend** : Next.js 14 (App Router).
- **Styling** : Tailwind CSS & Framer Motion (animations).
- **Backend** : Supabase (PostgreSQL, Realtime, Storage).
- **Auth** : Supabase Auth (Admin/Super Admin) & JWT manuel (Parents).
- **Notifications** : SMS Lib (prête pour API Orange/MTN) & Notifications PWA.

---

## ⚙️ Installation & Configuration

### 1. Clonage et Dépendances
```bash
git clone https://github.com/hadydieye/Edusphere-saas.git
cd Edusphere-saas
npm install
```

### 2. Environnement (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clef
SUPABASE_SERVICE_ROLE_KEY=votre_clef_service_role
```

### 3. Base de Données
Exécutez les migrations dans l'ordre (dossier `supabase/migrations`) :
1. `20260327_init.sql` (Schéma de base)
2. `20260328_core_modules.sql` (Notes, Présences, Finances)
3. `20260328_parent_auth.sql` (Authentification parents)

### 4. Setup de Test (School Admin)
Utilisez le script `20260328_test_admin_setup.sql` dans l'éditeur SQL Supabase pour créer une école pilote et un compte admin avec les métadonnées de droits.

---

## 🛤️ Roadmap Complétée
- [x] Landing Page Premium.
- [x] Dashboard Super Admin & School Admin.
- [x] Modules Notes, Bulletins et Présences.
- [x] Système de Paiements et Dépenses.
- [x] Portail Parent Multi-Enfants.
- [x] Support PWA & Offline Support.
- [x] Responsivité Global Dashboard.
- [x] Synchronisation GitHub.

---
*Edusphère - Moderniser l'éducation, un élève à la fois.* 🚀🇬🇳
