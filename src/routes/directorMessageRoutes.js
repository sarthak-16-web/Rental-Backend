import express from "express";
import { getDirectorMessage, updateDirectorMessage } from "../controllers/directorMessageController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/", getDirectorMessage);
router.put("/", requireAdmin, updateDirectorMessage);

export default router;
