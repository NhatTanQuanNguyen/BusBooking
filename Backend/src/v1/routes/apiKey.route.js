import express from "express";
import { createApiKey, updateApiKey } from "../controllers/apiKey.controller.js";
import { apiKeyMiddleware, requirePermission } from "../middleware/index.js";

const router = express.Router();

router.post(
  "/",
  apiKeyMiddleware,
  requirePermission("ADMIN"),
  createApiKey
);

router.put(
  "/:id",
  apiKeyMiddleware,
  requirePermission("ADMIN"),
  updateApiKey
);

export default router;
