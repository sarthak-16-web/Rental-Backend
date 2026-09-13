import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  checkAdminSession,
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", requireAdmin, checkAdminSession);

router.get("/dashboard", requireAdmin, (req, res) => {
  res.json({ success: true, message: "Welcome admin", admin: req.admin });
});

export default router;
