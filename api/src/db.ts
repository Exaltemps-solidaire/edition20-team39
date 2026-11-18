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

export type EtatFormation = "termine" | "en-cours" | "a-faire";

export type Formation = {
  id: string;
  profilId: string;
  nom: string;
  icone: string;
  etat: EtatFormation;
  date: string | null;
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
  // Profils supplémentaires, jetables : pour avoir de la matière à tester (édition de
  // statut, suppression) sans toucher aux 6 profils "canoniques" de la démo ci-dessus.
  { id: "7", nom: "Chloé Dubreuil", antenne: "Agen", estActiv: false, estPairAidante: false },
  { id: "8", nom: "Manon Petit", antenne: "Mimizan", estActiv: false, estPairAidante: false },
  { id: "9", nom: "Inès Caron", antenne: "Agen", estActiv: false, estPairAidante: false },
];

// Formations d'exemple pour les 6 profils canoniques ci-dessus, pour que la fiche profil
// ne paraisse pas vide juste après le passage de ces données à l'API (ex-profilDetail.ts
// côté frontend, dates concrétisées en YYYY-MM-DD).
const formationsExemple: Record<
  string,
  { nom: string; icone: string; etat: EtatFormation; date: string | null }[]
> = {
  "1": [
    { nom: "Tronc commun vidéo", icone: "🎬", etat: "termine", date: "2026-09-10" },
    { nom: "Formation modération", icone: "🛡️", etat: "termine", date: "2026-09-18" },
    { nom: "Formation pair-aidance (2 × 3 h)", icone: "🤝", etat: "en-cours", date: null },
    { nom: "Supervision pair-aidance", icone: "🔬", etat: "a-faire", date: null },
  ],
  "2": [
    { nom: "Tronc commun vidéo", icone: "🎬", etat: "termine", date: "2026-09-12" },
    { nom: "Module 2 BBA", icone: "📘", etat: "en-cours", date: null },
    { nom: "Module 3 BBA", icone: "📘", etat: "a-faire", date: null },
  ],
  "3": [
    { nom: "Tronc commun vidéo", icone: "🎬", etat: "termine", date: "2026-10-20" },
    { nom: "Module 2 BBA", icone: "📘", etat: "en-cours", date: null },
    { nom: "Module 3 BBA", icone: "📘", etat: "a-faire", date: null },
  ],
  "4": [
    { nom: "Tronc commun vidéo", icone: "🎬", etat: "termine", date: "2026-06-28" },
    { nom: "Formation modération", icone: "🛡️", etat: "termine", date: "2026-07-10" },
    { nom: "Formation pair-aidance (2 × 3 h)", icone: "🤝", etat: "a-faire", date: null },
  ],
  "5": [
    { nom: "Tronc commun vidéo", icone: "🎬", etat: "termine", date: "2025-02-02" },
    { nom: "Formation modération", icone: "🛡️", etat: "termine", date: "2025-02-20" },
    { nom: "Formation pair-aidance (2 × 3 h)", icone: "🤝", etat: "termine", date: "2025-04-14" },
    { nom: "Supervision pair-aidance", icone: "🔬", etat: "termine", date: "2025-05-30" },
  ],
  "6": [
    { nom: "Tronc commun vidéo", icone: "🎬", etat: "termine", date: "2025-03-15" },
    { nom: "Formation modération", icone: "🛡️", etat: "termine", date: "2025-04-02" },
    { nom: "Formation pair-aidance (2 × 3 h)", icone: "🤝", etat: "termine", date: "2025-04-30" },
    { nom: "Supervision pair-aidance", icone: "🔬", etat: "en-cours", date: null },
  ],
};

// Valide une valeur reçue en entrée (corps JSON) : une des 3 étapes, ou rien d'autre.
export function estEtapeValide(valeur: unknown): valeur is Etape {
  return valeur === "burnette" || valeur === "activ" || valeur === "pairaidante";
}

export function estEtatFormationValide(valeur: unknown): valeur is EtatFormation {
  return valeur === "termine" || valeur === "en-cours" || valeur === "a-faire";
}

