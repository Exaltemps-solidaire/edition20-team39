# Déploiement

Back-office de suivi du parcours ACTIV' pour l'association L'BURN : dashboard des profils
BURN'ette / ACTIV' / Pair-aidante, à destination de la chargée de remobilisation et de la
directrice d'antenne.

## Services

- `frontend/` : Next.js en export statique, servi par nginx, port 80 du conteneur (8080 publié). **Exposé au public.**
- `api/` : Node sans dépendance, port 8081. Expose `/health` et `/sante` pour l'instant ; aucune route métier encore.

## Services externes appelés

Aucun à ce stade (Itération 1 : données en dur côté frontend, pas d'appel réseau).

## Connu comme fragile ou inachevé

- Le dashboard affiche des données d'exemple, pas de vraies BURN'ettes : aucune persistance, aucun appel API métier.
- Le modèle de statut (BURN'ette / ACTIV' / Pair-aidante) est volontairement modélisé en ensembles imbriqués
  côté données (`frontend/src/lib/profils.ts`), pas en statut exclusif : voir `adr.md` (2026-11-18) et
  `docs/analyse-maquette-donnees-asso.md`.
- Filtre et recherche du dashboard sont cosmétiques (non fonctionnels), comme dans la maquette retenue.
- Pas de filtrage par antenne : reporté, voir `ITERATIONS.md`.

## Contact

- Équipe : Équipe 39.
- Association : L'BURN (voir `passation/contexte/association.md`).
