import type http from "http";
import { getHealthStatus } from "../services/health.service.js";

export function getHealth(_req: http.IncomingMessage, res: http.ServerResponse) {
  const status = getHealthStatus();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(status));
}


