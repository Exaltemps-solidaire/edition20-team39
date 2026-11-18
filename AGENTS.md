# AGENTS.md — Rôles d'agents pour ce projet

Rôles envisagés pour construire ce projet vite et bien pendant un hackathon MVP — liste volontairement courte. Règles communes (architecture, sécurité OWASP Top 10) : section 4 de [CLAUDE.md](./CLAUDE.md). Règles propres à un rôle : son fichier `.claude/agents/<rôle>.md`.

## Pourquoi un orchestrateur, et peu de sous-agents

Un agent par métier (planificateur, développeur, testeur, relecteur) coûte souvent plus en coordination qu'il ne rapporte (constat d'Anthropic sur son propre système multi-agent). On ne complexifie que si le découpage apporte un vrai gain — un travail isolé, vérifiable sans le contexte vivant de la session.

Ici : un seul orchestrateur qui code (la session principale, cadrée par `CLAUDE.md`), des sous-agents seulement pour des vérifications bornées en fin de travail.

## Les rôles

### Orchestrateur (la session principale — pas un fichier `.claude/agents/`)
- **Quand** : tout le temps ; rôle par défaut.
- **Fait** : planifie les itérations, code, décide, publie, signale.
- **Prompt de base** : `CLAUDE.md` dans son ensemble.
- **Ne délègue** qu'un travail borné, vérifiable sans le contexte vivant de la session.

### Testeur (`.claude/agents/testeur.md`)
- **Quand** : fin d'itération ou de lot de travail.
- **Fait** : tests unitaires minimaux et plafonnés (1 à 3 en itération stricte, 10 maximum sinon, bien choisis).
- **Ne fait pas** : implémentation, refactor.

### Relecteur sécurité/qualité (`.claude/agents/reviewer.md`)
- **Quand** : avant de commiter, sur le diff.
- **Fait** : bugs, sécurité (OWASP Top 10), conventions, couverture de tests.
- Pas d'accès Edit/Write : il signale, il ne corrige pas.

### Déployeur (`.claude/agents/deployeur.md`)
- **Quand** : avant de signaler/publier une version.
- **Fait** : fait respecter le contrat de déployabilité du projet, vérifie les routes de santé, l'absence de secret suivi par git.
- **Ne fait pas** : développement fonctionnel.

### Maquettiste (`.claude/agents/maquettiste.md`)
- **Quand** : pour présenter un écran ou un flux d'itération à l'équipe (section 5, visualisation first).
- **Fait** : une maquette HTML cliquable, autonome, sans framework ni build, dans `maquettes/`.
- **Ne fait pas** : logique métier, appel API, vraie persistance.

## Rôles écartés, et pourquoi

- **Planificateur dédié** : un sous-agent séparé dupliquerait le contexte de planification sans parallélisme utile.
- **Développeur backend / frontend séparés** : utile seulement si l'architecture est déjà scindée en services distincts (sinon, coordination sans découpage réel) — à trancher via `adr.md` si la stack du projet diffère.

## Documentation métier (association L'BURN)

- [docs/contexte-lburn-docs/README.md](./docs/contexte-lburn-docs/README.md) — index de la documentation de référence sur l'association L'BURN et le sujet du hackathon (Thème 2, Parcours ACTIV').
- À lire avant de coder une règle métier, un rôle ou une donnée : chaque affirmation y est tracée `[CODE pN]`, et ce qui n'y est pas écrit n'est pas connu (pas d'invention, question à l'équipe sinon).

## Sources

- [Building effective agents — Anthropic](https://www.anthropic.com/research/building-effective-agents)
- [When to use multi-agent systems (and when not to) — Claude](https://claude.com/resources/articles/building-multi-agent-systems-when-and-how-to-use-them)
