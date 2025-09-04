# Wheeltrip – Application Web (Next.js)

Application web **Wheeltrip** bâtie avec **Next.js (App Router, TypeScript)** et **Tailwind CSS**. 
Le dépôt inclut des **Dockerfiles** pour le dev et la prod, une config **Nginx** pour la prod, et un workflow GitHub Actions pour builder/publier l’image.

---

## Arborescence

```
.
├── .dockerignore
├── .gitignore
├── Dockerfile.dev
├── Dockerfile.prod
├── eslint.config.mjs
├── next.config.ts
├── nginx.conf
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.{js,ts}
├── tsconfig.json
├── public/
└── src/
    ├── app/                # App Router (pages, layouts, routes API)
    │   ├── api/            # Endpoints Next.js (auth, profile, reservation, config, secrets)
    │   ├── auth/           # Pages auth (login/register/forgot-password)
    │   ├── profile/        # Pages profil + sous‑pages (edit, settings)
    │   └── reservation/    # Pages de réservation (history, my-reservations, reserver)
    ├── lib/                # helpers & config (appConfig.ts)
    └── styles/             # Tailwind / CSS global
```

---

## Prérequis

- **Node.js 20 LTS** (recommandé) + **npm 10**
- **Docker** et **Docker Compose v2** (si vous utilisez les images)
- Accès à l’API backend (ex. **DataMedia**) et aux BDD si nécessaire

Vérifier :
```bash
node -v
npm -v
docker --version
```

---

## Variables d’environnement

Créer un fichier **`.env.local`** à la racine pour le développement local :

```env
# URL de l’API backend (ex. DataMedia)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Secrets côté serveur pour les routes /app/api (exemples)
DATAMEDIA_BASE_URL=http://localhost:8000
JWT_COOKIE_NAME=wheeltrip_token
JWT_SECRET=change_me

# Exemple de configuration complémentaire
NODE_ENV=development
```

> `NEXT_PUBLIC_*` est exposé au navigateur. Les secrets doivent rester **sans** le préfixe `NEXT_PUBLIC_` et n’être lus que côté serveur (routes `src/app/api/*`).

Pour la **prod**, utiliser des variables injectées par votre orchestrateur (Docker/Compose, K8s, etc.).

---

## Installation & lancement (local, sans Docker)

```bash
# 1) Installer les dépendances
npm ci

# 2) Lancer en mode dev (avec HMR)
npm run dev
# Application sur http://localhost:3000
```

Commandes utiles :
```bash
# Build production (génère .next)
npm run build

# Lancer la version buildée
npm run start

# Lint
npm run lint
```

---

## Lancement avec Docker

### Image de développement
Utilise `Dockerfile.dev` (montage du code, HMR activé).
```bash
docker build -f Dockerfile.dev -t wheeltrip-web:dev .
docker run --rm -it -p 3000:3000 --name wheeltrip-web-dev \
  --env-file .env.local \
  -v $(pwd):/app \
  wheeltrip-web:dev
# http://localhost:3000
```

### Image de production

Utilise `Dockerfile.prod` .
```bash
docker build -f Dockerfile.prod -t wheeltrip-web:prod .
docker run -d -p 3000:3000 --name wheeltrip-web \
  --env NEXT_PUBLIC_API_BASE_URL=https://api.example.com \
  wheeltrip-web:prod
```

---

## Intégration avec l’API (DataMedia)

- Les routes `src/app/api/*` servent de **couche serveur** (proxy, sécurisation, cookies JWT).
- Configurez `DATAMEDIA_BASE_URL` (serveur interne) et `NEXT_PUBLIC_API_BASE_URL` (URL publique si consommée côté client).
- 
---

## Déploiement (CI/CD)

Un workflow GitHub Actions est fourni :
```
.github/workflows/update-docker-image.yml
```
Il peut builder et pousser l’image Docker à chaque push/tag

---

## Dépannage

- **Échec d’appel API** : vérifier `NEXT_PUBLIC_API_BASE_URL` et les CORS/headers côté backend.
- **404 sur routes App Router** : contrôler l’arborescence `src/app/.../page.tsx` et `layout.tsx`.

