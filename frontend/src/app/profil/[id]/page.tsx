import { Fragment } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {
  profilsDetailExemple,
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

// Next.js (export statique) : les fiches générées à la construction sont celles
// des profils d'exemple ; un id hors de cette liste affiche le message « introuvable ».
export function generateStaticParams() {
  return profilsDetailExemple.map((profil) => ({ id: profil.id }));
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

function SectionSuivi({
  titre,
  items,
}: {
  titre: string;
  items: ItemSuivi[];
}) {
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

export default async function FicheProfil({ params }: PageProps<"/profil/[id]">) {
  const { id } = await params;
  const profil = trouverProfilDetail(id);

  if (!profil) {
    return (
      <div className={styles.phoneShell}>
        <div className={styles.topbar}>
          <Link className={styles.topbarBack} href="/">
            ←
          </Link>
          <span className={styles.topbarLogo}>
            L&apos;<span>BURN</span>
          </span>
          <span className={styles.topbarTitle}>Fiche profil</span>
        </div>
        <p className={styles.introuvable}>Ce profil n&apos;existe pas dans les données d&apos;exemple.</p>
      </div>
    );
  }

  return (
    <div className={styles.phoneShell}>
      <div className={styles.topbar}>
        <Link className={styles.topbarBack} href="/">
          ←
        </Link>
        <span className={styles.topbarLogo}>
          L&apos;<span>BURN</span>
        </span>
        <span className={styles.topbarTitle}>Fiche profil</span>
      </div>

      <div className={styles.profilHero}>
        <div className={`${styles.profilAvatarLg} ${styles[profil.etapeActuelle]}`}>
          {initiales(profil.nom)}
        </div>
        <div>
          <div className={styles.profilNom}>{profil.nom}</div>
          <div className={styles.profilAntenne}>🏠 Antenne {profil.antenne}</div>
          <div className={styles.profilDepuis}>{profil.depuis}</div>
        </div>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.statutSection}>
          <p className={styles.statutSectionTitle}>Progression du statut</p>
          <div className={styles.statutSteps}>
            {profil.progression.map((etape, index) => (
              <Fragment key={etape.cle}>
                {index > 0 && <span className={styles.statutArrow}>→</span>}
                <EtapeProgressionCarte etape={etape} />
              </Fragment>
            ))}
          </div>
        </div>

        <SectionSuivi titre="Formations" items={profil.formations} />
        <SectionSuivi titre="Ateliers & activités" items={profil.ateliers} />

        <div className={styles.disposSection}>
          <p className={styles.disposTitle}>📅 Disponibilités de {profil.nom.split(" ")[0]}</p>
          <div className={styles.disposGrid}>
            {profil.disponibilites.map((dispo) => (
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
    </div>
  );
}
