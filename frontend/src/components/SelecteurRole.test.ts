import { describe, expect, it } from "vitest";
import { normaliserRole, ROLE_PAR_DEFAUT } from "./SelecteurRole";

describe("normaliserRole", () => {
  it("retourne le rôle par défaut quand rien n'est stocké", () => {
    expect(normaliserRole(null)).toBe(ROLE_PAR_DEFAUT);
  });

  it("retourne le rôle par défaut pour une valeur inconnue ou corrompue", () => {
    expect(normaliserRole("autre-chose")).toBe(ROLE_PAR_DEFAUT);
  });

  it("conserve une valeur valide lue du localStorage", () => {
    expect(normaliserRole("directrice")).toBe("directrice");
    expect(normaliserRole("chargee")).toBe("chargee");
  });
});
