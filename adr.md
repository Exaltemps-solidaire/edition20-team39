# Architecture Decision Record (ADR)

Journal des décisions d'architecture prises pendant le hackathon (dépendance nouvelle, stockage, pattern structurant).

Une entrée par décision, ajoutée à la fin, au format :

```
### AAAA-MM-JJ — <titre court>

- **Décision** : ce qui a été choisi
- **Contexte** : le problème à résoudre
- **Alternatives envisagées** : les autres options, et pourquoi elles sont écartées
- **Conséquences** : les compromis acceptés
```

Le fichier est un journal : on ajoute, on ne réécrit pas. Pour revenir sur une décision, une nouvelle entrée le dit explicitement.

---

## Décisions

### 2026-11-18 — Statut ACTIV' : ensembles imbriqués en données, visuel de progression conservé

- **Décision** : le modèle de données distingue des marqueurs cumulatifs et datés par statut (BURN'ette implicite pour toute adhérente ; `est_activ` avec sa propre sous-progression de candidature ; `est_pair_aidante` avec ses propres champs formation/habilitation/supervision), au lieu d'un champ `statut` unique et exclusif. Le visuel de la maquette (barre de progression linéaire « évolution » BURN'ette → ACTIV' → Pair-aidante) est conservé tel quel sur la fiche profil : il représente l'évolution cumulée de la personne, pas un remplacement de statut.
- **Contexte** : la maquette retenue (`passation/prototype/index.html`) traite BURN'ette/ACTIV'/Pair-aidante comme un statut exclusif. Le glossaire de l'association dit l'inverse : « une pair-aidante est donc aussi une ACTIV' » [GLO p2], « ACTIV' ≠ pair-aidante : toute pair-aidante est ACTIV', pas l'inverse » [GLO p2]. Détail : [docs/analyse-maquette-donnees-asso.md](docs/analyse-maquette-donnees-asso.md).
- **Alternatives envisagées** : revoir aussi le visuel du dashboard et de la fiche profil pour afficher des rôles cumulés plutôt qu'un statut atteint — écarté par le développeur, qui garde le visuel validé par l'équipe de cadrage.
- **Conséquences** : chaque statut porte sa propre sous-progression interne (ex. candidature ACTIV' « en cours » / « validée » ; formation / habilitation / supervision pour Pair-aidante) plutôt qu'un simple drapeau booléen. Proposition graphique de ces sous-progressions à faire à la prochaine préparation d'itération, avant de coder la fiche profil.

### 2026-11-18 — Itération 5 : persistance réduite aux deux booléens existants, pas de sous-progression

- **Décision** : la persistance Postgres de l'Itération 5 porte uniquement sur le modèle déjà en place (`id`, `nom`, `antenne`, `est_activ`, `est_pair_aidante`) — pas d'ajout des sous-progressions internes envisagées le 2026-11-18 ci-dessus (candidature en cours/validée, formation/habilitation/supervision séparées). L'édition du statut se limite à « faire passer au statut suivant » (un boléen à la fois, dans l'ordre BURN'ette → ACTIV' → Pair-aidante), sans état intermédiaire.
- **Contexte** : temps de build très réduit (développeur : « on est serré dans le temps »), budget resserré à 15 min/itération, plusieurs itérations menées en parallèle. Concevoir et faire valider une maquette de sous-progression avant de coder (comme prévu initialement) ne tient pas dans ce temps.
- **Alternatives envisagées** : bloquer l'itération et attendre la proposition graphique des sous-statuts — écarté, retarderait toute persistance alors qu'une version simple (booléens) livre déjà de la valeur réelle (les données survivent à un redémarrage, le statut est éditable).
- **Conséquences** : la sous-progression interne reste à faire plus tard (reportée en « À venir »), sur un modèle de données qui devra être étendu (nouvelles colonnes ou table liée), pas cassé — compatible avec cette décision.
- **Dépendance nouvelle** : `pg` (client Postgres officiel) ajouté à `api/package.json` — aucune alternative plus légère sans dépendance pour parler à Postgres depuis Node.
