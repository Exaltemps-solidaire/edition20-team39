# Pièges rencontrés

Seulement les pièges importants — ceux qui ont coûté du temps, ou qui reviendraient si on ne les notait pas.

Format d'une entrée :

```markdown
## <date> : <le piège en quelques mots>

- **Symptôme** : ce qu'on a observé.
- **Cause** : pourquoi ça arrive.
- **Évitement** : ce qu'il faut faire ou vérifier avant que ça recommence.
```

## 2026-11-18 : une borne `git add` qui visait un mot, pas un dossier

- **Symptôme** : `git add scripts/recuperer-passation.sh` refusé par une borne censée protéger le dossier `passation/`.
- **Cause** : la règle `deny` matchait tout argument contenant la chaîne `passation`, y compris dans un nom de fichier légitime sans rapport avec le dossier.
- **Évitement** : une borne sur un dossier sensible doit viser le chemin (`passation*`, `*/passation*`), jamais un mot qui peut apparaître ailleurs dans un nom de fichier.
