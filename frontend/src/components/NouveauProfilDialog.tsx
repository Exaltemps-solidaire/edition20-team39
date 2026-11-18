"use client";

import { forwardRef, useImperativeHandle, useRef, useState, type FormEvent } from "react";
import styles from "./NouveauProfilDialog.module.css";
import type { Profil } from "../lib/profils";

export type NouveauProfilDialogHandle = {
  ouvrir: () => void;
};

type Props = {
  onCree: (profil: Profil) => void;
};

// Un profil n'est soumissible que si nom et antenne sont renseignés (hors espaces).
// Extrait pour être testable sans monter le composant.
export function formulaireValide(nom: string, antenne: string): boolean {
  return nom.trim() !== "" && antenne.trim() !== "";
}

const NouveauProfilDialog = forwardRef<NouveauProfilDialogHandle, Props>(function NouveauProfilDialog(
  { onCree },
  ref,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [nom, setNom] = useState("");
  const [antenne, setAntenne] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    ouvrir() {
      setNom("");
      setAntenne("");
      setErreur(null);
      dialogRef.current?.showModal();
    },
  }));

  function fermer() {
    dialogRef.current?.close();
  }

  async function soumettre(evenement: FormEvent) {
    evenement.preventDefault();
    if (!formulaireValide(nom, antenne)) return;
    setEnvoi(true);
    setErreur(null);
    try {
      const reponse = await fetch("/api/v1/profils", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nom.trim(), antenne: antenne.trim() }),
      });
      if (!reponse.ok) {
        const donnees = await reponse.json().catch(() => null);
        throw new Error(donnees?.error || "Impossible de créer le profil.");
      }
      const profil: Profil = await reponse.json();
      onCree(profil);
      fermer();
    } catch (erreurRequete) {
      setErreur(
        erreurRequete instanceof Error ? erreurRequete.message : "Impossible de créer le profil.",
      );
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <form className={styles.formulaire} onSubmit={soumettre}>
        <h2 className={styles.titre}>Nouveau profil</h2>
        <label className={styles.champ}>
          Nom
          <input
            type="text"
            value={nom}
            onChange={(evenement) => setNom(evenement.target.value)}
            placeholder="Prénom Nom"
          />
        </label>
        <label className={styles.champ}>
          Antenne
          <input
            type="text"
            value={antenne}
            onChange={(evenement) => setAntenne(evenement.target.value)}
            placeholder="Talence, Lille…"
          />
        </label>
        {erreur && <p className={styles.erreur}>{erreur}</p>}
        <div className={styles.actions}>
          <button type="button" className={styles.annuler} onClick={fermer}>
            Annuler
          </button>
          <button type="submit" className={styles.valider} disabled={!formulaireValide(nom, antenne) || envoi}>
            {envoi ? "Création…" : "Créer"}
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default NouveauProfilDialog;
