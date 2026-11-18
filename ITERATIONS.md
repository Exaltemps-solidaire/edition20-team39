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

---

## Itération 4 : écran 2 (fiche profil), lecture seule, données simulées

**Plan proposé par l'agent le 2026-11-18, en cours d'exécution en parallèle de l'Itération 3** (sous-agent en worktree git isolé, cf. consigne du développeur de paralléliser). ⚠️ **Changement par rapport à la décision du 2026-11-18** qui groupait écran 2 + Postgres + édition du statut en un seul bloc (« Itération 3 (candidate) » ci-dessous, devenue Itération 5) : vu le temps restant, Postgres et l'édition ne tiennent pas en parallèle du reste — seul l'écran, en lecture seule, est tenté maintenant. **À valider par les cadreurs.**

- **Dans le périmètre** : nouvelle route `frontend/src/app/profil/[id]/page.tsx`, reprenant le visuel de `maquettes/dashboard-fiche-profil.html` (écran 2), avec des données d'exemple **locales à cette route** (pas de modification de `frontend/src/lib/profils.ts` ni de `page.tsx` du dashboard, pour éviter tout conflit avec l'Itération 3 en cours sur ces mêmes fichiers).
- **Hors périmètre** : clic depuis le dashboard vers la fiche (pas de lien câblé, accès direct par URL seulement), édition du statut, toute formation ajoutée/modifiée, persistance — reportés à l'Itération 5.
- **Critères d'acceptation** :
  - Étant donné l'URL `/profil/<id>` ouverte, quand la page se charge, alors le visuel reprend fidèlement `maquettes/dashboard-fiche-profil.html` (hero, progression du statut, formations, disponibilités) en lecture seule.
  - Étant donné les tests Vitest existants (Itération 1-3), quand on les rejoue, alors ils passent toujours (aucune régression, aucun fichier partagé modifié).
- **Fichiers prévus** : `frontend/src/app/profil/[id]/page.tsx`, `frontend/src/app/profil/[id]/page.module.css`, `frontend/src/lib/profilDetail.ts` (données d'exemple locales, nouveau fichier).
- **Bilan** : _à remplir une fois le sous-agent revenu et sa branche relue/fusionnée._

---

## À venir (liste ordonnée, à détailler au fil de l'eau)

> Référence visuelle à jour : `maquettes/dashboard-fiche-profil.html` (commit `52c9ec6`, produit en parallèle de l'Itération 1), qui reprend la vraie palette du site L'BURN (contraste AA) au lieu de celle inventée par `passation/prototype/index.html`. Les tokens de couleur utilisés dans `frontend/src/app/page.module.css` sont déjà alignés dessus (mêmes valeurs `--lb-color-*`, mêmes couleurs par section). À comparer avant de coder l'écran suivant.

1. **Itération 5 (candidate)** : persistance Postgres de la fiche profil + édition du statut ACTIV' → Pair-aidante (dépend de l'Itération 4). Décidé avec le développeur le 2026-11-18 : la base de données arrive à cette itération, pas avant. À détailler précisément (et probablement re-découper si trop gros une fois chiffré) au moment de sa planification — voir les règles de taille de `CLAUDE.md` §3. Points à trancher avant de coder :
   - Stockage : Postgres (service du compose, volume nommé), pas SQLite — imposé par `docs/contrat-deployabilite.md` règle 6. Décision à consigner dans `adr.md` avant d'écrire du code.
   - Sous-progression interne à chaque statut (candidature « en cours » / « validée » pour ACTIV' ; formation / habilitation / supervision séparées pour Pair-aidante) — proposition graphique à faire avant de coder (décision du 2026-11-18, `adr.md`).
2. Ajout / modification d'une formation sur la fiche profil.
3. Lien cliquable dashboard → fiche profil (câblage de `page.tsx` vers `/profil/[id]`, une fois l'Itération 4 fusionnée).
4. Sélecteur « Qui êtes-vous ? » (changement de rôle sans connexion, cf. PRD).
5. Import Excel avec correspondance manuelle des colonnes (pas de mapping automatique — colonnes réelles inconnues, cf. `docs/analyse-maquette-donnees-asso.md` §6).
6. Filtrage du dashboard par antenne pour la directrice d'antenne — reporté, non géré aujourd'hui (référentiel d'antenne pas encore tranché, cf. §4 et §7 de l'analyse).
7. ⚠️ **Version desktop responsive du dashboard** — demande du développeur en cours d'Itération 2, hors périmètre (passation et plan initial ne couvraient que du mobile). Une maquette cliquable existe déjà : `maquettes/dashboard-desktop.html` (grille 3 colonnes ≥1024px, bascule en 1 colonne en dessous, mêmes tokens de charte). Reste à trancher avec les cadreurs : priorité de cette itération par rapport au reste de la liste, et si le découpage en 3 colonnes par statut convient (choix du sous-agent `maquettiste`, pas une spécification validée). Implémentation (media queries dans `page.module.css`) non codée — pas d'ambiguïté de fichiers avec le reste de la liste, se glisse à n'importe quel rang une fois priorisée.
