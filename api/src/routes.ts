// Routage de l'API, sans dépendance : une fonction testable sans démarrer de serveur
// (asynchrone, car les routes /profils interrogent Postgres).
// Le proxy d'entrée envoie /api/... à ce service sans retirer le préfixe : les routes métier
// se déclarent donc sous /api/v1/... ; /health et /sante restent à la racine (port 8081).
import {
  creerProfil,
  definirStatut,
  estEtapeValide,
  listerProfils,
  obtenirHistorique,
} from "./db.ts";

export type Reponse = { statut: number; corps?: unknown };

export async function router(methode: string, url: string, corps?: unknown): Promise<Reponse> {
  const chemin = new URL(url, "http://api").pathname;

  if (methode === "GET" && (chemin === "/health" || chemin === "/sante")) {
    return { statut: 200, corps: { status: "ok" } };
  }

  if (methode === "GET" && chemin === "/api/v1/profils") {
    return { statut: 200, corps: await listerProfils() };
  }

  if (methode === "POST" && chemin === "/api/v1/profils") {
    const nom = typeof (corps as { nom?: unknown })?.nom === "string" ? (corps as { nom: string }).nom.trim() : "";
    const antenne =
      typeof (corps as { antenne?: unknown })?.antenne === "string"
        ? (corps as { antenne: string }).antenne.trim()
        : "";
    if (!nom || !antenne) {
      return { statut: 400, corps: { error: "nom et antenne sont obligatoires" } };
    }
    return { statut: 201, corps: await creerProfil(nom, antenne) };
  }

  const statutMatch = chemin.match(/^\/api\/v1\/profils\/([^/]+)\/statut$/);
  if (methode === "PATCH" && statutMatch) {
    const etape = (corps as { etape?: unknown })?.etape;
    if (!estEtapeValide(etape)) {
      return { statut: 400, corps: { error: "etape doit être burnette, activ ou pairaidante" } };
    }
    const profil = await definirStatut(statutMatch[1], etape);
    if (!profil) return { statut: 404 };
    return { statut: 200, corps: profil };
  }

  const historiqueMatch = chemin.match(/^\/api\/v1\/profils\/([^/]+)\/historique$/);
  if (methode === "GET" && historiqueMatch) {
    return { statut: 200, corps: await obtenirHistorique(historiqueMatch[1]) };
  }

  return { statut: 404 };
}
