# Administration, rôles, droits et sécurité

> Ce document regroupe les rôles, les droits, le back-office (comptes, imports, sessions, notifications, ressources, dashboard, exports) et les règles d'accès technique et de sécurité de la plateforme L'BURN, à destination des agents qui codent l'app. Sources : RAD (règles d'administration, Product Owner, 14/10/2026) [RAD p1], RMP (règles métier, 14/10/2026) [RMP p1], GLO [GLO p1], CAD [CAD p1].
>
> Consigne de la source : les cellules « À confirmer » et les points ouverts ne doivent pas être supposés [RAD p1][RAD p5].

Légende : ✅ actuel/existant · 🎯 cible · 🟢 décidé/validé · 🟡 piste non actée · ❓ question ouverte/hypothèse · ⛔ hors périmètre/reporté.

Voir aussi : [02-glossaire.md](02-glossaire.md), [04-regles-metier.md](04-regles-metier.md), [06-donnees-et-technique.md](06-donnees-et-technique.md), [07-workflows.md](07-workflows.md), [09-hackathon-theme2-activ-problemes.md](09-hackathon-theme2-activ-problemes.md).

---

## À retenir pour le build

- Super admin : vue et gestion nationales ; admin d'antenne (« Branch Manager ») : uniquement son antenne ; adhérente : seulement le contenu de son antenne [RAD p1][GLO p2].
- Clé de rattachement : `branch` (ID numérique du CPT location), identique sur le profil utilisatrice et sur la session ; jamais par texte libre [RAD p1][RMP p4].
- Une session est visible si `branch` utilisatrice = `branch` session ; l'accès direct par URL à une session d'une autre antenne doit être bloqué [RAD p2].
- L'antenne virtuelle nationale est une antenne à part entière avec son propre ID ; la visibilité élargie d'un atelier virtuel passe par l'ouverture à toutes les antennes [RAD p1][RAD p2].
- Slug `branch_manager` retenu sans vérification en base ❓ ; droit d'ouverture contrôlé par rôle plutôt que par capacité, à valider par un test en conditions réelles ❓ [RAD p1][RAD p2].
- Les droits « À confirmer » (validation des comptes, export nominatif par l'admin d'antenne, remboursement par l'admin d'antenne, ouverture par le super admin, vue KPI « département uniquement ») ne doivent pas être supposés ❓ [RAD p1][RAD p2][RAD p5].
- Comptes en double : fusionnés, jamais supprimés [RAD p2][RMP p2].
- Gratuités (0 €) : créées à la main sur la plateforme, absentes de HelloAsso [RAD p2][RMP p1].
- Toute adhésion : statut « abonnée » à renseigner, sinon la personne ne remonte pas dans le KPI des adhérentes [RAD p2].
- KPI calculés en direct sur la base, jamais à partir de compteurs stockés (nettoyage régulier des doublons) [RAD p4][RMP p5].
- Toute notification / email transactionnel passe par Brevo [RAD p3].
- Données de santé et personnelles : hébergement HDS en France, permissions par rôle, aucune donnée nominative dans un outil sans cadre RGPD adapté [RAD p5].
- Toute proposition d'activité passe par soumission, validation et modération (équipe ou directrice d'antenne) [CAD p3].

---

## 1. Rôles et périmètres

