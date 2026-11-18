# Contexte projet — L'BURN

Documentation métier de référence pour construire l'application de l'association L'BURN (hackathon, Thème 2 : **Parcours ACTIV'**). Elle décrit l'offre, les règles, les rôles, les données, les workflows, l'accessibilité et le cadrage du sujet.

## Règles pour coder avec cette documentation

1. **Ne rien inventer.** Ce qui n'est pas écrit ici n'est pas connu. Chaque document se termine par « Non précisé dans les sources » : dans ces cas, demander à l'équipe au lieu de supposer.
2. **Vocabulaire exact** (libellés, nommage, clés de code) : voir [02-glossaire.md](02-glossaire.md). Écrire L'BURN, ACTIV', BURN'ette, BBA, BIB tels quels.
3. **Respecter le statut.** Ne jamais implémenter une cible ou une piste comme si elle existait déjà.
4. **Traçabilité** : chaque affirmation porte `[CODE pN]`, c'est-à-dire le document d'origine de l'association (table ci-dessous) et sa page.

## Statuts

| | Sens |
|---|---|
| ✅ | Actuel / existant |
| 🎯 | Cible (à construire) |
| 🟢 | Décision validée |
| 🟡 | Piste non actée |
| ❓ | Question ouverte / hypothèse |
| ⛔ | Hors périmètre / reporté |

## Documents

| # | Document | Contenu |
|---|---|---|
| 1 | [01-association-offre-parcours.md](01-association-offre-parcours.md) | Association, objectifs, offre : Parcours Découverte, adhésion, parcours BBA / BIB / ACTIV' / Sentinelle, modules, stades, ateliers, antennes |
| 2 | [02-glossaire.md](02-glossaire.md) | Vocabulaire officiel, clés de code, sigles, distinctions à ne pas confondre, divergences de libellés (**à lire en premier**) |
| 3 | [03-personae-besoins.md](03-personae-besoins.md) | Personae par stade, besoins, freins, attentes, priorités fonctionnelles |
| 4 | [04-regles-metier.md](04-regles-metier.md) | Adhésion et statuts, paiement (HelloAsso, webhook, remboursement), réservation, liste d'attente, annulation, questionnaires, scoring, stades |
| 5 | [05-administration-roles-securite.md](05-administration-roles-securite.md) | Rôles et droits, gestion des comptes, imports, sessions, notifications, dashboard, exports, sécurité |
| 6 | [06-donnees-et-technique.md](06-donnees-et-technique.md) | Entités, champs, statuts, clés de code, indicateurs (KPI), existant technique, outils et intégrations |
| 7 | [07-workflows.md](07-workflows.md) | Parcours utilisateur et processus métier, étape par étape |
| 8 | [08-accessibilite-graphisme.md](08-accessibilite-graphisme.md) | Accessibilité (RGAA), contraintes UX, éléments visuels |
| 9 | [09-hackathon-theme2-activ-problemes.md](09-hackathon-theme2-activ-problemes.md) | **Sujet du hackathon** : problématique, périmètre, livrable attendu, contraintes, module ACTIV', irritants, questions ouvertes, divergences entre sources |
| 10 | [10-charte-graphique.md](10-charte-graphique.md) | Charte graphique : couleurs, typographie, composants, boutons, cartes, tokens CSS — scrapée du site public de l'association, **à confirmer avec l'équipe** |

## Documents d'origine de l'association

| Code | Document | Pages |
|---|---|---|
| ACC | `accessibilite-share-it.pdf` | 2 |
| CAD | `cadrage-parcours-activ.pdf` | 4 |
| CAR | `cartographie-parcours-activ.pdf` | 5 |
| GLO | `glossaire-lburn.pdf` | 2 |
| MOD | `module-activ.pdf` | 1 |
| PER | `personae-et-objectifs.pdf` | 4 |
| RAD | `regles-administration.pdf` | 5 |
| RMP | `regles-metier-plateforme.pdf` | 7 |
| VIS | `visuel-premier-contact-adhesion-parcours.pdf` | 1 (image) |

Les prix (`XX€`, `X€`) ne sont pas renseignés dans les sources. Certains documents cités par l'association (spécification KPI, synthèses de synchros…) n'ont pas été fournis : voir [09-hackathon-theme2-activ-problemes.md](09-hackathon-theme2-activ-problemes.md).

Les logos de l'association sont dans [`assets/logos/`](assets/logos/).