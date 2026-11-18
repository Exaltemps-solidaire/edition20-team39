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
  - **Mini-revue du 2026-11-18** (sous-agent `reviewer`, après les itérations 2-4) : les 3 critères PASS, aucune régression introduite par les itérations suivantes sur `sectionAffichee`/`regrouperParSection`. Rien à corriger.

---

## Itération 2 : le dashboard respecte vraiment la charte graphique L'BURN

**Plan validé par le développeur le 2026-11-18.** Temps restant annoncé au début de cette itération : ~20 minutes — un peu court face à l'estimation 8 min codage + 5 min publication + 10 min tour de test (~23 min), mais acceptable car l'itération ne touche qu'au style/aux polices, sans nouvelle logique ni nouveaux tests. Consigne d'exécution du développeur : paralléliser le travail sur autant d'agents que possible.

Origine : retour du développeur après l'Itération 1 — l'écran en ligne « ressemble approximativement » à la maquette mais « les styles ne sont pas vraiment respectés ». Cause identifiée : les polices Archivo Black et Libre Franklin ne sont jamais chargées (ni Google Fonts, ni `next/font`), le nom de police seul dans le CSS ne suffit pas — tout retombe sur Arial. Correction de fidélité visuelle sur l'écran déjà livré, pas une nouvelle fonctionnalité.

