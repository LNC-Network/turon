import type http from "http";
import { getHome } from "../controllers/home.controller.js";

type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

const routes = Object.create(null) as Record<string, Record<string, Handler>>;
routes.GET = Object.create(null) as Record<string, Handler>;
routes.GET["/"] = getHome;
Object.freeze(routes.GET);
Object.freeze(routes);

export function router(req: http.IncomingMessage, res: http.ServerResponse) {
  const method = (req.method || "GET").toUpperCase();
  const rawUrl = req.url || "/";
  let path: string;
  try {
    path = new URL(rawUrl, "http://localhost").pathname;
  } catch {
    path = "/";
  }

  const methodRoutes: Record<string, Handler> | undefined = Object.prototype.hasOwnProperty.call(routes, method)
    ? routes[method]
    : undefined;
  const handler: Handler | undefined = methodRoutes && Object.prototype.hasOwnProperty.call(methodRoutes, path)
    ? methodRoutes[path]
    : undefined;
  if (typeof handler === "function") return handler(req, res);
  res.writeHead(404);
  res.end();
}


