import type http from "http";
import healthRoutes from "./modules/health.routes.js";

type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

const routes = Object.create(null) as Record<string, Record<string, Handler>>;
routes.GET = Object.create(null) as Record<string, Handler>;
routes.GET["/"] = (_req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Welcome" }));
};
Object.freeze(routes.GET);
Object.freeze(routes);

export function router(req: http.IncomingMessage, res: http.ServerResponse) {
  const method = (req.method || "GET").toUpperCase();
  const rawUrl = req.url || "/";
  let pathname: string;
  try {
    pathname = new URL(rawUrl, "http://localhost").pathname;
  } catch {
    pathname = "/";
  }

  if (pathname.startsWith("/health")) return healthRoutes(req, res);

  const methodRoutes: Record<string, Handler> | undefined = Object.prototype.hasOwnProperty.call(routes, method)
    ? routes[method]
    : undefined;
  const handler: Handler | undefined = methodRoutes && Object.prototype.hasOwnProperty.call(methodRoutes, pathname)
    ? methodRoutes[pathname]
    : undefined;
  if (typeof handler === "function") return handler(req, res);
  res.writeHead(404);
  res.end();
}


