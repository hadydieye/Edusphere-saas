# Edusphère 🎓

**La gestion scolaire numérique pour la Guinée**

Edusphère est une plateforme SaaS de gestion scolaire conçue spécifiquement pour les établissements guinéens. Interface entièrement en français.

## Fonctionnalités

- 🏫 **Gestion des classes** — Création, organisation et suivi des classes par niveau
- 👨‍🎓 **Gestion des élèves** — Fiches élèves, recherche, profils avec notes par matière
- 📝 **Saisie des notes** — Interface professeur avec calcul automatique des moyennes
- 📄 **Bulletins** — Génération de bulletins avec moyennes pondérées et classement
- 👪 **Espace parent** — Vue mobile responsive pour consulter notes et bulletins
- 🔐 **Authentification** — Connexion par rôle (admin, professeur, parent)

## Stack technique

- **Frontend** : React 18 + TypeScript + Vite
- **UI** : Tailwind CSS + shadcn/ui
- **Animations** : Framer Motion
- **Routing** : React Router DOM

## Palette de couleurs

| Rôle        | Couleur   |
|-------------|-----------|
| Primary     | `#1A5276` |
| Secondary   | `#2980B9` |
| Background  | `#F4F6F9` |
| Text        | `#2C3E50` |

## Lancer le projet

```sh
# Cloner le dépôt
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## Structure des pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Page d'accueil publique |
| Connexion | `/login` | Authentification |
| Tableau de bord | `/dashboard` | Vue admin principale |
| Classes | `/dashboard/classes` | Gestion des classes |
| Élèves | `/dashboard/eleves` | Gestion des élèves |
| Notes | `/dashboard/notes` | Saisie des notes (professeur) |
| Bulletins | `/dashboard/bulletins` | Génération de bulletins |
| Espace parent | `/parent` | Vue mobile parent |

## Tarification (GNF/an)

- **Starter** : 500 000 GNF — jusqu'à 200 élèves
- **Pro** : 1 000 000 GNF — jusqu'à 1 000 élèves
- **Enterprise** : 2 000 000 GNF — illimité

## Licence

Projet privé — Tous droits réservés.
