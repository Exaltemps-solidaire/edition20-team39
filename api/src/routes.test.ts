import { describe, expect, it } from "vitest";
import { booleensVersEtape, estEtapeValide, etapeVersBooleens } from "./db.ts";
import { router } from "./routes.ts";

describe("router", () => {
  it("répond 200 sur les deux routes de santé", async () => {
    expect((await router("GET", "/health")).statut).toBe(200);
    expect((await router("GET", "/sante?x=1")).statut).toBe(200);
  });

  it("répond 404 sur une route inconnue ou une méthode non prévue", async () => {
    expect((await router("GET", "/api/v1/inconnue")).statut).toBe(404);
    expect((await router("POST", "/health")).statut).toBe(404);
  });

  it("répond 400 si le corps du PATCH statut n'a pas une étape valide", async () => {
    expect((await router("PATCH", "/api/v1/profils/1/statut", { etape: "autre-chose" })).statut).toBe(
      400,
    );
    expect((await router("PATCH", "/api/v1/profils/1/statut", {})).statut).toBe(400);
  });

  it("répond 400 si le corps du POST profils n'a pas nom et antenne", async () => {
    expect((await router("POST", "/api/v1/profils", { nom: "Test" })).statut).toBe(400);
    expect((await router("POST", "/api/v1/profils", { nom: "  ", antenne: "Lille" })).statut).toBe(400);
  });
});

describe("estEtapeValide", () => {
  it("accepte les 3 étapes connues", () => {
    expect(estEtapeValide("burnette")).toBe(true);
    expect(estEtapeValide("activ")).toBe(true);
    expect(estEtapeValide("pairaidante")).toBe(true);
  });

  it("refuse toute autre valeur", () => {
    expect(estEtapeValide("autre")).toBe(false);
    expect(estEtapeValide(undefined)).toBe(false);
    expect(estEtapeValide(42)).toBe(false);
  });
});

describe("etapeVersBooleens / booleensVersEtape", () => {
  it("convertit chaque étape vers ses booléens, et inversement", () => {
    expect(etapeVersBooleens("burnette")).toEqual({ estActiv: false, estPairAidante: false });
    expect(etapeVersBooleens("activ")).toEqual({ estActiv: true, estPairAidante: false });
    expect(etapeVersBooleens("pairaidante")).toEqual({ estActiv: true, estPairAidante: true });

    expect(booleensVersEtape(false, false)).toBe("burnette");
    expect(booleensVersEtape(true, false)).toBe("activ");
    expect(booleensVersEtape(true, true)).toBe("pairaidante");
  });
});
