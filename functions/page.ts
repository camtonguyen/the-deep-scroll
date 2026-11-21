import { render } from "@hyper-elements/react";
import { withShareMeta } from "../server/share-meta";
import { OUTPUTS } from "../src/outputs";

/** The landing page, rendered per request so `?name=` reaches the share card tags (vercel.json rewrites `/` here). */
export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const { html } = await render(OUTPUTS[0].element(url.searchParams.get("only") ?? undefined));
    return new Response(withShareMeta(html, url), {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate" },
    });
  },
};
