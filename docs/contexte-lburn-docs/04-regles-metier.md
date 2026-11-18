# Règles métier de la plateforme

> Référentiel des règles de gestion de la plateforme L'BURN (adhésion, paiement, ateliers, antennes, ressources, questionnaires et stades), à respecter par tout code produit. Sources : RMP (document « L'BURN - Règles métier de la plateforme », Product Owner, 14/10/2026) [RMP p1], complété par RAD [RAD p1] et GLO [GLO p1][GLO p2].

Légende statuts : ✅ actuel/existant · 🎯 cible · 🟢 décidé/validé · 🟡 piste non actée · ❓ question ouverte/hypothèse · ⛔ hors périmètre/reporté.

Règle de lecture : RMP « décrit le socle existant. Toute proposition doit s'y conformer ou dire explicitement quelle règle elle modifie. Les « points ouverts » (section 7) ne doivent jamais être supposés tranchés » [RMP p1]. Les cellules « À confirmer » de RAD ne doivent pas être supposées [RAD p1].

Voir aussi : [02-glossaire.md](02-glossaire.md) (termes), [05-administration-roles-securite.md](05-administration-roles-securite.md) (rôles, droits, back-office), [06-donnees-et-technique.md](06-donnees-et-technique.md) (champs, KPI, sources de vérité), [07-workflows.md](07-workflows.md) (parcours).

---

## À retenir pour le build

- ✅ Le statut de membre est donné par la **date d'abonnement en base**, pas par la case du profil ; adhésion = **12 mois glissants** à partir du paiement [RMP p1]. ❓ Dans le tableau des sources de vérité, « Statut membre actif ou inactif » (date de souscription en base, pas la case du profil) est marqué « À valider : les deux sont déconnectés » [RMP p5].
- ✅ Deux populations : **adhérente** (plateforme complète) et **non-adhérente** (CPT beneficiaire, sans compte utilisateur ; groupes de parole et permanences uniquement) [RMP p1].
- ✅ Sous-statut déterminé par `membership_amount` (50 € / plus de 50 € / 1 à 49 € / 0 €) ; `has_rsa` ne suffit pas à distinguer tarif réduit et gratuit [RMP p1].
- ✅ À l'expiration : accès plateforme, ateliers et contenus réservés révoqués automatiquement, redirection vers le renouvellement (S482, S483) [RMP p1].
- ✅ Paiement uniquement via **HelloAsso, jamais en iframe** (popup ou nouvel onglet) ; le webhook classe par **libellé exact** via `getMode()` (libellé inconnu = HTTP 400) [RMP p2].
- 🟢 Remboursement **US519 semi-automatique** : pas d'API de remboursement HelloAsso, remboursement manuel, statut « remboursement en attente », email de confirmation [RMP p2].
- ✅ Réservation : jauge non dépassable, **max 3 ateliers par adhérente et par mois**, pas de chevauchement horaire, jamais de suggestion d'une session sans date [RMP p3].
- ✅ Liste d'attente : toutes les personnes prévenues en même temps, premier arrivé premier servi, **pas d'inscription automatique** [RMP p3].
- ✅ Antennes rattachées par **ID interne `branch`** (CPT location), jamais par texte libre [RMP p4][RAD p1].
- ✅ **BAT et quiz de stade sans aucun lien** (ni questions, ni scoring, ni code) [RMP p4][GLO p2].
- ✅ Quiz connecté : 35 questions (5 stades × 7 items, Likert 1 à 5) ; **stade dominant = moyenne de section la plus haute**, ni somme ni seuil global ; résultat dans `current_stage` [RMP p4].
- ✅ Doublons : comptes **fusionnés, jamais supprimés** [RMP p2][RAD p2].

---

## 1. Adhésion et statuts

### 1.1 Populations

