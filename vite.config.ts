import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";

/**
 * Dev server for the landing page. Hyper Elements renders a design to a plain
 * HTML document (no client React), so `/` is that document, served as is.
 * `/?only=<section id>` renders one section alone; edits reload the page.
 */
function preview(): Plugin {
  return {
    name: "preview",
    configureServer(server) {
      server.watcher.on("change", (file) => {
        if (file.includes("/src/")) server.ws.send({ type: "full-reload" });
      });
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        if (url.pathname !== "/") return next();
        try {
          const { OUTPUTS } = await server.ssrLoadModule("/src/outputs.tsx");
          const { render } = await server.ssrLoadModule("@hyper-elements/react");
          const { html } = await render(OUTPUTS[0].element(url.searchParams.get("only") ?? undefined));
          res.setHeader("Content-Type", "text/html");
          const { withShareMeta } = await server.ssrLoadModule("/server/share-meta.ts");
          res.end(
            withShareMeta(await server.transformIndexHtml(req.url ?? "/", html), new URL(req.url ?? "/", `http://${req.headers.host}`)),
          );
        } catch (error) {
          if (error instanceof Error) server.ssrFixStacktrace(error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.end(String(error instanceof Error ? error.stack : error));
        }
      });
    },
  };
}

/** `/api/*` in the dev server: the same handlers a serverless host would run (server/routes.ts). */
function api(): Plugin {
  return {
    name: "api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        if (!url.pathname.startsWith("/api/")) return next();
        try {
          const { ROUTES } = await server.ssrLoadModule("/server/routes.ts");
          const handler = ROUTES[url.pathname];
          if (!handler) return next();
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) if (value !== undefined) headers.set(key, String(value));
          if (!headers.has("x-forwarded-for")) headers.set("x-forwarded-for", req.socket.remoteAddress ?? "unknown");
          const hasBody = req.method !== "GET" && req.method !== "HEAD";
          const response: Response = await handler(
            new Request(url, { method: req.method, headers, body: hasBody ? Buffer.concat(chunks) : undefined }),
          );
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          if (error instanceof Error) server.ssrFixStacktrace(error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Something went wrong on our side." }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [preview(), api()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
