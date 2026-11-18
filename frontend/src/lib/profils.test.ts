import { describe, expect, it } from "vitest";
import { regrouperParSection, sectionAffichee, type Profil } from "./profils";

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