| Statut | Définition | Accès | Source |
|---|---|---|---|
| Adhérente | Bénéficiaire ayant souscrit une adhésion | Plateforme complète : ateliers et contenus réservés | [RMP p1] |
| Non-adhérente | Bénéficiaire sans adhésion (CPT beneficiaire, sans compte utilisateur) | Groupes de parole et permanences uniquement | [RMP p1] |

- Toutes les adhérentes sont bénéficiaires ; l'inverse est faux [GLO p2].
- Non-adhérente : suivie par l'administration [RAD p1].
- Adhésion annuelle (glossaire) : donne accès à communauté et lieu, ateliers BURN'ettes, groupes de parole, ressources en ligne, ateliers coup de pouce ; dure 12 mois glissants à partir du paiement [GLO p1].
- Parcours BBA : parcours payant, en option de l'adhésion ; parcours BIB : parcours payant, une étape de validation précède l'inscription [GLO p1]. Règles détaillées : voir [01-association-offre-parcours.md](01-association-offre-parcours.md).
- 🎯 Rôles cibles liés au statut (non confirmés comme livrés) : pair-aidante bénévole (accès aux ressources, pas aux ateliers payants ; exclue des KPI adhérentes) ; adhérente inactive (transition après expiration, liste d'inactives en back-office) [RAD p1].

### 1.2 Sous-statuts d'adhérente

| Sous-statut | Montant | Création | Source |
|---|---|---|---|
| Plein tarif | 50 € | Paiement HelloAsso | [RMP p1] |
| Plein tarif + solidaire | Plus de 50 € | Paiement HelloAsso avec don supplémentaire | [RMP p1] |
| Tarif réduit | Entre 1 et 49 € | Paiement HelloAsso | [RMP p1] |
| Gratuité | 0 € | Création manuelle sur la plateforme, hors HelloAsso | [RMP p1] |

- ✅ Montant porté par `membership_amount` ; la case `has_rsa` (difficulté financière) ne suffit pas à distinguer tarif réduit et gratuit [RMP p1].
- ❓ Justificatif pour le tarif réduit et la gratuité : reste à définir [RMP p1].
- ❓ Seuil exact entre tarif réduit et plein tarif + solidaire ; justificatif demandé (point ouvert) [RMP p6].
- ✅ Gratuités (0 €) créées manuellement sur la plateforme, n'existent pas dans HelloAsso ; correspond à la source Admin du modèle d'abonnement proposé [RAD p2].
- ✅ Le statut « abonnée » doit être renseigné lors d'une adhésion, sinon la personne ne remonte pas dans le KPI des adhérentes [RAD p2].
- ✅ Le nombre d'adhérentes doit rester cohérent avec les comptes validés en back-office (anomalie connue : le KPI baisse à la validation manuelle d'un compte) [RAD p2].
- ❓ Valider les comptes et les adhésions en back-office : « À confirmer » pour le super admin comme pour l'admin d'antenne [RAD p2].

### 1.3 Durée, renouvellement, expiration

| Règle | Valeur | Statut | Source |
|---|---|---|---|
| Durée | 12 mois glissants à compter de la date de paiement (pas par année civile) | ✅ | [RMP p1] |
| Date de renouvellement | Date d'adhésion + 1 an, générée automatiquement, visible et modifiable en back-office | ✅ | [RMP p1][RAD p2] |
| Adhérente sans date de renouvellement | Doit être signalée | ✅ | [RMP p1][RAD p2] |
| Notification avant expiration | J-15 et J-7, chacune avec la procédure de renouvellement | ✅ | [RMP p1] |
| À l'expiration | Révocation automatique accès plateforme, ateliers, contenus réservés ; redirection vers la fenêtre de renouvellement avec message clair à la connexion (S482, S483) | ✅ | [RMP p1][RAD p2] |
| Profils migrés depuis HelloAsso sans date de renouvellement | Identifiés et traités | ✅ | [RMP p1] |
| Liste des adhérentes expirées (inactives) en back-office | Consultable | 🎯 | [RAD p2] |
| Renouvellement avant expiration : nouvelle date depuis l'expiration ou le nouveau paiement ? | Non tranché | ❓ | [RMP p6] |

