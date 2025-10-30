import healthRoutes from "./modules/health.routes.js";

const routes = Object.create(null);
routes.GET = Object.create(null);
routes.GET["/"] = (_req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Welcome" }));
};
Object.freeze(routes.GET);
Object.freeze(routes);

export function router(req, res) {
  const method = (req.method || "GET").toUpperCase();
  const rawUrl = req.url || "/";
  let pathname;
  try {
    pathname = new URL(rawUrl, "http://localhost").pathname;
  } catch {
    pathname = "/";
  }

  if (pathname.startsWith("/health")) return healthRoutes(req, res);

  const methodRoutes = Object.prototype.hasOwnProperty.call(routes, method)
    ? routes[method]
    : undefined;
  const handler = methodRoutes && Object.prototype.hasOwnProperty.call(methodRoutes, pathname)
    ? methodRoutes[pathname]
    : undefined;
  if (typeof handler === "function") return handler(req, res);
  res.writeHead(404);
  res.end();
}


