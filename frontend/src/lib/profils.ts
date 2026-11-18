// Modèle ACTIV' : des ensembles imbriqués (BURN'ette ⊇ ACTIV' ⊇ Pair-aidante),
// pas un statut exclusif. Voir docs/analyse-maquette-donnees-asso.md et adr.md (2026-11-18).

export type Section = "burnette" | "activ" | "pairaidante";

export type Profil = {
  id: string;
  nom: string;
  antenne: string;
  estActiv: boolean;
  estPairAidante: boolean;
};

export const LIBELLES_PLURIEL: Record<Section, string> = {
  burnette: "BURN'ettes",
  activ: "ACTIV'",
  pairaidante: "Pair-aidantes",
};

export const LIBELLES_SINGULIER: Record<Section, string> = {
  burnette: "BURN'ette",
  activ: "ACTIV'",
  pairaidante: "Pair-aidante",
};

// Toute pair-aidante est aussi une ACTIV' : on affiche le statut le plus avancé,
// sans jamais compter un profil dans deux sections.
export function sectionAffichee(profil: Profil): Section {
  if (profil.estPairAidante) return "pairaidante";
  if (profil.estActiv) return "activ";
  return "burnette";
}

const ORDRE: Section[] = ["burnette", "activ", "pairaidante"];

// Étape suivante dans la progression cumulative, ou null si déjà au dernier palier.
export function etapeSuivante(section: Section): Section | null {
  const index = ORDRE.indexOf(section);
  return index < ORDRE.length - 1 ? ORDRE[index + 1] : null;
}

export function regrouperParSection(profils: Profil[]): Record<Section, Profil[]> {
  const groupes: Record<Section, Profil[]> = { burnette: [], activ: [], pairaidante: [] };
  for (const profil of profils) {
    groupes[sectionAffichee(profil)].push(profil);
  }
  return groupes;
}

function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// Filtre par nom ou antenne, insensible à la casse et aux accents.
export function filtrerProfils(profils: Profil[], recherche: string): Profil[] {
  const terme = normaliser(recherche.trim());
  if (!terme) return profils;
  return profils.filter(
    (profil) => normaliser(profil.nom).includes(terme) || normaliser(profil.antenne).includes(terme),
  );
}

export const profilsExemple: Profil[] = [
  { id: "1", nom: "Sophie Lefebvre", antenne: "Talence", estActiv: false, estPairAidante: false },
  { id: "2", nom: "Marie Courtin", antenne: "Lille", estActiv: false, estPairAidante: false },
  { id: "3", nom: "Nathalie Breton", antenne: "Talence", estActiv: true, estPairAidante: false },
  { id: "4", nom: "Céline Rousseau", antenne: "Lille", estActiv: true, estPairAidante: false },
  { id: "5", nom: "Karima Mansouri", antenne: "Talence", estActiv: true, estPairAidante: true },
  { id: "6", nom: "Florence Genet", antenne: "Lille", estActiv: true, estPairAidante: true },
];
