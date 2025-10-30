import type http from "http";
import { getHome } from "../controllers/home.controller.js";

type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

const routes: Record<string, Record<string, Handler>> = {
  GET: {
    "/": getHome,
  },
};

export function router(req: http.IncomingMessage, res: http.ServerResponse) {
  const method = (req.method || "GET").toUpperCase();
  const path = req.url || "/";
  const handler = routes[method]?.[path];
  if (handler) return handler(req, res);
  res.writeHead(404);
  res.end();
}


