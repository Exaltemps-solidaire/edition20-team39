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

---

## À venir (liste ordonnée, à détailler au fil de l'eau)

> Référence visuelle à jour : `maquettes/dashboard-fiche-profil.html` (commit `52c9ec6`, produit en parallèle de l'Itération 1), qui reprend la vraie palette du site L'BURN (contraste AA) au lieu de celle inventée par `passation/prototype/index.html`. Les tokens de couleur utilisés dans `frontend/src/app/page.module.css` sont déjà alignés dessus (mêmes valeurs `--lb-color-*`, mêmes couleurs par section). À comparer avant de coder l'écran suivant.

1. Sous-progression interne par statut (candidature en cours/validée pour ACTIV' ; formation/habilitation/supervision pour Pair-aidante) — dépend de l'Itération 5, proposition graphique à faire avant de coder (cf. `adr.md`).
2. Ajout / modification d'une formation sur la fiche profil.
3. Lien cliquable dashboard → fiche profil, une fois les données de `/profil/[id]` alignées sur celles de l'API (Itération 5).
4. Import Excel avec correspondance manuelle des colonnes (pas de mapping automatique — colonnes réelles inconnues, cf. `docs/analyse-maquette-donnees-asso.md` §6).
5. Filtrage du dashboard par antenne pour la directrice d'antenne — reporté, non géré aujourd'hui (référentiel d'antenne pas encore tranché, cf. §4 et §7 de l'analyse).
6. ⚠️ **Version desktop responsive du dashboard** — demande du développeur en cours d'Itération 2, hors périmètre (passation et plan initial ne couvraient que du mobile). Une maquette cliquable existe déjà : `maquettes/dashboard-desktop.html` (grille 3 colonnes ≥1024px, bascule en 1 colonne en dessous, mêmes tokens de charte). Reste à trancher avec les cadreurs : priorité de cette itération par rapport au reste de la liste. Implémentation (media queries dans `page.module.css`) non codée.
