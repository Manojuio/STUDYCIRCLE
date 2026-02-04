import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createResource,
  listResources,
  deleteResources
} from "../controllers/resource.controller.js";

const router = express.Router();

// POST link resource
router.post("/:groupId/resources", authMiddleware, createResource);

// GET all resources
router.get("/:groupId/resources", authMiddleware, listResources);
router.delete("/resources/:resourceId", authMiddleware, deleteResources);

export default router;
