import express from "express";
import {
  addProject,
  editProject,
  deleteProject,
  getAllProjects
} from "../controllers/projectController.js";

const router = express.Router();
router.get("/get-all", getAllProjects);

router.post("/add", addProject);
router.put("/edit/:id", editProject);
router.delete("/delete/:id", deleteProject);

export default router;