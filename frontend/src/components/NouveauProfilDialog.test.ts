import { describe, expect, it } from "vitest";
import { formulaireValide } from "./NouveauProfilDialog";

describe("formulaireValide", () => {
  it("refuse quand un champ est vide", () => {
    expect(formulaireValide("", "Talence")).toBe(false);
    expect(formulaireValide("Sophie Lefebvre", "")).toBe(false);
    expect(formulaireValide("", "")).toBe(false);
  });

  it("refuse quand un champ ne contient que des espaces", () => {
    expect(formulaireValide("   ", "Talence")).toBe(false);
    expect(formulaireValide("Sophie Lefebvre", "   ")).toBe(false);
  });

  it("accepte quand les deux champs sont renseignés", () => {
    expect(formulaireValide("Sophie Lefebvre", "Talence")).toBe(true);
  });
});
