import express from "express";
import {
  getAllTeamMembers,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/get-all", getAllTeamMembers);
router.post("/add", requireAdmin, addTeamMember);
router.put("/edit/:id", requireAdmin, editTeamMember);
router.delete("/delete/:id", requireAdmin, deleteTeamMember);

export default router;
