"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { LIBELLES_SINGULIER, etapeSuivante, sectionAffichee, type Profil } from "../../../lib/profils";
import {
  construireProgression,
  trouverProfilDetail,
  type EtapeProgression,
  type ItemSuivi,
} from "../../../lib/profilDetail";

function initiales(nom: string): string {
  return nom
    .split(" ")
    .map((mot) => mot[0])
    .join("")
    .toUpperCase();
}

function EtapeProgressionCarte({ etape }: { etape: EtapeProgression }) {
  const classeEtat = etape.etat === "fait" ? styles.fait : etape.etat === "actuelle" ? styles.actuelle : "";
  return (
    <div className={`${styles.statutStep} ${classeEtat}`}>
      <div className={styles.stepIcon}>{etape.icone}</div>
      <span className={styles.stepLabel}>{etape.libelle}</span>
    </div>
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
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(false);
  const [version, setVersion] = useState(0);
  const [enCoursValidation, setEnCoursValidation] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let ignore = false;
    async function charger() {
      try {
        const reponse = await fetch("/api/v1/profils");
        if (!reponse.ok) throw new Error("Réponse API non ok");
        const profils: Profil[] = await reponse.json();
        const trouve = profils.find((candidat) => candidat.id === id) ?? null;
        if (ignore) return;
        setProfil(trouve);
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

  async function validerNouveauStatut() {
    dialogRef.current?.close();
    setEnCoursValidation(true);
    try {
      await fetch(`/api/v1/profils/${id}/statut`, { method: "PATCH" });
      setVersion((valeurPrecedente) => valeurPrecedente + 1);
      setConfirmation(true);
      setTimeout(() => setConfirmation(false), 2800);
    } finally {
      setEnCoursValidation(false);
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
  const suivante = etapeSuivante(etapeActuelle);

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
                <EtapeProgressionCarte etape={etape} />
              </Fragment>
            ))}
          </div>
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
      </div>

      {suivante && (
        <div className={styles.ctaBar}>
          <button
            type="button"
            className={styles.btnValider}
            onClick={() => dialogRef.current?.showModal()}
            disabled={enCoursValidation}
          >
            {enCoursValidation ? "Validation…" : "Je valide le nouveau statut et l'habilitation"}
          </button>
        </div>
      )}
      {confirmation && <div className={styles.toast}>✓ Statut mis à jour — habilitation tracée !</div>}

      {suivante && (
        <dialog ref={dialogRef} className={styles.dialogConfirmation}>
          <p className={styles.dialogTexte}>
            Faire passer <strong>{profil.nom}</strong> de {LIBELLES_SINGULIER[etapeActuelle]} à{" "}
            <strong>{LIBELLES_SINGULIER[suivante]}</strong> ? L&apos;habilitation sera tracée avec cette
            date.
          </p>
          <div className={styles.dialogActions}>
            <button type="button" className={styles.dialogAnnuler} onClick={() => dialogRef.current?.close()}>
              Annuler
            </button>
            <button type="button" className={styles.dialogConfirmer} onClick={validerNouveauStatut}>
              Confirmer
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}
