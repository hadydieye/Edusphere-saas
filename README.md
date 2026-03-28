# Edusphère SaaS 🏫

**Edusphère** est une plateforme SaaS de gestion scolaire moderne et intuitive, conçue spécifiquement pour répondre aux besoins des établissements d'enseignement en Guinée. Elle permet aux administrateurs de centraliser la gestion des élèves, du personnel, des finances et de la communication.

## 🚀 Fonctionnalités Clés

### 👨‍💼 Super Admin
- Gestion des écoles partenaires.
- Monitoring global de la plateforme.

### 🏫 School Admin (Gestion d'Établissement)
- **Tableau de Bord Intuitif** : Vue d'ensemble des revenus, dépenses et effectifs.
- **Gestion des Élèves** : Inscriptions, suivi des dossiers et statuts.
- **Gestion des Classes** : Organisation par niveaux et filières.
- **Suivi des Paiements** : Gestion des scolarités, facturation et relances.
- **Gestion des Notes & Bulletins** : Saisie des notes par période et génération automatique de bulletins PDF.
- **Suivi des Présences** : Pointage journalier des absences et retards.
- **Gestion du Personnel** : Répertoire des enseignants et staff.
- **Suivi des Dépenses** : Contrôle des sorties de fonds (salaires, loyers, fournitures).
- **Notifications SMS** : Envoi de rappels aux parents pour les paiements et absences.

## 🛠️ Stack Technique
- **Frontend** : Next.js 14 (App Router), Tailwind CSS.
- **Animations** : Framer Motion.
- **Backend & Auth** : Supabase (PostgreSQL, Auth, RLS).
- **Documents** : @react-pdf/renderer.

## 📈 État d'Avancement (Mars 2026)
Nous avons récemment complété la phase d'implémentation des modules cœurs :
- [x] **Module Présences** : Système d'émargement fonctionnel.
- [x] **Module Enseignants** : CRUD complet du personnel.
- [x] **Module Dépenses** : Intégration financière et calcul du profit net.
- [x] **Infrastructure SMS** : Couche d'abstraction `lib/sms.ts` prête pour intégration passerelle locale.

## ⚙️ Installation & Lancement

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/hadydieye/Edusphere-saas.git
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Variables d'environnement** :
   Créer un fichier `.env.local` avec les clés Supabase :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Lancer le serveur** :
   ```bash
   npm run dev
   ```

---
*Edusphère - L'excellence au service de l'éducation.*
