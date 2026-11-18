import type { Metadata } from "next";
import { Archivo_Black, Libre_Franklin } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--lb-font-heading",
  weight: "400",
  subsets: ["latin"],
});

const libreFranklin = Libre_Franklin({
  variable: "--lb-font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'BURN — Back-office suivi des parcours",
  description: "Back-office de suivi des parcours BURN'ette / ACTIV' / Pair-aidante",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${archivoBlack.variable} ${libreFranklin.variable}`}>
      <body>{children}</body>
    </html>
  );
}
