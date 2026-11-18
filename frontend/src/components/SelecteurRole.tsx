"use client";

import { useSyncExternalStore } from "react";
import styles from "./SelecteurRole.module.css";

// Rôles du PRD (passation/cadrage/7-prd.md, « Les utilisateurs : pas de connexion ») :
// « la liste propose une personne par rôle du scénario (les personas qui agissent) ».
// Les deux acteurs du scénario sont la chargée de remobilisation et la directrice
// d'antenne (PRD, « Acteurs ») — la BURN'ette est une bénéficiaire du parcours,
// pas une actrice du back-office, elle n'a donc pas sa place dans cette liste.
export type Role = "chargee" | "directrice";

export const ROLE_PAR_DEFAUT: Role = "chargee";

export const ROLES: Role[] = ["chargee", "directrice"];

export const LIBELLES_ROLE: Record<Role, string> = {
  chargee: "Camille Martin — Chargée de remobilisation",
  directrice: "Julie Berger — Directrice d'antenne",
};

const CLE_STOCKAGE = "lburn-role";

// Valide une valeur lue du localStorage : absente, corrompue ou obsolète,
// elle retombe sur le rôle par défaut plutôt que de planter le rendu.
export function normaliserRole(valeur: string | null): Role {
  if (valeur !== null && (ROLES as string[]).includes(valeur)) {
    return valeur as Role;
  }
  return ROLE_PAR_DEFAUT;
}

// Abonnés notifiés après une écriture depuis cet onglet (le navigateur
// n'émet "storage" que pour les *autres* onglets, pas celui qui écrit).
const ecouteurs = new Set<() => void>();

function souscrire(rappel: () => void) {
  ecouteurs.add(rappel);
  window.addEventListener("storage", rappel);
  return () => {
    ecouteurs.delete(rappel);
    window.removeEventListener("storage", rappel);
  };
}

function lireRoleClient(): Role {
  return normaliserRole(window.localStorage.getItem(CLE_STOCKAGE));
}

function lireRoleServeur(): Role {
  return ROLE_PAR_DEFAUT;
}

function ecrireRole(role: Role) {
  window.localStorage.setItem(CLE_STOCKAGE, role);
  ecouteurs.forEach((rappel) => rappel());
}

export default function SelecteurRole() {
  // useSyncExternalStore : rendu par défaut au serveur et au premier rendu
  // client (hydratation sans écart), puis bascule sur la valeur réelle du
  // localStorage juste après — sans passer par un effet qui appelle setState.
  const role = useSyncExternalStore(souscrire, lireRoleClient, lireRoleServeur);

  return (
    <div className={styles.selecteur}>
      <label className={styles.label} htmlFor="lburn-role-select">
        Qui êtes-vous ?
      </label>
      <select
        id="lburn-role-select"
        className={styles.select}
        value={role}
        onChange={(evenement) => ecrireRole(evenement.target.value as Role)}
      >
        {ROLES.map((valeur) => (
          <option key={valeur} value={valeur}>
            {LIBELLES_ROLE[valeur]}
          </option>
        ))}
      </select>
    </div>
  );
}
