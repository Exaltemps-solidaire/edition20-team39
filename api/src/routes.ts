// Routage de l'API, sans dépendance : une fonction testable sans démarrer de serveur
// (asynchrone, car les routes /profils interrogent Postgres).
// Le proxy d'entrée envoie /api/... à ce service sans retirer le préfixe : les routes métier
// se déclarent donc sous /api/v1/... ; /health et /sante restent à la racine (port 8081).
import {
  creerFormation,
  creerProfil,
  definirStatut,
  estDateValide,
  estEtapeValide,
  estEtatFormationValide,
  listerFormations,
  listerProfils,
  modifierFormation,
  obtenirHistorique,
  supprimerFormation,
  supprimerProfil,
  type EtatFormation,
} from "./db.ts";

export type Reponse = { statut: number; corps?: unknown };

const NOM_LONGUEUR_MAX = 200;

// Validation commune à POST et PATCH sur une formation : nom non vide (borne de
// confort, pas de règle métier fournie pour sa longueur), état connu, date
// optionnelle au format YYYY-MM-DD, icône par défaut si absente.
function validerCorpsFormation(
  corps: unknown,
): { nom: string; icone: string; etat: EtatFormation; date: string | null } | undefined {
  const objet = corps as { nom?: unknown; icone?: unknown; etat?: unknown; date?: unknown } | undefined;
  const nom = typeof objet?.nom === "string" ? objet.nom.trim() : "";
  if (!nom || nom.length > NOM_LONGUEUR_MAX) return undefined;
  if (!estEtatFormationValide(objet?.etat)) return undefined;
  if (!estDateValide(objet?.date)) return undefined;
  const icone = typeof objet?.icone === "string" && objet.icone.trim() !== "" ? objet.icone.trim() : "🎓";
  return { nom, icone, etat: objet!.etat as EtatFormation, date: (objet?.date as string | null) ?? null };
}

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

  const formationsMatch = chemin.match(/^\/api\/v1\/profils\/([^/]+)\/formations$/);
  if (methode === "GET" && formationsMatch) {
    return { statut: 200, corps: await listerFormations(formationsMatch[1]) };
  }
  if (methode === "POST" && formationsMatch) {
    const donnees = validerCorpsFormation(corps);
    if (!donnees) {
      return { statut: 400, corps: { error: "nom, etat et date (optionnelle) sont requis et valides" } };
    }
    const formation = await creerFormation(formationsMatch[1], donnees);
    if (!formation) return { statut: 404 };
    return { statut: 201, corps: formation };
  }

  const formationMatch = chemin.match(/^\/api\/v1\/profils\/([^/]+)\/formations\/([^/]+)$/);
  if (methode === "PATCH" && formationMatch) {
    const donnees = validerCorpsFormation(corps);
    if (!donnees) {
      return { statut: 400, corps: { error: "nom, etat et date (optionnelle) sont requis et valides" } };
    }
    const formation = await modifierFormation(formationMatch[1], formationMatch[2], donnees);
    if (!formation) return { statut: 404 };
    return { statut: 200, corps: formation };
  }
  if (methode === "DELETE" && formationMatch) {
    const supprimee = await supprimerFormation(formationMatch[1], formationMatch[2]);
    return supprimee ? { statut: 204 } : { statut: 404 };
  }

  const profilMatch = chemin.match(/^\/api\/v1\/profils\/([^/]+)$/);
  if (methode === "DELETE" && profilMatch) {
    const supprime = await supprimerProfil(profilMatch[1]);
    return { statut: supprime ? 204 : 404 };
  }

  return { statut: 404 };
}
