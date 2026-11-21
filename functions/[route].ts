import { ROUTES } from "../server/routes";

/** Every /api/* route from server/routes.ts, the same table the dev server uses. */
export default {
  async fetch(request: Request) {
    const handler = ROUTES[new URL(request.url).pathname];
    return handler ? handler(request) : new Response("Not found", { status: 404 });
  },
};
