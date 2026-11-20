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
          res.end(await server.transformIndexHtml(req.url ?? "/", html));
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

export default defineConfig({
  plugins: [preview()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
