"use client";

import { useState } from "react";
import styles from "./page.module.css";
import {
  LIBELLES_PLURIEL,
  LIBELLES_SINGULIER,
  filtrerProfils,
  profilsExemple,
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

function SectionProfils({ section, profils }: { section: Section; profils: Profil[] }) {
  return (
    <section>
      <p className={styles.sectionHeader}>
        {LIBELLES_PLURIEL[section]} <span className={styles.compteur}>{profils.length}</span>
      </p>
      <div className={styles.profileList}>
        {profils.map((profil) => (
          <div className={styles.profileRow} key={profil.id}>
            <div className={`${styles.avatar} ${styles[section]}`}>{initiales(profil.nom)}</div>
            <div className={styles.profileInfo}>
              <div className={styles.profileName}>{profil.nom}</div>
              <div className={styles.profileMeta}>Antenne {profil.antenne}</div>
            </div>
            <span className={`${styles.badgeStatut} ${styles[section]}`}>
              {LIBELLES_SINGULIER[section]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const [recherche, setRecherche] = useState("");
  const [sectionActive, setSectionActive] = useState<FiltreSection>("toutes");

  const groupes = regrouperParSection(filtrerProfils(profilsExemple, recherche));
  const sectionsAffichees = sectionActive === "toutes" ? SECTIONS : [sectionActive];

  return (
    <div className={styles.phoneShell}>
      <div className={styles.topbar}>
        <span className={styles.topbarLogo}>
          L&apos;<span>BURN</span>
        </span>
        <span className={styles.topbarTitle}>Back-office · Suivi des parcours</span>
      </div>

      <div className={styles.content}>
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

        {sectionsAffichees.map((section) => (
          <SectionProfils key={section} section={section} profils={groupes[section]} />
        ))}
      </div>
    </div>
  );
}
