import type http from "http";
import healthRoutes from "./modules/health.routes.js";

type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

const routes: Record<string, Record<string, Handler>> = {
  GET: {
    "/": (_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Welcome" }));
    },
  },
};

export function router(req: http.IncomingMessage, res: http.ServerResponse) {
  const method = (req.method || "GET").toUpperCase();
  const url = req.url || "/";

  if (url.startsWith("/health")) return healthRoutes(req, res);

  const handler = routes[method]?.[url];
  if (handler) return handler(req, res);
  res.writeHead(404);
  res.end();
}


