import FicheProfilClient from "./FicheProfilClient";
import { profilsDetailExemple } from "../../../lib/profilDetail";

// Next.js (export statique) : les fiches générées à la construction sont celles
// des profils d'exemple ; un id hors de cette liste affiche le message « introuvable ».
export function generateStaticParams() {
  return profilsDetailExemple.map((profil) => ({ id: profil.id }));
}

export default async function FicheProfil({ params }: PageProps<"/profil/[id]">) {
  const { id } = await params;
  return <FicheProfilClient id={id} />;
}
