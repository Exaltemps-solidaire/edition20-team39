# Hackathon — Thème 2 Parcours ACTIV', problèmes et questions ouvertes

> Cadrage du thème 2 (Parcours ACTIV'), contenu du module ACTIV', synthèse des irritants, points ouverts et divergences entre sources, pour les agents qui codent le prototype. Sources : CAD (cadrage-parcours-activ), MOD (module-activ), CAR (cartographie-parcours-activ), complétés par GLO, PER, RAD, RMP, VIS, ACC.

Légende des statuts : ✅ actuel/existant · 🎯 cible · 🟢 décidé/validé · 🟡 piste non actée · ❓ question ouverte/hypothèse · ⛔ hors périmètre/reporté.

Documents liés : [01-association-offre-parcours.md](01-association-offre-parcours.md) · [02-glossaire.md](02-glossaire.md) · [03-personae-besoins.md](03-personae-besoins.md) · [04-regles-metier.md](04-regles-metier.md) · [05-administration-roles-securite.md](05-administration-roles-securite.md) · [06-donnees-et-technique.md](06-donnees-et-technique.md) · [07-workflows.md](07-workflows.md) · [08-accessibilite-graphisme.md](08-accessibilite-graphisme.md).

---

## À retenir pour le build

- Problématique : permettre à une BURN'ette de candidater au parcours ACTIV', de se former, puis de trouver et réserver simplement les missions, ateliers ou créneaux d'écoute qu'elle veut prendre en charge [CAD p1].
- Accès : être en BIB conditionne l'accès à ACTIV' ; BBA et BIB sont considérés comme existants (traités par l'autre groupe) [CAD p1][GLO p1][MOD p1].
- Aucune activité n'est publiée sans validation : soumission → validation → modération (équipe ou directrice d'antenne) [CAD p3][CAD p4][PER p4].
- Réutiliser le moteur de sessions et de réservation WordPress existant plutôt qu'en créer un second ; pas de snippet de contournement ; UAT avant production [CAD p3][RMP p6].
- Le back-office doit remplacer les fichiers Excel pour les cas montrés (colonnes des Excel actuels inconnues ❓) [CAD p2][CAD p4][CAD p3].
- Sécurité : écoute téléphonique et groupes de parole touchent des personnes vulnérables → procédure d'alerte et d'escalade vers l'équipe, accès visible aux numéros d'urgence, aucun contenu de prévention du suicide inventé [CAD p3].
- Aucune pair-aidante n'intervient sans formation, habilitation et supervision : la plateforme doit les tracer [CAR p5].
- L'engagement est un choix : pause possible à chaque étape, sortie libre, 1 an maximum ; les indicateurs de volume ne sont jamais des objectifs de conversion [CAR p1][CAR p5].
- Les pair-aidantes bénévoles ne faussent pas les KPI adhérentes (rôle « pair-aidante bénévole » : 🎯 cible, non confirmé comme livré [CAD p3][RAD p1]) ; KPI calculés en direct [CAD p3][RMP p5].
- Données : données de santé ; données fictives uniquement dans le prototype ; ne stocker que le résultat du cahier des charges ; effacer les problématiques saisies pour les écoutes (durée de conservation à fixer ❓) [CAD p3][CAR p5].
- Accessibilité : RGAA ; une page, un clic, une récompense ; calendrier utilisable au clavier ; boutons explicites [CAD p3].
- Prix de l'option ACTIV' non fixé (« X € ») [CAD p3][VIS p1].

---

## 1. Problématique et verbatims

### 1.1 Problématique
- Version association : comment la plateforme peut-elle permettre aux BURN'ettes de s'engager à leur tour dans l'association, en proposant leur aide, en animant des ateliers ou en devenant pair-aidantes, et faciliter l'organisation de cette entraide ? [CAD p1]
- Version centrée utilisatrice : comment permettre à une BURN'ette de candidater au parcours ACTIV', de se former, puis de trouver et réserver simplement les missions, ateliers ou créneaux d'écoute qu'elle veut prendre en charge ? [CAD p1]

### 1.2 Verbatims clés [CAD p1]
| Verbatim | Origine |
|---|---|
| « Je peux maintenant aider les autres. » | L'BURN, étape 5 du parcours |
| « Je me sens prête à penser au travail, mais je ne sais pas par où commencer et je n'ai pas confiance en moi. » | Élodie, persona stade 5 |
| Faire évoluer la plateforme « d'une logique d'aide vers une logique d'entraide ». | Product Owner, kick-off |
| « Les outils actuels ne permettent pas de répondre efficacement à la demande. » | Synchro du 08/10 |
| Automatiser et démultiplier l'accompagnement « sans augmenter proportionnellement la charge opérationnelle des équipes ». | Synchro du 08/10 |
| « Aller au-delà d'une consommation passive de contenus. » | CR du 20/10 |
| « Liste de missions proposées par l'asso : comment on les pousse ? comment on s'y inscrit ? » | L'BURN, schéma ACTIV' |
| « Comment on propose son atelier ? Puis, quand il est validé, on a accès à un calendrier avec des créneaux disponibles, on choisit son créneau et ça nous booke le créneau. » | L'BURN, schéma ACTIV' |
| Les propositions d'activités « ne peuvent pas être publiées librement sans contrôle ». | CR du 20/10 |
| « Une pair-aidante est donc aussi une ACTIV'. » | L'BURN, glossaire |

---

## 2. Enjeu

- ✅ Aujourd'hui : suivi des ACTIV' et de la pair-aidance sur fichiers Excel et opérations manuelles ; chronophage pour une équipe de 3 à 5 ETP ; limite le nombre de BURN'ettes accompagnées [CAD p1].
- Modèle de l'association : la pair-aidance est l'un des quatre piliers (avec l'expertise professionnelle, l'expérience vécue et la recherche) ; les groupes de parole sont animés par des pair-aidantes ; les ateliers BURN'ette sont animés bénévolement par des BURN'ettes [CAD p1][GLO p1].
- Pour la BURN'ette : se remettre en action dans un cadre sûr et sans enjeu, valoriser son vécu, retrouver confiance (Élodie, stade 5) [CAD p1].
- Pour l'association : démultiplier l'offre (ateliers, écoute, permanences) sans augmenter la charge [CAD p1].
- Priorité : « priorité de la note de cadrage si un choix s'impose » [CAD p1] ; MOD range cette phrase (« si un choix doit être fait entre les nouveaux parcours ») dans les « Compléments de la note de cadrage (pistes, non actées) » 🟡 [MOD p1].
- Mesure d'impact : effet sur les pairs et la communauté (impact collectif), qui nourrit les dossiers de subvention [CAD p1][CAD p2].
- Objectif plateforme lié (« Priorités fonctionnelles suggérées ») : « Mise en relation et activités encadrées — POC » (priorité 7, enjeu remobilisation et participation active) ; « Espace communauté / groupes de parole » (priorité 5, lutte contre l'isolement et pair-aidance) [PER p4].

---

## 3. Périmètre

### 3.1 Dans le périmètre [CAD p2]
| # | Élément |
|---|---|
| 1 | Présentation d'ACTIV' et candidature : questionnaire de motivation, prise de rendez-vous pour l'entretien, validation ou refus par l'équipe |
| 2 | Formation : tronc commun (vidéos) et focus pair-aidance (2 sessions de 3 h, ressources, groupes d'analyse de pratique) |
| 3 | Missions ponctuelles publiées par l'association, et inscription des ACTIV' |
| 4 | Proposition d'un atelier BURN'ette par une ACTIV', validation par l'équipe ou la directrice d'antenne, puis réservation d'un créneau dans un calendrier |
| 5 | Inscription aux créneaux de pair-aidance (permanences, groupes de parole, écoute téléphonique) |
| 6 | Communauté des ACTIV' (échanges, entraide), ❓ modalités à définir |
| 7 | Back-office de suivi pour l'équipe, en remplacement des fichiers Excel |
| 8 | Indicateurs |

### 3.2 Hors périmètre ⛔ [CAD p2]
- Parcours BBA et BIB (thème 1) et Sentinelle [CAD p2][GLO p1].
- Mentorat en entreprise (V3) [CAD p2].
- Missions hors association et immersions en entreprise : 🟡 peuvent être esquissées comme piste, pas conçues [CAD p2].
- Contenus de formation (psychoéducation, posture, prévention du suicide) : à fournir par l'association [CAD p2].
- Gestion de la paie des professionnels [CAD p2].
- Parcours Découverte (0 €) : reporté hors hackathon (mention du glossaire, absente du cadrage CAD) [GLO p1].

---

## 4. Cibles et personae [CAD p2]

| Cible | Priorité | Besoin |
|---|---|---|
| BURN'ette en BIB qui candidate (proche d'Élodie, stade 5) | 1 | Comprendre ce qu'implique ACTIV', candidater sans pression, se former, choisir des actions courtes et rassurantes, voir ses contributions valorisées |
| ACTIV' en focus pair-aidance | 1 | Trouver et réserver ses créneaux d'écoute et de groupes de parole, accéder à l'analyse de pratique, savoir à qui passer la main en cas de situation grave |
| Chargée de remobilisation | 1 | Traiter les candidatures, organiser les entretiens, suivre les ACTIV' |
| Directrice d'antenne | 2 | Valider les ateliers et activités proposés, publier des missions, voir qui fait quoi sur son antenne |
| Super admin | 2 | Vue nationale, indicateurs |
| BURN'ettes bénéficiaires des actions | 3 | Trouver les ateliers BURN'ette et les créneaux d'écoute (✅ déjà gérés par la réservation existante) |

- Principe : au stade 5, la communauté sert au réseau, à la mise en action, aux mises en situation et à la pair-aidance ; actions concrètes mais découpées en étapes courtes et rassurantes [CAD p2][PER p4].
- Définitions : ACTIV' = BURN'ette qui suit le module ACTIV' et se remobilise en interne ; Pair-aidante = BURN'ette qui suit le focus pair-aidance du module ACTIV' ; toute pair-aidante est ACTIV', pas l'inverse ; Chargée de remobilisation = membre de l'équipe qui mène l'entretien de candidature ACTIV' ; Directrice d'antenne / admin d'antenne (« Branch Manager ») valide les activités proposées par les pairs [GLO p2].
- Voir [03-personae-besoins.md](03-personae-besoins.md) et [02-glossaire.md](02-glossaire.md).

---

## 5. Module ACTIV' (contenu du schéma de l'association)

### 5.1 Accès et prérequis [MOD p1]
- Accès : à partir du parcours BIB, en option, sur candidature [MOD p1].
- Prérequis 1 — Présentation générale : ce qu'est être « ACTIV' », ce qu'est la pair-aidance — vidéo [MOD p1].
- Prérequis 2 — Analyse de motivation et validation de la candidature : questionnaire, puis entretien préalable avec la chargée de remobilisation [MOD p1].

### 5.2 Tronc commun — pour toutes [MOD p1]
- Formation à suivre (ressources vidéo) : psychoéducation ; posture d'animation d'ateliers [MOD p1].

### 5.3 Actions possibles [MOD p1]
| Action | Exemples | Question posée par l'association |
|---|---|---|
| Missions « ponctuelles » | Rédaction d'articles, administratif, logistique… | Liste de missions proposées par l'asso : comment on les pousse ? comment on s'y inscrit ? |
| Animation d'ateliers BURN'ette (« ateliers B ») | Relaxation, mise à jour de CV, jardinage, entraide administrative… | Comment on propose son atelier ? Puis, quand il est validé, on a accès à un calendrier avec des créneaux disponibles, on choisit son créneau et ça nous booke le créneau. |
| Modération de la communauté | Communauté Facebook par exemple | — |

### 5.4 Focus pair-aidance — en plus, pour celles qui le souhaitent [MOD p1]
- Formation : 2 sessions de 3 h en synchrone, des ressources, et des groupes d'analyse de pratique pour débriefer ses animations en tant que pair-aidante [MOD p1].
- Thèmes : animation de groupes de parole, permanences et écoutes téléphoniques ; posture de pair-aidance, écoute active et prévention du suicide [MOD p1].
- Actions possibles : permanences de l'association ; groupes de parole ; écoute téléphonique [MOD p1].
- ❓ Question de l'association : comment on s'inscrit aux créneaux qui nous conviennent, et comment l'équipe suit en back-office ? [MOD p1]

### 5.5 Compléments de la note de cadrage — 🟡 pistes non actées [MOD p1]
- Formation préalable en synchrone et en asynchrone.
- Contributions au service des autres : proposer un atelier, aider les organisatrices, être pair-aidante sur les groupes de parole, animer une réunion d'information pour les autres adhérentes.
- Missions hors de l'association : pont vers les entreprises partenaires, mise en relation avec des entreprises que l'association pourrait former, immersion en entreprise pour une BURN'ette en remobilisation.
- La note de cadrage place ACTIV' en priorité si un choix doit être fait entre les nouveaux parcours.

---

## 6. Cartographie du parcours ACTIV' (étapes 8 à 14) [CAR]

Note : l'en-tête de CAR p1 porte « Parcours V1 — Étapes 1 à 7 » ; les étapes ACTIV' sont numérotées 8 à 14 [CAR p1][CAR p2][CAR p3][CAR p4].

Principe directeur : l'engagement est un choix ; la pause est possible à chaque étape [CAR p1]. Les frictions listées sont des hypothèses à valider en atelier ❓ [CAR p2][CAR p3][CAR p4].

### 6.1 Conditions du parcours [CAR p5]
- Option ouverte aux BURN'ettes en phase de projection [CAR p5] (« Phase de projection, +10 mois » [CAR p1]).
- Les ACTIV' sont sélectionnées par l'association [CAR p5].
- Engagement d'un an maximum ; sortie quand elles le veulent ; pause à tout moment [CAR p5].
- Formation modération (13) préalable aux ateliers BURN'ettes, missions et modération (13A à 13C) ; formation pair-aidance (14) préalable aux permanences et groupes de parole et aux écoutes téléphoniques (14A et 14B) [CAR p5].

### 6.2 Étapes
| Étape | Phase AARRR | Actions | Points de contact | Frictions ❓ | Donnée manquante | Indicateur candidat |
|---|---|---|---|---|---|---|
| 8 · Réunion d'information | Acquisition interne | Entend parler du statut (parcours BURN'ette is BACK, chargée d'antenne) ; participe à la réunion d'information | Réunion d'information, Email, Communauté Facebook | Critère (+10 mois) peu lisible pour elle ; risque de se sentir poussée à s'engager | Nombre de BURN'ettes éligibles ; présence à la réunion d'info | Participantes à la réunion / éligibles |
| 9 · Candidature | Activation | Remplit le questionnaire de motivation ; prend connaissance du cahier des charges et des conditions (1 an max, sortie libre) | Formulaire (outil à préciser), Email | Candidature hors plateforme, pas de statut visible ; cahier des charges sensible : ne stocker que le résultat, jamais les informations de santé | Candidatures commencées vs envoyées | Taux de complétion du questionnaire |
| 10 · Entretien et validation | Activation | Prend rendez-vous avec la chargée de remobilisation ; est sélectionnée ou non | Téléphone, Monday (qualification interne), Email | Prise de RDV manuelle ; réponse négative délicate à annoncer, suite à prévoir | Délai candidature → décision ; statut de candidature daté | Délai moyen candidature → réponse |
| 11 · Formation tronc commun (vidéos) | Activation | Suit les vidéos : psychoéducation, fonctionnement de l'asso | Plateforme (formation), Youtube | Mêmes freins d'accès aux vidéos qu'à l'étape 6 ; fin de formation qui ne débloque rien automatiquement | Visionnage complet de chaque vidéo (la plateforme doit permettre de le savoir) ; date de fin de formation | Taux de complétion du tronc commun |
| 12 · Vie du collectif | Rétention | Rejoint la communauté et le chat ACTIV' ; réunion mensuelle ; reçoit les infos de l'asso (actus, réunions) ; choisit comment être ACTIV' : dans l'asso ou à l'extérieur | Plateforme (communauté, chat), Réunion mensuelle | Infos dispersées entre email, Facebook et plateforme ; sur-sollicitation ou sur-engagement invisible | Présence aux réunions mensuelles ; activité dans la communauté ACTIV' | ACTIV' actives dans la communauté / mois |
| 13 · Formation modération, puis 13A/13B/13C | Rétention | Formation modération préalable ; 13A : se positionne sur un créneau libre (ex. tous les lundis), propose un pitch, l'asso valide avant diffusion ; 13B : choisit parmi les missions proposées par l'équipe (salon auprès des entreprises, article de blog) ; 13C : modère la communauté | Plateforme (formation, calendrier de créneaux, catalogue de missions), HelloAsso, Brevo (satisfaction) | Formation préalable à tracer avant de débloquer les actions ; validation du pitch : délai et circuit à définir ; missions publiées par plusieurs membres de l'équipe : cohérence | Formation modération suivie, datée ; pitchs proposés vs validés ; missions publiées vs pourvues | Créneaux d'atelier pourvus par des ACTIV' |
| 14 · Pair-aidance, puis 14A/14B | Impact | Formation pair-aidance (option, 2 × 3 h) préalable ; 14A : s'inscrit sur des créneaux de permanences ou de groupes de parole ; 14B : assure des écoutes téléphoniques | Plateforme : calendrier de créneaux, inscription automatique ; Calendly ou Google Agenda pour les RDV, mails automatiques aux bénéficiaires et aux écoutantes | Habilitation non tracée : risque d'intervenir sans ; texte court où la bénéficiaire décrit sa problématique : donnée à effacer (RGPD) | Créneaux couverts ; présence aux analyses de pratique ; statut d'habilitation daté | % de pair-aidantes à jour de supervision |
| ACTIV' à l'extérieur | Impact | Organise des job meetings ; immersion en entreprise (lien vers Immersion Facile) ; bénévolat dans d'autres associations | Plateforme (liens externes), entreprises et associations partenaires | Critère d'accès à clarifier ; suivi des actions hors plateforme | Actions extérieures réalisées ; immersions réalisées | ACTIV' engagées à l'extérieur |
| Fin d'engagement | Rétention · Referral | Arrête quand elle le souhaite, au plus tard après 1 an ; pause à tout moment ; peut suivre la formation Sentinelle (contenu à préciser) | Chargée de remobilisation, Plateforme, Email / Brevo | Pas de bilan de fin d'engagement ; fin à 1 an : suite à prévoir | Durée d'engagement ; sorties et pauses (sans motif de santé) | Durée moyenne d'engagement |

Sources du tableau : [CAR p2] (8–10), [CAR p3] (11–13), [CAR p4] (14, extérieur, fin). Ligne « Ce qu'on mesure déjà » : « À compléter » partout, sauf étape 13 : « Nombre d'ateliers réalisés et remplissage (étape 5), pas par animatrice » [CAR p2][CAR p3][CAR p4].

### 6.3 Détails opérationnels du schéma [CAR p1]
- 13A : accès à des créneaux libres (ex. tous les lundis un créneau libre pour un atelier BURN'ettes) ; elles se positionnent, proposent un pitch et l'asso valide avant diffusion.
- 13B : voir les missions proposées par l'équipe (ex. aller sur un salon auprès des entreprises avec une salariée, rédiger un article de blog) ; « Ponctuelles : article de blog, intervenir en entreprise ».
- 14A : accès aux créneaux : calendrier où les pair-aidantes s'inscrivent automatiquement.
- 14B : Calendly pour les RDV avec les bénéficiaires, éventuellement connecté à Google Agenda ; mails automatiques aux bénéficiaires et aux écoutantes ; texte court pour écrire sa problématique ; il faut effacer la donnée pour être conforme RGPD.
- La plateforme permet de savoir qu'elles ont regardé les vidéos en entier (étape 11).
- Étape 12 : « C'est aussi l'endroit où l'asso transmet ses infos aux ACTIV' (actus, réunions…) ».
- Pause : toujours possible. Formation Sentinelle : contenu à préciser.

---

## 7. Données utiles et objets [CAD p2][CAD p3]

| Statut | Élément |
|---|---|
| ✅ Existant réutilisable | Objets session (date, lieu, jauge, format, antenne), workshop (catégorie), ressource (vidéo, PDF), antenne ; rôles super admin, admin d'antenne, adhérente ; notifications Brevo ; listes de participantes en back-office [CAD p2] |
| 🎯 Rôle cible, non confirmé | Pair-aidante bénévole : accès aux ressources, pas aux ateliers payants, exclue des KPI adhérentes [CAD p2][CAD p3][RAD p1] |
| 🎯 À créer (proposition à formuler) | Candidature ACTIV' (statut, questionnaire, entretien, décision) ; formation suivie ; mission (publiée par, antenne, statut, inscrites) ; proposition d'atelier (auteure, statut de validation, valideuse) ; créneau de pair-aidance (type, date, antenne, inscrite) ; contribution réalisée [CAD p3] |
| Contenus | 01_Module_ACTIV_texte.md [CAD p3] (= MOD) |

Règles existantes à respecter (socle) ✅ :
- Session = occurrence datée (date, lieu, jauge, format live ou visio, antenne) ; workshop = catégorie générique ; le front parle d'« atelier » ; les KPI comptent les sessions [GLO p2][RMP p3].
- Jauge non dépassable ; maximum 3 ateliers par adhérente et par mois ; pas de réservation de deux ateliers qui se chevauchent [RMP p3].
- Rattachement par branch (ID numérique du CPT location), jamais par texte libre ; une session est visible si la branch de l'utilisatrice est égale à celle de la session ; accès direct par URL à une autre antenne bloqué [RAD p1][RAD p2][RMP p4].
- Toute notification ou email transactionnel passe par Brevo [RAD p3].
- Formats de ressources acceptés : vidéos et PDF uniquement [RMP p4][RAD p4].

Détails dans [04-regles-metier.md](04-regles-metier.md), [05-administration-roles-securite.md](05-administration-roles-securite.md), [06-donnees-et-technique.md](06-donnees-et-technique.md).

---

## 8. Contraintes [CAD p3]

| Type | Contrainte |
|---|---|
| Technique | WordPress, réutiliser le moteur de sessions et de réservation plutôt que d'en créer un second ; pas de snippet de contournement ; UAT avant production |
| Droits | Toute proposition d'activité passe par soumission, validation et modération (équipe ou directrice d'antenne). Visibilité par antenne ; un atelier virtuel peut être ouvert à toutes les antennes |
| Sécurité et éthique | Écoute téléphonique et groupes de parole touchent des personnes vulnérables : procédure d'alerte et d'escalade vers l'équipe, accès visible aux numéros d'urgence. Aucun contenu de prévention du suicide inventé |
| Charge des pair-aidantes | Elles sont elles-mêmes en rétablissement : limites d'engagement, possibilité de se retirer sans culpabilité, analyse de pratique |
| Achats et moyens | Petite équipe, prestataire au temps compté. Une communauté « type Slack » doit rester réaliste : comparer outil intégré et outil externe. Aucun seuil d'appel d'offres connu |
| Mesure | KPI calculés en direct ; les pair-aidantes bénévoles ne faussent pas les KPI adhérentes |
| Accessibilité | RGAA ; une page, un clic, une récompense ; calendrier utilisable au clavier ; boutons explicites |
| Budget | Prix de l'option ACTIV' non fixé (« X € ») : variable. Question du bénévolat comme co-financement à voir avec l'association |
| Ton | Valoriser le vécu comme une ressource, jamais une injonction à « rendre » |
| Données | Données de santé ; aucune donnée nominative dans un outil externe sans cadre RGPD adapté ; données fictives uniquement dans le prototype |

Contraintes connexes d'autres sources :
- Aucun outil externe n'a accès aux données des adhérentes ; hébergement HDS en France ; permissions par rôle [RAD p4][RAD p5].
- On corrige toujours la source, UAT avant production, jamais de second mécanisme superposé au code existant [RMP p6].
- Le stade est une orientation, jamais un diagnostic médical [GLO p2][PER p4].
- Note du cadrage : si une information manque, le dire et formuler une hypothèse ; utiliser uniquement les chiffres de référence du contexte général et des données fictives [CAD p1].
- Accessibilité détaillée : voir [08-accessibilite-graphisme.md](08-accessibilite-graphisme.md) [ACC p1][ACC p2].

---

## 9. Hypothèses à tester (questions ouvertes du cadrage) ❓ [CAD p3]

| ID | Hypothèse |
|---|---|
| H1 | Un même objet « créneau » peut porter les ateliers BURN'ette, les permanences, les groupes de parole et l'écoute téléphonique, en réutilisant le moteur de sessions |
| H2 | La candidature peut être entièrement en ligne jusqu'à la prise de rendez-vous de l'entretien ; seul l'entretien reste humain |
| H3 | La validation des ateliers proposés peut se faire en un clic par la directrice d'antenne, avec un gabarit d'atelier imposé |
| H4 | Une communauté intégrée minimale (fil de l'antenne, entraide entre ACTIV') suffit en V1 ; la mise en relation de type « Tinder de l'amitié » est un POC à part |
| H5 | Un tableau de bord « mes contributions » valorise l'engagement sans gamification culpabilisante |
| H6 | Un plafond d'engagement par mois protège les pair-aidantes, sur le modèle de la limite de 3 ateliers ([RMP p3]) |
| H7 | Le back-office remplace intégralement les fichiers Excel actuels (à vérifier : on ne connaît pas leurs colonnes) |
| H8 | Les missions hors association (entreprises, immersions) peuvent réutiliser le même objet « mission » plus tard |

---

## 10. Livrable prototype attendu [CAD p3][CAD p4]

Prototype cliquable côté BURN'ette et côté équipe, au minimum :
1. Découverte d'ACTIV' depuis le parcours BIB et candidature.
2. Suivi de la candidature et formation (tronc commun, option pair-aidance).
3. Espace ACTIV' : missions disponibles, proposer un atelier, créneaux de pair-aidance, mes engagements.
4. Parcours « je propose un atelier » : formulaire, validation, choix d'un créneau dans le calendrier.
5. Back-office : candidatures, validation des propositions, publication de missions, suivi des ACTIV' et des créneaux.

À joindre pour le cahier des charges [CAD p3][CAD p4] :
- user stories avec critères d'acceptation ;
- tableau « fonctionnalité → usage → acteur → ce qu'on réutilise / modifie / crée » ;
- statuts et transitions (candidature, proposition d'atelier, mission) ;
- modèle de données proposé et dépendances avec l'existant (sessions, réservation, rôles, Brevo, KPI) ;
- indicateurs : candidatures, taux de validation, ACTIV' actives, missions publiées et pourvues, ateliers proposés, validés et réalisés, créneaux de pair-aidance tenus, heures de bénévolat, temps gagné par l'équipe.

Critères de qualité [CAD p4] : parcours d'Élodie simple et rassurant ; aucune activité publiée sans validation ; l'équipe n'a plus besoin d'Excel pour les cas montrés ; sécurité des personnes écoutées prise en compte ; cohérence avec le design system et le thème 1.

### 10.1 Indicateurs : vue consolidée
| Indicateur | Source |
|---|---|
| Candidatures, taux de validation, ACTIV' actives, missions publiées et pourvues, ateliers proposés/validés/réalisés, créneaux de pair-aidance tenus, heures de bénévolat, temps gagné par l'équipe | [CAD p4] |
| Participantes à la réunion / éligibles ; taux de complétion du questionnaire ; délai moyen candidature → réponse | [CAR p2] |
| Taux de complétion du tronc commun ; ACTIV' actives dans la communauté / mois ; créneaux d'atelier pourvus par des ACTIV' | [CAR p3] |
| % de pair-aidantes à jour de supervision ; ACTIV' engagées à l'extérieur ; durée moyenne d'engagement | [CAR p4] |
| Vigilance : les indicateurs de volume ne sont jamais des objectifs de conversion | [CAR p5] |

---

## 11. Sources du dossier citées par le cadrage [CAD p4]

- 01_Module_ACTIV_texte.md, sources/Module_ACTIV_schema.jpg (→ MOD).
- Contexte général : 00_Contexte_LBurn.md, 01_Synthese_synchros.md, 04_Verbatims_par_theme.md, 05_Glossaire_LBurn.md (→ GLO), 06_Regles_metier_plateforme_texte.md (→ RMP), 07_Regles_administration_texte.md (→ RAD), 08_Specification_KPI_modele_donnees_texte.md, 09_Personae_et_objectifs_texte.md (→ PER), 12_Accessibilite_notes_Share_It_texte.md (→ ACC), 03_Charte_graphique_pour_prototypes.md.
- ⚠ Non fournis : 00_Contexte_LBurn.md, 01_Synthese_synchros.md, 04_Verbatims_par_theme.md, 08_Specification_KPI_modele_donnees_texte.md, 03_Charte_graphique_pour_prototypes.md. Non précisé dans les sources fournies.

---

## 12. Synthèse des problèmes, irritants et défis (toutes sources)

### 12.1 Irritants listés par le cadrage [CAD p2]
| Irritant | Source citée par CAD |
|---|---|
| Suivi sur fichiers Excel et opérations manuelles | Synchro 08/10 |
| Pas d'outil pour pousser les missions et s'y inscrire | Schéma ACTIV' |
| Pas de processus outillé pour proposer, valider puis programmer un atelier | Schéma ACTIV', CR 20/10 |
| Pas d'inscription en ligne aux créneaux de pair-aidance ni de suivi back-office | Schéma ACTIV' |
| Le rôle « pair-aidante bénévole » est une cible non confirmée comme livrée | Règles d'administration |
| Droits de l'admin d'antenne pour valider des comptes ou des activités non tranchés | Règles d'administration |
| Communauté hors plateforme (Facebook) | Schéma ACTIV' |
| Notifications d'annulation partiellement hors périmètre actif (dépendance S523 / S508) | Règles d'administration ([RAD p3][RAD p4]) |

### 12.2 Frictions du parcours (hypothèses ❓) [CAR p2][CAR p3][CAR p4]
- Critère « +10 mois » peu lisible ; risque de se sentir poussée à s'engager [CAR p2].
- Candidature hors plateforme, pas de statut visible ; cahier des charges sensible [CAR p2].
- Prise de RDV manuelle ; réponse négative délicate à annoncer [CAR p2].
- Freins d'accès aux vidéos ; fin de formation qui ne débloque rien automatiquement [CAR p3].
- Infos dispersées entre email, Facebook et plateforme ; sur-sollicitation ou sur-engagement invisible [CAR p3].
- Formation préalable à tracer ; circuit et délai de validation du pitch à définir ; cohérence des missions publiées par plusieurs membres de l'équipe [CAR p3].
- Habilitation non tracée ; donnée « problématique » des écoutes à effacer (RGPD) [CAR p4].
- Critère d'accès à l'extérieur à clarifier ; suivi des actions hors plateforme [CAR p4].
- Pas de bilan de fin d'engagement ; suite à prévoir à 1 an [CAR p4].

### 12.3 Défis de socle impactant ACTIV' (existant)
- ✅ Régression constatée en septembre 2026 : les adhérentes voyaient les ateliers de toutes les antennes ; correctif de filtrage délégué au développeur, statut à confirmer ❓ [RAD p1][RAD p2][RAD p5].
- ✅ Retrait de la liste d'attente quand la personne s'inscrit finalement non géré [RMP p3][RMP p7].
- ✅ Le KPI membres actives baisse à la validation manuelle d'un compte [RAD p2][RMP p5].
- ✅ Liens de podcasts et de vidéos cassés à corriger [RAD p4].
- ✅ Environnement de test : compte de la Product Owner introuvable ; clone prod vers test demandé à AZnetwork ; URL et accès base non obtenus à la dernière tentative ; accès base de données et SSH hôte à obtenir auprès d'AZnetwork ❓ [RAD p5].
- ✅ Pilotage par enveloppe de temps ; périmètre actif réduit à 21 user stories en juillet 2026, 160 heures déjà consommées [RMP p6].
- ✅ S-IDs Airtable réutilisés (S519 désigne une autre user story qu'avant) : vérifier par le titre [RMP p6].
- 🎯 Questionnaire de satisfaction après atelier par shortcode propre à chaque session (cible), envoi dépendant de Brevo [RMP p3][RMP p4].

### 12.4 Défis transverses (objectifs plateforme)
- Simplifier la gestion des ateliers, des inscriptions et de la programmation ; faire gagner du temps aux équipes ; suivre et mesurer les bénéfices [PER p1].
- Progression à son rythme, sans injonction à aller vite [PER p1].

---

## 13. Points ouverts et questions non tranchées (toutes sources) ❓

### 13.1 Parcours ACTIV' — à trancher avec l'équipe [CAR p5]
| Étape | Question |
|---|---|
| 8 | La chargée d'antenne invite-t-elle nominativement, ou la réunion est-elle ouverte à toutes ? |
| 10 | Que propose-t-on à une BURN'ette qui n'est pas sélectionnée, ou pas encore ? |
| 11 | Le visionnage complet des vidéos suffit-il pour débloquer les actions, ou faut-il une validation ? (aussi : « faut-il une validation après le tronc commun (quiz, échange) avant la première action ? » [CAR p1]) |
| 13A | Qui valide les pitchs d'ateliers, et dans quel délai ? |
| Extérieur | L'accès se fait-il à partir de la phase de stabilisation, ou du stade remobilisation et mise en action ? |
| Fin | Quel contenu pour la formation Sentinelle, et que se passe-t-il au terme de l'année ? |
| Données (point de vigilance, pas dans « À trancher ») | Durée de conservation des problématiques saisies pour les écoutes : à fixer [CAR p5] |

### 13.2 Cadrage thème 2
- Modalités de la communauté des ACTIV' : à définir [CAD p2] ; comparer outil intégré et outil externe [CAD p3].
- Prix de l'option ACTIV' : non fixé ; bénévolat comme co-financement : à voir avec l'association [CAD p3].
- Seuil d'appel d'offres : aucun connu [CAD p3].
- Colonnes des fichiers Excel actuels : inconnues [CAD p3].
- Hypothèses H1 à H8 (section 9) [CAD p3].
- Questions de l'association : comment pousser les missions et s'y inscrire ; comment proposer son atelier ; comment s'inscrire aux créneaux et comment l'équipe suit en back-office [MOD p1].

### 13.3 Rôles et droits liés [RAD p5]
- Rôles pair-aidante bénévole et adhérente inactive : créés ou non ?
- Droits exacts du super admin : création de sessions, ouverture à toutes les antennes, validation des comptes ?
- Admin d'antenne : exporter les données nominatives, valider les comptes, traiter les remboursements ?
- Vue KPI de l'admin d'antenne : son antenne ou son département ?
- Slug réel du rôle « Branch Manager » (branch_manager supposé) et liste complète des rôles.
- Filtrage des ateliers par antenne : statut du correctif à confirmer.
- Droit d'ouverture d'une session virtuelle à toutes les antennes contrôlé par rôle, reste à valider par un test en conditions réelles [RAD p2].

### 13.4 Autres points ouverts du socle (pour mémoire) [RMP p6][RMP p7][RAD p5]
- Requête exacte du KPI membres actives ; renouvellement avant expiration ; seuil tarif réduit / plein tarif + solidaire et justificatif ; rattachement d'une adhésion glissante à une année civile ; email différent HelloAsso / plateforme ; distinction adhésion / atelier / don dans la table des paiements ; dépense moyenne ; antenne des 29 profils « Bordeaux » ; libellé du premier stade ; date de souscription HelloAsso ou WordPress ; nettoyage de la liste d'attente ; tarif strict à 0 € dans HelloAsso ; accès base et SSH. Détail : [04-regles-metier.md](04-regles-metier.md), [05-administration-roles-securite.md](05-administration-roles-securite.md).

---

## 14. Incohérences et divergences entre sources

| # | Sujet | Côté A | Côté B | Statut |
|---|---|---|---|---|
| D1 | Condition d'accès | « à partir du parcours BIB, en option, sur candidature » [MOD p1] ; « uniquement pour celles qui suivent le parcours BIB, sur candidature » [GLO p1] ; être en BIB conditionne l'accès [CAD p1] | « Option ouverte aux BURN'ettes en phase de projection » [CAR p5] ; « Phase de projection, +10 mois » [CAR p1] ; critère (+10 mois) « peu lisible » [CAR p2] | ❓ Signification de « +10 mois » non précisée dans les sources |
| D2 | Contenu du tronc commun | Psychoéducation ; posture d'animation d'ateliers [MOD p1] | Psychoéducation, fonctionnement de l'asso [CAR p1][CAR p3] | ❓ Non tranché |
| D3 | Prérequis aux actions (ateliers, missions, modération) | Tronc commun pour toutes, puis actions possibles ; pas de formation modération mentionnée [MOD p1] | Formation modération (13) « préalable aux trois points suivants » (13A, 13B, 13C) [CAR p1][CAR p5] | ❓ Non tranché |
| D4 | Exemples de missions ponctuelles | Rédaction d'articles, administratif, logistique… [MOD p1] | Article de blog, intervenir en entreprise, salon auprès des entreprises avec une salariée [CAR p1][CAR p3] | Divergence d'exemples |
| D5 | Activités à l'extérieur / en entreprise | Missions hors association et immersions : piste, pas conçues ⛔ [CAD p2] ; missions hors association = pistes non actées 🟡 [MOD p1] ; mentorat en entreprise V3 [CAD p2] | « ACTIV' à l'extérieur » dessiné dans la cartographie du parcours ACTIV' (job meeting, Immersion Facile, bénévolat dans les assos) [CAR p1][CAR p4] ; « intervenir en entreprise » listé en 13B (à l'intérieur de l'association) [CAR p1] | Appliquer le périmètre du cadrage [CAD p2] |
| D6 | Critère d'accès à l'extérieur | « En principe accessible à partir de la phase de stabilisation » [CAR p1] | « Accessible à toute personne au stade remobilisation et mise en action » [CAR p1] ; question posée [CAR p5] | ❓ À trancher |
| D7 | Qui valide les ateliers / activités proposés | Directrice d'antenne valide les activités proposées par les pairs [GLO p2] ; équipe ou directrice d'antenne [CAD p2][CAD p3][PER p4] ; H3 : directrice d'antenne en un clic [CAD p3] | « Qui valide les pitchs d'ateliers, et dans quel délai ? » [CAR p5] ; droits de l'admin d'antenne pour valider des activités non tranchés [CAD p2] | ❓ Non tranché |
| D8 | Outils de rendez-vous / écoute | Réutiliser le moteur de sessions et de réservation, pas de second mécanisme [CAD p3][RMP p6] ; aucune donnée nominative dans un outil externe sans cadre RGPD adapté [CAD p3][RAD p5] | Calendly pour les RDV, éventuellement connecté à Google Agenda [CAR p1][CAR p4] ; Monday pour la qualification interne des candidatures [CAR p2] | ❓ Non tranché ; H1 propose un objet « créneau » unique [CAD p3] |
| D9 | Communauté | Modération de la communauté : « Communauté Facebook par exemple » [MOD p1] ; Communauté hors plateforme (Facebook) = irritant [CAD p2] | « Plateforme (communauté, chat) » à l'étape 12 [CAR p3] ; communauté intégrée minimale = H4 [CAD p3] | ❓ Modalités à définir [CAD p2] |
| D10 | Prix | « Parcours ACTIV' (X€) - sur candidature » [VIS p1] | Prix de l'option ACTIV' non fixé (« X € ») [CAD p3] ; GLO ne dit pas si ACTIV' est payant (BBA et BIB : payants) [GLO p1] | Montant non renseigné (espace réservé) [VIS p1] |
| D11 | Libellé « parcours » vs « module » | « Parcours ACTIV' (en option) » défini comme Module « bonus » optionnel [GLO p1] ; « Parcours ACTIV' » [VIS p1][CAR p1] | « Module ACTIV' » [MOD p1] ; « Parcours ≠ module. Un parcours (BBA, BIB) regroupe trois modules » [GLO p2] | Graphie à utiliser : « ACTIV' » (les supports écrivent aussi Activ', Actives, ACTIV) [GLO p2] |
| D12 | Statut de la pair-aidante | Pair-aidante = BURN'ette qui suit le focus pair-aidance, donc aussi une ACTIV' ; ACTIV' réservé aux BURN'ettes en BIB [GLO p1][GLO p2] | Rôle cible « pair-aidante bénévole » : accès aux ressources, pas aux ateliers payants ; exclue des KPI adhérentes ; non confirmé comme livré [RAD p1][CAD p2] | ❓ Articulation entre les deux non précisée dans les sources |
| D13 | Numérotation des étapes | Parcours ACTIV' : étapes 8 à 14 (8 réunion d'info, 9 candidature…) [CAR p1][CAR p2] | « Règles de réservation (étape 9 du parcours bénéficiaire) » [RMP p3] ; « étape 5 du parcours » [CAD p1] ; « étape 6 », « (étape 5) » [CAR p3] | Numérotations de cartes différentes ; correspondance non précisée |
| D14 | Durée d'engagement | 1 an maximum, sortie libre, pause à tout moment [CAR p1][CAR p5] | Aucune durée mentionnée [MOD p1][CAD p2] | — |
| D15 | Formation Sentinelle | Parcours Sentinelle : module « bonus » sur candidature, à partir du module 6, hors périmètre [GLO p1] ; hors périmètre [CAD p2] | Formation Sentinelle accessible en fin d'engagement ACTIV', contenu à préciser [CAR p1][CAR p4] | ⛔ Hors périmètre hackathon |
| D16 | Libellé du premier stade | « Épuisement » (glossaire validé, à utiliser) [GLO p2] | « Turbulence » (référente scientifique ; clé code `turbulence`) [GLO p2][RMP p5] | ❓ Point ouvert [RMP p6] |
| D17 | Visibilité atelier virtuel | Antenne virtuelle traitée comme les autres pour le filtre ; visibilité élargie via ouverture à toutes les antennes [RAD p2] ; un atelier virtuel « peut être ouvert à toutes les antennes » [CAD p3] | Un atelier virtuel créé par une antenne « reste visible de toutes les utilisatrices en front-office » [RMP p4] | Divergence de formulation entre RAD et RMP |

---

## Non précisé dans les sources

- Signification exacte et calcul du critère « +10 mois » (point de départ, source de la date). Non précisé dans les sources.
- Contenu des questionnaires de motivation et du « cahier des charges » de candidature (questions, champs, format du « résultat » à stocker). Non précisé dans les sources.
- Liste des statuts et transitions (candidature, proposition d'atelier, mission, créneau, habilitation) : à proposer, non fournie [CAD p4]. Non précisé dans les sources.
- Colonnes des fichiers Excel actuels de suivi des ACTIV' [CAD p3]. Non précisé dans les sources.
- Valeur du plafond d'engagement mensuel des pair-aidantes (H6). Non précisé dans les sources.
- Procédure d'alerte et d'escalade (qui est prévenu, comment, délai) et liste des numéros d'urgence à afficher. Non précisé dans les sources.
- Contenu des vidéos et formations (psychoéducation, posture, prévention du suicide) : à fournir par l'association [CAD p2].
- Gabarit d'atelier imposé (H3) : champs. Non précisé dans les sources.
- Délai de validation d'un pitch / d'une proposition d'atelier [CAR p5]. Non précisé dans les sources.
- Durée de conservation des problématiques saisies pour les écoutes [CAR p5]. Non précisé dans les sources.
- Définition et calcul des « heures de bénévolat » et du « temps gagné par l'équipe » [CAD p4]. Non précisé dans les sources.
- Fiche complète du persona Élodie (stade 5) : seule sa citation figure dans les sources [CAD p1] ; elle n'est pas décrite dans PER. Non précisé dans les sources.
- Fréquence, jauge et format des permanences, groupes de parole et écoutes téléphoniques assurés par les ACTIV'. Non précisé dans les sources.
- Montant de l'option ACTIV' et mode de paiement (HelloAsso ou non). Non précisé dans les sources.
- Clés de code / slugs pour les nouveaux objets et rôles ACTIV' (hors `branch_manager`, « retenu sans vérification en base » [RAD p1], « supposé » [RAD p5]). Non précisé dans les sources.
- Contenu des documents de contexte cités mais non fournis (00_Contexte_LBurn.md, 01_Synthese_synchros.md, 04_Verbatims_par_theme.md, 08_Specification_KPI_modele_donnees_texte.md, 03_Charte_graphique_pour_prototypes.md) [CAD p4]. Non précisé dans les sources.
- Ce qui est proposé à une candidate non sélectionnée [CAR p5]. Non précisé dans les sources.
