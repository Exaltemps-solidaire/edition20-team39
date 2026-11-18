# Charte graphique L'BURN

> Thème graphique de référence pour l'application : couleurs, typographie, composants et logos.
> **Source principale : le site public de l'association, https://lesburn-ettes.com/lburn/**, avec les valeurs relevées dans son code CSS et HTML le 18/11/2026. Chaque valeur indique son origine.
> L'association n'a fourni aucune charte officielle : le cadrage cite un fichier `03_Charte_graphique_pour_prototypes.md` et demande une « cohérence avec le design system et le thème 1 », mais ces éléments ne sont pas fournis [CAD p4]. Ce document est donc la meilleure référence disponible, **à confirmer avec l'équipe**.

## Sources du site

| Code | Fichier |
|---|---|
| `WEB-P` | Page HTML https://lesburn-ettes.com/lburn/ et ses blocs `<style>` inline (`divi-dynamic-critical-inline-css`, `et-critical-inline-css`, `custom-background-css`, `et-vb-global-fonts`…) |
| `WEB-DEF` | https://lesburn-ettes.com/wp-content/et-cache/217/et-core-unified-tb-8251-deferred-217.min.css |
| `WEB-CUS` | https://lesburn-ettes.com/wp-content/et-cache/217/et-core-unified-217.min.css |

Le site tourne sous WordPress 7.1.4 avec le thème **Divi 5.11.1**, sans thème enfant. Ces versions sont lues dans les balises `<meta name="generator">` [WEB-P].

## À retenir pour le build