| Rôle | Périmètre | État | Source |
|---|---|---|---|
| Super admin | Vue nationale complète, tous les contenus et tous les KPI | ✅ Droits indiqués comme déjà gérés (juin 2026) | [RAD p1] |
| Admin d'antenne (rôle « Branch Manager ») / Directrice d'antenne | Uniquement son antenne : sessions, contenus, KPI [RAD p1] ; « valide les activités proposées par les pairs » [GLO p2], mais droit de valider des comptes ou des activités non tranché ❓ [CAD p2] | ✅ rôle existant [CAD p2] ; ❓ slug `branch_manager` retenu sans vérification en base [RAD p1] | [RAD p1][GLO p2][CAD p2] |
| Adhérente (bénéficiaire connectée) | Sessions et contenus rattachés à son antenne | ✅ ; régression constatée en septembre 2026 : elles voyaient les ateliers de toutes les antennes | [RAD p1] |
| Non-adhérente | Pas de compte utilisateur (CPT `beneficiaire`) ; suivie par l'administration ; accès groupes de parole et permanences uniquement | ✅ | [RAD p1][RMP p1][GLO p2] |
| Pair-aidante bénévole | Accès aux ressources, pas aux ateliers payants ; exclue des KPI adhérentes | 🎯 rôle cible (user story), non confirmé comme livré | [RAD p1][CAD p2] |
| Adhérente inactive | Transition après expiration ; liste des inactives consultable en back-office | 🎯 rôle cible (user story), non confirmé comme livré | [RAD p1] |

Cibles citées dans le cadrage ACTIV' (thème 2) avec un besoin admin [CAD p2] :

| Cible | Priorité | Besoin |
|---|---|---|
| Chargée de remobilisation | 1 | Traiter les candidatures, organiser les entretiens, suivre les ACTIV' |
| Directrice d'antenne | 2 | Valider les ateliers et activités proposés, publier des missions, voir qui fait quoi sur son antenne |
| Super admin | 2 | Vue nationale, indicateurs |

Données techniques sur les rôles :
- Rôles WordPress natifs observés : `administrator` et `subscriber` (échantillon de 3 valeurs sur 1 159 lignes de `lb_app_capabilities`, non exhaustif) ❓ [RAD p1].
- Existant réutilisable : rôles super admin, admin d'antenne, adhérente [CAD p2].
- Chargée de remobilisation : membre de l'équipe qui mène l'entretien de candidature ACTIV' [GLO p2]. Rôle technique correspondant : Non précisé dans les sources.

Antennes (branches) [RMP p4] :

| Antenne | Territoire |
|---|---|
| Gironde | Département 33 |
| Lot-et-Garonne | Département 47 |
| Nord | Départements 02, 59, 60, 62, 80 (Hauts-de-France) |
| Antenne virtuelle | Tous les autres territoires |

- 29 profils portent l'antenne « Bordeaux », absente du référentiel : exclus des KPI par antenne tant que l'attribution n'est pas décidée ❓ [RMP p4][RMP p6].
- Antenne manquante déduite des deux premiers chiffres du code postal du payeur HelloAsso, en croisant par email [RMP p4].

---

## 2. Matrice des droits par rôle

Seules les règles confirmées figurent ; « À confirmer » = droit jamais tranché [RAD p1].

| Action | Super admin | Admin d'antenne | Source |
|---|---|---|---|
| Voir les sessions et contenus | Tous, toutes antennes | Uniquement son antenne | [RAD p1] |
| Consulter le dashboard et les KPI | Vue nationale complète | Son antenne ; vue « département uniquement » aussi formulée : ❓ À confirmer | [RAD p1] |
| Créer une session | Admin | Oui, rattachée à sa propre antenne | [RAD p1] |
| Ouvrir une session virtuelle à toutes les antennes | ❓ À confirmer | Oui, seulement pour une session dont il est l'auteur et qui porte sa `branch` | [RAD p1] |
| Exporter les données nominatives et agrégées | Oui, avec filtre antenne | ❓ À confirmer | [RAD p1] |
| Outils de diagnostic (scan usermeta, postmeta) | Oui, capacité `manage_options` | Non | [RAD p1] |
| Valider les comptes et les adhésions en back-office | ❓ À confirmer | ❓ À confirmer | [RAD p2] |
| Traiter un remboursement | Manuel, dans HelloAsso, par une personne de l'équipe | ❓ À confirmer | [RAD p2] |
| Valider les ateliers / activités proposés par les pairs | Non précisé dans les sources. | ❓ Glossaire : la directrice d'antenne « valide les activités proposées par les pairs » [GLO p2] ; droit non tranché [CAD p2] ; 🎯 périmètre ACTIV' : « validation par l'équipe ou la directrice d'antenne » [CAD p2] | [GLO p2][CAD p2] |
| Modérer une proposition d'activité | Non précisé dans les sources (la source dit « équipe », sans rôle technique) | 🎯 contrainte ACTIV' : soumission, validation et modération par « équipe ou directrice d'antenne » | [CAD p3] |

