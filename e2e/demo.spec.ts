import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois le dashboard des BURN'ettes, ACTIV' et Pair-aidantes", async () => {
    await expect(page.getByText("BURN'ettes", { exact: false })).toBeVisible();
    await expect(page.getByText("ACTIV'", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Pair-aidantes", { exact: false })).toBeVisible();
  });
});
