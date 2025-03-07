# Projet DP IHM

Ce projet est une application de gestion de projets développée avec Vue.js.

## Fonctionnalités

- Authentification (connexion/inscription)
- Gestion de profil utilisateur
- Vue d'ensemble des projets
- Tableau de bord avec statistiques
- Détails de projets individuels
- Filtrage et recherche de projets

## Technologies utilisées

- Vue.js 3
- Vue Router
- Axios pour les requêtes API
- Chart.js pour les visualisations
- TypeScript
- Vite comme build tool

## Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn

## Installation

1. Clonez le dépôt
```bash
git clone https://github.com/W3endigo/projet_DP_IHM
cd projet_DP_IHM
```

2. Installez les dépendances
```bash
npm install
```

3. Lancez le serveur de développement
```bash
npm run dev
```

## Structure du projet

```
projet_DP_IHM/
├── src/                  # Code source de l'application
│   ├── assets/           # Ressources statiques (images, etc.)
│   ├── components/       # Composants Vue réutilisables
│   ├── router/           # Configuration des routes
│   ├── views/            # Pages principales de l'application
│   ├── App.vue           # Composant racine
│   └── main.ts           # Point d'entrée de l'application
├── public/               # Fichiers publics
└── README.md             # Documentation du projet
```

## Pages principales

- **LoginView:** Page de connexion et d'inscription
- **HomeView:** Liste des projets avec options de filtrage
- **DashboardView:** Tableau de bord avec statistiques sur les projets
- **ProjectDetailView:** Détails d'un projet spécifique
- **ProfileView:** Gestion du profil utilisateur

## Composants

- **Header:** En-tête de l'application avec navigation et notifications
- **Autres composants spécifiques à l'application**

## API

L'application communique avec une API backend exposée sur `http://localhost:8082`. Les principales routes utilisées sont :

- `/api/auth/login` - Authentification
- `/api/auth/register` - Inscription
- `/api/user` - Informations sur l'utilisateur
- `/api/user/participations` - Projets de l'utilisateur
- `/api/companies` - Liste des entreprises

## Tests

```bash
# Exécuter les tests unitaires
npm run test

# Exécuter les tests end-to-end
npm run test:e2e
```

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile pour la production
- `npm run preview` - Prévisualise la build de production

## Auteurs

- Équipe ISEN CIPASIMAL

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.