- Droits de l'admin d'antenne pour valider des comptes ou des activités : listés comme non tranchés (irritant) ❓ [CAD p2]. Note : [GLO p2] indique que la directrice d'antenne « valide les activités proposées par les pairs ».
- ❓ Hypothèse H3 : la validation des ateliers proposés peut se faire en un clic par la directrice d'antenne, avec un gabarit d'atelier imposé [CAD p3].
- 🎯 Critère de qualité : aucune activité n'est publiée sans validation [CAD p4] ; les propositions d'activités « ne peuvent pas être publiées librement sans contrôle » [CAD p1].
- 🎯 Candidature ACTIV' : validation ou refus par l'équipe [CAD p2] ; entretien et validation avec la chargée de remobilisation [CAR p1].

---

## 3. Ouverture des sessions virtuelles

- Chaque antenne peut activer l'ouverture à toutes les antennes au moment de la création de la session, par le Branch Manager [RAD p2].
- Droit contrôlé par rôle (`branch_manager`) plutôt que par capacité ; reste à valider par un test en conditions réelles ❓ [RAD p2].
- Condition : session dont il est l'auteur et qui porte sa `branch` [RAD p1].
- Un atelier virtuel créé par une antenne compte pour cette antenne dans les KPI, mais reste visible de toutes les utilisatrices en front-office [RMP p4].
- Visibilité par antenne ; un atelier virtuel peut être ouvert à toutes les antennes [CAD p3].
- ❓ Écart entre sources : [RMP p4] dit qu'un atelier virtuel « reste visible de toutes les utilisatrices », [RAD p2] dit que la visibilité élargie « passe par l'ouverture à toutes les antennes ». Non tranché dans les sources.

---

## 4. Filtrage de ce que voit chaque utilisatrice

- Session visible si la `branch` de l'utilisatrice est égale à celle de la session [RAD p2].
- Accès direct par URL à une session d'une autre antenne : doit être bloqué [RAD p2].
- Antenne virtuelle traitée comme une antenne comme les autres pour ce filtre [RAD p2].
- Un snippet de filtrage a été écrit puis délégué au développeur, la fonction de suggestion d'ateliers relevant de son code ; statut du correctif ❓ à confirmer [RAD p2][RAD p5].
- Régression de septembre 2026 : les adhérentes voyaient les ateliers de toutes les antennes [RAD p1].
- Non-adhérente : groupes de parole et permanences uniquement ; adhérente : plateforme complète (ateliers et contenus réservés) [RMP p1].
- Après expiration : pas d'accès à la plateforme, redirection vers le renouvellement [RAD p2][RMP p1].
- Suggestions : une session sans date n'est jamais suggérée [RMP p3].
- Ressources : onglet « Pour moi » (selon le stade) et onglet « Toutes les ressources » (sans filtre par défaut) [RMP p4].

---

## 5. Gestion des adhérentes et des comptes

Principe : l'administration crée à la main uniquement ce que HelloAsso ne couvre pas ; tout compte géré à la main doit rester cohérent avec les KPI [RAD p2].

### 5.1 Création et validation