- **Rouge L'BURN `#dc3129`** : couleur primaire, utilisée pour les titres, les liens, le texte et la bordure des boutons, et le fond du pied de page.
- **Rose `#ffb4aa`** : couleur secondaire. **Rose pâle `#fee3e2`** et **crème `#fff8f4`** : fonds de cartes et de sections.
- **Texte `#23262f`** sur **fond de page `#f9f9f9`**.
- **Polices Google** : **Archivo Black** pour les titres, **Libre Franklin** pour le texte et les boutons, **Average Sans** pour le menu.
- **Boutons en pilule** (rayon 50px), en majuscules et gras, rose pâle avec bordure et texte rouge. **Cartes** à rayon 15px avec une ombre douce.
- **Logo actuel** : [`assets/logos/logo-header-lburn-communaute.png`](assets/logos/logo-header-lburn-communaute.png), noir sur fond transparent. **Il n'existe pas de version claire.**
- ⚠ **Contraste** : le rouge `#dc3129` atteint 4,65:1 sur blanc, ce qui passe le seuil AA pour un texte normal. Sur les fonds roses ou crème, il est **sous 4,5:1** ; voir la section [Accessibilité des couleurs](#accessibilité-des-couleurs).

## Couleurs

| Rôle | Hex | Variable Divi d'origine | Usages relevés sur le site | Source |
|---|---|---|---|---|
| Primaire, titres, liens | `#dc3129` | `--gcid-primary-color`, `--gcid-heading-color`, `--gcid-link-color` | `h1`…`h6`, `a`, menu actif, texte et bordure de `.et_pb_button`, `blockquote`, fond du pied de page, puces du slider | WEB-P (`:root`), WEB-DEF |
| Secondaire | `#ffb4aa` | `--gcid-secondary-color` | fond du bandeau supérieur `#top-header` et des sous-menus, sections, bouton de la newsletter | WEB-P, WEB-DEF |
| Rose pâle | `#fee3e2` | — | fond des boutons standard (y compris au survol), lignes et sections | WEB-P, WEB-DEF |
| Crème | `#fff8f4` | — | fond de l'en-tête sur bureau, cartes et colonnes, texte sur le fond rouge du pied de page, champs de la newsletter | WEB-P, WEB-DEF |
| Texte courant | `#23262f` | `--gcid-body-color` | `body`, liens du menu, texte des sliders | WEB-P |
| Fond de page | `#f9f9f9` | — | `body.custom-background` | WEB-P (`custom-background-css`) |
| Blanc | `#ffffff` | — | en-tête en mobile (≤ 980px), badges | WEB-P, WEB-DEF |
| Noir | `#000000` | — | `style="color:#000000"` en ligne sur certains textes et liens | WEB-P |
| Texte du menu mobile | `rgba(0,0,0,0.6)` | — | `#top-menu a`, `.et_mobile_menu li a` (≤ 980px) | WEB-P |
| Ombre | `rgba(0,0,0,0.3)` | — | ombres des cartes, images et vidéos | WEB-DEF |

Valeurs à **ne pas reprendre** : la palette `--wp--preset--color--*`, qui est celle de WordPress par défaut, et les couleurs du customizer Divi qui ne s'appliquent à aucun élément de la page (`#9e9e9e`, `#1e1e1e`, `#2ea3f2`) [WEB-P].

## Typographie

| Rôle | Famille | Graisse | Chargement | Source |
|---|---|---|---|---|
| Titres `h1`…`h6` | `'Archivo Black'` (`--et_global_heading_font`) | 400 (`--et_global_heading_font_weight`) | Google Fonts | WEB-P |
| Texte courant, champs de formulaire | `'Libre Franklin'` (`--et_global_body_font`) | 500 (`--et_global_body_font_weight`) | Google Fonts, police variable `wght@100..900` | WEB-P |
| Boutons | `'Libre Franklin', Helvetica, Arial, sans-serif` | bold, `text-transform: uppercase` | — | WEB-P |
| Menu principal | `'Average Sans', Helvetica, Arial, Lucida, sans-serif` | bold, alors que seule la graisse 400 est chargée | Google Fonts | WEB-P |

**Tailles** [WEB-P `et-critical-inline-css` ; surcharges WEB-CUS]

| Élément | Bureau | Mobile (≤ 980px) |
|---|---|---|
| `h1` | 50px | 34px |
| `h2` | 43px | 29px, ramené à 24px `!important` [WEB-CUS] |
| `h3` | 36px | 24px |
| `h4` | 30px | 20px |
| `h5` | 26px | 18px |
| `h6` | 23px | 15px |
| Texte courant | 20px (`--et_global_body_font_size`), interligne `1.4em` | 17px `!important` [WEB-CUS] |
| Menu | 17px, bold | — |
| Bandeau supérieur | 14px, bold, Libre Franklin | — |
| Boutons | 15px | — |

Les titres ont `line-height: 1em` et `padding-bottom: 10px` [WEB-P].

## Composants

### Boutons [WEB-P, WEB-DEF]

| Variante | Fond | Texte | Bordure | Rayon | Typographie |
|---|---|---|---|---|---|
| Standard (`body .et_pb_button`) | `#fee3e2` | `#dc3129` | 2px `#dc3129` | 50px | 15px, bold, majuscules, Libre Franklin |
| Contour (« Nous contacter », « Faire un don ») | transparent | `#dc3129` | 2px `#dc3129` | 50px | idem |
| Newsletter | `#ffb4aa` | — | 2px `#dc3129` | — | 13px |

- La base Divi ajoute `padding: .3em 1em`, `line-height: 1.7em` et une transition de `.2s` [WEB-P].
- Le survol garde les mêmes couleurs.
- Les boutons n'ont pas d'icône (classe `et_button_no_icon`).

### Cartes, images et badges [WEB-DEF]

- **Cartes et images** : rayon de **15px**, marge interne de 20 ou 30px, ombre `6px 6px 18px 0px rgba(0,0,0,0.3)`.
- **Badges** : fond `#ffffff`, bordure 1.5px `#dc3129`, rayon de **4px**.
- **Certaines images** : bordure 1.5px `#dc3129`.

### Mise en page [WEB-P]

- **Conteneur** : `width: 80%`, `max-width: 1080px`.
- **Espacements** : padding de section de 56px, gouttière de section de 60px, gouttière horizontale de ligne de 5.5 %, gouttière verticale de 40px, gouttière de module de 30px.
- **En-tête** : hauteur de 66px, logo à `max-height: 90%`.

## Tokens prêts à l'emploi

Les valeurs ci-dessous sont reprises telles quelles du site. Seuls les noms de variables sont proposés.

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Libre+Franklin:wght@100..900&family=Average+Sans&display=swap');

:root {
  /* Couleurs (lesburn-ettes.com) */
  --lb-color-primary:   #dc3129; /* titres, liens, bordure et texte des boutons, fond du pied de page */
  --lb-color-secondary: #ffb4aa; /* bandeau, sections, bouton newsletter */
  --lb-color-pink-soft: #fee3e2; /* fond des boutons, sections */
  --lb-color-cream:     #fff8f4; /* cartes, en-tête, texte sur fond rouge */
  --lb-color-text:      #23262f;
  --lb-color-bg:        #f9f9f9;
  --lb-color-white:     #ffffff;
  --lb-shadow-card:     6px 6px 18px 0 rgba(0, 0, 0, 0.3);

  /* Typographie */
  --lb-font-heading: 'Archivo Black', sans-serif;  /* graisse 400 */
  --lb-font-body:    'Libre Franklin', Helvetica, Arial, sans-serif; /* graisse 500 */
  --lb-font-menu:    'Average Sans', Helvetica, Arial, sans-serif;
  --lb-text-size:    20px;  /* 17px en mobile */
  --lb-text-leading: 1.4em;

  /* Formes */
  --lb-radius-button: 50px;
  --lb-radius-card:   15px;
  --lb-radius-badge:  4px;
  --lb-border-width:  2px;
  --lb-container-max: 1080px;
}
```

## Logos

Les fichiers sont dans [`assets/logos/`](assets/logos/). Le préfixe `…/uploads` vaut `https://lesburn-ettes.com/wp-content/uploads`.

| Fichier | Usage | Format | Couleurs (mesurées) | Origine |
|---|---|---|---|---|
| [`logo-header-lburn-communaute.png`](assets/logos/logo-header-lburn-communaute.png) | **Logo actuel**, en-tête du site : logotype « L'BURN » avec « La communauté des BURN'ettes », alt « Les BURN'ettes » | PNG 232×86, fond transparent | noir (≈ `#050505`) | `…/uploads/2026/02/Logo-LBURN-communaute.png` |
| [`og-image-logo-lburn.png`](assets/logos/og-image-logo-lburn.png) | Logo « L'BURN » utilisé pour le partage sur les réseaux (`og:image`) | PNG 250×150, fond transparent | noir | `…/uploads/2026/02/logo-lburn.png` |
| [`site-icon-full.png`](assets/logos/site-icon-full.png) | Icône du site, monogramme « B' » | PNG 512×512, fond transparent | gris très foncé (≈ `#242424`) sur blanc | `…/uploads/2026/02/cropped-En-tete-page-burnette.png` (non référencé dans la page, URL de l'icône pleine taille) |
| [`favicon-192.png`](assets/logos/favicon-192.png), [`favicon-32.png`](assets/logos/favicon-32.png) | Favicon | PNG 192×192 / 32×32 | idem | `rel="icon"` |
| [`apple-touch-icon-180.png`](assets/logos/apple-touch-icon-180.png) | Icône iOS | PNG 180×180 | idem | `rel="apple-touch-icon"` |
| [`schema-org-logo-burnettes-og.png`](assets/logos/schema-org-logo-burnettes-og.png) | **Ancien logo (2020)** : « Les BURN'ettes » en script rose avec « -association L'BURN- » | PNG 1200×630, fond blanc | gris foncé ≈ `#302E2E`, rose ≈ `#F4CAC7` | `…/uploads/2020/05/logoOG.png` (données structurées Yoast) |

