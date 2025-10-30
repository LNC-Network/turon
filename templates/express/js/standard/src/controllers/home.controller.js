import { logger } from "../lib/logger.js";

export function getHome(_req, res) {
  logger.info("GET /");
  res.json({ message: "Hello from Express (standard)" });
}