| Règle | Statut | Source |
|---|---|---|
| Gratuités (0 €) créées manuellement sur la plateforme ; absentes de HelloAsso | ✅ | [RAD p2][RMP p2] |
| L'ajout manuel par l'équipe correspond à la source Admin du modèle d'abonnement **proposé** | 🟡 modèle proposé | [RAD p2] |
| Statut « abonnée » à renseigner lors d'une adhésion ; sans lui, absente du KPI adhérentes | ✅ | [RAD p2] |
| Nombre d'adhérentes cohérent avec les comptes validés en back-office ; anomalie connue : le KPI baisse à la validation manuelle d'un compte | ❓ requête exacte à confirmer | [RAD p2][RMP p5][RMP p6] |
| Adhésion solidaire par le même circuit HelloAsso (formulaire, paiement ou validation à 0 €, création automatique du compte par le webhook), si un tarif strict à 0 € est configurable dans HelloAsso | 🎯 cible ; ❓ à vérifier | [RAD p2][RAD p5] |
| Demande d'adhésion solidaire : envoi automatique du questionnaire de création de compte ; administration notifiée seulement quand toutes les informations sont reçues | 🎯 cible | [RMP p2] |
| Un compte solidaire ne doit pas fausser les KPI des adhérentes classiques | 🎯 cible | [RMP p2] |
| Justificatif pour tarif réduit et gratuité | ❓ reste à définir | [RMP p1][RMP p6] |
| Anomalies comptes (état 17/07/2026, à revérifier) : deux formats de date d'adhésion (ISO long et AAAAMMJJ) ; 143 comptes avec RGPD validé mais sans case membre ni date d'adhésion ; 59 gratuités à 0 € créées à la main non comptées automatiquement dans le KPI de difficulté financière ; écart non arbitré entre 835 et 710 adhérents | ❓ | [RMP p6] |

Sous-statuts d'adhérente [RMP p1] : Plein tarif 50 € (HelloAsso) ; Plein tarif + solidaire > 50 € (HelloAsso + don) ; Tarif réduit 1 à 49 € (HelloAsso) ; Gratuité 0 € (création manuelle). Montant porté par `membership_amount` ; `has_rsa` ne suffit pas à distinguer réduit et gratuit [RMP p1]. Détails : [04-regles-metier.md](04-regles-metier.md).

### 5.2 Renouvellement et expiration

