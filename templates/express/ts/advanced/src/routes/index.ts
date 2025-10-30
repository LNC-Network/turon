import { Router } from "express";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.get("/", (_req, res) => res.json({ message: "Welcome" }));

export default router;


