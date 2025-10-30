import type { Request, Response } from "express";
import { logger } from "../lib/logger.js";

export function getHome(_req: Request, res: Response) {
  logger.info("GET /");
  res.json({ message: "Hello from Express (standard)" });
}