- Adhésion : 12 mois glissants à partir du paiement ; c'est la date d'abonnement en base qui fait le statut, pas la case du profil [RMP p1]. ❓ Source de vérité du statut membre actif/inactif « À valider : les deux sont déconnectés » ; date de souscription effective HelloAsso ou WordPress « À valider » [RMP p5].
- 🟡 Proposition non implémentée (modèle de table d'abonnements de la référente des KPI) : membre active = ligne la plus récente dont `expiration_date` ≥ aujourd'hui, ou statut Active [RMP p2].
- Date de renouvellement = date d'adhésion + 1 an, générée automatiquement, visible et modifiable en back-office ; une adhérente sans date est signalée ✅ [RAD p2][RMP p1].
- Notifications avant expiration : à 15 jours et à 7 jours, avec la procédure de renouvellement [RMP p1].
- À l'expiration : accès révoqué automatiquement ; redirection vers la fenêtre de renouvellement avec message clair à la connexion (US S482 et S483) [RMP p1][RAD p2].
- Adhérentes expirées repérables dans une liste d'inactives consultable en back-office 🎯 [RAD p2].
- Profils migrés depuis HelloAsso sans date de renouvellement : identifiés et traités [RMP p1].
- Renouvellement HelloAsso : met à jour la fiche de contact au lieu de créer une ligne ; la date d'origine est écrasée ✅ [RMP p2].
- ❓ Renouvellement avant expiration : nouvelle date depuis l'expiration ou depuis le nouveau paiement ? [RMP p6].

### 5.3 Doublons

- Alerte en back-office quand une personne s'inscrit deux fois (même email) [RAD p2].
- Comptes en double fusionnés, jamais supprimés [RAD p2][RMP p2].
- Nettoyage régulier en place ; les KPI doivent s'y adapter ✅ [RAD p3].
- ❓ Email différent entre HelloAsso et la plateforme : fusion automatique sur nom et prénom, ou traitement manuel ? [RMP p6].

### 5.4 Accès des utilisatrices

- L'administration peut transmettre une liste d'emails à l'équipe de développement pour déclencher en une fois les liens natifs de réinitialisation de mot de passe (au lieu de compte par compte depuis le back-office) ; adresses inconnues ignorées sans erreur bloquante [RAD p3].

---

## 6. Imports de paiements HelloAsso (outil d'administration en construction)

| Brique | Contenu | Statut | Source |
|---|---|---|---|
| 1 | Import brut d'un export HelloAsso via la médiathèque WordPress | Non précisé explicitement (outil « en construction » ; seules 4 et 5 sont dites non construites) | [RAD p3] |
| 2 | Correspondance manuelle des colonnes brutes vers les clés de métadonnées | Idem | [RAD p3] |
| 3 | Reconnaissance des adhésions, classement en lot et filtres de revue | Idem | [RAD p3] |
| 4 et 5 | Rapprochement identité et date ; écriture des comptes | Pas encore construites | [RAD p3] |

- La table officielle des abonnements existe mais reste vide [RAD p3].
- Webhook HelloAsso : libellés reconnus « Inscription atelier - [nom] - [date courte] - [date complète] » (Session), « Adhésion annuelle - [Prénom Nom] » (création), « Renouvellement adhésion - [Prénom Nom] » (renouvellement) [RMP p2].
- `getMode()` compare par chaîne stricte ; libellé inconnu rejeté en HTTP 400 ; HelloAsso réessaie 16 fois sur 27 heures puis abandonne [RMP p2].
- `order.id` et `payment.id` non stockés [RMP p2].
- Clé de rapprochement : email (peut différer entre HelloAsso et plateforme, ampleur non quantifiée) [RMP p3].
- Paiement HelloAsso en popup ou nouvel onglet, jamais en iframe (blocage CSP depuis mars 2026) [RMP p2].
- Anomalie : environ 52 paiements HelloAsso sans statut membre à jour (état 17/07/2026, à revérifier) [RMP p6].

---

## 7. Ateliers : programmation et suivi des inscriptions

L'administration pilote la programmation et reçoit les alertes qui demandent une action humaine : annulation, place libérée, remboursement [RAD p3].

### 7.1 Programmation des sessions ✅

- Session créée avec date, lieu, jauge, format (live ou visio) et antenne [RAD p3].
- Sessions en brouillon publiables par lot (case à cocher + bouton de publication de la sélection) [RAD p3][RMP p3].
- Photo de session ajoutable à la création (image mise en avant du CPT session) [RAD p3].
- La jauge définie à la création ne peut pas être dépassée par les inscriptions [RAD p3][RMP p3].
- Atelier ≠ session ≠ workshop : session = occurrence datée ; workshop = catégorie générique ; les KPI comptent les sessions [GLO p2].
- Côté adhérente : max 3 ateliers par mois, pas de chevauchement [RMP p3].

### 7.2 Suivi des inscriptions ✅

- Page d'une session : participantes avec nom, prénom, email, téléphone, copie en un clic [RAD p3][RMP p3].
- Ratio inscrites / places dans la colonne des bénéficiaires, en rouge et gras quand complet [RAD p3][RMP p3].
- Listes d'attente consultables en back-office ; ajout du nom complet et du téléphone prévu 🎯 [RAD p3].
- Liste d'attente portée par `user_workshops_waitinglist` (même format que `user_sessions`) [RMP p3].
- ❓ Retrait de la liste d'attente quand la personne s'inscrit finalement : non géré [RMP p3][RMP p7].

### 7.3 Propositions d'activités (thème ACTIV')

- Toute proposition d'activité passe par soumission, validation et modération (équipe ou directrice d'antenne) [CAD p3].
- Pas de processus outillé pour proposer, valider puis programmer un atelier (irritant) [CAD p2].
- À créer (proposition à formuler) 🟡 : proposition d'atelier (auteure, statut de validation, valideuse), mission (publiée par, antenne, statut, inscrites), candidature ACTIV', créneau de pair-aidance [CAD p3]. Voir [09-hackathon-theme2-activ-problemes.md](09-hackathon-theme2-activ-problemes.md).

