# Accessibilité, graphisme et UX

> Exigences d'accessibilité numérique, éléments de présentation observés et contraintes UX tirés des documents de L'BURN. Sources : ACC (notes de la sensibilisation Share It), VIS (visuel « L'accompagnement L'BURN »), CAD, PER, CAR, MOD, GLO.

Légende statuts : ✅ actuel/existant · 🎯 cible · 🟢 décidé/validé · 🟡 piste non actée · ❓ question ouverte/hypothèse · ⛔ hors périmètre/reporté.

Voir aussi : [03-personae-besoins.md](03-personae-besoins.md) (personae et implications UX), [02-glossaire.md](02-glossaire.md) (graphie des termes), [09-hackathon-theme2-activ-problemes.md](09-hackathon-theme2-activ-problemes.md) (contraintes du cadrage ACTIV'), [06-donnees-et-technique.md](06-donnees-et-technique.md) (WordPress).

---

## À retenir pour le build

- 🎯 Contrainte d'accessibilité du cadrage ACTIV' : « RGAA ; une page, un clic, une récompense ; calendrier utilisable au clavier ; boutons explicites. » [CAD p3]
- 🟢 La partie « Solutions / conseils pour les burn'ettes » des notes Share It « vaut exigence d'UX pour tous les prototypes » (note pour l'IA). [ACC p1]
- Norme nationale : RGAA (v 4.12), « applicable pour tous à partir de 2025 », 106 critères. Autres normes citées : norme européenne, WCAG. [ACC p2]
- Conformité = 100 % des critères respectés ; non-conformité = moins de 50 %. [ACC p2]
- Tous les supports doivent être accessibles, y compris les documents bureautiques. [ACC p1]
- Contenu : petites phrases, listes à puces, image avec texte alternatif, vidéo avec sous-titres, liens indiquant l'ouverture dans une nouvelle fenêtre. [ACC p2]
- Déclarer « L'BURN » et « burnout » (et les autres anglicismes) comme mots en anglais (prononciation « beurnou »). [ACC p2]
- Implication UX (persona stade 2, Marion [PER p2]) : expérience « très rassurante, peu exigeante cognitivement, progressive et compatible avec une faible disponibilité émotionnelle ou énergétique ». [PER p3]
- Ton : « Valoriser le vécu comme une ressource, jamais une injonction à « rendre ». » [CAD p3] ; progression « à son rythme, sans injonction à aller vite ». [PER p1]
- Critères de qualité du prototype ACTIV' : parcours d'Élodie « simple et rassurant » ; « cohérence avec le design system et le thème 1 ». [CAD p4]
- Aucune charte graphique officielle n'est présente dans les sources : le cadrage cite un fichier « 03_Charte_graphique_pour_prototypes.md » qui n'est pas fourni [CAD p4]. Les couleurs ci-dessous sont des observations du visuel [VIS p1].

---

## 1. Vision et principes (Share It)

| Élément | Contenu | Source |
|---|---|---|
| Cadre | Sensibilisation « Accessibilité numérique — Comment et pourquoi », animée par Share It (animateur : Lhorens Marie), notes prises par l'association | [ACC p1] |
| Vision | « Accès à l'information et services par tous, pour tous » | [ACC p1] |
| Droit | « L'accessibilité numérique est un droit » ; « Mais c'est avant tout un droit ! » | [ACC p1][ACC p2] |
| Périmètre | Tous les supports, y compris documents bureautiques | [ACC p1] |
| Utilisateurs visés | Toutes les personnes, y compris en situation de handicap : sourds, malvoyants, non-voyants, handicap moteur (impossibilité de cliquer), dyslexie… | [ACC p1] |
| Constat | « aujourd'hui on ajoute des barrières pour quelque chose qui est censé être simple » | [ACC p1] |
| Types de matériels | Synthèses vocales, écran braille, navigateur textes ou graphiques… | [ACC p1] |
| Posture | « L'accessibilité, c'est accepter et comprendre » | [ACC p1] |
| Limite | « On n'est jamais vraiment accessible, mais on limite au maximum les empêchements » | [ACC p2] |
| Fiches handicap | Utiles pour comprendre, mais une partie des « A faire / A ne pas faire » sont antagonistes : se référer aux normes | [ACC p1] |
| Exemple cité | Vidéo « J'en crois pas mes yeux » : accessible car son, sous-titres et audio description | [ACC p1] |

## 2. Normes, RGAA et conformité

| Élément | Contenu | Source |
|---|---|---|
| Norme nationale | RGAA (v 4.12), applicable pour tous à partir de 2025 | [ACC p2] |
| Nombre de critères RGAA | 106 critères | [ACC p2] |
| Autres normes | Norme européenne ; WCAG | [ACC p2] |
| Conformité | 100 % des critères respectés | [ACC p2] |
| Non-conformité | Moins de 50 % | [ACC p2] |
| Intervenants | « Chaque intervenant technique dans la réalisation du projet va avoir ses propres règles » | [ACC p2] |
| Enjeux | Juridique ; qualité visible et durable ; enjeu d'image ; bénéfice pour tous ; alignement aux valeurs ShareIt | [ACC p2] |
| Exigence projet ACTIV' | 🎯 RGAA (contrainte du cadrage) | [CAD p3] |

- Statut entre 50 % et 100 % : Non précisé dans les sources. [ACC p2]
- Liste détaillée des 106 critères : Non précisé dans les sources.

## 3. Images, couleurs et alternatives textuelles

- « Les images : double peine ». [ACC p1]
- Attention aux couleurs (daltonisme), au contraste, aux informations supplémentaires sur le graphique ou l'image, à l'ordre de la légende. [ACC p1]
- En complément, fournir une alternative textuelle à l'image sous forme d'une phrase. [ACC p1]
- L'alternative textuelle est un attribut de l'image. [ACC p1]
- Image complexe : « on peut raconter l'histoire du poster dans un texte caché après l'image (dans ce cas, ne mettre l'alternative vide), qui sera lu » (formulation exacte de la source, ambiguë). [ACC p1]
- « L'illustration n'est qu'un support au texte. » [ACC p1]
- Ne pas mettre les copyright dans les ALT. [ACC p1]
- Logo et images : se demander « qu'est-ce qui devrait être entendu par la personne ? » (remarque sur le site L'BURN : les alternatives des images ressortent mais sont inutiles, idem pour le logo). [ACC p2]

## 4. Vidéo et son

| Règle | Source |
|---|---|
| Vidéo accessible = son + sous-titres + audio description | [ACC p1] |
| Préférer l'envoi du fichier de sous-titres en complément de la vidéo plutôt que des sous-titres intégrés dans la vidéo | [ACC p1] |
| Sous-titres : deux fonctions (expliquer ou traduire) ; dans ce cas, mettre plusieurs fichiers au choix | [ACC p2] |
| Attention aux liens vers vidéo YouTube… ; préférable d'héberger la vidéo sur son site (impact écologique) | [ACC p2] |
| Remarque sur le site L'BURN : « la vidéo n'est pas indiquée » | [ACC p2] |
| Conseil pour les burn'ettes : « intégrer du son » | [ACC p2] |

Contexte plateforme :
- ✅ Formats de ressources acceptés aujourd'hui : vidéo et PDF. [GLO p1]
- 🎯 Module ACTIV' : prérequis « Présentation générale : ce qu'est être « ACTIV' », ce qu'est la pair-aidance — vidéo » ; tronc commun « Formation à suivre (ressources vidéo) : psychoéducation ; posture d'animation d'ateliers ». [MOD p1] Périmètre du cadrage : « Formation : tronc commun (vidéos) ». [CAD p2]
- Cartographie ACTIV', étape 11 (formation tronc commun, vidéos) : points de contact « Plateforme (formation) » et « Youtube ». ❓ Friction (hypothèse) : « Mêmes freins d'accès aux vidéos qu'à l'étape 6 ». [CAR p3]
- 🎯 Formats accessibles attendus pour les ressources : vidéo, audio, podcast, visuel et contenu court. [PER p1]

## 5. Navigation, liens, langue

- Navigation : « important de s'arrêter sur les liens, sinon le contenu est lu d'un bloc ». [ACC p2]
- Liens : expliquer qu'on ouvre le contenu dans une nouvelle fenêtre. [ACC p2]
- Prononciation : « L'BURN » et « burnout » sont prononcés « beurnou » par la synthèse et très utilisés sur les pages ; alternative : déclarer que ce mot est en anglais ; idem pour les autres anglicismes. [ACC p2]
- Écriture inclusive : y faire attention, elle « complexifie la compréhension pour les personnes en situation de handicap ». [ACC p1]
- 🎯 Calendrier utilisable au clavier ; boutons explicites. [CAD p3]

## 6. Conseils pour un contenu accessible

| Conseil | Source |
|---|---|
| Petites phrases | [ACC p2] |
| Listes à puces | [ACC p2] |
| Image avec texte alternatif | [ACC p2] |
| Vidéo avec sous-titres (deux fonctions : sous-titrer pour expliquer ou traduire ; mettre dans ce cas plusieurs fichiers au choix) | [ACC p2] |
| Liens : indiquer l'ouverture dans une nouvelle fenêtre | [ACC p2] |
| « Solutions / conseils pour les burn'ettes » : « intégrer du son » (seul item présent ; la liste s'arrête là) | [ACC p2] |

## 7. Remarques sur l'accessibilité du site L'BURN (✅ état constaté)

| Constat | Source |
|---|---|
| Première info qu'on voit : Facebook et Insta | [ACC p1] |
| Image à gauche : le clic clavier ne fonctionne pas sur les têtes de chapitre sur le texte | [ACC p1] |
| Les alternatives des images ressortent mais sont inutiles ; idem pour le logo | [ACC p2] |
| Image à droite : recherche invisible à l'oreille ; la vidéo n'est pas indiquée | [ACC p2] |
| « L'BURN » / « burnout » mal prononcés (« beurnou ») | [ACC p2] |

- Les sources distinguent site vitrine et application (plateforme). [GLO p2] Ces remarques portent sur le « site L'BURN » ; auquel des deux elles s'appliquent : Non précisé dans les sources. [ACC p1]

## 8. Contraintes UX (hors notes Share It)

| Contrainte | Statut | Source |
|---|---|---|
| « une page, un clic, une récompense » | 🎯 | [CAD p3] |
| Calendrier utilisable au clavier ; boutons explicites | 🎯 | [CAD p3] |
| Ton : valoriser le vécu comme une ressource, jamais une injonction à « rendre » | 🎯 | [CAD p3] |
| Actions concrètes mais découpées en étapes courtes et rassurantes (stade 5) | 🎯 | [CAD p2] |
| Expérience très rassurante, peu exigeante cognitivement, progressive, compatible avec une faible disponibilité émotionnelle ou énergétique (stade 2, Marion) | 🎯 | [PER p3] |
| S'adapter à l'énergie, aux besoins et aux freins de chaque bénéficiaire ; pas un simple catalogue | 🎯 | [PER p1] |
| Progression à son rythme, sans injonction à aller vite | 🎯 | [PER p1] |
| Frein persona stade 2 (Marion) : « fatigue et concentration limitées » ; « lecture parfois difficile : préférence pour des formats audio ou podcast » | ✅ constat persona | [PER p2] |
| Principe directeur ACTIV' : « l'engagement est un choix. La pause est possible à chaque étape. » | 🎯 | [CAR p1] |
| Visibilité immédiate sur le « prochain petit pas » | 🎯 | [PER p4] |
| Stade présenté comme une orientation, non comme un diagnostic médical | 🎯 | [PER p4] |
| Inscription simplifiée aux ateliers (priorité 4 des « Priorités fonctionnelles suggérées ») : réduction de la charge mentale et du stress | 🟡 suggérée | [PER p4] |
| Candidater « sans pression » ; actions courtes et rassurantes ; contributions valorisées | 🎯 | [CAD p2] |
| Tableau de bord « mes contributions » sans gamification culpabilisante | ❓ H5 | [CAD p3] |
| Pair-aidantes : limites d'engagement, possibilité de se retirer sans culpabilité | 🎯 | [CAD p3] |
| Écoute téléphonique et groupes de parole (personnes vulnérables) : procédure d'alerte et d'escalade vers l'équipe, accès visible aux numéros d'urgence | 🎯 | [CAD p3] |
| Étape 8 : « Option ouverte en phase de projection : critère (+10 mois) peu lisible pour elle » ; « Risque de se sentir poussée à s'engager » | ❓ friction hypothèse | [CAR p2] |
| Étape 12 : « Infos dispersées entre email, Facebook et plateforme » | ❓ friction hypothèse | [CAR p3] |
| Parcours d'Élodie simple et rassurant ; cohérence avec le design system et le thème 1 | 🎯 critère qualité | [CAD p4] |
| Adhésion annuelle : « XX€ par an (plusieurs paliers disponible accessibilité financière) » | Non précisé dans les sources (montants en espaces réservés) | [VIS p1] |

## 9. Graphisme et présentation observés (pas une charte officielle)

Aucune charte graphique officielle n'est fournie dans les sources. Le cadrage liste « 03_Charte_graphique_pour_prototypes.md » et parle d'un « design system », mais ni l'un ni l'autre ne sont dans les sources. [CAD p4]

### 9.1 Visuel « L'accompagnement L'BURN » (capture de diapositive)

Observation : structure en 3 encadrés empilés, chacun avec un libellé de prix aligné à droite. [VIS p1]

| Encadré | Style observé (approximatif) | Titre / contenu | Mention à droite | Source |
|---|---|---|---|---|
| 1 | Bordure rose, fond blanc | « Mon premier contact avec l'asso - avant d'adhérer » : « Je découvre l'asso → je peux aller à une permanence d'infos 1h » (20min : définition officielle du BO et stades de rétablissement / 20min : fonctionnement de l'asso / 20min QR) ; « Si après cette permanence j'ai envie, j'ai accès à » : 1 groupe de parole BBA, 1 appel téléphonique d'1h si besoin | « Gratuit » | [VIS p1] |
| 2 | Fond pêche / rose clair | « ADHÉSION ANNUELLE » : antenne locale / virtuelle (accès au lieu & à la communauté d'entraide), plateforme en ligne (ressources), programmation mensuelle (groupes de parole, ateliers BURN'ette, ateliers coup de pouce) | « XX€ par an (plusieurs paliers disponible accessibilité financière) » | [VIS p1] |
| 3 | Fond rose | « LES PARCOURS » : BURN TO BE ALIVE (modules 1 à 3, XX€), BURN'ette is BACK (modules 4 à 6, XX€), ACTIV' (X€, sur candidature), SENTINELLE (X€, sur candidature) ; « Chaque parcours donne accès à : des ressources + des ateliers socles + des ateliers Feel Good » | « Prix par parcours » | [VIS p1] |

- Couleurs dominantes observées : roses (bordure rose, rose clair/pêche, rose). À traiter comme observation, pas comme code couleur officiel. Valeurs hexadécimales : Non précisé dans les sources. [VIS p1]
- Ordre des encadrés et mentions à droite : « Gratuit » → « XX€ par an » → « Prix par parcours ». [VIS p1]
- Rédaction à la première personne (« Je découvre l'asso », « J'ai envie d'être accompagnée », « Je suis adhérente ») et au féminin. [VIS p1]
- Titres d'encadrés 2 et 3 en majuscules (« ADHÉSION ANNUELLE », « LES PARCOURS »). [VIS p1]
- Montants = espaces réservés (XX€, X€), non renseignés. [VIS p1]
- Autres diapositives visibles (titres seulement) : « TRAVAIL EN COURS - L'BURN / Ingénierie & Accompagnement », « Les antennes et relais L'BURN », « FOCUS : MON PREMIER CONTACT AVEC L'ASSO », « La permanence ». [VIS p1]

### 9.2 Autres conventions de présentation

- Cartographie ACTIV' : lignes 1 à 3 = vécu du parcours ; lignes 4 à 6 (fond bleuté) = la mesure. [CAR p2][CAR p3][CAR p4]
- Graphie : écrire « ACTIV' » (les supports écrivent aussi Activ', Actives, ACTIV) et « BURN'ette ». [GLO p2]

---

## Non précisé dans les sources

- Charte graphique officielle (palette en hex, typographies, logo, iconographie, espacements) : non fournie ; fichier « 03_Charte_graphique_pour_prototypes.md » cité mais absent. [CAD p4]
- Contenu du « design system » et du « thème 1 » à respecter. [CAD p4]
- Niveau de conformité RGAA visé (100 % ou partiel), audit, déclaration d'accessibilité : Non précisé dans les sources.
- Ratios de contraste chiffrés, tailles de police minimales, cibles tactiles : Non précisé dans les sources.
- Exigences mobile / responsive : Non précisé dans les sources.
- Règles précises sur l'écriture inclusive à adopter (seule l'alerte est donnée) : Non précisé dans les sources. [ACC p1]
- Suite de la liste « Solutions / conseils pour les burn'ettes » au-delà de « intégrer du son ». [ACC p2]
- Signification opérationnelle de « une page, un clic, une récompense » (nature de la « récompense »). [CAD p3]
- Mode sombre, animations, préférences utilisateur (taille de texte, réduction de mouvement) : Non précisé dans les sources.
- Outils de test d'accessibilité à utiliser : Non précisé dans les sources.
