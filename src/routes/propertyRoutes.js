import express from "express";
import {
  addProperty,
  editProperty,
  deleteProperty,
  getAllProperties,
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/add", addProperty);
router.put("/edit/:id", editProperty);
router.delete("/delete/:id", deleteProperty);
router.get("/get-all", getAllProperties);

export default router;