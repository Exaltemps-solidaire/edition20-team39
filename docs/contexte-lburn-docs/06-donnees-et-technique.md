# Structure de données, indicateurs et technique

> Inventaire de ce que les sources disent des entités, champs, valeurs, règles de calcul, KPI, exports et de l'existant technique de la plateforme L'BURN, pour guider le build sans inventer de schéma. Sources : RMP, RAD, GLO, CAD, CAR, MOD, PER, VIS, ACC.

Légende statuts : ✅ actuel/existant · 🎯 cible · 🟢 décidé/validé · 🟡 piste non actée · ❓ question ouverte/hypothèse · ⛔ hors périmètre/reporté.

Voir aussi : [02-glossaire.md](02-glossaire.md), [04-regles-metier.md](04-regles-metier.md), [05-administration-roles-securite.md](05-administration-roles-securite.md), [07-workflows.md](07-workflows.md), [09-hackathon-theme2-activ-problemes.md](09-hackathon-theme2-activ-problemes.md).

---

## À retenir pour le build

- ✅ Stack : WordPress ; réutiliser le moteur de sessions et de réservation plutôt que d'en créer un second ; pas de snippet de contournement ; UAT avant production [CAD p3][RMP p6].
- ✅ Objets réutilisables : session (date, lieu, jauge, format, antenne), workshop (catégorie), ressource (vidéo, PDF), antenne ; rôles super admin, admin d'antenne, adhérente ; notifications Brevo ; listes de participantes en back-office [CAD p2].
- ✅ Atelier ≠ session ≠ workshop : session = occurrence datée (date, lieu, jauge, format live ou visio, antenne) ; workshop = catégorie générique ; le front parle d'« atelier » ; les KPI comptent les sessions [GLO p2][RMP p3].
- ✅ Rattachement antenne par `branch` (ID numérique du CPT location), identique sur le profil utilisatrice et sur la session, jamais par texte libre [RAD p1][RMP p4].
- ✅ Champs utilisateur : `rgpd_consent`, `membership_amount`, `has_rsa`, `subscription_date`, `renew_date`, `branch`, `current_stage`, `birthdate` [RMP p6].
- ✅ Statut membre = date d'abonnement en base, pas la case du profil (source de vérité « À valider : les deux sont déconnectés » [RMP p5]) ; membre active = date la plus récente parmi `subscription_date` et toutes les `renew_date` dans les 365 derniers jours [RMP p1][RMP p2].
- ✅ Clés de stade : `turbulence`, `recuperation`, `introspection`, `projection`, `action` ; stade stocké dans `current_stage` (ID de terme de la taxonomie `stage`) [RMP p4][RMP p5][GLO p2].
- ✅ KPI calculés en direct sur la base, jamais à partir de compteurs stockés (nettoyage régulier des doublons) [RMP p5][RAD p4].
- ✅ Paiement : tout passe par HelloAsso, hors iframe ; le webhook range la transaction selon son libellé par chaîne stricte (`getMode()`) [RMP p2].
- 🎯 ACTIV' : objets à créer (proposition à formuler) : candidature ACTIV', formation suivie, mission, proposition d'atelier, créneau de pair-aidance, contribution réalisée [CAD p3].
- 🎯 Rôle pair-aidante bénévole : exclue des KPI adhérentes ; non confirmé comme livré [RAD p1][CAD p2][CAD p3].
- ✅ Données de santé : aucune donnée nominative dans un outil externe sans cadre RGPD adapté ; données fictives uniquement dans le prototype [CAD p3][RAD p5].

---

## 1. Environnement technique et outils

### 1.1 Plateforme et hébergement

| Élément | Règle ou état | Statut | Source |
|---|---|---|---|
| Plateforme | WordPress | ✅ | [CAD p3] |
| Distinction | Site vitrine ≠ application (plateforme) | ✅ | [GLO p2] |
| Dépôt GitHub `LBurnEttes/lburn-platform` | La Product Owner peut modifier directement le code ; applique aujourd'hui les changements à la main plutôt que par connexion directe | ✅ | [RAD p5] |
| Compte Claude Team de l'association | Connexion au dépôt Git uniquement, sans accès au serveur ni aux données ; deux sièges minimum, une seule utilisatrice ; choisi pour la rétention des données adaptée au RGPD | ✅ | [RAD p5] |
| Serveur (AZnetwork) | Accès réseau restreint ; ports ouverts au cas par cas ; accès SSH à l'hôte à demander séparément de l'accès applicatif Docker | ✅ | [RAD p5] |
| Base de données | Accès phpMyAdmin via le VPN d'AZnetwork ; URL et accès non obtenus à la dernière tentative | ❓ | [RAD p5] |
| Environnement de test | Compte de la Product Owner introuvable ; clone prod vers test demandé à AZnetwork | ❓ | [RAD p5] |
| Snippets WPCode | Déploiement depuis l'administration WordPress ; snippets de diagnostic réservés à `manage_options` et à supprimer après usage, car ils exposent des extraits de données brutes | ✅ | [RAD p5] |
| Hébergement | Données de santé et personnelles : hébergement HDS en France, parcours de validation RGPD spécifique, permissions par rôle | ✅ (règle à appliquer) | [RAD p5] |

### 1.2 Règles de modification du code

- ✅ On corrige toujours la source, on teste sur UAT avant la production, on ne superpose jamais un second mécanisme au code existant [RMP p6].
- ✅ Ne jamais corriger le code du prestataire par un snippet ; modifier le thème dans GitHub puis supprimer le snippet temporaire [RMP p6].
- ✅ Préférer moins de snippets WPCode ; un snippet est livré complet, jamais en diff partiel ; la balise `<?php` n'est pas incluse, WPCode l'ajoute [RMP p6].
- ✅ Branche `test` (déploiement UAT) avant `main` (production) [RMP p6].
- ✅ Les outils de diagnostic temporaires (scan, journal anonyme des soumissions du quiz) sont retirés ou désactivés quand ils ont servi [RAD p5].
- ✅ Outils de diagnostic (scan usermeta, postmeta) : super admin oui (capacité `manage_options`), admin d'antenne non [RAD p1].