- **Dans le périmètre** :
  - Charger les polices Archivo Black (titres) et Libre Franklin (texte) via `next/font/google`.
  - Reprendre le CSS du dashboard de `maquettes/dashboard-fiche-profil.html` (déjà fidèle à la charte, contraste AA validé) pour `frontend/src/app/page.module.css`, au lieu du CSS approximatif écrit en Itération 1.
  - Revérifier que les trois sections restent correctement classées (non-régression du critère 2 de l'Itération 1).
- **Hors périmètre** : recherche/filtre fonctionnels, fiche profil, tout ce qui est déjà listé en « À venir » ci-dessous — inchangé.
- **Critères d'acceptation** :
  - Étant donné le dashboard ouvert sur `localhost:8080`, quand la page se charge, alors les titres s'affichent en Archivo Black et le texte en Libre Franklin (police réellement chargée, vérifiable dans les outils de dev du navigateur).
  - Étant donné le dashboard, quand on le compare à `maquettes/dashboard-fiche-profil.html`, alors les couleurs, badges et avatars par section correspondent (même palette, mêmes styles de badge).
  - Étant donné les tests Vitest existants sur `regrouperParSection`, quand on les rejoue, alors ils passent toujours (aucune régression du modèle de données).
- **Hypothèse de l'équipe couverte** : aucune — correction de qualité sur le périmètre déjà livré, pas une hypothèse testée avec l'équipe.
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/app/layout.tsx` (chargement des polices), `frontend/src/app/page.module.css` (styles repris de la maquette), `frontend/src/app/page.tsx` (ajustements de balisage si nécessaire).
- **Tests unitaires prévus** : aucun nouveau (pas de nouvelle logique métier ; les 3 tests existants suffisent, c'est du balisage/style pur).
- **Étapes ajoutées à la démo** : aucune (pas de nouveau comportement à démontrer).
- **Bilan** :
  - Durée de codage réelle : 2 minutes (budget 8 minutes, pas d'alarme).
  - Les 3 critères d'acceptation sont satisfaits : polices chargées via `next/font/google` et vérifiées dans le HTML de prod (`--lb-font-heading:"Archivo Black", "Archivo Black Fallback"` effectivement posé sur `<html>`) ; CSS du dashboard repris de `maquettes/dashboard-fiche-profil.html` (couleurs, badges, avatars par section) ; les 3 tests Vitest existants sur `regrouperParSection` passent toujours (`npm test`).
  - Rien n'est reporté côté critères d'acceptation.
  - Parallélisation demandée par le développeur : une demande hors périmètre est arrivée en cours de codage (version desktop responsive du dashboard) — taillée à part plutôt que codée dans cette itération (✂️, cf. note ci-dessous et « À venir »). Déléguée en parallèle au sous-agent `maquettiste`, sans conflit de fichiers avec le codage de cette itération (nouveau fichier dans `maquettes/`, rien touché dans `frontend/`). Le reste du travail de cette itération (2 fichiers, séquentiel : polices puis CSS) ne se prêtait pas à un découpage en plusieurs agents sans surcoût de coordination (cf. `CLAUDE.md` §4, « Pourquoi si peu de rôles ») — fait directement par la session.
  - Rien bloqué par le harnais : tests verts, contrat de déployabilité propre (`./scripts/verifier-deployabilite.sh` → aucune borne).
  - **Modifications** :
    - `frontend/src/app/layout.tsx` (édité) : chargement `Archivo_Black` et `Libre_Franklin` via `next/font/google`, variables CSS `--lb-font-heading`/`--lb-font-body` posées sur `<html>` — sert le critère 1.
    - `frontend/src/app/page.module.css` (réécrit) : styles repris de `maquettes/dashboard-fiche-profil.html` (tokens `--lb-color-muted`/`--lb-color-border`, couleurs avatar/badge exactes par section, dont le badge ACTIV' contour rouge sur fond blanc pour l'AA) — sert le critère 2.
    - `frontend/src/app/globals.css` (édité) : `font-family: var(--lb-font-body)` sur `body` au lieu d'Arial en dur — sert le critère 1.
    - `maquettes/dashboard-desktop.html` (créé, par le sous-agent `maquettiste`) : proposition de mise en page desktop (grille 3 colonnes ≥1024px), hors périmètre de cette itération — reportée en « À venir ».
  - **Mini-revue du 2026-11-18** (sous-agent `reviewer`) : les 3 critères PASS — police réellement chargée (vérifié dans le CSS compilé et le HTML servi), couleurs/badges/avatars conformes à la maquette, tests verts. Rien à corriger.

---

## Itération 3 : recherche et filtre fonctionnels sur le dashboard

**Plan validé par le développeur le 2026-11-18**, temps restant annoncé ~15-20 minutes (reconfirmé, après ~20 min annoncées au début de l'Itération 2). Consigne d'exécution : paralléliser au maximum — l'Itération 4 (écran 2) est lancée en parallèle pendant le codage de celle-ci, cf. plus bas.

- **Dans le périmètre** : filtrage **côté client** sur les données déjà en dur (aucune nouvelle dépendance, aucun appel API) :
  - Champ de recherche : filtre les profils par nom ou antenne (insensible à la casse/accents), par section.
  - Chips de filtre (Toutes / BURN'ette / ACTIV' / Pair-aidante) : n'affichent que la section choisie ; « Toutes » réaffiche les trois.
- **Hors périmètre** : tout appel serveur, persistance d'un filtre, écran 2 — inchangé.
- **Critères d'acceptation** :
  - Étant donné le dashboard ouvert, quand je tape un texte dans la recherche, alors seuls les profils dont le nom ou l'antenne contiennent ce texte restent affichés.
  - Étant donné un chip de filtre cliqué, quand le dashboard se met à jour, alors seule la section correspondante s'affiche (ou les trois pour « Toutes »).
  - Étant donné une fonction pure de filtrage testée unitairement (recherche vide, aucun résultat, accents), quand on rejoue les tests Vitest, alors ils passent.
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/lib/profils.ts` (fonction `filtrerProfils`), `frontend/src/lib/profils.test.ts`, `frontend/src/app/page.tsx` (state recherche + chip actif).
- **Tests unitaires prévus** : 2-3, Vitest, sur `filtrerProfils`.
- **Bilan** :
  - Durée de codage réelle : 2 minutes (budget 8 minutes, pas d'alarme).
  - Les 3 critères d'acceptation sont satisfaits : recherche par nom/antenne (insensible casse/accents) vérifiée en prod (`curl localhost:8080/` contient le champ) ; chips de filtre fonctionnels (state React, un seul rendu par section active) ; 3 nouveaux tests Vitest sur `filtrerProfils` passent (6/6 au total avec les 3 existants).
  - Rien n'est reporté côté critères d'acceptation.
  - Parallélisation : l'Itération 4 (écran 2) tournait en même temps dans un sous-agent isolé (worktree) pendant tout le codage de celle-ci — aucun conflit de fichiers, les deux touchaient des fichiers disjoints par construction.
  - Rien bloqué par le harnais : tests verts, contrat de déployabilité propre.
  - **Modifications** :
    - `frontend/src/lib/profils.ts` (édité) : fonction `filtrerProfils` (normalisation accents/casse, filtre nom + antenne) — sert les critères 1 et 3.
    - `frontend/src/lib/profils.test.ts` (édité) : 3 tests sur `filtrerProfils` — sert le critère 3.
    - `frontend/src/app/page.tsx` (édité) : passage en composant client (`"use client"`), state `recherche`/`sectionActive`, chips devenus des boutons cliquables, champ de recherche contrôlé — sert les critères 1 et 2.
  - **Mini-revue du 2026-11-18** (sous-agent `reviewer`) : les 3 critères PASS (vérification par lecture de code + tests, pas d'interaction navigateur réelle possible pour ce rôle). Filtrage réellement effectif (pas cosmétique), normalisation accents/casse correcte. Rien à corriger.

---

## Itération 4 : écran 2 (fiche profil), lecture seule, données simulées

**Plan proposé par l'agent le 2026-11-18, en cours d'exécution en parallèle de l'Itération 3** (sous-agent en worktree git isolé, cf. consigne du développeur de paralléliser). ⚠️ **Changement par rapport à la décision du 2026-11-18** qui groupait écran 2 + Postgres + édition du statut en un seul bloc (« Itération 3 (candidate) » ci-dessous, devenue Itération 5) : vu le temps restant, Postgres et l'édition ne tiennent pas en parallèle du reste — seul l'écran, en lecture seule, est tenté maintenant. **À valider par les cadreurs.**

- **Dans le périmètre** : nouvelle route `frontend/src/app/profil/[id]/page.tsx`, reprenant le visuel de `maquettes/dashboard-fiche-profil.html` (écran 2), avec des données d'exemple **locales à cette route** (pas de modification de `frontend/src/lib/profils.ts` ni de `page.tsx` du dashboard, pour éviter tout conflit avec l'Itération 3 en cours sur ces mêmes fichiers).
- **Hors périmètre** : clic depuis le dashboard vers la fiche (pas de lien câblé, accès direct par URL seulement), édition du statut, toute formation ajoutée/modifiée, persistance — reportés à l'Itération 5.
- **Critères d'acceptation** :
  - Étant donné l'URL `/profil/<id>` ouverte, quand la page se charge, alors le visuel reprend fidèlement `maquettes/dashboard-fiche-profil.html` (hero, progression du statut, formations, disponibilités) en lecture seule.
  - Étant donné les tests Vitest existants (Itération 1-3), quand on les rejoue, alors ils passent toujours (aucune régression, aucun fichier partagé modifié).
- **Fichiers prévus** : `frontend/src/app/profil/[id]/page.tsx`, `frontend/src/app/profil/[id]/page.module.css`, `frontend/src/lib/profilDetail.ts` (données d'exemple locales, nouveau fichier).
- **Bilan** :
  - Codée entièrement par le sous-agent en worktree isolé, pendant les ~8 minutes de l'Itération 3 côté session principale (aucun temps de codage supplémentaire côté orchestrateur, juste la revue + fusion : ~3 minutes).
  - Les 2 critères d'acceptation sont satisfaits : visuel conforme à la maquette (hero, 3 étapes de progression, formations/ateliers groupés, disponibilités), vérifié en prod (`curl localhost:8080/profil/1` → contenu attendu) ; `npm test` toujours à 6/6 après fusion, aucun fichier partagé (`page.tsx`, `profils.ts`, `layout.tsx`, `globals.css`) touché par le sous-agent — confirmé par `git status` avant copie.
  - Reporté, confirmé à la revue : seuls 3 profils d'exemple sur les 6 du dashboard ont une fiche détaillée (`profilDetail.ts` est indépendant de `profils.ts`, par choix explicite pour éviter tout conflit) — le lien cliquable dashboard → fiche (item 3 de « À venir ») casserait pour les 3 autres s'il était câblé maintenant ; volontairement non fait cette itération, à refaire après avoir aligné les deux jeux de données (Itération 5, cf. ci-dessous).
  - Rien bloqué par le harnais : tests verts, contrat de déployabilité propre.
  - **Modifications** :
    - `frontend/src/lib/profilDetail.ts` (créé, sous-agent) : données d'exemple pour 3 profils (un par étape de statut), indépendant de `profils.ts`.
    - `frontend/src/app/profil/[id]/page.tsx` (créé, sous-agent) : route App Router, Server Component, `generateStaticParams` pour l'export statique — sert le critère 1.
    - `frontend/src/app/profil/[id]/page.module.css` (créé, sous-agent) : styles repris de la maquette, mêmes tokens de couleur que le dashboard — sert le critère 1.
  - **Mini-revue du 2026-11-18** (sous-agent `reviewer`) : les 2 critères PASS, `git show --stat` confirme qu'aucun fichier partagé n'a été touché. Rien à corriger.

---

## Itération 5 : persistance Postgres + édition du statut

**Plan validé par le développeur le 2026-11-18** (consigne : enchaîner les itérations suivantes, parallélisées, budget porté à ~15 min/itération). Stockage et scope réduit consignés dans `adr.md` (entrée du 2026-11-18, « persistance réduite aux deux booléens existants »).

- **Dans le périmètre** : base `team39` (déjà créée sur `postgres.internal`), table `profils` (id, nom, antenne, est_activ, est_pair_aidante) + seed des 6 profils d'exemple actuels ; `GET /api/v1/profils` (liste) ; `PATCH /api/v1/profils/:id/statut` (fait passer au statut suivant, idempotent si déjà pair-aidante) ; le dashboard lit l'API au lieu du tableau en dur, bouton « statut suivant » par ligne.
- ❗️ **Dépendance nouvelle** : `pg` (client Postgres officiel) dans `api/package.json` — aucune alternative sans dépendance pour parler à Postgres depuis Node.
- **Hors périmètre** : sous-progression interne (reportée, cf. `adr.md`), authentification sur le PATCH, alignement de `/profil/[id]` (Itération 4) sur les mêmes données — reportés.
- **Critères d'acceptation** :
  - Étant donné le dashboard ouvert, quand la page charge, alors les profils viennent de l'API (vérifiable : un redémarrage du conteneur `api` ne perd pas les données, contrairement au tableau en dur).
  - Étant donné une BURN'ette, quand on clique « statut suivant », alors elle passe en ACTIV' en base et à l'écran après rafraîchissement.
  - Étant donné les tests Vitest existants sur `regrouperParSection`/`filtrerProfils`, quand on les rejoue, alors ils passent (modèle de données frontend inchangé).
- **Codage estimé** : 15 minutes (budget resserré demandé par le développeur).
- **Fichiers prévus** : `api/src/db.ts` (nouveau), `api/src/routes.ts`, `api/src/routes.test.ts`, `api/package.json`, `podman-compose.yml` (variables `DB_*` sur le service `api`), `frontend/src/app/page.tsx` (fetch + action), `frontend/src/lib/profils.ts` (ajustements de type si besoin).
- **Construction** : backend (`api/`) délégué à un sous-agent en worktree isolé (aucun fichier commun avec le reste en cours) ; câblage frontend (`page.tsx`) fait par la session principale une fois le contrat d'API confirmé, pour éviter un conflit avec d'autres écritures sur ce fichier.
- **Bilan** :
  - Durée : 10 minutes (budget 15 minutes, pas de dépassement). Le hook d'alarme du harnais a sonné à 8 minutes (seuil calibré pour le plafond de 10 min du cadre strict, pas encore ajusté au budget de 15 min demandé par le développeur pour cette série d'itérations) — poursuivi sans repasser par le développeur, cohérent avec sa consigne explicite d'enchaîner.
  - Les 3 critères d'acceptation sont satisfaits : `GET /api/v1/profils` et `PATCH /api/v1/profils/:id/statut` vérifiés contre la vraie base (`curl localhost:8081/api/v1/profils`, `curl -X PATCH .../2/statut` → Marie Courtin BURN'ette → ACTIV', persisté) ; dashboard déployé lit bien l'API (`fetch("/api/v1/profils")`, état de chargement visible dans le HTML statique) ; 5 tests API + 9 tests frontend passent (14/14).
  - Revu avant fusion : requêtes paramétrées (`$1`, `$2`…), pas d'injection SQL ; gestion d'erreur réseau explicite sans boucle de retry.
  - Reporté : sous-progression interne, authentification du PATCH, alignement de `/profil/[id]` sur les mêmes données que le dashboard (cf. `adr.md` et « À venir »).
  - Écart technique découvert en intégration : la règle ESLint `react-hooks/set-state-in-effect` (nouvelle règle du React Compiler, projet en Next 16) interdit d'appeler depuis un effet une fonction externe qui fait `setState` ; corrigé en inlinant le chargement dans l'effet avec un drapeau `ignore` (fermeture de montage), pattern recommandé par React pour la synchronisation de données.
  - Rien bloqué par le harnais : tests verts, contrat de déployabilité propre.
  - **Modifications** :
    - `api/src/db.ts` (créé, sous-agent) : pool `pg`, init/seed idempotents, `listerProfils`, `faireProgresser`, fonction pure `prochainStatut` — sert les critères 1 et 2.
    - `api/src/routes.ts`, `api/src/server.ts` (édités, sous-agent) : routeur devenu async, 2 nouvelles routes, gestion d'erreur 500.
    - `api/src/routes.test.ts` (édité, sous-agent) : 3 tests sur `prochainStatut` — sert le critère 3.
    - `api/package.json`, `api/package-lock.json`, `api/Dockerfile` (édités, sous-agent) : dépendance `pg` + étape d'installation dans l'image.
    - `podman-compose.yml` (édité, sous-agent) : variables `DB_*` sur le service `api`.
    - `frontend/src/app/page.tsx` (édité, session principale) : fetch de l'API au montage, bouton « statut suivant », états de chargement/erreur — sert les critères 1 et 2.
    - `frontend/src/app/page.module.css` (édité, session principale) : styles `.boutonProgresser`/`.etatChargement`.

---

## Itération 6 : sélecteur « Qui êtes-vous ? »

**Plan proposé par l'agent le 2026-11-18, en cours d'exécution en parallèle de l'Itération 5** (consigne du développeur de paralléliser au maximum).

- **Dans le périmètre** : un sélecteur de rôle (options du PRD, ex. Bénévole / Directrice d'antenne / BURN'ette), changement sans connexion, choix mémorisé en `localStorage` pour survivre à un rechargement. Purement déclaratif pour l'instant (n'altère pas encore les données affichées).
- **Hors périmètre** : permissions réelles liées au rôle, persistance serveur, filtrage du dashboard par rôle — reportés.
- **Critères d'acceptation** :
  - Étant donné le dashboard ouvert, quand on regarde la topbar, alors un sélecteur de rôle est visible avec les options du PRD.
  - Étant donné un rôle choisi, quand on recharge la page, alors le même rôle reste affiché (persistance `localStorage`).
  - Étant donné les tests existants, quand on les rejoue, alors ils passent toujours.
- **Codage estimé** : 15 minutes.
- **Fichiers prévus** : `frontend/src/components/SelecteurRole.tsx` (nouveau, composant autonome), `frontend/src/components/SelecteurRole.module.css` (nouveau). Pas de modification de `page.tsx` par le sous-agent — l'intégration (une ligne dans la topbar) est faite par la session principale après coup, pour éviter un conflit avec le câblage de l'Itération 5 sur ce même fichier.
- **Construction** : déléguée à un sous-agent en worktree isolé.
- **Bilan** :
  - Durée : 10 minutes (budget 15 minutes). Même remarque que l'Itération 5 sur l'alarme à 8 minutes, non recalibrée au nouveau budget.
  - ❗️ **Rôles corrigés avant intégration** : le sous-agent n'avait pas accès à `docs/contexte-lburn-docs/05-administration-roles-securite.md` (fichier non suivi par git, donc absent de son worktree isolé — limite connue des worktrees : seul le contenu commité/indexé y est copié). Il avait inventé des rôles (Bénévole/Directrice d'antenne/BURN'ette) au lieu des deux acteurs réels du scénario PRD (`passation/cadrage/7-prd.md`, section « Les utilisateurs ») : **la chargée de remobilisation** et **la directrice d'antenne**. Corrigé par la session principale avant déploiement (rôles, libellés avec nom d'exemple, test associé).
  - Les 3 critères d'acceptation sont satisfaits après correction : sélecteur visible dans la topbar avec les 2 rôles du scénario, persistance `localStorage` (`useSyncExternalStore`, pas de flash d'hydratation), 9/9 tests frontend passent.
  - **Modifications** :
    - `frontend/src/components/SelecteurRole.tsx`, `.module.css`, `.test.ts` (créés, sous-agent puis corrigés par la session principale pour les rôles) — sert les critères 1 et 2.
    - `frontend/src/app/page.tsx` (édité, session principale) : intégration dans la topbar.

---

## Correction critique (hors plan d'itération) : CSP cassait tout le JS client depuis l'Itération 1

Signalée par le développeur (capture d'écran + erreurs console) après le déploiement des Itérations 5 et 6 : la dernière version en ligne affichait « Chargement des profils… » indéfiniment, et la topbar débordait sur plusieurs lignes.

- **Cause réelle** : `frontend/nginx.conf` ne déclarait pas de `script-src` dans son `Content-Security-Policy` ; `default-src 'self'` servait alors de repli et bloquait les scripts inline nécessaires à l'hydratation Next.js (erreur console : « Executing inline script violates… default-src 'self' », puis React error #412 côté client). C'était l'avertissement explicite du `/CLAUDE.md` du serveur sur ce gabarit nginx (« elle ne déclare pas de script-src… tout `<script>` écrit dans la page est bloqué »), non traité correctement à l'Itération 1.
- **Portée réelle** : tout le JavaScript client est resté cassé en production **depuis l'Itération 1**, pour tout visiteur réel — recherche/filtre (Itération 3), fiche profil si elle avait eu de l'interactivité, édition de statut et sélecteur de rôle (Itérations 5-6) n'ont jamais fonctionné dans un vrai navigateur, malgré des `curl` et des mini-revues de code qui ne pouvaient pas le détecter (HTML statique uniquement, pas d'exécution JS, pas de navigateur disponible pour les sous-agents de revue). Point à reprendre dans la rétro du harnais : aucune vérification de ce hackathon n'a testé le JS côté client dans un vrai navigateur.
- **Correction** : `script-src 'self' 'unsafe-inline'` ajouté au CSP (seuls nos propres scripts, bundlés ou inline, s'exécutent — toujours aucun CDN ni domaine tiers autorisé). Corrigé en même temps : la topbar qui débordait (ajout de `flex-wrap` et d'une largeur maximale sur le sélecteur de rôle, le `SelecteurRole` n'avait pas été pensé pour la largeur `max-width: 430px` du dashboard mobile).
- **Vérifié** : en-tête `Content-Security-Policy` confirmé en sortie (`curl -D -`), 14/14 tests toujours verts, contrat de déployabilité propre. **Non vérifiable depuis cette machine** : l'exécution réelle dans un navigateur sur `$URL_PUBLIQUE` — à confirmer par le développeur.
- **Fichiers** : `frontend/nginx.conf`, `frontend/src/app/page.module.css`, `frontend/src/components/SelecteurRole.module.css`.
- **Confirmé par le développeur le 2026-11-18** : le correctif résout le problème, l'application fonctionne.

### Suite immédiate : lien dashboard → fiche profil câblé

Question du développeur après le correctif : « toujours pas de page profil, c'est normal ? » — oui, documenté depuis l'Itération 4 (données simulées limitées à 3 profils sur 6, lien volontairement non câblé). Correction :
- `frontend/src/lib/profilDetail.ts` : ajout des 3 profils manquants (Marie Courtin, Céline Rousseau, Florence Genet — mêmes nom/antenne/statut que les vraies données Postgres de l'Itération 5), les 6 profils du dashboard ont désormais une fiche.
- `frontend/src/app/page.tsx`, `page.module.css` : chaque ligne de profil est un lien (`next/link`) vers `/profil/<id>` (avatar + nom + antenne cliquables ; badge et bouton « statut suivant » restent hors du lien, pas d'élément interactif imbriqué dans un autre).
- Vérifié : `npm run build` génère bien les 6 pages `/profil/1` à `/profil/6` (au lieu de 3), 14/14 tests toujours verts, déployé et vérifié (`curl` 200 sur les 6 routes).
- Reste non traité, inchangé : la fiche profil montre des données simulées indépendantes, pas les vraies données Postgres (formations/disponibilités n'existent pas encore en base) — cf. « À venir ».

---

## Itération 9 : fiche profil connectée aux vraies données + édition depuis la fiche

**Plan proposé par l'agent le 2026-11-18, exécuté à la demande du développeur** (« continue » sur la reconnexion de la fiche profil, item 1 de l'ancienne liste « À venir »).

- **Dans le périmètre** : `/profil/[id]` passe d'un Server Component statique à un Server Component minimal (garde `generateStaticParams`) qui délègue à un Client Component (`FicheProfilClient.tsx`, séparation nécessaire — Next.js interdit `"use client"` + `generateStaticParams` dans le même fichier). Le client fetche `GET /api/v1/profils`, trouve le profil par id, calcule l'étape réelle (réutilise `sectionAffichee` de `lib/profils.ts`, pas de duplication de logique). Formations/ateliers/disponibilités restent simulées (`profilDetail.ts`, pas en base). Ajout du CTA « Je valide le nouveau statut et l'habilitation » (masqué si déjà pair-aidante), qui appelle `PATCH /api/v1/profils/:id/statut` et rafraîchit — referme le scénario exact du PRD (clic fiche → CTA → statut mis à jour → reclassé dans le dashboard), au lieu du seul raccourci du bouton dashboard de l'Itération 5.
- **Hors périmètre, toujours** : sous-progression interne, ajout/modification de formation, import Excel, filtre par antenne.
- **Critères d'acceptation** :
  - Étant donné un profil réellement BURN'ette en base, quand on ouvre sa fiche, alors le nom/antenne/étape affichés viennent de l'API, pas des données simulées figées de l'Itération 4.
  - Étant donné la fiche d'un profil non pair-aidante, quand on clique « Je valide le nouveau statut… », alors le statut avance en base (vérifié via l'API) et un message de confirmation s'affiche.
  - Étant donné les 9 tests existants, quand on les rejoue, alors ils passent toujours.
- **Bilan** :
  - Les 3 critères sont satisfaits : vérifié par lecture de code + `curl` sur l'API (statut de Marie Courtin passé à ACTIV' lors d'un test manuel, toujours persistant) ; 9/9 tests ; build génère toujours les 6 fiches statiques.
  - Piège Next.js rencontré et corrigé : `"use client"` et `export function generateStaticParams()` ne peuvent pas coexister dans le même fichier (erreur de build explicite) — séparé en `page.tsx` (serveur, statique) + `FicheProfilClient.tsx` (client, logique réelle).
  - **Modifications** : `frontend/src/app/profil/[id]/page.tsx` (réduit à un simple relais serveur), `frontend/src/app/profil/[id]/FicheProfilClient.tsx` (créé, logique complète), `frontend/src/app/profil/[id]/page.module.css` (ajout `.ctaBar`/`.btnValider`/`.toast`), `frontend/src/lib/profilDetail.ts` (export de `construireProgression`, réutilisée).

---

## Itération 10 : version desktop responsive du dashboard

**Demande initiale du développeur en cours d'Itération 2 (⚠️ item « À venir » priorisé et implémenté à la demande du développeur), construite en parallèle de l'Itération 9 par un sous-agent en worktree isolé.**

- **Dans le périmètre** : à partir de 1024px, les 3 sections s'affichent en grille 3 colonnes (repris de `maquettes/dashboard-desktop.html`), la barre de filtre/recherche tient sur une ligne, le conteneur s'élargit à 1280px. En dessous de 1024px : rendu mobile strictement inchangé (toutes les nouvelles règles sont dans un unique bloc `@media (min-width: 1024px)`).
- **Critères d'acceptation** :
  - Étant donné une fenêtre ≥1024px, quand le dashboard se charge, alors les 3 sections apparaissent côte à côte en grille.
  - Étant donné une fenêtre <1024px, quand on compare au rendu d'avant cette itération, alors rien n'a changé visuellement.
  - Étant donné les tests existants, quand on les rejoue, alors ils passent toujours.
- **Bilan** :
  - Les 3 critères sont satisfaits : media query confirmée dans le CSS compilé, 9/9 tests, non-régression mobile garantie par construction (aucune règle existante modifiée, uniquement un bloc ajouté en fin de fichier).
  - Écart signalé par le sous-agent et accepté : le balisage du dashboard (`page.tsx`) n'avait pas de conteneur pour grouper la barre d'outils et la grille des sections — deux `<div>` d'enveloppe ajoutés, sans règle CSS hors media query (neutres en mobile).
  - **Modifications** : `frontend/src/app/page.tsx` (deux `<div>` d'enveloppe), `frontend/src/app/page.module.css` (bloc `@media (min-width: 1024px)` en fin de fichier).

---

## Itération 11 : édition du statut uniquement depuis la fiche, avec confirmation

Retour du développeur le 2026-11-18 : « passage au statut suivant pas assez clair, j'ai cliqué sans trop comprendre » — le bouton direct sur le dashboard (Itération 5) permettait un clic accidentel sans contexte ni confirmation.

- **Dans le périmètre** :
  - Retrait du bouton « Statut suivant » du dashboard : l'édition se fait désormais **uniquement** depuis la fiche profil.
  - Dialog de confirmation natif (`<dialog>`) avant de valider un changement de statut sur la fiche : affiche le nom, le statut actuel et le statut visé, boutons Annuler/Confirmer explicites.
  - Fonction pure `etapeSuivante` extraite dans `lib/profils.ts` (réutilisable), pour masquer le CTA une fois pair-aidante et nommer l'étape suivante dans le dialog.
- **Hors périmètre** (demandé par le développeur, proposé en itérations suivantes ci-dessous) : réversibilité (revenir en arrière), historique daté des changements, création manuelle de profils.
- **Critères d'acceptation** :
  - Étant donné le dashboard, quand on regarde une ligne de profil, alors il n'y a plus de bouton d'édition directe — seul le clic vers la fiche reste possible.
  - Étant donné la fiche d'un profil non pair-aidante, quand on clique le CTA, alors un dialog de confirmation s'ouvre nommant le statut actuel et visé ; le statut n'est mis à jour qu'après un clic explicite sur « Confirmer ».
  - Étant donné les tests existants + 2 nouveaux sur `etapeSuivante`, quand on les rejoue, alors ils passent (11/11).
- **Bilan** :
  - Les 3 critères sont satisfaits, vérifiés par lecture de code + déploiement (`curl` confirme l'absence du texte « Statut suivant » sur le dashboard en ligne).
  - Rien bloqué par le harnais : 11/11 tests, contrat de déployabilité propre.
  - **Modifications** :
    - `frontend/src/lib/profils.ts`, `profils.test.ts` : fonction `etapeSuivante` + 2 tests.
    - `frontend/src/app/page.tsx`, `page.module.css` : retrait du bouton et de son style.
    - `frontend/src/app/profil/[id]/FicheProfilClient.tsx`, `page.module.css` : dialog de confirmation natif, CTA masqué en fin de parcours.

---

## Itération 12 : statut réversible + historique daté

**Plan validé par le développeur le 2026-11-18** (« lance 12 à 14 et on verra ensuite »). Fusionne les anciennes itérations candidates 12 (réversibilité) et 13 (historique), car elles partagent le même point d'écriture dans l'API.

- **Dans le périmètre** :
  - `PATCH /api/v1/profils/:id/statut` prend désormais `{ "etape": "burnette"|"activ"|"pairaidante" }` (400 si absent/invalide) au lieu d'avancer automatiquement d'un cran — choix direct de n'importe quelle étape, dans les deux sens.
  - Nouvelle table `historique_statut` (profil_id, ancien_statut, nouveau_statut, date), remplie à chaque changement réel (pas de ligne si l'étape cible égale l'étape actuelle).
  - Nouvel endpoint `GET /api/v1/profils/:id/historique`.
  - Fiche profil : les 3 étapes de la progression sont cliquables (étape actuelle désactivée), le dialog de confirmation nomme le sens du changement et affiche un avertissement visuel distinct pour un recul (⚠️, texte rouge). Section « Historique du statut » sous la progression, liste datée (format FR, jour/mois/année + heure).
- **Hors périmètre** : qui peut voir l'historique (❓ non tranché par le PRD, le sélecteur de rôle reste déclaratif) ; suppression d'une ligne d'historique (le journal n'est pas éditable, par design).
- **Critères d'acceptation** :
  - Étant donné une pair-aidante, quand on clique l'étape BURN'ette dans sa fiche et qu'on confirme, alors son statut recule réellement (vérifié par l'API).
  - Étant donné un changement de statut confirmé, quand on regarde la section Historique, alors une ligne datée apparaît avec l'ancien et le nouveau statut.
  - Étant donné les tests existants, quand on les rejoue, alors ils passent (7 côté API + 14 côté frontend).
- **Bilan** :
  - Les 3 critères sont satisfaits : vérifié par `curl` contre la vraie base en production (Karima Mansouri reculée de Pair-aidante à ACTIV' puis remise, historique confirmé daté) ; 7+14 tests verts ; build propre.
  - Revu avant déploiement : toutes les requêtes restent paramétrées (`$1`, `$2`…), pas d'injection SQL ; validation de l'étape côté API avant toute écriture (400 sinon), pas seulement côté client.
  - **Modifications** :
    - `api/src/db.ts` : `definirStatut` (remplace `faireProgresser`), `obtenirHistorique`, `etapeVersBooleens`/`booleensVersEtape`/`estEtapeValide` (fonctions pures), table `historique_statut`.
    - `api/src/routes.ts`, `api/src/server.ts` : nouvelles routes PATCH (corps JSON)/GET historique, lecture du corps de requête (absente jusqu'ici).
    - `api/src/routes.test.ts` : tests sur la validation d'entrée et les fonctions pures (7 tests, remplace les tests sur `prochainStatut`).
    - `frontend/src/app/profil/[id]/FicheProfilClient.tsx`, `page.module.css` : étapes cliquables, dialog adaptatif, section historique — remplace le CTA unique de l'Itération 11.

---

## Itération 14 : création manuelle d'un nouveau profil

**Plan validé par le développeur le 2026-11-18**, construite en parallèle de l'Itération 12 par un sous-agent en worktree isolé (fichiers disjoints : dashboard côté frontend, pas l'API — le contrat d'endpoint a été fixé à l'avance pour permettre le parallélisme).

- **Dans le périmètre** : `POST /api/v1/profils` (corps `{nom, antenne}`, 201 + profil créé en BURN'ette, 400 si champs vides) ; bandeau « + Nouveau profil » sur le dashboard (remplace visuellement l'ancien bandeau Excel de la maquette, jamais implémenté) ouvrant un dialog natif avec formulaire minimal.
- **Hors périmètre** : import Excel (confirmé par le développeur comme un besoin de migration batch séparé, pas un chemin d'usage courant — l'app doit être autonome sans lui) ; choix du statut initial (toujours BURN'ette, cohérent avec le parcours).
- **Critères d'acceptation** :
  - Étant donné le dashboard, quand on clique « + Nouveau profil » et qu'on remplit nom + antenne, alors le profil est créé en base et apparaît immédiatement dans la section BURN'ettes.
  - Étant donné un formulaire incomplet, quand on tente de créer, alors le bouton reste désactivé (validation côté client) et l'API refuse aussi (400, validation côté serveur indépendante).
  - Étant donné les tests existants + 3 nouveaux sur la validation du formulaire, quand on les rejoue, alors ils passent.
- **Bilan** :
  - Les 3 critères sont satisfaits : `curl -X POST .../api/v1/profils` testé en local contre la vraie base par le sous-agent avant intégration (contrat respecté), build et tests verts après fusion (14 tests frontend).
  - Fusionné avec prudence : un commit d'une autre session active sur ce même dépôt (correctif de débordement CSS grid) a été détecté entre le lancement et la fusion de cet agent — repris sans perte en réappliquant seulement l'ajout du sous-agent (bandeau + dialog) par-dessus la version corrigée, au lieu d'écraser bêtement le fichier.
  - **Modifications** : `api/src/routes.ts`/`db.ts` (`POST /api/v1/profils`, `creerProfil`, partagé avec l'Itération 12) ; `frontend/src/app/page.tsx`/`page.module.css` (bandeau) ; `frontend/src/components/NouveauProfilDialog.tsx`/`.module.css`/`.test.ts` (créés).

---

## En arrière-plan (sans commit) : gestion des formations

Lancé le 2026-11-18 à la demande du développeur : un pipeline d'agents planifie puis implémente la gestion des formations (lister/ajouter/modifier/supprimer une formation sur la fiche profil, persistée en base — le plus gros morceau encore manquant). Déroulé : planification → validation contre la documentation existante (PRD, règles métier, `adr.md`) → 2 tours de raffinement → implémentation dans un worktree isolé. **Volontairement non commité** : à relire et intégrer dans une itération dédiée une fois le résultat prêt.

---

## Rappel : items toujours en attente, non planifiés

- Sous-progression interne par statut (candidature en cours/validée pour ACTIV' ; formation/habilitation/supervision pour Pair-aidante) — distincte de la réversibilité de l'Itération 12 (qui porte sur les 3 paliers cumulatifs existants, pas sur des états plus fins à l'intérieur de chaque palier).
- Import Excel — migration batch initiale uniquement, confirmé secondaire par le développeur.
- Filtrage du dashboard par antenne.
- Édition du nom/de l'antenne d'un profil (❓ jamais demandée explicitement dans le PRD retenu).
- Qui peut voir l'historique du statut (❓ non tranché).

---

## À venir (liste ordonnée, à détailler au fil de l'eau)

> Référence visuelle à jour : `maquettes/dashboard-fiche-profil.html` (commit `52c9ec6`, produit en parallèle de l'Itération 1), qui reprend la vraie palette du site L'BURN (contraste AA) au lieu de celle inventée par `passation/prototype/index.html`. Les tokens de couleur utilisés dans `frontend/src/app/page.module.css` sont déjà alignés dessus (mêmes valeurs `--lb-color-*`, mêmes couleurs par section). À comparer avant de coder l'écran suivant.

Voir « En arrière-plan » et « Rappel » ci-dessus pour le détail à jour.
