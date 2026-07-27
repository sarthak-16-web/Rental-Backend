import express from "express";
import { loginAdmin  , logoutAdmin , registerAdmin,} from "../controllers/adminController.js";


const router = express.Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

export default router;
