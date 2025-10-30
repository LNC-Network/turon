import type http from "http";
import { logger } from "../lib/logger.js";

export function getHome(_req: http.IncomingMessage, res: http.ServerResponse) {
  logger.info("GET /");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from Vanilla (standard)" }));
}


