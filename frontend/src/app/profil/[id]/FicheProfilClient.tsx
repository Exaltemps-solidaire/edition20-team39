"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { LIBELLES_SINGULIER, sectionAffichee, type Profil, type Section } from "../../../lib/profils";
import {
  construireProgression,
  trouverProfilDetail,
  type EtapeProgression,
  type ItemSuivi,
} from "../../../lib/profilDetail";

type EntreeHistorique = {
  ancienStatut: Section;
  nouveauStatut: Section;
  date: string;
};

function initiales(nom: string): string {
  return nom
    .split(" ")
    .map((mot) => mot[0])
    .join("")
    .toUpperCase();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EtapeProgressionCarte({
  etape,
  onChoisir,
}: {
  etape: EtapeProgression;
  onChoisir: (cle: Section) => void;
}) {
  const classeEtat = etape.etat === "fait" ? styles.fait : etape.etat === "actuelle" ? styles.actuelle : "";
  return (
    <button
      type="button"
      className={`${styles.statutStep} ${classeEtat}`}
      disabled={etape.etat === "actuelle"}
      onClick={() => onChoisir(etape.cle)}
    >
      <div className={styles.stepIcon}>{etape.icone}</div>
      <span className={styles.stepLabel}>{etape.libelle}</span>
    </button>
  );
}

function ItemSuiviLigne({ item }: { item: ItemSuivi }) {
  const enCours = item.etat === "en-cours";
  return (
    <div className={`${styles.formationItem} ${enCours ? styles.enCours : ""}`}>
      <span className={styles.formationItemIcon}>{item.icone}</span>
      <div className={styles.formationItemInfo}>
        <div className={styles.formationItemName}>{item.nom}</div>
        <div className={`${styles.formationItemDate} ${enCours ? styles.dateRouge : ""}`}>{item.date}</div>
      </div>
      {item.etat === "termine" ? (
        <span className={styles.formationItemCheck}>✓</span>
      ) : (
        <span className={styles.formationItemPending}>○</span>
      )}
    </div>
  );
}

function GroupeSuivi({
  titre,
  icone,
  items,
}: {
  titre: string;
  icone: string;
  items: ItemSuivi[];
}) {
  if (items.length === 0) return null;
  return (
    <>
      <p className={styles.formationGroupLabel}>
        {icone} {titre}
      </p>
      {items.map((item) => (
        <ItemSuiviLigne item={item} key={item.nom} />
      ))}
    </>
  );
}

function SectionSuivi({ titre, items }: { titre: string; items: ItemSuivi[] }) {
  const termines = items.filter((item) => item.etat === "termine");
  const enCours = items.filter((item) => item.etat === "en-cours");
  const aFaire = items.filter((item) => item.etat === "a-faire");
  return (
    <div className={styles.formationsSection}>
      <div className={styles.formationsHeader}>
        <span className={styles.formationsTitle}>{titre}</span>
      </div>
      <GroupeSuivi titre="Terminées" icone="✅" items={termines} />
      <GroupeSuivi titre="En cours" icone="⏳" items={enCours} />
      <GroupeSuivi titre="À faire" icone="📋" items={aFaire} />
    </div>
  );
}

function Topbar() {
  return (
    <div className={styles.topbar}>
      <Link className={styles.topbarBack} href="/">
        ←
      </Link>
      <span className={styles.topbarLogo}>
        L&apos;<span>BURN</span>
      </span>
      <span className={styles.topbarTitle}>Fiche profil</span>
    </div>
  );
}

export default function FicheProfilClient({ id }: { id: string }) {
  const [profil, setProfil] = useState<Profil | null>(null);
  const [historique, setHistorique] = useState<EntreeHistorique[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(false);
  const [version, setVersion] = useState(0);
  const [enCoursValidation, setEnCoursValidation] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [cibleChangement, setCibleChangement] = useState<Section | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let ignore = false;
    async function charger() {
      try {
        const [reponseProfils, reponseHistorique] = await Promise.all([
          fetch("/api/v1/profils"),
          fetch(`/api/v1/profils/${id}/historique`),
        ]);
        if (!reponseProfils.ok) throw new Error("Réponse API non ok");
        const profils: Profil[] = await reponseProfils.json();
        const trouve = profils.find((candidat) => candidat.id === id) ?? null;
        const histo: EntreeHistorique[] = reponseHistorique.ok ? await reponseHistorique.json() : [];
        if (ignore) return;
        setProfil(trouve);
        setHistorique(histo);
        setErreur(false);
      } catch {
        if (!ignore) setErreur(true);
      } finally {
        if (!ignore) setChargement(false);
      }
    }
    charger();
    return () => {
      ignore = true;
    };
  }, [id, version]);

  function demanderConfirmation(cle: Section) {
    setCibleChangement(cle);
    dialogRef.current?.showModal();
  }

  function annulerConfirmation() {
    dialogRef.current?.close();
    setCibleChangement(null);
  }

  async function validerChangement() {
    if (!cibleChangement) return;
    const cible = cibleChangement;
    dialogRef.current?.close();
    setEnCoursValidation(true);
    try {
      await fetch(`/api/v1/profils/${id}/statut`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etape: cible }),
      });
      setVersion((valeurPrecedente) => valeurPrecedente + 1);
      setConfirmation(true);
      setTimeout(() => setConfirmation(false), 2800);
    } finally {
      setEnCoursValidation(false);
      setCibleChangement(null);
    }
  }

  if (chargement) {
    return (
      <div className={styles.phoneShell}>
        <Topbar />
        <p className={styles.introuvable}>Chargement du profil…</p>
      </div>
    );
  }

  if (erreur || !profil) {
    return (
      <div className={styles.phoneShell}>
        <Topbar />
        <p className={styles.introuvable}>
          {erreur
            ? "Impossible de charger ce profil depuis l'API."
            : "Ce profil n'existe pas dans les données."}
        </p>
      </div>
    );
  }

  const etapeActuelle = sectionAffichee(profil);
  const progression = construireProgression(etapeActuelle);
  const detail = trouverProfilDetail(id);
  const depuis = detail?.depuis ?? `Membre de l'antenne ${profil.antenne}`;

  const indexActuelle = progression.findIndex((etape) => etape.cle === etapeActuelle);
  const indexCible = cibleChangement ? progression.findIndex((etape) => etape.cle === cibleChangement) : -1;
  const estRecul = indexCible !== -1 && indexCible < indexActuelle;

  return (
    <div className={styles.phoneShell}>
      <Topbar />

      <div className={styles.profilHero}>
        <div className={`${styles.profilAvatarLg} ${styles[etapeActuelle]}`}>{initiales(profil.nom)}</div>
        <div>
          <div className={styles.profilNom}>{profil.nom}</div>
          <div className={styles.profilAntenne}>🏠 Antenne {profil.antenne}</div>
          <div className={styles.profilDepuis}>{depuis}</div>
        </div>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.statutSection}>
          <p className={styles.statutSectionTitle}>Progression du statut</p>
          <div className={styles.statutSteps}>
            {progression.map((etape, index) => (
              <Fragment key={etape.cle}>
                {index > 0 && <span className={styles.statutArrow}>→</span>}
                <EtapeProgressionCarte etape={etape} onChoisir={demanderConfirmation} />
              </Fragment>
            ))}
          </div>
          <p className={styles.statutAide}>
            Cliquer une étape pour y faire passer {profil.nom.split(" ")[0]} (avancer ou revenir en
            arrière).
          </p>
        </div>

        <div className={styles.suiviGrid}>
          <SectionSuivi titre="Formations" items={detail?.formations ?? []} />
          <SectionSuivi titre="Ateliers & activités" items={detail?.ateliers ?? []} />
        </div>

        <div className={styles.disposSection}>
          <p className={styles.disposTitle}>📅 Disponibilités de {profil.nom.split(" ")[0]}</p>
          <div className={styles.disposGrid}>
            {(detail?.disponibilites ?? []).map((dispo) => (
              <span
                className={`${styles.dispoSlot} ${dispo.disponible ? styles.disponible : ""}`}
                key={dispo.libelle}
              >
                {dispo.libelle}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.historiqueSection}>
          <p className={styles.historiqueTitre}>🕓 Historique du statut</p>
          {historique.length === 0 ? (
            <p className={styles.historiqueVide}>Aucun changement de statut pour l&apos;instant.</p>
          ) : (
            <ul className={styles.historiqueListe}>
              {historique.map((entree, index) => (
                <li key={`${entree.date}-${index}`} className={styles.historiqueLigne}>
                  <span className={styles.historiqueTransition}>
                    {LIBELLES_SINGULIER[entree.ancienStatut]} → {LIBELLES_SINGULIER[entree.nouveauStatut]}
                  </span>
                  <span className={styles.historiqueDate}>{formatDate(entree.date)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {confirmation && <div className={styles.toast}>✓ Statut mis à jour — habilitation tracée !</div>}

      <dialog ref={dialogRef} className={styles.dialogConfirmation}>
        {cibleChangement && (
          <>
            <p className={styles.dialogTexte}>
              {estRecul && <strong className={styles.dialogAlerte}>⚠️ Retour en arrière — </strong>}
              Faire passer <strong>{profil.nom}</strong> de {LIBELLES_SINGULIER[etapeActuelle]} à{" "}
              <strong>{LIBELLES_SINGULIER[cibleChangement]}</strong> ?{" "}
              {estRecul
                ? "L'habilitation visée par le statut actuel sera retirée."
                : "L'habilitation sera tracée avec cette date."}
            </p>
            <div className={styles.dialogActions}>
              <button type="button" className={styles.dialogAnnuler} onClick={annulerConfirmation}>
                Annuler
              </button>
              <button
                type="button"
                className={styles.dialogConfirmer}
                onClick={validerChangement}
                disabled={enCoursValidation}
              >
                {enCoursValidation ? "Validation…" : "Confirmer"}
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
