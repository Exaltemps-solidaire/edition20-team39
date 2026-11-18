// Persistance Postgres des profils. Connexion configurée par variables d'environnement,
// avec des valeurs par défaut pour le développement local (hors conteneur).
import { randomUUID } from "node:crypto";
import pg from "pg";

const { Pool } = pg;

export type Etape = "burnette" | "activ" | "pairaidante";

export type Profil = {
  id: string;
  nom: string;
  antenne: string;
  estActiv: boolean;
  estPairAidante: boolean;
};

export type EntreeHistorique = {
  ancienStatut: Etape;
  nouveauStatut: Etape;
  date: string;
};

export const pool = new Pool({
  host: process.env.DB_HOST ?? "localhost",
  database: process.env.DB_NAME ?? "team39",
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "postgres-dev-password",
});

const profilsExemple: Profil[] = [
  { id: "1", nom: "Sophie Lefebvre", antenne: "Talence", estActiv: false, estPairAidante: false },
  { id: "2", nom: "Marie Courtin", antenne: "Lille", estActiv: false, estPairAidante: false },
  { id: "3", nom: "Nathalie Breton", antenne: "Talence", estActiv: true, estPairAidante: false },
  { id: "4", nom: "Céline Rousseau", antenne: "Lille", estActiv: true, estPairAidante: false },
  { id: "5", nom: "Karima Mansouri", antenne: "Talence", estActiv: true, estPairAidante: true },
  { id: "6", nom: "Florence Genet", antenne: "Lille", estActiv: true, estPairAidante: true },
];

// Valide une valeur reçue en entrée (corps JSON) : une des 3 étapes, ou rien d'autre.
export function estEtapeValide(valeur: unknown): valeur is Etape {
  return valeur === "burnette" || valeur === "activ" || valeur === "pairaidante";
}

// Modèle imbriqué (cf. frontend/src/lib/profils.ts) : une étape détermine les deux
// booléens sans ambiguïté, dans les deux sens. Logique pure, testable sans réseau.
export function etapeVersBooleens(etape: Etape): { estActiv: boolean; estPairAidante: boolean } {
  switch (etape) {
    case "burnette":
      return { estActiv: false, estPairAidante: false };
    case "activ":
      return { estActiv: true, estPairAidante: false };
    case "pairaidante":
      return { estActiv: true, estPairAidante: true };
  }
}

export function booleensVersEtape(estActiv: boolean, estPairAidante: boolean): Etape {
  if (estPairAidante) return "pairaidante";
  if (estActiv) return "activ";
  return "burnette";
}

function versProfil(ligne: {
  id: string;
  nom: string;
  antenne: string;
  est_activ: boolean;
  est_pair_aidante: boolean;
}): Profil {
  return {
    id: ligne.id,
    nom: ligne.nom,
    antenne: ligne.antenne,
    estActiv: ligne.est_activ,
    estPairAidante: ligne.est_pair_aidante,
  };
}

export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS profils (
      id text PRIMARY KEY,
      nom text NOT NULL,
      antenne text NOT NULL,
      est_activ boolean NOT NULL DEFAULT false,
      est_pair_aidante boolean NOT NULL DEFAULT false
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS historique_statut (
      id serial PRIMARY KEY,
      profil_id text NOT NULL REFERENCES profils(id) ON DELETE CASCADE,
      ancien_statut text NOT NULL,
      nouveau_statut text NOT NULL,
      date timestamptz NOT NULL DEFAULT now()
    )
  `);
  const { rows } = await pool.query<{ count: string }>("SELECT count(*)::text FROM profils");
  if (rows[0].count === "0") {
    for (const profil of profilsExemple) {
      await pool.query(
        "INSERT INTO profils (id, nom, antenne, est_activ, est_pair_aidante) VALUES ($1, $2, $3, $4, $5)",
        [profil.id, profil.nom, profil.antenne, profil.estActiv, profil.estPairAidante],
      );
    }
  }
}

export async function listerProfils(): Promise<Profil[]> {
  const { rows } = await pool.query(
    "SELECT id, nom, antenne, est_activ, est_pair_aidante FROM profils ORDER BY id",
  );
  return rows.map(versProfil);
}

// Fixe le statut à l'étape donnée, dans n'importe quel sens (avance ou recul),
// et trace le changement dans historique_statut. Retourne undefined si l'id est inconnu.
export async function definirStatut(id: string, etapeCible: Etape): Promise<Profil | undefined> {
  const { rows } = await pool.query(
    "SELECT id, nom, antenne, est_activ, est_pair_aidante FROM profils WHERE id = $1",
    [id],
  );
  if (rows.length === 0) return undefined;
  const actuel = versProfil(rows[0]);
  const etapeActuelle = booleensVersEtape(actuel.estActiv, actuel.estPairAidante);
  const { estActiv, estPairAidante } = etapeVersBooleens(etapeCible);

  const { rows: misAJour } = await pool.query(
    "UPDATE profils SET est_activ = $2, est_pair_aidante = $3 WHERE id = $1 RETURNING id, nom, antenne, est_activ, est_pair_aidante",
    [id, estActiv, estPairAidante],
  );

  if (etapeActuelle !== etapeCible) {
    await pool.query(
      "INSERT INTO historique_statut (profil_id, ancien_statut, nouveau_statut) VALUES ($1, $2, $3)",
      [id, etapeActuelle, etapeCible],
    );
  }

  return versProfil(misAJour[0]);
}

export async function obtenirHistorique(id: string): Promise<EntreeHistorique[]> {
  const { rows } = await pool.query<{ ancien_statut: Etape; nouveau_statut: Etape; date: Date }>(
    "SELECT ancien_statut, nouveau_statut, date FROM historique_statut WHERE profil_id = $1 ORDER BY date DESC",
    [id],
  );
  return rows.map((ligne) => ({
    ancienStatut: ligne.ancien_statut,
    nouveauStatut: ligne.nouveau_statut,
    date: ligne.date.toISOString(),
  }));
}

export async function creerProfil(nom: string, antenne: string): Promise<Profil> {
  const id = randomUUID();
  const { rows } = await pool.query(
    "INSERT INTO profils (id, nom, antenne, est_activ, est_pair_aidante) VALUES ($1, $2, $3, false, false) RETURNING id, nom, antenne, est_activ, est_pair_aidante",
    [id, nom, antenne],
  );
  return versProfil(rows[0]);
}
