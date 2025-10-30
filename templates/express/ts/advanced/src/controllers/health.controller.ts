import type { Request, Response } from "express";
import { getHealthStatus } from "../services/health.service.js";

export function getHealth(_req: Request, res: Response) {
  const status = getHealthStatus();
  res.json(status);
}


