import express from "express";
import { getContacts, updateContacts } from "../controllers/contactController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/", getContacts);
router.put("/", requireAdmin, updateContacts);

export default router;