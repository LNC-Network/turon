import { getHome } from "../controllers/home.controller.js";

const routes = Object.create(null);
routes.GET = Object.create(null);
routes.GET["/"] = getHome;
Object.freeze(routes.GET);
Object.freeze(routes);

export function router(req, res) {
  const method = (req.method || "GET").toUpperCase();
  const rawUrl = req.url || "/";
  let path;
  try {
    path = new URL(rawUrl, "http://localhost").pathname;
  } catch {
    path = "/";
  }

  const methodRoutes = Object.prototype.hasOwnProperty.call(routes, method)
    ? routes[method]
    : undefined;
  const handler = methodRoutes && Object.prototype.hasOwnProperty.call(methodRoutes, path)
    ? methodRoutes[path]
    : undefined;
  if (typeof handler === "function") return handler(req, res);
  res.writeHead(404);
  res.end();
}


