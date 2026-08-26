import express from "express";
import {
  getAllPartners,
  addPartner,
  editPartner,
  deletePartner,
} from "../controllers/partnerController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/get-all", getAllPartners);
router.post("/add", requireAdmin, addPartner);
router.put("/edit/:id", requireAdmin, editPartner);
router.delete("/delete/:id", requireAdmin, deletePartner);

export default router;
