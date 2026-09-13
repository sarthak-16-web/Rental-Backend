import express from "express";
import {
  addTestimonial,
  submitTestimonial,
  editTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  getApprovedTestimonials,
} from "../controllers/testinomalController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/get-approved", getApprovedTestimonials);
router.post("/submit", submitTestimonial);

router.get("/get-all", requireAdmin, getAllTestimonials);
router.post("/add", requireAdmin, addTestimonial);
router.put("/edit/:id", requireAdmin, editTestimonial);
router.delete("/delete/:id", requireAdmin, deleteTestimonial);

export default router;