- **Logo à utiliser** : `logo-header-lburn-communaute.png`. L'ancien logo de 2020 n'est plus celui de l'en-tête du site.
- **Fond sombre ou rouge** : le site ne propose aucune version blanche ou claire du logo.
- **Label « La France s'engage, lauréat 2025 »** : il figure dans le pied de page, mais c'est un label tiers et non un logo de l'association. Il n'a pas été repris.

## Accessibilité des couleurs

Ratios de contraste WCAG calculés à partir des valeurs ci-dessus. L'association demande de faire « attention aux couleurs (daltonisme), au contraste » [ACC p1] et fait référence au RGAA [ACC p2]. Voir aussi [08-accessibilite-graphisme.md](08-accessibilite-graphisme.md).

| Texte | Fond | Ratio | Texte normal (AA ≥ 4,5) | Grand texte (AA ≥ 3) |
|---|---|---|---|---|
| `#23262f` | `#ffffff` / `#f9f9f9` / `#fff8f4` | 15,1 / 14,4 / 14,4 | ✅ | ✅ |
| `#23262f` | `#fee3e2` / `#ffb4aa` | 12,5 / 8,9 | ✅ | ✅ |
| `#dc3129` | `#ffffff` | 4,65 | ✅ | ✅ |
| `#dc3129` | `#f9f9f9` / `#fff8f4` | 4,42 / 4,43 | ❌ | ✅ |
| `#dc3129` | `#fee3e2` (bouton standard) | 3,83 | ❌ | ✅ |
| `#dc3129` | `#ffb4aa` | 2,74 | ❌ | ❌ |
| `#fff8f4` / `#ffffff` | `#dc3129` (pied de page) | 4,43 / 4,65 | ❌ / ✅ | ✅ |

Le bouton standard (15px en gras) n'atteint pas la taille d'un « grand texte » WCAG, qui est de 18,66px en gras. Avec ses couleurs actuelles, il est donc **sous le seuil AA**.

## Non déterminé

- **Ce qui manque au site** : le hex exact du design system du « thème 1 » et le contenu de `03_Charte_graphique_pour_prototypes.md`, non fournis [CAD p4] ; une version claire du logo ; un jeu d'icônes ; un mode sombre (absent du site) ; des styles de survol propres aux liens (aucune règle `a:hover` spécifique).
- **Lecture du CSS** : les feuilles WEB-DEF sont chargées par JavaScript. Elles ont été lues en source, sans vérification du rendu dans un navigateur.
- **Une seule page analysée** (`/lburn/`) : d'autres pages du site peuvent utiliser d'autres styles de modules.

## Annexe : visuel interne (secondaire)

La diapositive de travail « L'accompagnement L'BURN » [VIS p1] utilise des roses voisins de ceux du site : fonds ≈ `#F9DDD1` et `#F9D2CD`, bandeaux ≈ `#F08F81`, mesurés sur la capture. C'est un support interne en cours d'élaboration. **Les valeurs du site prévalent.**
