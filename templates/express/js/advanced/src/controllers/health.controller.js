import { getHealthStatus } from "../services/health.service.js";

export function getHealth(_req, res) {
  const status = getHealthStatus();
  res.json(status);
}


