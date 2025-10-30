import { getHealth } from "../../controllers/health.controller.js";

export default function healthRoutes(req, res) {
  if (req.method === "GET" && (req.url === "/health" || req.url === "/health/")) {
    return getHealth(req, res);
  }
  res.writeHead(404);
  res.end();
}