// Accepte une date "YYYY-MM-DD", ou son absence (null/undefined) : la date reste
// optionnelle quel que soit l'état de la formation.
export function estDateValide(valeur: unknown): valeur is string | null | undefined {
  return (
    valeur === null ||
    valeur === undefined ||
    (typeof valeur === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valeur))
  );
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

function versFormation(ligne: {
  id: string;
  profil_id: string;
  nom: string;
  icone: string;
  etat: EtatFormation;
  date: Date | string | null;
}): Formation {
  return {
    id: ligne.id,
    profilId: ligne.profil_id,
    nom: ligne.nom,
    icone: ligne.icone,
    etat: ligne.etat,
    // node-pg restitue le type `date` SQL comme un Date à minuit en heure locale (pas UTC) :
    // formater avec les accesseurs locaux, toISOString() décalerait d'un jour selon le fuseau.
    date:
      ligne.date === null
        ? null
        : ligne.date instanceof Date
          ? `${ligne.date.getFullYear()}-${String(ligne.date.getMonth() + 1).padStart(2, "0")}-${String(ligne.date.getDate()).padStart(2, "0")}`
          : ligne.date,
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
  await pool.query(`
    CREATE TABLE IF NOT EXISTS formations (
      id text PRIMARY KEY,
      profil_id text NOT NULL REFERENCES profils(id) ON DELETE CASCADE,
      nom text NOT NULL,
      icone text NOT NULL DEFAULT '🎓',
      etat text NOT NULL CHECK (etat IN ('termine', 'en-cours', 'a-faire')),
      date date NULL,
      creee_le timestamptz NOT NULL DEFAULT now()
    )
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_formations_profil_id ON formations (profil_id)
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
  const { rows: rowsFormations } = await pool.query<{ count: string }>(
    "SELECT count(*)::text FROM formations",
  );
  if (rowsFormations[0].count === "0") {
    for (const [profilId, formations] of Object.entries(formationsExemple)) {
      for (const formation of formations) {
        await pool.query(
          "INSERT INTO formations (id, profil_id, nom, icone, etat, date) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING",
          [randomUUID(), profilId, formation.nom, formation.icone, formation.etat, formation.date],
        );
      }
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

// Supprime un profil (l'historique associé part avec, via ON DELETE CASCADE).
// Retourne false si l'id est inconnu.
export async function supprimerProfil(id: string): Promise<boolean> {
  const { rowCount } = await pool.query("DELETE FROM profils WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}

export async function listerFormations(profilId: string): Promise<Formation[]> {
  const { rows } = await pool.query(
    "SELECT id, profil_id, nom, icone, etat, date FROM formations WHERE profil_id = $1 ORDER BY creee_le",
    [profilId],
  );
  return rows.map(versFormation);
}

type DonneesFormation = { nom: string; icone: string; etat: EtatFormation; date: string | null };

export async function creerFormation(
  profilId: string,
  donnees: DonneesFormation,
): Promise<Formation | undefined> {
  const { rows: rowsProfil } = await pool.query("SELECT id FROM profils WHERE id = $1", [profilId]);
  if (rowsProfil.length === 0) return undefined;

  const id = randomUUID();
  const { rows } = await pool.query(
    "INSERT INTO formations (id, profil_id, nom, icone, etat, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, profil_id, nom, icone, etat, date",
    [id, profilId, donnees.nom, donnees.icone, donnees.etat, donnees.date],
  );
  return versFormation(rows[0]);
}

export async function modifierFormation(
  profilId: string,
  formationId: string,
  donnees: DonneesFormation,
): Promise<Formation | undefined> {
  const { rows } = await pool.query(
    "UPDATE formations SET nom = $3, icone = $4, etat = $5, date = $6 WHERE id = $1 AND profil_id = $2 RETURNING id, profil_id, nom, icone, etat, date",
    [formationId, profilId, donnees.nom, donnees.icone, donnees.etat, donnees.date],
  );
  if (rows.length === 0) return undefined;
  return versFormation(rows[0]);
}

export async function supprimerFormation(profilId: string, formationId: string): Promise<boolean> {
  const { rows } = await pool.query(
    "DELETE FROM formations WHERE id = $1 AND profil_id = $2 RETURNING id",
    [formationId, profilId],
  );
  return rows.length === 1;
}