---

## 8. Notifications reçues par l'administration

| Événement | Notification | Action attendue | Source |
|---|---|---|---|
| Annulation d'une inscription | Alerte back-office : nom, atelier, date | Aucune pour une session gratuite | [RAD p3] |
| Annulation d'une session déjà payée | Demande de remboursement | Rembourser à la main dans HelloAsso, puis confirmer pour déclencher l'email à la personne | [RAD p3][RMP p2] |
| Place libérée | Email aux personnes en liste d'attente, avec lien d'inscription | Aucune ; premier arrivé, premier servi, pas d'inscription automatique | [RAD p3][RMP p3] |
| Inscription en double | Alerte back-office | Fusionner les comptes | [RAD p3] |
| Annulation d'une participation | La personne reçoit une notification de confirmation ; l'équipe est prévenue qu'une place est potentiellement libérée | Non précisé dans les sources. | [RMP p3] |
| Inscription en liste d'attente (session complète) | Notification de confirmation à la personne | Non précisé dans les sources. | [RMP p3] |

- Remboursement (US519, option semi-automatique validée 🟢) : HelloAsso n'a pas d'API de remboursement ; statut « remboursement en attente » dans l'historique de la personne ; email de confirmation après remboursement manuel [RMP p2].
- Toute notification / email transactionnel passe par Brevo ; configuration et contenu suivis avec la chargée de communication [RAD p3].
- Dépendance : la user story S523 repose sur la notification d'annulation (S508), sortie du périmètre actif ⛔ [RAD p3][RAD p4][CAD p2].
- Questionnaire de satisfaction après atelier 🎯 : lien généré par un shortcode propre à chaque session (remplace le lien fixe actuel), validé sur au moins deux sessions ; envoi automatique dépendant de Brevo [RMP p3][RMP p4].

---

## 9. Ressources

- Formats acceptés : vidéos et PDF ✅ [RAD p4][RMP p4].
- Liens de podcasts et vidéos cassés à corriger [RAD p4].
- Nombre de consultations par ressource et notation 1 à 5 étoiles demandés côté back-office, non développés 🎯 [RAD p4].
- Validation des contenus : contenu scientifique des stades par la référente scientifique ; contenus de communauté et de tarification solidaire par la chargée de communication [RAD p4].

---

## 10. Pilotage : dashboard, saisies manuelles, exports

Principe : super admin = chiffres nationaux fiables ; admin d'antenne = mêmes chiffres filtrés sur son périmètre ; saisies manuelles = historique uniquement [RAD p4].

### 10.1 Dashboard de suivi (page d'administration indépendante) ✅

- Deux sections d'indicateurs (adhésions, ateliers) et deux vues graphiques (thématiques, stades) [RAD p4].
- Filtres existants : année, antenne [RAD p4]. ❓ [RMP p6] indique que le dashboard actuel n'offre que deux filtres géographiques (région et antenne).
- Filtres attendus par la direction 🎯 : national, région, département, ville [RAD p4][RMP p6].
- Vue par antenne : demandée (région puis département), non développée à ce jour pour la partie droits 🎯 [RAD p4].
- KPI calculés en direct, adaptés aux nettoyages de doublons [RAD p4][RMP p5].
- Règles de calcul des KPI : voir [04-regles-metier.md](04-regles-metier.md) et [RMP p5].

### 10.2 Saisies manuelles ✅

- Mécanisme générique pour saisir à la main des valeurs historiques [RAD p4].
- Une référence dynamique alimente le calcul de la dépense moyenne [RAD p4].
- Servent à l'historique antérieur à la plateforme [RAD p4].

### 10.3 Exports ✅

