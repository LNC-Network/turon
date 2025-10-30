import { getHome } from "../controllers/home.controller.js";

const routes = {
  GET: {
    "/": getHome,
  },
};

export function router(req, res) {
  const method = (req.method || "GET").toUpperCase();
  const path = req.url || "/";
  const handler = routes[method]?.[path];
  if (handler) return handler(req, res);
  res.writeHead(404);
  res.end();
}


