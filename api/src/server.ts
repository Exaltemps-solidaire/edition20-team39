// Service api du gabarit : écoute sur PORT (8081 par défaut), journaux sur la sortie standard.
// Lancé directement par Node (suppression des types TypeScript), sans étape de compilation.
import { createServer } from "node:http";
import { initDb } from "./db.ts";
import { router } from "./routes.ts";

const port = Number(process.env.PORT ?? 8081);

function lireCorpsJson(req: import("node:http").IncomingMessage): Promise<unknown> {
  return new Promise((resolve) => {
    const morceaux: Buffer[] = [];
    req.on("data", (morceau) => morceaux.push(morceau));
    req.on("end", () => {
      if (morceaux.length === 0) return resolve(undefined);
      try {
        resolve(JSON.parse(Buffer.concat(morceaux).toString("utf8")));
      } catch {
        resolve(undefined);
      }
    });
    req.on("error", () => resolve(undefined));
  });
}

const serveur = createServer((req, res) => {
  lireCorpsJson(req)
    .then((corps) => router(req.method ?? "GET", req.url ?? "/", corps))
    .then(({ statut, corps }) => {
      if (corps === undefined) {
        res.writeHead(statut).end();
      } else {
        res.writeHead(statut, { "Content-Type": "application/json" }).end(JSON.stringify(corps));
      }
    })
    .catch((erreur) => {
      console.error("api : erreur non gérée dans le routeur :", erreur);
      res.writeHead(500, { "Content-Type": "application/json" }).end(JSON.stringify({ error: "erreur serveur" }));
    });
});

serveur.listen(port, () => console.log(`api : à l'écoute sur le port ${port}`));

// Si Postgres n'est pas joignable au démarrage, on log l'erreur sans faire planter le
// processus (ni boucler) : les routes de santé répondent quand même, les routes /profils
// échoueront tant que la base n'est pas là.
initDb().catch((erreur) => {
  console.error("api : échec de l'initialisation de la base (profils indisponibles) :", erreur);
});

// Arrêt propre : le conteneur reçoit SIGTERM, on termine les requêtes en cours avant de sortir.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    console.log(`api : ${signal} reçu, arrêt`);
    serveur.close(() => process.exit(0));
  });
}
