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
