// Routage de l'API, sans dépendance : une fonction testable sans démarrer de serveur
// (asynchrone, car les routes /profils interrogent Postgres).
// Le proxy d'entrée envoie /api/... à ce service sans retirer le préfixe : les routes métier
// se déclarent donc sous /api/v1/... ; /health et /sante restent à la racine (port 8081).
import { faireProgresser, listerProfils } from "./db.ts";

export type Reponse = { statut: number; corps?: unknown };

export async function router(methode: string, url: string): Promise<Reponse> {
  const chemin = new URL(url, "http://api").pathname;
  if (methode === "GET" && (chemin === "/health" || chemin === "/sante")) {
    return { statut: 200, corps: { status: "ok" } };
  }
  if (methode === "GET" && chemin === "/api/v1/profils") {
    return { statut: 200, corps: await listerProfils() };
  }
  const statutMatch = chemin.match(/^\/api\/v1\/profils\/([^/]+)\/statut$/);
  if (methode === "PATCH" && statutMatch) {
    const profil = await faireProgresser(statutMatch[1]);
    if (!profil) return { statut: 404 };
    return { statut: 200, corps: profil };
  }
  return { statut: 404 };
}
