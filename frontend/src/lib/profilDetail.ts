// Données d'exemple pour l'écran 2 (fiche profil), lecture seule.
// Fichier volontairement indépendant de ./profils.ts (pas d'import, pas d'export partagé) :
// cet écran n'a pas vocation à retrouver les mêmes profils que le dashboard aujourd'hui,
// pour ne provoquer aucun conflit avec le travail en cours sur profils.ts.

export type EtapeStatut = "burnette" | "activ" | "pairaidante";

export type EtapeProgression = {
  cle: EtapeStatut;
  icone: string;
  libelle: string;
  etat: "fait" | "actuelle" | "a-venir";
};

export type EtatSuivi = "termine" | "en-cours" | "a-faire";

export type ItemSuivi = {
  nom: string;
  icone: string;
  date: string;
  etat: EtatSuivi;
};

export type Disponibilite = {
  libelle: string;
  disponible: boolean;
};

export type ProfilDetail = {
  id: string;
  nom: string;
  antenne: string;
  depuis: string;
  etapeActuelle: EtapeStatut;
  progression: EtapeProgression[];
  formations: ItemSuivi[];
  ateliers: ItemSuivi[];
  disponibilites: Disponibilite[];
};

function construireProgression(etapeActuelle: EtapeStatut): EtapeProgression[] {
  const etapes: { cle: EtapeStatut; icone: string; libelle: string }[] = [
    { cle: "burnette", icone: "🔥", libelle: "BURN'ette" },
    { cle: "activ", icone: "⚡", libelle: "ACTIV'" },
    { cle: "pairaidante", icone: "🤝", libelle: "Pair-aidante" },
  ];
  const ordre: EtapeStatut[] = ["burnette", "activ", "pairaidante"];
  const indexActuel = ordre.indexOf(etapeActuelle);
  return etapes.map((etape, index) => ({
    ...etape,
    etat: index < indexActuel ? "fait" : index === indexActuel ? "actuelle" : "a-venir",
  }));
}

export const profilsDetailExemple: ProfilDetail[] = [
  {
    id: "1",
    nom: "Sophie Lefebvre",
    antenne: "Talence",
    depuis: "BURN'ette × ACTIV' · membre depuis le 03/09/2026",
    etapeActuelle: "activ",
    progression: construireProgression("activ"),
    formations: [
      { nom: "Tronc commun vidéo", icone: "🎬", date: "Complété le 10/09/2026", etat: "termine" },
      { nom: "Formation modération", icone: "🛡️", date: "Complété le 18/09/2026", etat: "termine" },
      {
        nom: "Formation pair-aidance (2 × 3 h)",
        icone: "🤝",
        date: "En cours — session 1 faite",
        etat: "en-cours",
      },
      { nom: "Supervision pair-aidance", icone: "🔬", date: "Pas encore commencé", etat: "a-faire" },
    ],
    ateliers: [
      { nom: "Atelier BURN'ette animé", icone: "🗣️", date: "12/10/2026 · Talence", etat: "termine" },
      {
        nom: "Article de blog — Témoignage",
        icone: "✍️",
        date: "05/10/2026 · Mission ponctuelle",
        etat: "termine",
      },
      {
        nom: "Atelier BURN'ette — Gestion du temps",
        icone: "🗣️",
        date: "08/11/2026 · Talence · En attente de validation",
        etat: "a-faire",
      },
    ],
    disponibilites: [
      { libelle: "Lun. matin", disponible: true },
      { libelle: "Mer. après-midi", disponible: true },
      { libelle: "Sam. matin", disponible: true },
      { libelle: "Ven. soir", disponible: false },
    ],
  },
  {
    id: "3",
    nom: "Nathalie Breton",
    antenne: "Talence",
    depuis: "BURN'ette · membre depuis le 15/10/2026",
    etapeActuelle: "burnette",
    progression: construireProgression("burnette"),
    formations: [
      { nom: "Tronc commun vidéo", icone: "🎬", date: "Complété le 20/10/2026", etat: "termine" },
      { nom: "Module 2 BBA", icone: "📘", date: "En cours — 1 séance faite", etat: "en-cours" },
      { nom: "Module 3 BBA", icone: "📘", date: "Pas encore commencé", etat: "a-faire" },
    ],
    ateliers: [
      {
        nom: "Atelier BURN'ette — Découverte",
        icone: "🗣️",
        date: "22/11/2026 · Talence · En attente de validation",
        etat: "a-faire",
      },
    ],
    disponibilites: [
      { libelle: "Mar. soir", disponible: true },
      { libelle: "Jeu. matin", disponible: true },
      { libelle: "Dim. après-midi", disponible: false },
    ],
  },
  {
    id: "5",
    nom: "Karima Mansouri",
    antenne: "Talence",
    depuis: "BURN'ette × ACTIV' × Pair-aidante · membre depuis le 12/01/2025",
    etapeActuelle: "pairaidante",
    progression: construireProgression("pairaidante"),
    formations: [
      { nom: "Tronc commun vidéo", icone: "🎬", date: "Complété le 02/02/2025", etat: "termine" },
      { nom: "Formation modération", icone: "🛡️", date: "Complété le 20/02/2025", etat: "termine" },
      {
        nom: "Formation pair-aidance (2 × 3 h)",
        icone: "🤝",
        date: "Complété le 14/04/2025",
        etat: "termine",
      },
      { nom: "Supervision pair-aidance", icone: "🔬", date: "Complété le 30/05/2025", etat: "termine" },
    ],
    ateliers: [
      { nom: "Atelier BURN'ette animé", icone: "🗣️", date: "Depuis 2025 · Talence", etat: "termine" },
      { nom: "Permanence d'écoute", icone: "☎️", date: "Habilitation active", etat: "termine" },
      {
        nom: "Prochaine permanence",
        icone: "☎️",
        date: "25/11/2026 · Talence",
        etat: "a-faire",
      },
    ],
    disponibilites: [
      { libelle: "Lun. matin", disponible: true },
      { libelle: "Mer. soir", disponible: true },
      { libelle: "Sam. matin", disponible: true },
      { libelle: "Ven. après-midi", disponible: true },
    ],
  },
];

export function trouverProfilDetail(id: string): ProfilDetail | undefined {
  return profilsDetailExemple.find((profil) => profil.id === id);
}