### 1.3 Outils tiers cités

| Outil | Usage cité | Statut | Source |
|---|---|---|---|
| HelloAsso | Tout paiement (adhésion, atelier) ; export CSV = source de vérité des paiements d'adhésion ; remboursement manuel | ✅ | [RMP p2][RMP p5][RAD p2] |
| Webhook HelloAsso | Range chaque transaction selon son libellé ; création de compte automatique visée pour l'adhésion solidaire | ✅ / 🎯 | [RMP p2][RAD p2] |
| Brevo | Toute notification ou email transactionnel | ✅ | [RAD p3] |
| Brevo | Envoi automatique du questionnaire de satisfaction après atelier dépend de la configuration Brevo | 🎯 | [RMP p3][RMP p4] |
| Brevo | Point de contact de la cartographie ACTIV' : satisfaction (étape 13), « Email / Brevo » (fin d'engagement) | Non précisé dans les sources | [CAR p3][CAR p4] |
| Monday | Import réalisé des sessions et ateliers passés (T1 2026) et des non-adhérentes | ✅ | [RMP p5] |
| Monday | Point de contact de la cartographie ACTIV', étape 10 : « Monday (qualification interne) » | Non précisé dans les sources | [CAR p2] |
| Airtable | Les S-IDs d'Airtable font référence pour les user stories | ✅ | [RMP p6] |
| Excel | Suivi actuel des ACTIV' et de la pair-aidance (fichiers + opérations manuelles) ; colonnes inconnues | ✅ (à remplacer 🎯) | [CAD p1][CAD p3] |
| Facebook / Insta | Communauté hors plateforme (Facebook) ; première info vue sur le site L'BURN : Facebook et Insta | ✅ | [CAD p2][CAR p2][MOD p1][ACC p1] |
| YouTube | Point de contact de la formation tronc commun (cartographie ACTIV') | Non précisé dans les sources | [CAR p3] |
| Calendly / Google Agenda | « Calendly pour les RDV avec les bénéficiaires, éventuellement connecté à Google Agenda » (écoutes téléphoniques, 14B) ; « Calendly ou Google Agenda pour les RDV » | Non précisé dans les sources | [CAR p1][CAR p4] |
| Immersion Facile | Lien externe pour l'immersion en entreprise (ACTIV' à l'extérieur) ; immersions en entreprise hors périmètre, à esquisser comme piste seulement | ⛔ / 🟡 | [CAR p1][CAR p4][CAD p2] |
| Canva | Support du carnet de bord par atelier | ✅ | [GLO p1] |
| Formulaire de candidature ACTIV' | Outil à préciser | ❓ | [CAR p2] |

---

## 2. Rôles, antennes et visibilité (côté données)

Détail des droits : voir [05-administration-roles-securite.md](05-administration-roles-securite.md).

### 2.1 Rôles

| Rôle | Valeur technique citée | Statut | Source |
|---|---|---|---|
| Super admin | — (droits déjà gérés juin 2026) | ✅ | [RAD p1] |
| Admin d'antenne / « Branch Manager » | slug `branch_manager` retenu sans vérification en base | ❓ | [RAD p1][RAD p5] |
| Adhérente | — | ✅ | [RAD p1] |
| Non-adhérente | Pas de compte utilisateur ; CPT `beneficiaire` | ✅ | [RAD p1][RMP p1] |
| Pair-aidante bénévole | Accès ressources, pas ateliers payants ; exclue des KPI adhérentes | 🎯 non confirmé | [RAD p1] |
| Adhérente inactive | Transition après expiration ; liste inactives en back-office | 🎯 non confirmé | [RAD p1] |
| Rôles WordPress natifs observés | `administrator`, `subscriber` (échantillon de 3 valeurs sur 1 159 lignes de `lb_app_capabilities`, non exhaustif) | ✅ | [RAD p1] |

### 2.2 Antennes (branches) — référentiel

| Antenne | Territoire | Source |
|---|---|---|
| Gironde | Département 33 | [RMP p4] |
| Lot-et-Garonne | Département 47 | [RMP p4] |
| Nord | Départements 02, 59, 60, 62, 80 (Hauts-de-France) | [RMP p4] |
| Antenne virtuelle | Tous les autres territoires ; antenne à part entière avec son propre ID | [RMP p4][RAD p1] |

- ✅ Clé `branch` = ID numérique du CPT `location` [RAD p1][RMP p4].
- ✅ Antenne manquante déduite des deux premiers chiffres du code postal du payeur HelloAsso, en croisant par email [RMP p4][RMP p3].
- ✅ 29 profils portent l'antenne « Bordeaux », absente du référentiel : exclus des KPI par antenne tant que l'attribution n'est pas décidée ❓ [RMP p4][RMP p6].
- ✅ Un atelier virtuel créé par une antenne compte pour cette antenne dans les KPI, mais reste visible de toutes les utilisatrices en front-office [RMP p4].

### 2.3 Filtrage de visibilité

- ✅ Une session est visible si la `branch` de l'utilisatrice est égale à celle de la session [RAD p2].
- ✅ Un accès direct par URL à une session d'une autre antenne doit être bloqué [RAD p2].
- ✅ Ouverture d'une session virtuelle à toutes les antennes : activable à la création par le Branch Manager, seulement pour une session dont il est l'auteur et qui porte sa branch ; contrôlé par rôle (`branch_manager`) plutôt que par capacité ; à valider par un test en conditions réelles ❓ ; droit du super admin : ❓ À confirmer [RAD p1][RAD p2].
- ✅ L'antenne virtuelle est traitée comme une antenne comme les autres pour ce filtre ; la visibilité élargie d'un atelier virtuel passe par l'ouverture à toutes les antennes [RAD p2] (à rapprocher de [RMP p4] : un atelier virtuel « reste visible de toutes les utilisatrices en front-office »).
- ✅ Régression constatée en septembre 2026 : les adhérentes voyaient les ateliers de toutes les antennes [RAD p1].
- ❓ Snippet de filtrage écrit puis délégué au développeur (fonction de suggestion d'ateliers dans son code) ; statut à confirmer [RAD p2][RAD p5].

---

## 3. Adhérente, compte et adhésion

### 3.1 Populations

| Statut | Définition | Accès | Source |
|---|---|---|---|
| Adhérente | Bénéficiaire ayant souscrit une adhésion | Plateforme complète : ateliers et contenus réservés | [RMP p1] |
| Non-adhérente | Bénéficiaire sans adhésion (CPT `beneficiaire`, sans compte utilisateur), suivie par l'administration | Groupes de parole et permanences uniquement | [RMP p1][GLO p2] |
| Nouvelle arrivante | Femme qui n'a pas encore adhéré | — | [GLO p2] |

### 3.2 Sous-statuts d'adhérente (valeurs)

| Sous-statut | Montant | Création | Source |
|---|---|---|---|
| Plein tarif | 50 € | Paiement HelloAsso | [RMP p1] |
| Plein tarif + solidaire | Plus de 50 € | Paiement HelloAsso avec don supplémentaire | [RMP p1] |
| Tarif réduit | Entre 1 et 49 € | Paiement HelloAsso | [RMP p1] |
| Gratuité | 0 € | Création manuelle sur la plateforme, hors HelloAsso | [RMP p1][RAD p2] |

- ✅ Montant porté par `membership_amount` ; `has_rsa` (difficulté financière) ne suffit pas à distinguer tarif réduit et gratuit [RMP p1].
- ❓ Justificatif pour tarif réduit et gratuité à définir ; seuil exact tarif réduit / plein tarif + solidaire ouvert [RMP p1][RMP p6].
- 🟡 L'ajout manuel par l'équipe correspond à la source `Admin` du modèle d'abonnement proposé (modèle non implémenté [RMP p2]) [RAD p2].
- ✅ Le statut « abonnée » doit être renseigné lors d'une adhésion, sinon la personne ne remonte pas dans le KPI des adhérentes [RAD p2].
- Affichage tarifs dans le visuel de l'association : « XX€ par an (plusieurs paliers disponible accessibilité financière) » — montants en espaces réservés [VIS p1].

### 3.3 Durée, renouvellement, expiration

- ✅ 12 mois glissants à compter de la date de paiement, pas par année civile [RMP p1][GLO p1].
- ✅ Date de renouvellement = date d'adhésion + 1 an, générée automatiquement, visible et modifiable en back-office ; adhérente sans date signalée [RMP p1][RAD p2].
- ✅ Notifications avant expiration : J-15 et J-7, chacune avec la procédure de renouvellement [RMP p1].
- ✅ À l'expiration : accès plateforme, ateliers, contenus réservés révoqués automatiquement ; redirection vers la fenêtre de renouvellement avec message clair (US S482, S483) [RMP p1][RAD p2].
- ✅ Profils migrés depuis HelloAsso sans date de renouvellement identifiés et traités [RMP p1].
- 🎯 Liste d'inactives consultable en back-office [RAD p2].
- ❓ Renouvellement avant l'expiration : la nouvelle date repart-elle de l'expiration ou du nouveau paiement ? [RMP p6].

### 3.4 Membre active (règle de calcul)

- ✅ Règle en vigueur dans le dashboard : date la plus récente parmi `subscription_date` et toutes les `renew_date` dans les 365 derniers jours ; aussi règle de l'export nominatif [RMP p1][RMP p2].
- 🟡 Proposition (modèle de table d'abonnements de la référente des KPI, non implémentée) : ligne la plus récente dont `expiration_date` ≥ aujourd'hui, ou statut `Active` [RMP p2].
- ✅ La table officielle des abonnements existe mais reste vide [RAD p3].

### 3.5 Adhésion solidaire (cible)

- 🎯 La demande déclenche l'envoi automatique du questionnaire de création de compte ; l'administration n'est notifiée que lorsque toutes les informations sont reçues [RMP p2].
- 🎯 Un compte solidaire ne doit pas fausser les KPI des adhérentes classiques [RMP p2].
- 🎯 Même circuit HelloAsso (formulaire, paiement ou validation à 0 €, création automatique du compte par le webhook), à condition qu'un tarif strict à 0 € soit configurable dans HelloAsso ❓ [RAD p2][RAD p5].

### 3.6 Doublons et accès

- ✅ Comptes en double fusionnés, jamais supprimés ; alerte back-office quand une personne s'inscrit deux fois (même email) [RMP p2][RAD p2].
- ✅ Nettoyage régulier en place ; les KPI doivent s'y adapter [RAD p3].
- ✅ Réinitialisation de mot de passe en masse : liste d'emails transmise à l'équipe de dev pour déclencher les liens natifs ; adresses inconnues ignorées sans erreur bloquante [RAD p3].
- ❓ Validation des comptes et adhésions en back-office : droits à confirmer pour super admin et admin d'antenne [RAD p2].

---

## 4. Paiement (HelloAsso)

### 4.1 Libellés reconnus par le webhook (écriture actuelle)

| Libellé HelloAsso | Catégorie | Montant observé | Source |
|---|---|---|---|
| `Inscription atelier - [nom] - [date courte] - [date complète]` | Session | 3 à 9 € | [RMP p2] |
| `Adhésion annuelle - [Prénom Nom]` | Adhésion, création | 50 € | [RMP p2] |
| `Renouvellement adhésion - [Prénom Nom]` | Adhésion, renouvellement | 50 € | [RMP p2] |

- ✅ `getMode()` compare les libellés par chaîne stricte ; libellé inconnu (ex. ancienne dénomination) rejeté en HTTP 400 ; HelloAsso réessaie 16 fois sur 27 heures puis abandonne [RMP p2].
- ✅ Le renouvellement met à jour la fiche de contact au lieu de créer une ligne : la date d'origine est écrasée [RMP p2].
- ✅ Les identifiants `order.id` et `payment.id` ne sont pas stockés [RMP p2].
- ✅ Gratuités (0 €) : aucune trace HelloAsso [RMP p2].
- ✅ Page de paiement en popup ou nouvel onglet, jamais en iframe (blocage CSP depuis mars 2026) ; confirmation par webhook et URL de retour HelloAsso [RMP p2].

### 4.2 Annulation et remboursement (US519, option semi-automatique 🟢 validée)

- ✅ HelloAsso n'a pas d'API de remboursement [RMP p2].
- 🟢 Annulation d'un atelier payé → demande de remboursement + notification à l'administration ; statut « remboursement en attente » dans l'historique de la personne ; email de confirmation après remboursement manuel dans HelloAsso [RMP p2][RAD p3].
- ❓ Traitement d'un remboursement par l'admin d'antenne : à confirmer [RAD p2].

### 4.3 Rapprochement paiements / plateforme

- ✅ Clé de croisement : adresse email ; les emails peuvent différer (ampleur non quantifiée) [RMP p3].
- ❓ Email différent : fusion automatique sur nom et prénom, ou traitement manuel ? [RMP p6].
- ❓ La table des paiements distingue-t-elle adhésion, atelier et don ? (elle ne les distingue pas selon le blocage du KPI dépense moyenne) [RMP p5][RMP p6].

### 4.4 Outil d'administration « Imports de paiements HelloAsso » (en construction)

| Brique | Contenu | Statut | Source |
|---|---|---|---|
| 1 | Import brut d'un export HelloAsso via la médiathèque WordPress | ✅ | [RAD p3] |
| 2 | Correspondance manuelle des colonnes brutes vers les clés de métadonnées | ✅ | [RAD p3] |
| 3 | Reconnaissance des adhésions, classement en lot et filtres de revue | ✅ | [RAD p3] |
| 4 et 5 | Rapprochement identité et date, écriture des comptes | 🎯 pas encore construites | [RAD p3] |

---

## 5. Ateliers, sessions, inscriptions

### 5.1 Entités

| Entité | Champs / attributs cités | Source |
|---|---|---|
| Session (CPT session) | date, lieu, jauge (capacité), format (live ou visio), antenne (`branch`) ; photo = image mise en avant du CPT session ; état brouillon / en ligne | [RAD p3][GLO p2][RMP p3] |
| Workshop | Catégorie générique | [GLO p2][RMP p3] |
| Thématique | Catégorie d'atelier (ex. Bien-être, Juridique, Fondamentaux) | [RMP p3] |
| Format | live ou visio (valeurs techniques en base : Non précisé dans les sources) | [RMP p3] |
| Types d'ateliers (métier) | Atelier socle, atelier Feel Good, atelier BURN'ette, atelier coup de pouce, groupe de parole (libre ou thématique), permanence découverte ; se distinguent par qui anime, payé ou non, obligatoire ou non | [GLO p1][GLO p2] |
| Atelier socle | Obligatoire de chaque module ; virtuel ou présentiel ; animé par un professionnel rémunéré | [GLO p1] |
| Atelier Feel Good | Animé par une professionnelle rémunérée ; programmation mensuelle ; certains recommandés à partir du stade 3 | [GLO p1] |
| Atelier BURN'ette | Animé par une BURN'ette, en principe bénévolement ; programmation mensuelle | [GLO p1] |
| Atelier coup de pouce | Animé par des partenaires ; payant ou gratuit ; programmation parallèle | [GLO p1] |
| Groupe de parole | Animé par des pair-aidantes ; regroupe si possible des bénéficiaires à la même phase de rétablissement | [GLO p1] |
| `user_sessions` | Cité seulement comme référence de format de `user_workshops_waitinglist` ; son contenu n'est pas décrit (Non précisé dans les sources) | [RMP p3] |
| Liste d'attente | Champ `user_workshops_waitinglist` (même format que `user_sessions`) | [RMP p3] |

### 5.2 Règles de réservation (étape 9 du parcours bénéficiaire)

- ✅ Jauge non dépassable ; max 3 ateliers par adhérente et par mois ; pas deux ateliers aux horaires qui se chevauchent [RMP p3][RAD p3].
- ✅ Les suggestions pointent vers des sessions datées ; une session sans date n'est jamais suggérée [RMP p3].
- ✅ Session complète → inscription en liste d'attente avec notification de confirmation ; place libérée → toutes les personnes en attente prévenues en même temps, premier arrivé premier servi, sans inscription automatique [RMP p3][RAD p3].
- ❓ Retrait de la liste d'attente quand la personne s'inscrit finalement : non géré [RMP p3][RMP p7].
- ✅ Annulation : notification de confirmation à la personne ; l'équipe est prévenue qu'une place est potentiellement libérée [RMP p3].

### 5.3 Back-office sessions

- ✅ Liste des participantes : nom, prénom, email, téléphone, copie en un clic [RAD p3][RMP p3].
- ✅ Ratio inscrites / places dans la colonne des bénéficiaires, en rouge et gras quand complète [RAD p3][RMP p3].
- ✅ Mise en ligne par lot des sessions en brouillon (case à cocher + bouton de publication de la sélection) [RAD p3].
- 🎯 Listes d'attente consultables ; ajout du nom complet et du téléphone prévu [RAD p3].
- ✅ Création de session par l'admin d'antenne : oui, rattachée à sa propre antenne [RAD p1].

### 5.4 Questionnaire de satisfaction après atelier (cible)

- 🎯 Lien généré par un shortcode propre à chaque session, en remplacement du lien fixe actuel, validé sur au moins deux sessions ; envoi automatique dépendant de la configuration Brevo [RMP p3][RMP p4].

---

## 6. Notifications

| Événement | Notification | Action attendue | Source |
|---|---|---|---|
| Annulation d'une inscription | Alerte back-office : nom, atelier, date | Aucune pour une session gratuite | [RAD p3] |
| Annulation d'une session déjà payée | Demande de remboursement | Rembourser à la main dans HelloAsso, puis confirmer pour déclencher l'email | [RAD p3] |
| Place libérée | Email aux personnes en liste d'attente avec lien d'inscription | Aucune | [RAD p3] |
| Inscription en double | Alerte back-office | Fusionner les comptes | [RAD p3] |
| Expiration adhésion | J-15 et J-7 | — | [RMP p1] |

- ✅ Toute notification / email transactionnel passe par Brevo ; config et contenu suivis avec la chargée de communication [RAD p3].
- ⛔ Dépendance : US S523 repose sur la notification d'annulation (S508), sortie du périmètre actif [RAD p3][RAD p4][CAD p2].

---

## 7. Ressources

- ✅ Formats acceptés : vidéos et PDF uniquement [RMP p4][RAD p4][GLO p1].
- ✅ Onglet « Pour moi » : ressources recommandées selon le stade ; onglet « Toutes les ressources » : tout, sans filtre par défaut [RMP p4].
- 🎯 Nombre de consultations par ressource et notation 1 à 5 étoiles : demandés côté back-office, non développés [RAD p4].
- ✅ Ressource = contenu à découvrir de manière autonome (asynchrone) en ligne, parfois lié à un atelier socle [GLO p1].
- ✅ Validation des contenus : contenu scientifique des stades par la référente scientifique ; contenus de communauté et de tarification solidaire par la chargée de communication [RAD p4].
- ✅ Liens de podcasts et vidéos cassés à corriger [RAD p4].
- 🎯 Objectif stratégique de la plateforme : proposer les bonnes ressources au bon moment, dans des formats accessibles : vidéo, audio, podcast, visuel et contenu court [PER p1].
- 🎯 ACTIV' : la plateforme doit permettre de savoir que les vidéos du tronc commun ont été regardées en entier [CAR p1][CAR p3].

---

## 8. Questionnaires et stades

### 8.1 BAT vs quiz connecté (aucun lien : ni questions, ni scoring, ni code)

| | BAT (burn-out assessment tool) | Quiz connecté (stade) | Source |
|---|---|---|---|
| Public | Visiteuses du site vitrine, non connectées | Adhérentes connectées | [RMP p4][GLO p2] |
| Contenu | 6 sous-dimensions : `exhaustion`, `mental_distance`, `emotional_deficiency`, `cognitive_deficiency`, `psychological_complaint`, `psychosomatic_complaint` | 5 stades × 7 items = 35 questions, Likert 1 à 5 | [RMP p4] |
| Calcul | Score global, logique inchangée | Stade dominant = moyenne la plus haute par section (ni somme, ni seuil global) | [RMP p4] |
| Résultat | Page de résultats du site vitrine | `current_stage` (ID de terme de la taxonomie `stage`) | [RMP p4] |

- ❓ Départage ex aequo : décimales non arrondies ou auto-positionnement graphique ; composant inexistant, repli temporaire en attendant [RMP p4].
- 🎯 Nouvelle version du questionnaire de stade attendue de la référente scientifique début 2027 [RMP p4].
- Règle d'affichage : retirer les pictogrammes feu tricolore (vert, orange, rouge) de la page de résultats du BAT, sans toucher au calcul ; état de réalisation : Non précisé dans les sources [RMP p5].
- ✅ Journal anonyme des soumissions du quiz = outil de diagnostic temporaire à retirer [RAD p5].

### 8.2 Stades (taxonomie `stage`)

| Ordre | Libellé validé | Clé dans le code | Source |
|---|---|---|---|
| 1 | Épuisement | `turbulence` | [RMP p4][GLO p2] |
| 2 | Récupération | `recuperation` | [RMP p5][GLO p2] |
| 3 | Introspection | `introspection` | [RMP p5][GLO p2] |
| 4 | Projection | `projection` | [RMP p5][GLO p2] |
| 5 | Mise en action | `action` | [RMP p5][GLO p2] |

- ✅ Le stade pilote les ressources « Pour moi » et la mise en avant des sessions [RMP p5].
- ✅ Module 6 « Stabilisation » sans stade correspondant dans le quiz [GLO p2].
- ❓ Libellé du stade 1 « Turbulence » (référente scientifique) vs « Épuisement » (glossaire validé) : à trancher avec la référente scientifique [RMP p5] ; consigne du glossaire : utiliser « Épuisement » [GLO p2].
- ✅ Le stade est une orientation, jamais un diagnostic médical [GLO p2][PER p4].
- Modules (étapes de parcours) : 1 Épuisement, 2 Récupération, 3 Introspection (BBA) ; 4 Projection, 5 Mise en action, 6 Stabilisation (BIB) ; rythme conseillé : un mois par module [GLO p1].

### 8.3 Parcours (offre) — attributs cités

| Parcours | Contenu / accès | Prix | Statut | Source |
|---|---|---|---|---|
| Parcours Découverte (0 €) | Une permanence découverte, un seul accès à un groupe de parole, un appel téléphonique sur demande | 0 € | ⛔ reporté hors hackathon | [GLO p1] |
| Adhésion annuelle | Communauté et lieu, ateliers BURN'ettes, groupes de parole, ressources en ligne, ateliers coup de pouce ; 12 mois glissants | « XX€ par an » (paliers) | ✅ | [GLO p1][VIS p1] |
| BURN to be ALIVE (BBA) | Modules 1 à 3 ; ressources, ateliers socles, ateliers Feel Good ; payant, en option de l'adhésion | « XX€ » | Non précisé dans les sources | [GLO p1][VIS p1] |
| BURN'ette is BACK (BIB) | Modules 4 à 6 ; plus remobilisation externe ; payant ; une étape de validation précède l'inscription | « XX€ » | Non précisé dans les sources | [GLO p1][VIS p1] |
| ACTIV' | Module « bonus » optionnel, uniquement pour celles qui suivent BIB, sur candidature | « X€ » | Suivi actuel sur Excel ✅ ; objets plateforme à créer 🎯 | [GLO p1][VIS p1][CAD p1][CAD p3] |
| Sentinelle | Module « bonus » optionnel, sur candidature, à partir du module 6 | « X€ » | ⛔ hors périmètre du hackathon | [GLO p1][VIS p1][CAD p2] |

- Les parcours BBA et BIB sont traités par l'autre groupe : à considérer comme existants pour le thème 2 [CAD p1].

---

## 9. Sources de vérité

| Donnée | Source qui fait foi | Statut | Source |
|---|---|---|---|
| Paiements d'adhésion | HelloAsso (export CSV) | 🟢 Confirmé | [RMP p5] |
| Profils et statuts des membres | WordPress | 🟢 Confirmé | [RMP p5] |
| Validation RGPD | WordPress | 🟢 Confirmé | [RMP p5] |
| Sessions et ateliers passés (T1 2026), non-adhérentes | Monday (import réalisé), puis WordPress | 🟢 Confirmé | [RMP p5] |
| Gratuités (0 €) | WordPress uniquement | 🟢 Confirmé | [RMP p5] |
| Date de souscription effective | HelloAsso (date du paiement) ou WordPress (date d'adhésion) | ❓ À valider | [RMP p5] |
| Statut membre actif ou inactif | Date de souscription en base, pas la case du profil | ❓ À valider | [RMP p5] |

---

## 10. KPI et dashboard

### 10.1 Dashboard de suivi (page d'administration indépendante) ✅

- Deux sections d'indicateurs (adhésions, ateliers) et deux vues graphiques (thématiques, stades) [RAD p4].
- Filtres existants : année, antenne [RAD p4] ; RMP indique « deux (région et antenne) » [RMP p6].
- 🎯 Filtres attendus par la direction : national, région, département, ville [RAD p4][RMP p6].
- 🎯 Vue par antenne (région puis département) demandée, non développée à ce jour pour la partie droits [RAD p4].
- ✅ Super admin : vue nationale complète ; admin d'antenne : son antenne ; vue « département uniquement » ❓ à confirmer [RAD p1][RAD p5].
- ✅ La référente des KPI vérifie la logique de calcul [RAD p4].

### 10.2 Règles de calcul confirmées 🟢

| KPI | Règle | Filtres | Source |
|---|---|---|---|
| Fréquentation totale | Nombre d'inscriptions confirmées ; une même personne compte plusieurs fois | Année, antenne, thématique, stade | [RMP p5] |
| Taux de remplissage | Participants confirmés / places disponibles × 100 (bug du facteur 100 corrigé juin 2026) | Année, antenne, thématique | [RMP p5] |
| Ateliers proposés | Nombre de sessions planifiées (table des sessions, pas celle des workshops) | Année, antenne, thématique | [RMP p5] |
| Bénéficiaires non-adhérentes | Profils importés depuis Monday avec le statut non-adhérente | Antenne | [RMP p5] |

### 10.3 Règles à valider ou à construire ❓

| KPI | Règle envisagée | Blocage | Source |
|---|---|---|---|
| Membres actives | Voir §3.4 | Le KPI baisse quand un compte est validé à la main ; requête exacte à confirmer avec le développeur | [RMP p5][RAD p2] |
| Adhérentes par année | Date de souscription dans l'année choisie | L'adhésion glissante peut couvrir deux années civiles ; règle de rattachement non documentée | [RMP p5] |
| Personnes en difficulté financière | Montant < 50 € (HelloAsso) + gratuités à 0 € (plateforme) | CSV 2026 non importé ; gratuités hors HelloAsso | [RMP p5] |
| Dépense moyenne | Sessions seules, adhésion exclue (décision de la Product Owner) | Direction demande à préciser ; table des paiements ne distingue pas adhésion, atelier, don | [RMP p5] |
| Âge moyen | Adhérentes et non-adhérentes demandés | Existence d'une date de naissance sur le CPT des non-adhérentes à vérifier | [RMP p6] |

### 10.4 Saisies manuelles ✅

- Mécanisme générique pour saisir à la main des valeurs historiques, uniquement pour l'historique antérieur à la plateforme [RAD p4].
- Une référence dynamique alimente le calcul de la dépense moyenne [RAD p4].

### 10.5 Contraintes KPI

- ✅ Calcul en direct ; adaptation aux nettoyages de doublons [RMP p5][RAD p4].
- ✅ Tout compte géré à la main doit rester cohérent avec les KPI [RAD p2].
- 🎯 Pair-aidantes bénévoles et comptes solidaires ne faussent pas les KPI adhérentes [CAD p3][RMP p2].
- ✅ Les indicateurs de volume ACTIV' ne sont jamais des objectifs de conversion [CAR p5].
- 🎯 KPI ACTIV' : mesure d'impact (effet sur les pairs et la communauté) qui nourrit les dossiers de subvention [CAD p1][CAD p2].

---

## 11. Exports

| Export | Contenu | Filtres | Source |
|---|---|---|---|
| Agrégé KPI (Excel et PDF imprimable) | Statistiques globales | Année | [RAD p4] |
| Nominatif (Excel) | Une ligne par membre active, dont adresse, consentement RGPD, consentement newsletter | Antenne | [RAD p4][RMP p6] |

- ✅ Nominatif réservé à l'administration, à manipuler dans le cadre RGPD [RAD p4].
- ✅ Pas de doublons dans les exports (export brut : 1 012 lignes pour 710 adhérentes après dédoublonnage, juin 2026) [RAD p4].
- ✅ Export nominatif et agrégé : super admin oui, avec filtre antenne ; admin d'antenne ❓ à confirmer [RAD p1].
- ✅ L'export nominatif utilise la règle « membre active » [RMP p2].

---

## 12. Anomalies de données connues (5 premières : état au 17 juillet 2026, à revérifier [RMP p6])

- Deux formats de date d'adhésion coexistent (ISO long et AAAAMMJJ) [RMP p6].
- Environ 52 paiements HelloAsso sans statut membre à jour sur la plateforme [RMP p6].
- 143 comptes avec RGPD validé mais sans case membre ni date d'adhésion [RMP p6].
- 59 gratuités à 0 € créées à la main, non comptées automatiquement dans le KPI de difficulté financière [RMP p6].
- Écart non arbitré entre 835 et 710 adhérents (doublons, filtre de dates ou migration) [RMP p6].
- Le KPI baisse à la validation manuelle d'un compte [RAD p2].
- 29 profils « Bordeaux » hors référentiel [RMP p4].

---

## 13. User stories citées

| ID | Objet | Statut | Source |
|---|---|---|---|
| S482, S483 | Révocation à l'expiration et redirection vers le renouvellement | ✅ (règle décrite) | [RMP p1] |
| US519 | Annulation et remboursement, option semi-automatique | 🟢 validée | [RMP p2] |
| S519 | Identifiant réutilisé, désigne une autre US qu'avant : vérifier par le titre | ❓ | [RMP p6] |
| S508 | Notification d'annulation | ⛔ source : « S523 repose sur la notification d'annulation (S508), sortie du périmètre actif » ; « notifications d'annulation partiellement hors périmètre actif » | [RAD p3][RAD p4][CAD p2] |
| S523 | Repose sur S508 | ⛔ dépendance | [RAD p3][RAD p4][CAD p2] |
| Rôles pair-aidante bénévole, adhérente inactive | User stories cibles | 🎯 non confirmées | [RAD p1] |

- ✅ Périmètre actif réduit à 21 user stories en juillet 2026, 160 heures déjà consommées ; pilotage par enveloppe de temps et non plus par sprint [RMP p6].

---

## 14. ACTIV' : données à créer (thème 2)

Contexte et problèmes : voir [09-hackathon-theme2-activ-problemes.md](09-hackathon-theme2-activ-problemes.md) et [07-workflows.md](07-workflows.md).

### 14.1 Objets à créer (proposition à formuler) 🎯 [CAD p3]

| Objet | Attributs cités | Source |
|---|---|---|
| Candidature ACTIV' | statut, questionnaire, entretien, décision | [CAD p3] |
| Formation suivie | — | [CAD p3] |
| Mission | publiée par, antenne, statut, inscrites | [CAD p3] |
| Proposition d'atelier | auteure, statut de validation, valideuse | [CAD p3] |
| Créneau de pair-aidance | type, date, antenne, inscrite | [CAD p3] |
| Contribution réalisée | — | [CAD p3] |

- 🎯 Livrables attendus : statuts et transitions (candidature, proposition d'atelier, mission) ; modèle de données proposé et dépendances avec l'existant (sessions, réservation, rôles, Brevo, KPI) [CAD p4].
- ❓ H1 — Un même objet « créneau » peut porter ateliers BURN'ette, permanences, groupes de parole, écoute téléphonique, en réutilisant le moteur de sessions [CAD p3].
- ❓ H6 — Plafond d'engagement par mois, sur le modèle de la limite de 3 ateliers [CAD p3].
- ❓ H7 — Le back-office remplace intégralement les fichiers Excel (colonnes inconnues) [CAD p3].
- ❓ H8 — Missions hors association réutilisant le même objet « mission » plus tard [CAD p3].
- ❓ H5 — Tableau de bord « mes contributions » [CAD p3].
- Types de créneaux de pair-aidance cités : permanences, groupes de parole, écoute téléphonique [MOD p1][CAD p2].
- Exemples de missions : rédaction d'articles, administratif, logistique ; article de blog, salon auprès des entreprises, intervenir en entreprise [MOD p1][CAR p1][CAR p3].
- Conditions du parcours ACTIV' : option ouverte aux BURN'ettes en phase de projection ; ACTIV' sélectionnées par l'association ; engagement d'un an maximum, sortie et pause à tout moment ; formation modération (13) préalable à 13A–13C ; formation pair-aidance (14) préalable à 14A–14B [CAR p5] ; formation pair-aidance en option, 2 × 3 h [CAR p1][CAR p4].
- Accès ACTIV' : uniquement pour celles qui suivent le parcours BIB, sur candidature [GLO p1][MOD p1] ; être en BIB conditionne l'accès à ACTIV' [CAD p1].
- ❓ Formation préalable à tracer avant de débloquer les actions (friction, hypothèse à valider) [CAR p3] ; visionnage complet suffisant ou validation nécessaire : à trancher [CAR p5].
- ❓ H2 — Candidature entièrement en ligne jusqu'à la prise de rendez-vous de l'entretien ; seul l'entretien reste humain [CAD p3].
- ❓ H3 — Validation des ateliers proposés en un clic par la directrice d'antenne, avec un gabarit d'atelier imposé [CAD p3].
- Aucune pair-aidante n'intervient sans formation, habilitation et supervision : la plateforme doit les tracer [CAR p5].
- Prix de l'option ACTIV' non fixé (« X € ») [CAD p3][VIS p1].

### 14.2 Données manquantes identifiées par la cartographie (à collecter) 🎯

| Étape | Donnée manquante | Indicateur candidat | Source |
|---|---|---|---|
| 8 Réunion d'info | Nombre de BURN'ettes éligibles ; présence à la réunion d'info | Participantes à la réunion / éligibles | [CAR p2] |
| 9 Candidature | Candidatures commencées vs envoyées | Taux de complétion du questionnaire | [CAR p2] |
| 10 Entretien | Délai candidature → décision ; statut de candidature daté | Délai moyen candidature → réponse | [CAR p2] |
| 11 Tronc commun | Visionnage complet de chaque vidéo ; date de fin de formation | Taux de complétion du tronc commun | [CAR p3] |
| 12 Vie du collectif | Présence aux réunions mensuelles ; activité dans la communauté | ACTIV' actives dans la communauté / mois | [CAR p3] |
| 13 Modération, 13A–C | Formation modération suivie, datée ; pitchs proposés vs validés ; missions publiées vs pourvues | Créneaux d'atelier pourvus par des ACTIV' | [CAR p3] |
| 14 Pair-aidance | Créneaux couverts ; présence aux analyses de pratique ; statut d'habilitation daté | % de pair-aidantes à jour de supervision | [CAR p4] |
| Extérieur | Actions extérieures réalisées ; immersions réalisées | ACTIV' engagées à l'extérieur | [CAR p4] |
| Fin d'engagement | Durée d'engagement ; sorties et pauses (sans motif de santé) | Durée moyenne d'engagement | [CAR p4] |

- Ce qu'on mesure déjà : « À compléter » partout, sauf étape 13 : nombre d'ateliers réalisés et remplissage (étape 5), pas par animatrice [CAR p2][CAR p3][CAR p4].

### 14.3 Indicateurs ACTIV' demandés 🎯 [CAD p4]

Candidatures, taux de validation, ACTIV' actives, missions publiées et pourvues, ateliers proposés, validés et réalisés, créneaux de pair-aidance tenus, heures de bénévolat, temps gagné par l'équipe [CAD p4].

### 14.4 Contraintes données ACTIV'

- ✅ Cahier des charges sensible : ne stocker que le résultat, jamais les informations de santé [CAR p2][CAR p5].
- ✅ Texte court où la bénéficiaire décrit sa problématique (écoutes) : à effacer pour conformité RGPD ; durée de conservation ❓ à fixer [CAR p1][CAR p4][CAR p5].
- ✅ Visibilité par antenne ; un atelier virtuel peut être ouvert à toutes les antennes ; toute proposition passe par soumission, validation et modération [CAD p3].
- ✅ Accessibilité : RGAA ; calendrier utilisable au clavier ; boutons explicites [CAD p3]. Voir [08-accessibilite-graphisme.md](08-accessibilite-graphisme.md).

---

## Non précisé dans les sources

- Schéma de base complet : noms de tables, clés primaires, types de colonnes, contraintes. Non précisé dans les sources.
- Structure interne de `user_sessions` / `user_workshops_waitinglist` (format sérialisé, contenu exact). Non précisé dans les sources.
- Liste complète des rôles WordPress existants et slug réel du Branch Manager [RAD p5].
- Colonnes de la table officielle des abonnements (hors `expiration_date` et statut `Active` du modèle proposé) et colonnes de la table des paiements. Non précisé dans les sources.
- Valeurs d'énumération du statut de session (hors « brouillon »), du statut d'inscription, du statut « confirmée ». Non précisé dans les sources.
- Liste complète des thématiques (seuls exemples : Bien-être, Juridique, Fondamentaux) [RMP p3].
- Champs du CPT `beneficiaire` (non-adhérentes) ; existence d'une date de naissance ❓ [RMP p6].
- Champ ou clé technique du consentement newsletter et de l'adresse. Non précisé dans les sources.
- Modélisation technique des parcours BBA / BIB / ACTIV' (inscription, achat, validation préalable BIB). Non précisé dans les sources.
- Modèle du carnet de bord, de la communauté, du chat ACTIV'. Non précisé dans les sources.
- Valeurs de statuts et transitions des objets ACTIV' (candidature, mission, proposition d'atelier) : à proposer [CAD p4].
- Colonnes des fichiers Excel actuels de suivi ACTIV' [CAD p3].
- Contenu exact des emails Brevo, templates, identifiants de liste. Non précisé dans les sources.
- API / endpoints exposés par la plateforme, URL du webhook, format du payload HelloAsso. Non précisé dans les sources.
- Libellés HelloAsso pour l'option ACTIV' et les parcours (montants « XX€ » / « X € » non renseignés) [VIS p1].
- Durée de conservation des données des écoutes [CAR p5].
- Règle de rattachement d'une adhésion glissante à une année civile [RMP p6].
- Versions de WordPress, PHP, thème, plugins (hors WPCode). Non précisé dans les sources.
- Commande de lancement / environnement local pour le prototype. Non précisé dans les sources.
