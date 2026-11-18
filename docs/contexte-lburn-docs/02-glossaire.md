# Glossaire et vocabulaire à respecter

> Objet : fixer le vocabulaire exact de L'BURN (terme → définition de l'association), les clés de code, les distinctions à ne pas confondre et les sigles, pour que le code, l'UI et les données utilisent les mots de l'association. Sources : GLO (référence principale), RMP, RAD, MOD, CAD, CAR, PER, VIS, ACC.

Légende statuts : ✅ actuel/existant · 🎯 cible · 🟢 décidé/validé · 🟡 piste non actée · ❓ question ouverte/hypothèse · ⛔ hors périmètre/reporté.

Voir aussi : [01-association-offre-parcours.md](01-association-offre-parcours.md) · [03-personae-besoins.md](03-personae-besoins.md) · [04-regles-metier.md](04-regles-metier.md) · [05-administration-roles-securite.md](05-administration-roles-securite.md) · [06-donnees-et-technique.md](06-donnees-et-technique.md) · [07-workflows.md](07-workflows.md) · [09-hackathon-theme2-activ-problemes.md](09-hackathon-theme2-activ-problemes.md).

---

## À retenir pour le build

- Consigne de l'association : utiliser les mots exactement dans le sens défini ; si un terme n'est pas défini, le dire plutôt que d'en inventer un (« garbage in, garbage out ») [GLO p1].
- Graphie : écrire « ACTIV' » (les supports écrivent aussi Activ', Actives, ACTIV) et « BURN'ette » [GLO p2].
- Atelier ≠ session ≠ workshop : session = occurrence datée (date, lieu, jauge, format live ou visio, antenne) ; workshop = catégorie générique ; le front dit « atelier » ; les KPI comptent les sessions [GLO p2][RMP p3].
- Stades : libellé UI ≠ clé code — Épuisement/`turbulence`, Récupération/`recuperation`, Introspection/`introspection`, Projection/`projection`, Mise en action/`action` [GLO p2][RMP p4][RMP p5]. Afficher « Épuisement » [GLO p2].
- Le stade est une orientation, jamais un diagnostic médical [GLO p2][PER p4].
- BAT ≠ quiz de stade : aucun lien (ni questions, ni scoring, ni code) [GLO p2][RMP p4].
- Bénéficiaire ≠ adhérente (toute adhérente est bénéficiaire, pas l'inverse) ; ACTIV' ≠ pair-aidante (toute pair-aidante est ACTIV', pas l'inverse) [GLO p2].
- Parcours ≠ module : un parcours (BBA, BIB) regroupe trois modules [GLO p2].
- Accès ACTIV' : module « bonus » optionnel, uniquement pour celles qui suivent le parcours BIB, sur candidature [GLO p1] ; « à partir du parcours BIB, en option, sur candidature » [MOD p1] ; « option ouverte aux BURN'ettes en phase de projection » [CAR p5] (voir §8).
- Rattachement antenne par identifiant `branch` (ID numérique du CPT location), jamais par texte libre [RAD p1][RMP p4].
- Rôle admin d'antenne = « Branch Manager », slug `branch_manager` retenu sans vérification en base ❓ [RAD p1][RAD p5].
- Site vitrine ≠ application (plateforme) [GLO p2].

---

## 1. L'offre (ingénierie d'accompagnement) — glossaire officiel

| Terme | Définition de l'association | Statut | Source |
|---|---|---|---|
| Activités | Toutes les activités de l'association à destination des bénéficiaires. | ✅ | [GLO p1] |
| Parcours Découverte (0 €) | Ensemble des activités gratuites accessibles avant adhésion : une permanence découverte, un seul accès à un groupe de parole, un appel téléphonique sur demande. | ⛔ Reporté hors hackathon | [GLO p1] |
| Adhésion annuelle | Adhésion à l'association (prix annuel) donnant accès à : communauté et lieu, ateliers BURN'ettes, groupes de parole, ressources en ligne, ateliers coup de pouce. Dure 12 mois glissants à partir du paiement. | ✅ | [GLO p1][RMP p1] |
| Parcours d'accompagnement | Ensemble des modules des parcours 1 et 2, qui correspondent aux stades de la reconstruction. Divisé en deux parties : modules 1 à 3 et modules 4 à 6. | ✅ | [GLO p1] |
| Parcours BURN to be ALIVE (BBA) | Modules 1 à 3 : ressources, ateliers socles, ateliers Feel Good en libre accès mais en lien avec le stade. Parcours payant, en option de l'adhésion. | ⛔ hors périmètre (thème 1) | [GLO p1][CAD p2] |
| Parcours BURN'ette is BACK (BIB) | Modules 4 à 6 : ressources, ateliers socles, ateliers Feel Good en lien avec le stade, plus remobilisation externe. Parcours payant. Une étape de validation précède l'inscription. | ⛔ hors périmètre (thème 1) | [GLO p1][CAD p2] |
| Parcours ACTIV' (en option) | Module « bonus » optionnel, uniquement pour celles qui suivent le parcours BIB, sur candidature. Traite la remobilisation interne, au sein de l'association. | 🎯 (thème 2) | [GLO p1][CAD p1] |
| Parcours Sentinelle (en option) | Module « bonus » optionnel, sur candidature, à partir du module 6 : apprendre à repérer et orienter les situations de détresse dans son propre environnement, notamment professionnel. | ⛔ Hors périmètre du hackathon | [GLO p1][CAD p2] |
| Module | Étape d'un parcours. 1 Épuisement, 2 Récupération, 3 Introspection (BBA) ; 4 Projection, 5 Mise en action, 6 Stabilisation (BIB). Rythme conseillé : un mois par module. | ✅ | [GLO p1] |
| Atelier socle | Atelier obligatoire de chaque module du parcours d'accompagnement. Virtuel ou présentiel, déroulé pédagogique harmonisé, animé par un professionnel rémunéré. | ✅ | [GLO p1] |
| Ressource | Contenu à découvrir de manière autonome (asynchrone) en ligne sur la plateforme, parfois lié à un atelier socle. Formats acceptés aujourd'hui : vidéo et PDF. | ✅ | [GLO p1][RMP p4][RAD p4] |
| Permanence découverte | Réunion d'information sur l'association pour les nouvelles arrivantes (le jeudi matin à Bordeaux). Objectif : que la personne se sente bien, vérification de la prise en charge, explication globale de l'association. | ✅ | [GLO p1] |
| Groupe de parole (libre ou thématique) | Groupe animé par des pair-aidantes, qui ouvre un espace de parole collectif. Regroupe si possible des bénéficiaires à la même phase de rétablissement. Les groupes thématiques proposent un thème (ex. la honte de parler de son burn-out). | ✅ | [GLO p1] |
| Atelier BURN'ette | Atelier animé par une BURN'ette pour les BURN'ettes, en principe bénévolement. Programmation mensuelle. Aussi appelé « ateliers B » dans le schéma ACTIV'. | ✅ | [GLO p1][MOD p1] |
| Atelier Feel Good | Atelier de bien-être (sophrologie, relaxation…) animé par une professionnelle rémunérée. Programmation mensuelle. Certains recommandés à partir du stade 3. | ✅ | [GLO p1] |
| Atelier coup de pouce | Anciennement « cafés info ». Animés par des partenaires, payants ou gratuits : informations et questions-réponses sur sujets spécifiques (juridique, CARSAT, France Travail…). Programmation parallèle. | ✅ | [GLO p1] |
| Carnet de bord | Outil partagé qui permet à chacune de suivre ses avancées tout au long du parcours. Existe aussi par atelier (support Canva). | ✅ | [GLO p1] |

### Compléments de l'offre (autres sources)

| Terme | Ce que disent les sources | Statut | Source |
|---|---|---|---|
| Permanence d'infos 1h (visuel « premier contact ») | 20 min définition officielle du BO et stades de rétablissement / 20 min fonctionnement de l'asso / 20 min QR. Ensuite accès à 1 groupe de parole BBA et 1 appel téléphonique d'1h si besoin. Gratuit. | Non précisé dans les sources (visuel) | [VIS p1] |
| Prix (adhésion, parcours) | Espaces réservés « XX€ » / « X€ », non renseignés ; adhésion « plusieurs paliers disponible accessibilité financière ». Prix de l'option ACTIV' non fixé (« X € »). | ❓ | [VIS p1][CAD p3] |
| Contenu d'un parcours | Chaque parcours donne accès à : des ressources + des ateliers socles + des ateliers Feel Good. | ✅ | [VIS p1] |
| Antenne locale / virtuelle | Point d'accès au lieu et à la communauté d'entraide (visuel). Voir §5 Antennes. | ✅ | [VIS p1][RMP p4] |
| Thématique | Catégorie d'atelier (ex. Bien-être, Juridique, Fondamentaux). | ✅ | [RMP p3] |
| Format | Live ou visio. | ✅ | [RMP p3][RAD p3] |
| Liste d'attente | Inscription possible sur session complète ; à une place libérée, toutes les personnes en attente sont prévenues en même temps (premier arrivé, premier servi, sans inscription automatique). | ✅ | [RMP p3][RAD p3] |
| Onglet « Pour moi » / « Toutes les ressources » | « Pour moi » : ressources recommandées selon le stade ; « Toutes les ressources » : tout, sans filtre par défaut. | ✅ | [RMP p4] |
| Communauté | Utile à tous les stades, rôle évolutif : stade 2 réassurance/écoute/compréhension ; stade 3 partage/expression/sortie de l'isolement ; stade 4 témoignages/inspiration/réflexion sur l'après ; stade 5 réseau, mise en action, mises en situation et pair-aidance. | ✅ (principe) | [PER p4] |

---

## 2. Vocabulaire du parcours ACTIV'

| Terme | Définition / contenu dans les sources | Statut | Source |
|---|---|---|---|
| ACTIV' (personne) | BURN'ette qui suit le module ACTIV' et se remobilise en interne dans l'association. | ✅ définition | [GLO p2] |
| Prérequis | Présentation générale (vidéo : être « ACTIV' », la pair-aidance) ; analyse de motivation et validation de la candidature : questionnaire, puis entretien préalable avec la chargée de remobilisation. | 🎯 | [MOD p1] |
| Réunion d'information (étape 8) | Phase de projection, +10 mois ; option ouverte aux BURN'ettes en phase de projection. | 🎯 | [CAR p1][CAR p2][CAR p5] |
| Candidature (étape 9) | Questionnaire (de motivation) et cahier des charges ; conditions : 1 an max, sortie libre ; sélectionnées par l'asso. | 🎯 | [CAR p1][CAR p2] |
| Cahier des charges (côté candidate) | Document de conditions pris en connaissance à la candidature ; sensible : ne stocker que le résultat, jamais les informations de santé. | 🎯 | [CAR p2][CAR p5] |
| Entretien et validation (étape 10) | Avec la chargée de remobilisation ; sélectionnée ou non par l'asso. | 🎯 | [CAR p1][CAR p2] |
| Tronc commun (étape 11) | Pour toutes. Formation en ressources vidéo : psychoéducation ; posture d'animation d'ateliers [MOD p1] / psychoéducation, fonctionnement de l'asso [CAR p1]. | 🎯 | [MOD p1][CAR p1] |
| Vie du collectif (étape 12) | Réunion mensuelle, communauté, chat ; endroit où l'asso transmet ses infos aux ACTIV' (actus, réunions). | 🎯 | [CAR p1][CAR p3] |
| Formation modération (étape 13) | Préalable aux ateliers BURN'ettes, missions et modération (13A à 13C). | 🎯 | [CAR p1][CAR p5] |
| 13A · Ateliers BURN'ettes | Proposer, animer (ex. jardinage, poterie…) ; accès à des créneaux libres (ex. tous les lundis), elles se positionnent, proposent un pitch et l'asso valide avant diffusion. | 🎯 | [CAR p1][CAR p3] |
| 13B · Missions | « Ponctuelles » : article de blog, intervenir en entreprise, salon auprès des entreprises avec une salariée [CAR p1] ; rédaction d'articles, administratif, logistique… [MOD p1]. Missions proposées/publiées par l'association (équipe). | 🎯 | [CAR p1][MOD p1][CAD p2] |
| 13C · Modération | Modération de la communauté (ex. communauté Facebook). | 🎯 | [CAR p1][MOD p1] |
| Focus pair-aidance (étape 14) | « En plus, pour celles qui le souhaitent ». Option, 2 × 3 h en synchrone, ressources, groupes d'analyse de pratique. Thèmes : animation de groupes de parole, permanences, écoutes téléphoniques ; posture de pair-aidance, écoute active, prévention du suicide. Préalable à 14A et 14B. | 🎯 | [MOD p1][CAR p1][CAR p5] |
| 14A · Permanences, groupes de parole | Accès aux créneaux : calendrier où les pair-aidantes s'inscrivent automatiquement. | 🎯 | [CAR p1] |
| 14B · Écoutes téléphoniques | Calendly pour les RDV avec les bénéficiaires, éventuellement connecté à Google Agenda ; mails automatiques ; texte court de la bénéficiaire à effacer (RGPD). | 🎯 | [CAR p1][CAR p4] |
| Analyse de pratique | Groupes pour débriefer ses animations en tant que pair-aidante. | 🎯 | [MOD p1] |
| ACTIV' à l'intérieur / à l'extérieur | Intérieur : 13–14 dans l'asso. Extérieur : job meetings, immersion en entreprise (lien vers Immersion Facile), bénévolat dans d'autres associations. | 🎯 intérieur · 🟡/⛔ extérieur (« esquissé comme piste, pas conçu ») | [CAR p1][CAR p4][CAD p2] |
| Pause | Toujours possible, à chaque étape. Principe directeur : l'engagement est un choix. | 🎯 | [CAR p1][CAR p5] |
| Fin d'engagement | Arrête quand elle le souhaite, au plus tard après 1 an. | 🎯 | [CAR p4][CAR p5] |
| Formation Sentinelle (fin d'engagement) | Contenu à préciser. | ❓ | [CAR p1][CAR p4] |
| Communauté des ACTIV' | Échanges, entraide ; modalités à définir. | ❓ | [CAD p2] |
| Créneau (objet) | H1 : un même objet « créneau » pourrait porter ateliers BURN'ette, permanences, groupes de parole et écoute téléphonique. | ❓ hypothèse | [CAD p3] |
| « Tinder de l'amitié » | Mise en relation, POC à part (H4). | ❓ | [CAD p3] |
| Mentorat en entreprise | V3. | ⛔ | [CAD p2] |
| Contributions (« mes contributions ») | Tableau de bord valorisant l'engagement sans gamification culpabilisante (H5) ; « contribution réalisée » objet à créer. | ❓ | [CAD p3] |
| Phases AARRR (cartographie) | Libellés utilisés : Acquisition interne, Activation, Rétention, Impact, Referral. | ✅ (grille d'analyse) | [CAR p2][CAR p3][CAR p4] |

---

## 3. Les personnes — glossaire officiel

| Terme | Définition de l'association | Source |
|---|---|---|
| Bénéficiaires = BURN'ettes | Toutes les femmes qui vivent les activités de l'association. | [GLO p2] |
| Nouvelle arrivante | Une femme qui n'a pas encore adhéré. | [GLO p2] |
| Adhérente | Toute femme qui adhère ; une adhérente est une bénéficiaire. | [GLO p2] |
| Non-adhérente | Bénéficiaire sans adhésion, sans compte utilisateur, suivie par l'administration (accès aux groupes de parole et permanences uniquement). Technique : CPT `beneficiaire`. | [GLO p2][RMP p1][RAD p1] |
| BURN'ette BBA | BURN'ette au début de son rétablissement, en parcours BBA (anciennement « bb »). | [GLO p2] |
| BURN'ette BIB | BURN'ette à la fin de son rétablissement, en parcours BIB (anciennement « experte »). | [GLO p2] |
| ACTIV' | BURN'ette qui suit le module ACTIV' et se remobilise en interne dans l'association. | [GLO p2] |
| Pair-aidante | BURN'ette qui suit le focus pair-aidance du module ACTIV' et s'engage comme pair-aidante. Une pair-aidante est donc aussi une ACTIV'. | [GLO p2] |
| Sentinelle | BURN'ette formée à repérer et orienter les situations de détresse dans son propre environnement, notamment professionnel. | [GLO p2] |
| Partenaires | Animent les ateliers coup de pouce (partenaires opérationnels institutionnels ou associatifs). En principe bénévoles. | [GLO p2] |
| Professionnel | Psychologue, coach, sophrologue, avocat… Anime les ateliers socles et Feel Good. En principe rémunéré. | [GLO p2] |
| Chargée de remobilisation | Membre de l'équipe qui mène l'entretien de candidature ACTIV'. | [GLO p2] |
| Directrice d'antenne / admin d'antenne (« Branch Manager ») | Gère son antenne ; valide les activités proposées par les pairs. Périmètre technique : uniquement son antenne (sessions, contenus, KPI). | [GLO p2][RAD p1] |
| Super admin | Vue et gestion nationales. | [GLO p2][RAD p1] |

### Rôles et statuts complémentaires (autres sources)

| Terme | Définition | Statut | Source |
|---|---|---|---|
| Adhérente (bénéficiaire connectée) | Voit sessions et contenus rattachés à son antenne. | ✅ (régression sept. 2026 constatée) | [RAD p1] |
| Pair-aidante bénévole (rôle) | Accès aux ressources, pas aux ateliers payants ; exclue des KPI adhérentes. | 🎯 non confirmé comme livré | [RAD p1][CAD p2][CAD p3] |
| Adhérente inactive (rôle) | Transition après expiration, liste des inactives consultable en back-office. | 🎯 non confirmé comme livré | [RAD p1][RAD p2] |
| Membre active | Adhérente dont la date la plus récente parmi `subscription_date` et toutes les `renew_date` tombe dans les 365 derniers jours (règle du dashboard et de l'export nominatif). | ✅ | [RMP p1][RMP p2] |
| Sous-statuts d'adhérente | Plein tarif (50 €, HelloAsso) ; Plein tarif + solidaire (plus de 50 €, avec don) ; Tarif réduit (entre 1 et 49 €) ; Gratuité (0 €, création manuelle hors HelloAsso). | ✅ | [RMP p1] |
| Statut « abonnée » | Doit être renseigné lors d'une adhésion, sinon la personne ne remonte pas dans le KPI des adhérentes. | ✅ | [RAD p2] |
| Adhésion solidaire | Demande qui déclenche l'envoi automatique du questionnaire de création de compte ; ne doit pas fausser les KPI. | 🎯 | [RMP p2][RAD p2] |
| Remboursement en attente | Statut affiché dans l'historique de la personne après annulation d'un atelier payé (US519, option semi-automatique validée). | 🟢 | [RMP p2] |
| Product Owner | Rédactrice des règles métier et d'administration (14/10/2026). | ✅ | [RMP p1][RAD p1] |
| Référente scientifique | Valide le contenu scientifique des stades ; nouvelle version du questionnaire de stade attendue début 2027. | ✅ | [RAD p4][RMP p4] |
| Référente des KPI | Vérifie la logique de calcul des KPI. | ✅ | [RAD p4] |
| Chargée de communication | Suit configuration/contenu Brevo ; valide contenus de communauté et de tarification solidaire. | ✅ | [RAD p3][RAD p4] |
| Écoutantes | Destinataires des mails automatiques des écoutes téléphoniques (14B). | 🎯 | [CAR p1][CAR p4] |
| Personae | Fictifs, construits par l'association ; Marion (stade 2), Manon (stade 3), Élodie (stade 5). Détail : [03-personae-besoins.md](03-personae-besoins.md). | ✅ | [PER p1][PER p2][PER p3][CAD p1] |

---

## 4. Les stades de rétablissement et questionnaires

| Ordre | Libellé validé (UI) | Clé dans le code | Module | Source |
|---|---|---|---|---|
| 1 | Épuisement | `turbulence` | 1 (BBA) | [GLO p1][GLO p2][RMP p4] |
| 2 | Récupération | `recuperation` | 2 (BBA) | [GLO p2][RMP p5] |
| 3 | Introspection | `introspection` | 3 (BBA) | [GLO p2][RMP p5] |
| 4 | Projection | `projection` | 4 (BIB) | [GLO p2][RMP p5] |
| 5 | Mise en action | `action` | 5 (BIB) | [GLO p2][RMP p5] |
| — | (Stabilisation) | aucune | 6 (BIB) | [GLO p1][GLO p2] |

- Le module 6 « Stabilisation » n'a pas de stade correspondant dans le quiz [GLO p2].
- ❓ Point ouvert : la référente scientifique dit « Turbulence », le glossaire validé dit « Épuisement » ; consigne GLO : utiliser « Épuisement » ; RMP : « À trancher avec elle » [GLO p2][RMP p5][RMP p6].
- Le stade est stocké dans `current_stage` (ID de terme de la taxonomie `stage`) ; il pilote l'onglet « Pour moi » et la mise en avant des sessions [RMP p4][RMP p5].
- Le stade est une orientation, jamais un diagnostic médical [GLO p2][PER p4].

| Terme | BAT (burn-out assessment tool) | Quiz de stade (quiz connecté) | Source |
|---|---|---|---|
| Public | Visiteuses du site vitrine, non connectées | Adhérentes connectées | [GLO p2][RMP p4] |
| Contenu | Questionnaire officiel, 6 sous-dimensions : `exhaustion`, `mental_distance`, `emotional_deficiency`, `cognitive_deficiency`, `psychological_complaint`, `psychosomatic_complaint` | 5 stades × 7 items = 35 questions, Likert 1 à 5 | [RMP p4] |
| Calcul | Score global, logique inchangée | Stade dominant = moyenne la plus haute par section (ni somme, ni seuil global) | [RMP p4] |
| Résultat | Page de résultats du site vitrine (retirer les pictos feu tricolore, sans toucher au calcul) | Stade enregistré dans `current_stage` | [RMP p4][RMP p5] |

---

## 5. Termes techniques et clés de code

### Objets et champs

| Clé / terme | Signification | Statut | Source |
|---|---|---|---|
| session | Occurrence datée : date, lieu, jauge, format (live ou visio), antenne ; CPT session (image mise en avant = photo). KPI « ateliers proposés » = table des sessions. | ✅ | [GLO p2][RAD p3][RMP p5] |
| workshop | Catégorie générique d'atelier. | ✅ | [GLO p2][RMP p3] |
| CPT `beneficiaire` | Non-adhérente (sans compte utilisateur). | ✅ | [RAD p1][RMP p1] |
| CPT `location` / `branch` | Antenne ; `branch` = ID numérique du CPT location, identique sur profil et session. | ✅ | [RAD p1][RMP p4] |
| Champs utilisateur | `rgpd_consent`, `membership_amount`, `has_rsa`, `subscription_date`, `renew_date`, `branch`, `current_stage`, `birthdate`. | ✅ | [RMP p6] |
| `membership_amount` | Porte le montant ; `has_rsa` (difficulté financière) ne suffit pas à distinguer tarif réduit et gratuit. | ✅ | [RMP p1] |
| `user_sessions` / `user_workshops_waitinglist` | Inscriptions / liste d'attente (même format). | ✅ | [RMP p3] |
| `expiration_date`, statut `Active` | Modèle de table d'abonnements proposé par la référente des KPI. | 🟡 non implémenté | [RMP p2] |
| `lb_app_capabilities` | Données utilisateur où sont observés les rôles WP `administrator`, `subscriber` (échantillon non exhaustif). | ✅ | [RAD p1] |
| `branch_manager` | Slug du rôle Branch Manager, supposé. | ❓ | [RAD p1][RAD p5] |
| `manage_options` | Capacité super admin pour outils de diagnostic / snippets de diagnostic. | ✅ | [RAD p1][RAD p5] |
| `getMode()` | Compare les libellés HelloAsso par chaîne stricte ; libellé inconnu → HTTP 400. | ✅ | [RMP p2] |
| `order.id`, `payment.id` | Non stockés. | ✅ | [RMP p2] |
| Shortcode de questionnaire de satisfaction | Lien propre à chaque session, en remplacement du lien fixe. | 🎯 | [RMP p3][RMP p4] |

### Libellés HelloAsso reconnus par le webhook (chaîne stricte)

| Libellé | Catégorie | Source |
|---|---|---|
| `Inscription atelier - [nom] - [date courte] - [date complète]` | Session | [RMP p2] |
| `Adhésion annuelle - [Prénom Nom]` | Adhésion, création | [RMP p2] |
| `Renouvellement adhésion - [Prénom Nom]` | Adhésion, renouvellement | [RMP p2] |

### Antennes (branches)

| Antenne | Territoire | Source |
|---|---|---|
| Gironde | Département 33 | [RMP p4] |
| Lot-et-Garonne | Département 47 | [RMP p4] |
| Nord | Départements 02, 59, 60, 62, 80 (Hauts-de-France) | [RMP p4] |
| Antenne virtuelle (nationale) | Tous les autres territoires ; antenne à part entière avec son propre ID | [RMP p4][RAD p1] |

- « Bordeaux » n'est pas une antenne du référentiel : 29 profils concernés, exclus des KPI par antenne ❓ [RMP p4][RMP p6].
- « Ouverture à toutes les antennes » : option d'une session virtuelle, activée à la création de la session par le Branch Manager [RAD p2], seulement pour une session dont il est l'auteur et qui porte sa `branch` [RAD p1] ; droit du super admin : « À confirmer » ❓ [RAD p1].

---

## 6. Sigles et abréviations

| Sigle | Sens donné par les sources | Source |
|---|---|---|
| BBA | Parcours BURN to be ALIVE (modules 1 à 3) | [GLO p1] |
| BIB | Parcours BURN'ette is BACK (modules 4 à 6) | [GLO p1] |
| « bb » / « experte » | Anciens noms de BURN'ette BBA / BURN'ette BIB | [GLO p2] |
| « ateliers B » | Ateliers BURN'ette (schéma ACTIV') | [MOD p1] |
| « cafés info » | Ancien nom des ateliers coup de pouce | [GLO p1] |
| BAT | burn-out assessment tool | [GLO p2][RMP p4] |
| BO | Utilisé (« définition officielle du BO ») ; jamais développé dans les sources. | [VIS p1] |
| US / S-ID | User story ; identifiants Airtable (ex. S482, S483, S508, S523, US519) qui font référence ; identifiants réutilisés (S519 désigne une autre US qu'avant) : vérifier par le titre. | [RMP p1][RMP p2][RMP p6][RAD p3] |
| KPI | Indicateurs, calculés en direct sur la base, jamais à partir de compteurs stockés. | [RMP p5][CAD p3] |
| CPT | Utilisé (CPT session, CPT location, CPT beneficiaire) ; jamais développé dans les sources. | [RAD p1][RAD p3] |
| UAT | Déploiement de la branche test, avant main (production). | [RMP p6][CAD p3] |
| RGAA | Norme nationale d'accessibilité, 106 critères, v 4.12, applicable pour tous à partir de 2025. | [ACC p2] |
| WCAG | Listé sous « Normes applicables » (après « Norme européenne ») ; non développé. | [ACC p2] |
| RGPD | Cité (parcours de validation RGPD, consentement RGPD, cadre RGPD adapté) ; non développé. | [RAD p5][RMP p6][CAR p5] |
| HDS | « Hébergement HDS en France » ; non développé. | [RAD p5] |
| CSP | Blocage CSP (iframe HelloAsso) depuis mars 2026 ; non développé. | [RMP p2] |
| ETP | « Équipe de 3 à 5 ETP » ; non développé. | [CAD p1] |
| POC | Ex. « Mise en relation et activités encadrées — POC », « Tinder de l'amitié » POC à part ; non développé. | [PER p4][CAD p3] |
| AARRR | Grille de phases de la cartographie ; non développé. | [CAR p2] |
| QR | « 20min QR » dans la permanence d'infos ; non développé. | [VIS p1] |
| WPCode | « Snippets WPCode » : déploiement depuis l'administration WordPress ; WPCode ajoute la balise `<?php` ; non développé. | [RAD p5][RMP p6] |

---

## 7. Distinctions à ne pas confondre

| Distinction | Règle | Source |
|---|---|---|
| Atelier ≠ session ≠ workshop | Session = occurrence datée ; workshop = catégorie ; front = « atelier » ; KPI = sessions. | [GLO p2][RMP p3] |
| Atelier socle ≠ Feel Good ≠ BURN'ette ≠ coup de pouce | Différence : qui anime, payé ou non, obligatoire ou non (voir §1). | [GLO p2] |
| BAT ≠ quiz de stade | Aucun lien entre les deux. | [GLO p2][RMP p4] |
| Site vitrine ≠ application (plateforme) | — | [GLO p2] |
| Bénéficiaire ≠ adhérente | Toutes les adhérentes sont bénéficiaires ; l'inverse est faux. | [GLO p2] |
| ACTIV' ≠ pair-aidante | Toute pair-aidante est ACTIV', pas l'inverse. | [GLO p2] |
| Parcours ≠ module | Un parcours (BBA, BIB) regroupe trois modules. | [GLO p2] |
| Stade (libellé) ≠ clé de code | Épuisement ↔ `turbulence` ; Mise en action ↔ `action`. | [GLO p2][RMP p4] |
| Stade ≠ diagnostic médical | Orientation uniquement. | [GLO p2][PER p4] |
| Module 6 Stabilisation ≠ stade | Pas de stade correspondant dans le quiz. | [GLO p2] |
| Statut membre = date d'abonnement en base ≠ case du profil | La date fait le statut. | [RMP p1][RMP p5] |
| Remobilisation interne (ACTIV') ≠ remobilisation externe (BIB) | ACTIV' traite la remobilisation interne ; BIB inclut la remobilisation externe. | [GLO p1] |
| Directrice d'antenne / admin d'antenne / Branch Manager | Même rôle (trois appellations). | [GLO p2][RAD p1] |
| Doublons : fusionner ≠ supprimer | Les comptes en double sont fusionnés, jamais supprimés. | [RAD p2][RMP p2] |

### Graphies et prononciation

- Écrire « ACTIV' » et « BURN'ette » [GLO p2]. Les supports utilisent aussi « L'BURN » et « L'Burn » [RMP p1][PER p1] ; « BURN TO BE ALIVE », « SENTINELLE » en capitales sur le visuel [VIS p1].
- Accessibilité : L'BURN et burnout sont prononcés « beurnou » ; déclarer ces mots comme anglais (idem autres anglicismes) [ACC p2]. Voir [08-accessibilite-graphisme.md](08-accessibilite-graphisme.md).
- Ton : valoriser le vécu comme une ressource, jamais une injonction à « rendre » [CAD p3] ; l'engagement est un choix, les indicateurs de volume ne sont jamais des objectifs de conversion [CAR p5].

---

## 8. Incohérences de vocabulaire entre sources (ne pas trancher)

| Sujet | Version A | Version B | Source |
|---|---|---|---|
| Premier stade | « Épuisement » (glossaire validé) | « Turbulence » (référente scientifique ; clé `turbulence`) | [GLO p2][RMP p5] |
| Accès ACTIV' | « uniquement pour celles qui suivent le parcours BIB » / « à partir du parcours BIB » | « Option ouverte aux BURN'ettes en phase de projection » (+10 mois) | [GLO p1][MOD p1][CAR p5] |
| Tronc commun : contenu | Psychoéducation ; posture d'animation d'ateliers | Psychoéducation, fonctionnement de l'asso | [MOD p1][CAR p1] |
| Groupe de parole découverte | « un seul accès à un groupe de parole » | « 1 groupe de parole BBA » | [GLO p1][VIS p1] |
| Permanence avant adhésion | « Permanence découverte » (jeudi matin à Bordeaux) | « Permanence d'infos 1h » | [GLO p1][VIS p1] |
| Rôle d'antenne invitant à la réunion ACTIV' | « Directrice d'antenne » (glossaire) | « chargée d'antenne » (cartographie) | [GLO p2][CAR p2][CAR p5] |
| Filtres dashboard existants | « année, antenne » | « deux (région et antenne) » | [RAD p4][RMP p6] |

---

## Non précisé dans les sources

- Développement des sigles BO, CPT, HDS, CSP, ETP, POC, AARRR, QR, WCAG, RGPD : Non précisé dans les sources.
- Définition de « chargée d'antenne » et lien avec « directrice d'antenne » : Non précisé dans les sources.
- Définitions de « mission », « créneau », « habilitation », « supervision », « contribution » comme objets : non définis (objets « à créer », proposition à formuler) [CAD p3][CAR p5].
- Clés de code / slugs des futurs objets ACTIV' (candidature, mission, proposition d'atelier, créneau de pair-aidance) et de leurs statuts : Non précisé dans les sources.
- Libellés exacts des statuts de candidature, de proposition d'atelier et de mission : Non précisé dans les sources (demandés comme livrable) [CAD p4].
- Distinction formelle « phase » (projection, stabilisation) vs « stade » dans le vocabulaire ACTIV' : Non précisé dans les sources [CAR p4][CAR p5].
- Contenu de la formation Sentinelle : « Contenu à préciser » [CAR p1].
- Sens de « relais » (vignette « Les antennes et relais L'BURN ») : Non précisé dans les sources [VIS p1].
- Définition de « job meeting », « Immersion Facile », « réunion mensuelle » au-delà de leur mention : Non précisé dans les sources [CAR p1][CAR p4].
- Montants des parcours et de l'option ACTIV' : non renseignés (« XX€ », « X € ») [VIS p1][CAD p3].
- Seuil exact entre tarif réduit et plein tarif + solidaire, justificatif : point ouvert [RMP p1][RMP p6].
- Outils cités sans définition fonctionnelle : HelloAsso, Brevo, Monday, Calendly, Google Agenda, Airtable, Canva, Facebook, Youtube, AZnetwork : Non précisé dans les sources au-delà de leur usage.
- Glossaire visuel d'origine (3 planches `Glossaire_*.jpg`) et spécification KPI (`08_Specification_KPI_modele_donnees_texte.md`) : cités mais non fournis [GLO p1][CAD p4].
