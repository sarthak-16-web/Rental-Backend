import express from "express";
import {
  addProperty,
  editProperty,
  deleteProperty,
  getAllProperties,
  getPropertySchema,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/schema", getPropertySchema);
router.post("/add", addProperty);
router.put("/edit/:id", editProperty);
router.delete("/delete/:id", deleteProperty);
router.get("/get-all", getAllProperties);

export default router;