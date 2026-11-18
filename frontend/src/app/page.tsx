"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import SelecteurRole from "../components/SelecteurRole";
import {
  LIBELLES_PLURIEL,
  LIBELLES_SINGULIER,
  filtrerProfils,
  regrouperParSection,
  type Profil,
  type Section,
} from "../lib/profils";

const SECTIONS: Section[] = ["burnette", "activ", "pairaidante"];
type FiltreSection = Section | "toutes";

function initiales(nom: string): string {
  return nom
    .split(" ")
    .map((mot) => mot[0])
    .join("")
    .toUpperCase();
}

function SectionProfils({
  section,
  profils,
  onFaireProgresser,
}: {
  section: Section;
  profils: Profil[];
  onFaireProgresser: (id: string) => void;
}) {
  return (
    <section>
      <p className={styles.sectionHeader}>
        {LIBELLES_PLURIEL[section]} <span className={styles.compteur}>{profils.length}</span>
      </p>
      <div className={styles.profileList}>
        {profils.map((profil) => (
          <div className={styles.profileRow} key={profil.id}>
            <Link href={`/profil/${profil.id}`} className={styles.profileLien}>
              <div className={`${styles.avatar} ${styles[section]}`}>{initiales(profil.nom)}</div>
              <div className={styles.profileInfo}>
                <div className={styles.profileName}>{profil.nom}</div>
                <div className={styles.profileMeta}>Antenne {profil.antenne}</div>
              </div>
            </Link>
            <span className={`${styles.badgeStatut} ${styles[section]}`}>
              {LIBELLES_SINGULIER[section]}
            </span>
            {section !== "pairaidante" && (
              <button
                type="button"
                className={styles.boutonProgresser}
                onClick={() => onFaireProgresser(profil.id)}
              >
                Statut suivant
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const [profils, setProfils] = useState<Profil[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [sectionActive, setSectionActive] = useState<FiltreSection>("toutes");

  const [version, setVersion] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function charger() {
      try {
        const reponse = await fetch("/api/v1/profils");
        if (!reponse.ok) throw new Error("Réponse API non ok");
        const donnees = await reponse.json();
        if (ignore) return;
        setProfils(donnees);
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
  }, [version]);

  async function faireProgresser(id: string) {
    await fetch(`/api/v1/profils/${id}/statut`, { method: "PATCH" });
    setVersion((valeurPrecedente) => valeurPrecedente + 1);
  }

  const groupes = regrouperParSection(filtrerProfils(profils, recherche));
  const sectionsAffichees = sectionActive === "toutes" ? SECTIONS : [sectionActive];

  return (
    <div className={styles.phoneShell}>
      <div className={styles.topbar}>
        <span className={styles.topbarLogo}>
          L&apos;<span>BURN</span>
        </span>
        <span className={styles.topbarTitle}>Back-office · Suivi des parcours</span>
        <SelecteurRole />
      </div>

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.filterBar}>
            <span className={styles.filterLabel}>Filtre</span>
            <div className={styles.filterChips}>
              <button
                type="button"
                className={`${styles.chip} ${sectionActive === "toutes" ? styles.activeChip : ""}`}
                onClick={() => setSectionActive("toutes")}
              >
                Toutes
              </button>
              {SECTIONS.map((section) => (
                <button
                  key={section}
                  type="button"
                  className={`${styles.chip} ${sectionActive === section ? styles.activeChip : ""}`}
                  onClick={() => setSectionActive(section)}
                >
                  {LIBELLES_SINGULIER[section]}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Rechercher un prénom, une antenne…"
              value={recherche}
              onChange={(evenement) => setRecherche(evenement.target.value)}
            />
          </div>
        </div>

        {chargement && <p className={styles.etatChargement}>Chargement des profils…</p>}
        {!chargement && erreur && (
          <p className={styles.etatChargement}>
            Impossible de charger les profils depuis l&apos;API. Réessaie dans un instant.
          </p>
        )}
        {!chargement && !erreur && (
          <div className={styles.sectionsGrid}>
            {sectionsAffichees.map((section) => (
              <SectionProfils
                key={section}
                section={section}
                profils={groupes[section]}
                onFaireProgresser={faireProgresser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
