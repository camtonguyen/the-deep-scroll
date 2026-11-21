import { SHARE, SITE } from "../src/shared/data/site";
import { FAVICON_LINK } from "./favicon";
import { shareName } from "../src/shared/lib/visitor";

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Page can set only `title` and `description`, so the favicon and the Open Graph and Twitter tags are added here, to the
 * rendered page, per request. LinkedIn reads the card from `og:image`, so that URL must be absolute and
 * public. `origin` is SITE_URL when set (the public address), else the address the request came in on.
 */
export function withShareMeta(html: string, requestUrl: URL, origin = process.env.SITE_URL || requestUrl.origin): string {
  const name = shareName(requestUrl.searchParams.get("name")) ?? "";
  const query = name ? `?name=${encodeURIComponent(name)}` : "";
  const image = `${origin}${SHARE.cardRoute}${query}`;
  const alt = name ? `${name} scrolled to the bottom of the ocean.` : SHARE.text;
  const tags: [string, string, string][] = [
    ["property", "og:type", "website"],
    ["property", "og:title", SITE.title],
    ["property", "og:description", SITE.description],
    ["property", "og:url", `${origin}${requestUrl.pathname}${query}`],
    ["property", "og:image", image],
    ["property", "og:image:type", "image/png"],
    ["property", "og:image:width", String(SHARE.cardSize.width)],
    ["property", "og:image:height", String(SHARE.cardSize.height)],
    ["property", "og:image:alt", alt],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:image", image],
  ];
  const meta = tags.map(([attr, key, value]) => `<meta ${attr}="${key}" content="${escape(value)}">`).join("");
  return html.replace("</head>", `${FAVICON_LINK}${meta}</head>`);
}
