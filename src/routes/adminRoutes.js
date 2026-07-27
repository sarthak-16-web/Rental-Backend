import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  checkAdminSession,
  refreshAccessToken,
  registerAdmin,        
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.post("/register", registerAdmin);   
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh", refreshAccessToken);
router.get("/me", requireAdmin, checkAdminSession);

router.get("/dashboard", requireAdmin, (req, res) => {
  res.json({ success: true, message: "Welcome admin", admin: req.admin });
});

export default router;
