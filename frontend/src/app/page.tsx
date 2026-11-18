import styles from "./page.module.css";
import {
  LIBELLES_PLURIEL,
  LIBELLES_SINGULIER,
  profilsExemple,
  regrouperParSection,
  type Profil,
  type Section,
} from "../lib/profils";

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
  const groupes = regrouperParSection(profilsExemple);

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
            <span className={`${styles.chip} ${styles.activeChip}`}>Toutes</span>
            <span className={styles.chip}>BURN&apos;ette</span>
            <span className={styles.chip}>ACTIV&apos;</span>
            <span className={styles.chip}>Pair-aidante</span>
          </div>
        </div>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Rechercher un prénom, une antenne…" readOnly />
        </div>

        <SectionProfils section="burnette" profils={groupes.burnette} />
        <SectionProfils section="activ" profils={groupes.activ} />
        <SectionProfils section="pairaidante" profils={groupes.pairaidante} />
      </div>
    </div>
  );
}
