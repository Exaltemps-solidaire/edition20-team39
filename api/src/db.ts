// Persistance Postgres des profils. Connexion configurée par variables d'environnement,
// avec des valeurs par défaut pour le développement local (hors conteneur).
import pg from "pg";

const { Pool } = pg;

export type Profil = {
  id: string;
  nom: string;
  antenne: string;
  estActiv: boolean;
  estPairAidante: boolean;
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

// Fait passer un profil au statut suivant (ensembles imbriqués, voir frontend/src/lib/profils.ts) :
// BURN'ette -> ACTIV' -> Pair-aidante -> idempotent. Logique pure, testable sans connexion réseau.
export function prochainStatut(profil: {
  estActiv: boolean;
  estPairAidante: boolean;
}): { estActiv: boolean; estPairAidante: boolean } {
  if (!profil.estActiv) return { estActiv: true, estPairAidante: false };
  if (!profil.estPairAidante) return { estActiv: true, estPairAidante: true };
  return { estActiv: true, estPairAidante: true };
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

export async function faireProgresser(id: string): Promise<Profil | undefined> {
  const { rows } = await pool.query(
    "SELECT id, nom, antenne, est_activ, est_pair_aidante FROM profils WHERE id = $1",
    [id],
  );
  if (rows.length === 0) return undefined;
  const actuel = versProfil(rows[0]);
  const suivant = prochainStatut(actuel);
  const { rows: misAJour } = await pool.query(
    "UPDATE profils SET est_activ = $2, est_pair_aidante = $3 WHERE id = $1 RETURNING id, nom, antenne, est_activ, est_pair_aidante",
    [id, suivant.estActiv, suivant.estPairAidante],
  );
  return versProfil(misAJour[0]);
}