| Export | Contenu | Filtres | Source |
|---|---|---|---|
| Agrégé KPI (Excel et PDF imprimable) | Statistiques globales | Année | [RAD p4] |
| Nominatif (Excel) | Une ligne par membre active, dont adresse, consentement RGPD, consentement newsletter | Antenne | [RAD p4][RMP p6] |

- Nominatif : données personnelles, réservé à l'administration, à manipuler dans le cadre RGPD [RAD p4].
- Pas de doublons dans les exports (export brut : 1 012 lignes pour 710 adhérentes après dédoublonnage, juin 2026) [RAD p4].
- Membre active (règle en vigueur, aussi celle de l'export nominatif) : date la plus récente parmi `subscription_date` et toutes les `renew_date` dans les 365 derniers jours [RMP p1][RMP p2].
- Export nominatif par l'admin d'antenne : ❓ À confirmer [RAD p1].

### 10.4 Indicateurs sous responsabilité d'un référent

- La référente des KPI vérifie la logique de calcul des KPI [RAD p4].
- Règles métier détaillées dans « Règles métier de la plateforme » [RAD p4] → [04-regles-metier.md](04-regles-metier.md).
- Indicateurs ACTIV' attendus (thème 2) 🎯 : candidatures, taux de validation, ACTIV' actives, missions publiées et pourvues, ateliers proposés, validés et réalisés, créneaux de pair-aidance tenus, heures de bénévolat, temps gagné par l'équipe [CAD p4].

---

## 11. Accès techniques et règles de sécurité

Principe : le code se modifie par GitHub, le serveur et la base ne se touchent qu'avec l'hébergeur, aucun outil externe n'a accès aux données des adhérentes [RAD p4].

| Accès | Règle ou état | Source |
|---|---|---|
| Dépôt GitHub `LBurnEttes/lburn-platform` | La Product Owner a l'autorisation de modifier directement le code ; elle applique aujourd'hui les changements à la main plutôt que par connexion directe | [RAD p5] |
| Compte Claude Team de l'association | Connexion au dépôt Git uniquement, sans accès au serveur ni aux données ; deux sièges minimum, une seule utilisatrice ; choisi pour la rétention des données adaptée au RGPD | [RAD p5] |
| Serveur (AZnetwork) | Accès réseau restreint ; ports ouverts au cas par cas ; accès SSH à l'hôte à demander séparément de l'accès applicatif Docker | [RAD p5] |
| Base de données | phpMyAdmin via le VPN d'AZnetwork ; URL et accès non obtenus à la dernière tentative ❓ | [RAD p5] |
| Environnement de test | Compte de la Product Owner introuvable ; clone prod vers test demandé à AZnetwork ❓ | [RAD p5] |
| Snippets WPCode | Déploiement depuis l'administration WordPress ; snippets de diagnostic réservés à `manage_options` et à supprimer après usage (exposent des extraits de données brutes) | [RAD p5] |

Règles de sécurité à appliquer [RAD p5] :
- Données de santé et personnelles : hébergement HDS en France, parcours de validation RGPD spécifique à la plateforme, permissions par rôle.
- Aucune donnée nominative dans un outil qui n'offre pas un cadre RGPD adapté.
- Outils de diagnostic temporaires (scan, journal anonyme des soumissions du quiz) retirés ou désactivés après usage.
- Un collaborateur qui quitte le projet voit tous ses accès révoqués immédiatement (principe de la formation suivie par l'association).

Règles de modification du code liées [RMP p6] :
- Ne jamais corriger le code du prestataire par un snippet ; modifier le thème dans GitHub, puis supprimer le snippet temporaire.
- Moins de snippets WPCode ; snippet livré complet, jamais en diff partiel ; balise `<?php` non incluse.
- Branche test (UAT) avant main (production).

Sécurité et éthique (thème ACTIV') [CAD p3] :
- Écoute téléphonique et groupes de parole touchent des personnes vulnérables : prévoir une procédure d'alerte et d'escalade vers l'équipe, et l'accès visible aux numéros d'urgence.
- Aucun contenu de prévention du suicide inventé.
- Données de santé ; aucune donnée nominative dans un outil externe sans cadre RGPD adapté ; données fictives uniquement dans le prototype.

Sources de vérité liées à l'administration [RMP p5] : profils et statuts des membres = WordPress ; validation RGPD = WordPress ; gratuités = WordPress uniquement ; paiements d'adhésion = HelloAsso (export CSV). Détails : [06-donnees-et-technique.md](06-donnees-et-technique.md).

---

## 12. Points ouverts (ne pas supposer tranchés)

| Question | Source |
|---|---|
| Vue KPI de l'admin d'antenne : son antenne ou son département ? | [RAD p5] |
| Droits exacts du super admin : création de sessions, ouverture à toutes les antennes, validation des comptes ? | [RAD p5] |
| L'admin d'antenne peut-il exporter les données nominatives, valider les comptes, traiter les remboursements ? | [RAD p5] |
| Slug réel du rôle « Branch Manager » (`branch_manager` supposé) et liste complète des rôles existants | [RAD p5] |
| Rôles pair-aidante bénévole et adhérente inactive : créés ou non ? | [RAD p5] |
| Filtrage des ateliers par antenne : correctif délégué au développeur, statut à confirmer | [RAD p5] |
| Accès base de données et SSH hôte à obtenir auprès d'AZnetwork | [RAD p5] |
| Tarif strict à 0 € possible dans HelloAsso pour l'adhésion solidaire ? | [RAD p5] |
| Requête exacte du KPI membres actives ; pourquoi baisse-t-il à la validation manuelle d'un compte ? | [RMP p6] |
| Email différent HelloAsso / plateforme : fusion automatique sur nom et prénom ou traitement manuel ? | [RMP p6] |
| Antenne des 29 profils « Bordeaux » | [RMP p6] |
| Nettoyage de la liste d'attente quand la personne s'inscrit | [RMP p7] |
| Renouvellement avant l'expiration : la nouvelle date repart-elle de l'expiration ou du nouveau paiement ? | [RMP p6] |
| Seuil exact entre tarif réduit et plein tarif + solidaire ; justificatif demandé | [RMP p6] |
| Date de souscription : HelloAsso ou WordPress en cas d'écart ? | [RMP p6] |
| Visibilité d'un atelier virtuel : « reste visible de toutes les utilisatrices » [RMP p4] ou visibilité élargie via l'ouverture à toutes les antennes [RAD p2] ? (écart relevé entre les deux sources, non listé comme point ouvert par elles) | [RMP p4][RAD p2] |

---

## Non précisé dans les sources

- Liste complète des rôles et capacités WordPress (seuls `administrator`, `subscriber`, `manage_options`, `branch_manager` supposé apparaissent) [RAD p1]. Non précisé dans les sources.
- Rôle technique de la chargée de remobilisation, de la chargée de communication, de la référente des KPI, de la référente scientifique dans la plateforme. Non précisé dans les sources.
- Droits d'un admin d'antenne sur les ressources (création, édition, suppression). Non précisé dans les sources.
- Droits de modification / suppression d'une session existante (par rôle). Non précisé dans les sources.
- Qui peut procéder à la fusion de comptes et selon quelle procédure technique. Non précisé dans les sources.
- Gestion de l'authentification (politique de mot de passe, 2FA, durée de session). Non précisé dans les sources.
- Journalisation / audit des actions admin. Non précisé dans les sources.
- Durées de conservation des données et procédure de suppression RGPD à la demande. Non précisé dans les sources.
- Contenu et modèles exacts des emails Brevo admin. Non précisé dans les sources.
- Rattachement d'un super admin à une `branch`. Non précisé dans les sources.
- Droits sur les missions, candidatures ACTIV' et créneaux de pair-aidance (objets à créer) [CAD p3]. Non précisé dans les sources.
