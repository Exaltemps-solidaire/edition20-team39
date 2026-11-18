import { describe, expect, it } from "vitest";
import { filtrerProfils, regrouperParSection, sectionAffichee, type Profil } from "./profils";

const profil = (partiel: Partial<Profil>): Profil => ({
  id: "x",
  nom: "Test",
  antenne: "Talence",
  estActiv: false,
  estPairAidante: false,
  ...partiel,
});

describe("sectionAffichee", () => {
  it("classe une BURN'ette sans engagement ACTIV' dans la section BURN'ette", () => {
    expect(sectionAffichee(profil({}))).toBe("burnette");
  });

  it("classe une pair-aidante (donc aussi ACTIV') dans la section Pair-aidante, pas ACTIV'", () => {
    expect(sectionAffichee(profil({ estActiv: true, estPairAidante: true }))).toBe("pairaidante");
  });
});

describe("regrouperParSection", () => {
  it("ne compte jamais un profil dans deux sections", () => {
    const groupes = regrouperParSection([
      profil({ id: "1" }),
      profil({ id: "2", estActiv: true, estPairAidante: true }),
    ]);
    expect(groupes.burnette).toHaveLength(1);
    expect(groupes.activ).toHaveLength(0);
    expect(groupes.pairaidante).toHaveLength(1);
  });
});

describe("filtrerProfils", () => {
  const profils = [
    profil({ id: "1", nom: "Céline Rousseau", antenne: "Lille" }),
    profil({ id: "2", nom: "Sophie Lefebvre", antenne: "Talence" }),
  ];

  it("retourne tous les profils quand la recherche est vide", () => {
    expect(filtrerProfils(profils, "")).toHaveLength(2);
  });

  it("filtre par nom, insensible à la casse et aux accents", () => {
    expect(filtrerProfils(profils, "celine")).toEqual([profils[0]]);
  });

  it("filtre par antenne et renvoie une liste vide sans résultat", () => {
    expect(filtrerProfils(profils, "talence")).toEqual([profils[1]]);
    expect(filtrerProfils(profils, "agen")).toHaveLength(0);
  });
});
