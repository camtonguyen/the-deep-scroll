import { handleCertificate } from "./certificate";
import { handleShareCard } from "./share-card";

/** Every API route: path → handler. The dev server (vite.config.ts) and any serverless host read this one table. */
export const ROUTES: Record<string, (request: Request) => Promise<Response>> = {
  "/api/certificate": handleCertificate,
  "/api/share-card": handleShareCard,
};