### 1.4 Membre active

| Élément | Règle | Statut | Source |
|---|---|---|---|
| Règle en vigueur (dashboard) | Adhérente dont la date la plus récente parmi `subscription_date` et toutes les `renew_date` tombe dans les 365 derniers jours | ✅ | [RMP p1][RMP p2] |
| Export nominatif | Même règle | ✅ | [RMP p2] |
| Proposition (table d'abonnements de la référente des KPI, non implémentée) | Ligne la plus récente dont `expiration_date` ≥ aujourd'hui, ou statut Active | 🟡 | [RMP p2] |
| Requête exacte du KPI membres actives ; baisse à la validation manuelle d'un compte | Non tranché | ❓ | [RMP p6][RAD p2] |

### 1.5 Adhésion solidaire (🎯 cible)

- 🎯 La demande d'adhésion solidaire déclenche l'envoi automatique du questionnaire de création de compte ; l'administration n'est notifiée que lorsque toutes les informations sont reçues [RMP p2].
- 🎯 Un compte solidaire ne doit pas fausser les KPI des adhérentes classiques [RMP p2].
- 🎯 Passage par le même circuit HelloAsso (formulaire, paiement ou validation à 0 €, création automatique du compte par le webhook), à condition qu'un tarif strict à 0 € soit configurable dans HelloAsso [RAD p2].
- ❓ Tarif strict à 0 € possible dans HelloAsso : à vérifier [RAD p5].

### 1.6 Doublons

- ✅ Si une adhérente a deux comptes, ils sont fusionnés et non supprimés [RMP p2][RAD p2].
- ✅ L'administration est alertée en back-office quand une personne s'inscrit deux fois (même email) [RAD p2].
- ✅ Nettoyage régulier en place ; les KPI doivent s'y adapter (calcul en direct, jamais de compteurs stockés) [RAD p3][RMP p5].
- ❓ Email différent entre HelloAsso et la plateforme : fusion automatique sur nom et prénom, ou traitement manuel ? [RMP p6]

---

## 2. Paiement

### 2.1 Principe

- ✅ Tout paiement passe par HelloAsso, hors iframe ; le webhook range chaque transaction selon son libellé de désignation [RMP p2].

### 2.2 Libellés reconnus par le webhook (écriture actuelle ✅)

| Libellé HelloAsso | Catégorie | Exemple de montant observé | Source |
|---|---|---|---|
| `Inscription atelier - [nom] - [date courte] - [date complète]` | Session | 3 à 9 € | [RMP p2] |
| `Adhésion annuelle - [Prénom Nom]` | Adhésion, création | 50 € | [RMP p2] |
| `Renouvellement adhésion - [Prénom Nom]` | Adhésion, renouvellement | 50 € | [RMP p2] |

| Règle webhook | Détail | Source |
|---|---|---|
| Comparaison | `getMode()` compare les libellés par chaîne stricte | [RMP p2] |
| Libellé inconnu (ex. ancienne dénomination d'avant migration) | Rejeté en HTTP 400 ; HelloAsso réessaie 16 fois sur 27 heures, puis abandonne | [RMP p2] |
| Renouvellement | Met à jour la fiche de contact au lieu de créer une ligne : la date d'origine est écrasée | [RMP p2] |
| Gratuités (0 €) | Créées à la main, aucune trace HelloAsso | [RMP p2] |
| Identifiants | `order.id` et `payment.id` ne sont pas stockés | [RMP p2] |

### 2.3 Parcours de paiement

- ✅ Page de paiement HelloAsso en popup ou nouvel onglet, jamais en iframe (blocage CSP depuis mars 2026) [RMP p2].
- ✅ Confirmation reposant sur le webhook et sur l'URL de retour HelloAsso [RMP p2].

### 2.4 Annulation et remboursement — US519 (🟢 option semi-automatique validée)

| Étape | Règle | Source |
|---|---|---|
| Contrainte | HelloAsso n'a pas d'API de remboursement : aucune automatisation complète possible | [RMP p2] |
| 1. Annulation d'un atelier payé | Déclenche une demande de remboursement et une notification à l'administration | [RMP p2][RAD p3] |
| 2. Côté personne | Statut « remboursement en attente » affiché dans son historique | [RMP p2] |
| 3. Côté administration | Rembourser à la main dans HelloAsso (par une personne de l'équipe), puis confirmer | [RAD p2][RAD p3] |
| 4. Clôture | La personne reçoit un email de confirmation | [RMP p2][RAD p3] |

- ❓ L'admin d'antenne peut-il traiter les remboursements : à confirmer [RAD p2][RAD p5].

### 2.5 Rapprochement paiements / plateforme

- ✅ Clé de croisement : l'adresse email ; les emails peuvent différer entre HelloAsso et la plateforme (cas observés, ampleur non quantifiée) [RMP p3].
- ✅ Code postal du payeur HelloAsso utilisé pour déduire une antenne manquante (voir §4) [RMP p3].
- Outil d'import de paiements HelloAsso (outil d'administration en construction) : brique 1 import brut d'un export HelloAsso via la médiathèque WordPress ; brique 2 correspondance manuelle des colonnes brutes vers les clés de métadonnées ; brique 3 reconnaissance des adhésions (classement en lot, filtres de revue) ; briques 4 et 5 (rapprochement identité et date, écriture des comptes) pas encore construites ; la table officielle des abonnements existe mais reste vide [RAD p3].
- Sources de vérité (statut « Confirmé ») : paiements d'adhésion = HelloAsso (export CSV) ; gratuités (0 €) = WordPress uniquement [RMP p5]. ❓ Date de souscription effective : HelloAsso (date du paiement) ou WordPress (date d'adhésion), « À valider : les deux ne coïncident pas toujours » [RMP p5]. Détail : [05-administration-roles-securite.md](05-administration-roles-securite.md).

---

## 3. Ateliers

Principe : une adhérente ne peut pas dépasser la jauge d'un atelier, ni 3 ateliers par mois, ni réserver deux ateliers qui se chevauchent [RMP p3].

### 3.1 Définitions

| Terme | Définition | Source |
|---|---|---|
| Atelier | Session planifiée avec une date, un lieu et une jauge ; distinct du workshop | [RMP p3] |
| Workshop | Catégorie générique | [RMP p3][GLO p2] |
| Session (technique) | Occurrence datée : date, lieu, jauge, format live ou visio, antenne ; le front parle d'« atelier » ; les KPI comptent les sessions | [GLO p2] |
| Thématique | Catégorie d'atelier (ex. Bien-être, Juridique, Fondamentaux) | [RMP p3] |
| Format | Live ou visio | [RMP p3] |

- Création d'une session : date, lieu, jauge, format (live ou visio), antenne ; photo possible (image mise en avant du CPT session) [RAD p3].
- Types d'ateliers distincts (socle, Feel Good, BURN'ette, coup de pouce) : voir [02-glossaire.md](02-glossaire.md) [GLO p2].

