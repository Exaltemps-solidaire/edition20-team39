# Plan d'itérations

**Plan validé par le développeur le 2026-11-18** (go donné explicitement pour démarrer l'Itération 1, pas de tour de cadrage séparé vu la contrainte de temps).

- **Source du plan** : proposé par l'agent. Aucun plan d'itérations fait par l'équipe n'a été trouvé dans la passation (`cadrage/` ne contient pas de fichier `iteration`, `passation.json` n'a pas de clé `iterations`). Base de départ : `passation/cadrage/6-plan-de-livraison.md` (priorités de la squad) + le PRD de `PASSATION.md`, ajustés par `docs/analyse-maquette-donnees-asso.md` et les décisions du 2026-11-18 dans `adr.md`.
- **Temps restant annoncé** : 30 minutes, au moment de cette planification (2026-11-18). Reconfirmé à ~30 minutes au début de l'Itération 1.
- **Durée du tour de test** : 10 minutes (valeur par défaut, le développeur ne connaît pas de chiffre précis).
- **Capacité** : une itération coûte au moins codage (≤10 min) + publication (~5 min) + tour de test (10 min), soit 20 à 25 minutes au mieux. ⚠️ La plateforme (`core-platform`) n'est pas démarrée : son démarrage prend plusieurs minutes, à lancer en tâche de fond dès le début du codage. **Une seule itération tient dans les 30 minutes restantes, avec peu de marge.**
- **Hors périmètre** (déjà acté par la squad, cf. `PASSATION.md`) : système de points, badges de succès, calendrier de disponibilités, connexion/comptes, parcours BBA/BIB/Sentinelle, validation des pitchs d'ateliers, front-office existant.
- **Hors périmètre** (✂️ coupé faute de temps, reporté en « À venir ») : tout sauf le dashboard en lecture seule avec données en dur — fiche profil, édition du statut, ajout de formation, recherche/filtre fonctionnels, sélecteur de rôle, import Excel, filtrage par antenne.

---

## Itération 1 : le dashboard des profils, en ligne, avec des données en dur

- **Dans le périmètre** :
  - Compléter le squelette déjà posé (`api/`, `frontend/`) : `.env.example` et `DEPLOIEMENT.md` à la racine (règles 2 et 8 du contrat de déployabilité — `/health` et `/sante` existent déjà dans les deux services).
  - Écran dashboard (liste des profils), repris du visuel de `passation/prototype/index.html` : trois sections BURN'ettes / ACTIV' / Pair-aidantes, 3 à 4 profils d'exemple par section, données en dur dans le frontend. Filtre et recherche peuvent rester cosmétiques, comme dans la maquette.
  - Une fonction pure qui détermine la section d'affichage d'un profil à partir d'un état **imbriqué** (BURN'ette de base, `estActiv`, `estPairAidante`), conformément à la décision du 2026-11-18 (`adr.md`) : le modèle de données n'est pas un statut exclusif, même si l'écran affiche une seule section par profil.
- **Hors périmètre** : clic vers la fiche profil, édition du statut, ajout de formation, sélecteur « Qui êtes-vous ? », import Excel, filtrage par antenne — reportés en « À venir ».
- **Critères d'acceptation** :
  - Étant donné l'URL publique de l'application, quand on l'ouvre, alors le dashboard affiche les trois sections BURN'ettes / ACTIV' / Pair-aidantes avec des profils d'exemple, dans le visuel de la maquette retenue.
  - Étant donné un profil d'exemple à la fois ACTIV' et Pair-aidante, quand le dashboard le classe, alors il apparaît uniquement dans la section Pair-aidante (la plus avancée), jamais dans ACTIV' en double.
  - Étant donné l'URL publique, quand on demande `/health` et `/sante` sur le front (8080) et l'API (8081), alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune directement — l'hypothèse de la squad (0 outil externe pour tracer une habilitation) porte sur l'édition du statut, prévue à l'itération suivante. Cette itération pose un modèle de données qui ne la contredira pas plus tard.
- **Codage estimé** : 10 minutes (plafond).
- **Fichiers prévus** :
  - `.env.example`
  - `DEPLOIEMENT.md`
  - `frontend/src/lib/profils.ts` (types, données d'exemple, fonction de regroupement par section)
  - `frontend/src/app/page.tsx` (écran dashboard)
  - `frontend/src/app/page.module.css` (styles repris du prototype)
- **Tests unitaires prévus** : 1 à 2, Vitest, sur la fonction de regroupement par section (cas simple BURN'ette seule ; cas imbriqué ACTIV' + Pair-aidante → doit ressortir en Pair-aidante).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouverture de l'URL publique, vérification que les trois sections et au moins un profil de chacune sont visibles.
- **Bilan** :
  - Durée de codage réelle : 4 minutes (budget 10 minutes, pas d'alarme à 8 minutes).
  - Les 3 critères d'acceptation sont satisfaits, vérifiés en local (`curl localhost:8080/`, `/health`, `/sante` sur 8080 et 8081 → 200 ; contenu du dashboard vérifié par grep).
  - Rien n'est reporté côté critères d'acceptation. Reste prévu dans « À venir », inchangé.
  - Signal à PM Lab accepté du premier coup (`scripts/signaler-version.sh 1`) ; rien bloqué par le harnais (tests verts, contrat de déployabilité propre).
  - ⚠️ Incident hors codage, côté déploiement : le démarrage de `core-platform` a buté sur la limite de débit anonyme de Docker Hub (partagée par les 85 VM de l'événement) — `registry`, `postgres` (pgvector), le stockage objet, `temporal` et `casdoor` n'ont pas pu être tirés au premier essai. Contournement : tirage de chaque image manquante depuis `mirror.gcr.io` puis retaguage local (`docker.io/...`), avant de relancer le démarrage. Correctif distinct et nécessaire : les `Dockerfile` utilisaient des noms courts (`node:24-alpine`, `nginx:1.27-alpine`) au lieu de `docker.io/library/...`, corrigé avant la construction des images.
  - Démo Playwright mise à jour (nouvelle étape), mais non exécutable localement : navigateur Chromium de Playwright non installé sur cette machine. Ne bloque pas la publication (la démo n'est pas un test).
  - **Modifications** :
    - `frontend/src/lib/profils.ts` (créé) : modèle imbriqué, fonction `sectionAffichee`, données d'exemple — sert le critère 2.
    - `frontend/src/lib/profils.test.ts` (créé) : 3 tests Vitest sur le regroupement par section — DoD point 2.
    - `frontend/src/app/page.tsx` (réécrit) : écran dashboard, sert les critères 1 et 2.
    - `frontend/src/app/page.module.css` (réécrit) : styles repris de la charte graphique officielle (`docs/contexte-lburn-docs/10-charte-graphique.md`), pas de l'ancienne palette du prototype.
    - `.env.example`, `DEPLOIEMENT.md` (créés) : DoD point 3.
    - `api/Dockerfile`, `frontend/Dockerfile` (édités) : qualification `docker.io/library/...` des images de base, cf. incident ci-dessus.
    - `frontend/nginx.conf` (édité) : en-têtes de sécurité (CSP, X-Frame-Options…) adaptés du gabarit de la plateforme.
    - `podman-compose.yml` (créé) : recette de déploiement à la racine, cf. `/CLAUDE.md` du serveur.
    - `e2e/demo.spec.ts` (édité) : étape « je vois le dashboard » ajoutée.

---

## À venir (liste ordonnée, à détailler au fil de l'eau)

> Référence visuelle à jour : `maquettes/dashboard-fiche-profil.html` (commit `52c9ec6`, produit en parallèle de l'Itération 1), qui reprend la vraie palette du site L'BURN (contraste AA) au lieu de celle inventée par `passation/prototype/index.html`. Les tokens de couleur utilisés dans `frontend/src/app/page.module.css` sont déjà alignés dessus (mêmes valeurs `--lb-color-*`, mêmes couleurs par section). À comparer avant de coder l'écran suivant.

1. Fiche profil (écran 2) : navigation depuis le dashboard, affichage figé (nom, antenne, date d'entrée, sous-progression par statut) — reprendre `maquettes/dashboard-fiche-profil.html`.
2. Édition du statut ACTIV' → Pair-aidante, avec sous-progression interne à chaque statut (candidature « en cours » / « validée » pour ACTIV' ; formation / habilitation / supervision séparées pour Pair-aidante) — proposition graphique à faire **avant** de coder cette itération (décision du 2026-11-18, `adr.md`).
3. Ajout / modification d'une formation sur la fiche profil.
4. Recherche et filtre fonctionnels sur le dashboard.
5. Sélecteur « Qui êtes-vous ? » (changement de rôle sans connexion, cf. PRD).
6. Import Excel avec correspondance manuelle des colonnes (pas de mapping automatique — colonnes réelles inconnues, cf. `docs/analyse-maquette-donnees-asso.md` §6).
7. Filtrage du dashboard par antenne pour la directrice d'antenne — reporté, non géré aujourd'hui (référentiel d'antenne pas encore tranché, cf. §4 et §7 de l'analyse).
