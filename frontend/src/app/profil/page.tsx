import { Suspense } from "react";
import FicheProfilClient from "./FicheProfilClient";
import styles from "./page.module.css";

// Route unique (pas de segment dynamique) : le site est un export statique, incompatible
// avec des pages générées pour des ids connus seulement à l'exécution (profils créés ou
// supprimés après coup). L'id voyage en paramètre de requête (?id=...), lu côté client
// par FicheProfilClient via useSearchParams — aucune génération statique par id requise.
export default function FicheProfil() {
  return (
    <Suspense
      fallback={
        <div className={styles.phoneShell}>
          <p className={styles.introuvable}>Chargement…</p>
        </div>
      }
    >
      <FicheProfilClient />
    </Suspense>
  );
}
