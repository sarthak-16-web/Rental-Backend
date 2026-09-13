import express from "express";
import {
  getAllAssets,
  uploadAsset,
  deleteAsset,
} from "../controllers/assetController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { uploadImage } from "../middleware/uploadImage.js";

const router = express.Router();

// Normalizes multer errors (oversized file, wrong mimetype) into the same
// JSON shape every other endpoint uses, instead of Express's default HTML error page.
const handleUpload = (req, res, next) => {
  uploadImage.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
};

router.get("/get-all", requireAdmin, getAllAssets);
router.post("/upload", requireAdmin, handleUpload, uploadAsset);
router.delete("/delete/:id", requireAdmin, deleteAsset);

export default router;
