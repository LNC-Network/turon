import healthRoutes from "./modules/health.routes.js";

const routes = {
  GET: {
    "/": (_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Welcome" }));
    },
  },
};

export function router(req, res) {
  const method = (req.method || "GET").toUpperCase();
  const url = req.url || "/";

  if (url.startsWith("/health")) return healthRoutes(req, res);

  const handler = routes[method]?.[url];
  if (handler) return handler(req, res);
  res.writeHead(404);
  res.end();
}


