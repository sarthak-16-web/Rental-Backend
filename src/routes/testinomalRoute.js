import express from "express";
import {
  addTestimonial,
  editTestimonial,
  deleteTestimonial,
  getAllTestimonials
} from "../controllers/testinomalController.js";

const router = express.Router();

router.post("/add", addTestimonial);
router.put("/edit/:id", editTestimonial);
router.delete("/delete/:id", deleteTestimonial);
router.get("/get-all", getAllTestimonials);
export default router;