### 3.2 Règles de réservation (étape 9 du parcours bénéficiaire ✅)

| Règle | Valeur | Source |
|---|---|---|
| Capacité | Jauge définie à la création, non dépassable | [RMP p3][RAD p3] |
| Quota | Maximum 3 ateliers par adhérente et par mois | [RMP p3] |
| Chevauchement | Deux ateliers aux horaires qui se chevauchent ne peuvent pas être réservés | [RMP p3] |
| Suggestions | Pointent vers des sessions datées ; une session sans date n'est jamais suggérée | [RMP p3] |
| Visibilité | Session visible si `branch` de l'utilisatrice = `branch` de la session ; un accès direct par URL à une session d'une autre antenne doit être bloqué | [RAD p2] |

- ❓ Filtrage des ateliers par antenne : régression constatée en septembre 2026 (adhérentes voyant les ateliers de toutes les antennes) ; correctif délégué au développeur, statut à confirmer [RAD p1][RAD p5].

### 3.3 Liste d'attente

| Règle | Détail | Statut | Source |
|---|---|---|---|
| Inscription | Possible sur session complète, avec notification de confirmation | ✅ | [RMP p3] |
| Place libérée | Toutes les personnes en attente prévenues en même temps (email avec lien d'inscription) ; premier arrivé, premier servi ; pas d'inscription automatique | ✅ | [RMP p3][RAD p3] |
| Stockage | Champ `user_workshops_waitinglist` (même format que `user_sessions`) | ✅ | [RMP p3] |
| Consultation | Dans le back-office ; ajout du nom complet et du téléphone prévu | ✅ / 🎯 | [RAD p3] |
| Retrait de la liste quand la personne s'inscrit finalement | Non géré (point de vigilance, point ouvert) | ❓ | [RMP p3][RMP p7] |

### 3.4 Annulation d'une participation

- ✅ La personne reçoit une notification de confirmation ; l'équipe est prévenue qu'une place est potentiellement libérée [RMP p3].
- ✅ Alerte back-office : nom, atelier, date ; aucune action pour une session gratuite [RAD p3].
- Session payante déjà réglée : voir §2.4 (US519) [RMP p3].
- ⛔ Dépendance : S523 repose sur la notification d'annulation (S508), sortie du périmètre actif [RAD p3][RAD p4].
- ✅ Toute notification ou email transactionnel passe par Brevo [RAD p3].

### 3.5 Suivi côté administration

| Élément | Règle | Source |
|---|---|---|
| Liste des participantes | Nom, prénom, email, téléphone (copie en un clic) | [RMP p3][RAD p3] |
| Remplissage | Inscrites / total places dans la colonne des bénéficiaires, en rouge et en gras quand complète | [RMP p3][RAD p3] |
| Brouillons | Mise en ligne par lot (case à cocher + bouton de publication de la sélection) | [RMP p3][RAD p3] |

### 3.6 Questionnaire de satisfaction après atelier (🎯 cible)

- 🎯 Lien généré par un shortcode propre à chaque session, en remplacement du lien fixe actuel (✅ actuel : lien fixe), validé sur au moins deux sessions [RMP p3][RMP p4].
- L'envoi automatique dépend de la configuration Brevo [RMP p4].

---

## 4. Antennes (branches)

| Antenne | Territoire | Source |
|---|---|---|
| Gironde | Département 33 | [RMP p4] |
| Lot-et-Garonne | Département 47 | [RMP p4] |
| Nord | Départements 02, 59, 60, 62, 80 (Hauts-de-France) | [RMP p4] |
| Antenne virtuelle | Tous les autres territoires | [RMP p4] |

| Règle | Détail | Source |
|---|---|---|
| Rattachement | Par identifiant interne (`branch`, référence au CPT location, ID numérique), jamais par texte libre ; identique sur le profil et la session | [RMP p4][RAD p1] |
| Antenne virtuelle nationale | Antenne à part entière, avec son propre ID ; traitée comme les autres pour le filtre de visibilité | [RAD p1][RAD p2] |
| Atelier virtuel créé par une antenne | Compte pour cette antenne dans les KPI, reste visible de toutes les utilisatrices en front-office | [RMP p4] |
| Ouverture à toutes les antennes | Activable à la création de la session par le Branch Manager, pour une session dont il est l'auteur et qui porte sa `branch` ; contrôle par rôle (`branch_manager`) plutôt que par capacité, à valider par un test en conditions réelles ; pour le super admin : « À confirmer » | [RAD p1][RAD p2] |
| Antenne manquante | Déduite des deux premiers chiffres du code postal du payeur HelloAsso, en croisant par email | [RMP p4] |
| Profils « Bordeaux » | 29 profils portent cette antenne absente du référentiel : exclus des KPI par antenne tant que l'attribution n'est pas décidée | [RMP p4] |

- ❓ Quelle antenne pour les 29 profils « Bordeaux » ? [RMP p6]

---

## 5. Ressources

| Règle | Détail | Statut | Source |
|---|---|---|---|
| Onglet « Pour moi » | Ressources recommandées selon le stade de la personne | ✅ | [RMP p4] |
| Onglet « Toutes les ressources » | Tout s'affiche, sans filtre par défaut | ✅ | [RMP p4] |
| Formats acceptés | Vidéos et PDF uniquement | ✅ | [RMP p4][RAD p4] |
| Liens de podcasts et de vidéos cassés | À corriger | ✅ constat actuel | [RAD p4] |
| Nombre de consultations par ressource, notation 1 à 5 étoiles (back-office) | Demandés, non développés | 🎯 | [RAD p4] |
| Validation des contenus | Contenu scientifique des stades : référente scientifique ; contenus communauté et tarification solidaire : chargée de communication | ✅ | [RAD p4] |
| Accès pair-aidante bénévole | Accès aux ressources, pas aux ateliers payants (rôle non confirmé comme livré) | 🎯 | [RAD p1] |

---

## 6. Questionnaires, scoring et stades

### 6.1 Deux instruments sans lien

Le BAT et le questionnaire de stade ne partagent ni questions, ni scoring, ni code [RMP p4][GLO p2].

| | BAT (burn-out assessment tool) | Quiz connecté (stade) | Source |
|---|---|---|---|
| Public | Visiteuses du site vitrine, non connectées | Adhérentes connectées | [RMP p4] |
| Contenu | Questionnaire officiel, 6 sous-dimensions : `exhaustion`, `mental_distance`, `emotional_deficiency`, `cognitive_deficiency`, `psychological_complaint`, `psychosomatic_complaint` | 5 stades × 7 items = 35 questions, échelle de Likert de 1 à 5 | [RMP p4] |
| Calcul | Score global, logique inchangée | Stade dominant = moyenne la plus haute par section | [RMP p4] |
| Résultat | Page de résultats du site vitrine | Stade enregistré dans `current_stage` (ID de terme de la taxonomie stage) | [RMP p4] |

- Affichage BAT : retirer les pictogrammes feu tricolore (vert, orange, rouge) de la page de résultats, sans toucher au calcul [RMP p5].

### 6.2 Scoring du quiz connecté

| Règle | Détail | Statut | Source |
|---|---|---|---|
| Stade dominant | Section dont la moyenne est la plus haute ; ni somme, ni seuil global | ✅ | [RMP p4] |
| Départage en cas d'égalité (cible) | Décimales non arrondies, ou auto-positionnement graphique ; ce composant n'existe pas encore | 🎯 | [RMP p4] |
| Départage ex aequo (actuel) | Repli temporaire | ✅ | [RMP p4] |
| Nouvelle version du questionnaire | Attendue de la référente scientifique début 2027 | 🎯 | [RMP p4] |
| Journal anonyme des soumissions du quiz (outil de diagnostic temporaire) | À retirer ou désactiver après usage | ✅ | [RAD p5] |
| Présentation du résultat | Le stade est une orientation, jamais un diagnostic médical | ✅ | [GLO p2] |

### 6.3 Les cinq stades

| Ordre | Libellé du glossaire validé | Clé dans le code | Source |
|---|---|---|---|
| 1 | Épuisement | `turbulence` | [RMP p4][GLO p2] |
| 2 | Récupération | `recuperation` | [RMP p5][GLO p2] |
| 3 | Introspection | `introspection` | [RMP p5][GLO p2] |
| 4 | Projection | `projection` | [RMP p5][GLO p2] |
| 5 | Mise en action | `action` | [RMP p5][GLO p2] |

- ✅ Le stade pilote les ressources recommandées (onglet « Pour moi ») et la mise en avant des sessions [RMP p5].
- ✅ Le module 6 « Stabilisation » n'a pas de stade correspondant dans le quiz [GLO p2].
- ❓ Libellé du premier stade : « Turbulence » (référente scientifique) ou « Épuisement » (glossaire validé) — « À trancher avec elle » [RMP p5][RMP p6] ; le glossaire indique « Utiliser « Épuisement » » [GLO p2].
- Besoins par stade (personae) : voir [03-personae-besoins.md](03-personae-besoins.md).

---

## 7. Points ouverts du périmètre (❓ ne jamais supposer tranchés)

| Question | Source |
|---|---|
| Requête exacte du KPI membres actives ; pourquoi il baisse à la validation manuelle d'un compte | [RMP p6] |
| Renouvellement avant expiration : nouvelle date depuis l'expiration ou depuis le nouveau paiement | [RMP p6] |
| Rattachement d'une adhésion glissante à une année civile pour les KPI | [RMP p6] |
| Dépense moyenne : sessions seules ou adhésion incluse | [RMP p6] |
| Seuil exact entre tarif réduit et plein tarif + solidaire ; justificatif demandé | [RMP p6] |
| Email différent HelloAsso / plateforme : fusion automatique sur nom et prénom, ou traitement manuel | [RMP p6] |
| La table des paiements distingue-t-elle adhésion, atelier et don | [RMP p6] |
| Antenne des 29 profils « Bordeaux » | [RMP p6] |
| Libellé du premier stade : « Turbulence » ou « Épuisement » | [RMP p6] |
| Date de souscription : HelloAsso ou WordPress en cas d'écart | [RMP p6] |
| Nettoyage de la liste d'attente quand la personne s'inscrit | [RMP p7] |
| Tarif strict à 0 € possible dans HelloAsso pour l'adhésion solidaire | [RAD p5] |
| Admin d'antenne : export des données nominatives, validation des comptes, traitement des remboursements | [RAD p5] |
| Super admin : création de sessions, ouverture à toutes les antennes, validation des comptes | [RAD p5] |

KPI, sources de vérité, anomalies de données : voir [06-donnees-et-technique.md](06-donnees-et-technique.md) [RMP p5][RMP p6].

---

## Non précisé dans les sources

- Délai ou fenêtre d'annulation d'une participation à un atelier (avant la session) : Non précisé dans les sources.
- Comportement exact du quota de 3 ateliers/mois (mois civil ou glissant, prise en compte des annulations, de la liste d'attente) : Non précisé dans les sources.
- Contenu et texte des notifications J-15 / J-7 et du message d'expiration : Non précisé dans les sources.
- Contenu du « repli temporaire » de départage ex aequo du quiz : Non précisé dans les sources.
- Liste des 35 questions du quiz de stade et répartition des items : Non précisé dans les sources.
- Fréquence à laquelle une adhérente peut repasser le quiz, historique des stades : Non précisé dans les sources.
- Tarifs des ateliers payants au-delà de l'exemple observé (3 à 9 €), et ateliers gratuits vs payants par type : Non précisé dans les sources.
- Prix des parcours BBA et BIB, et règles de paiement associées (libellé webhook) : Non précisé dans les sources (le visuel affiche des espaces réservés « XX€ » / « X€ », non renseignés [VIS p1]).
- Prix de l'adhésion annuelle sur le visuel : « XX€ par an (plusieurs paliers disponible accessibilité financière) », espace réservé non renseigné [VIS p1].
- Libellé HelloAsso de l'adhésion solidaire / du don supplémentaire : Non précisé dans les sources.
- Règle de mise en avant des sessions selon le stade (algorithme) : Non précisé dans les sources.
- Mapping exact ressource ↔ stade (taxonomie, multi-stades) : Non précisé dans les sources.
- Taille maximale ou hébergement des fichiers vidéo/PDF : Non précisé dans les sources.
- Délai de traitement d'un remboursement manuel : Non précisé dans les sources.
- Règles d'accès d'une non-adhérente aux groupes de parole et permanences (inscription, quota) : Non précisé dans les sources.
