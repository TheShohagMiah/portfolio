import express from "express";
import { Protected } from "../middlewares/protected.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getGroupedSkills,
  getSkillById,
  reorderSkills,
  updateSkill,
} from "../controllers/skillsControllers.js";

const router = express.Router();

// ── Public ────────────────────────────────────────────────────────
// ✅ /grouped MUST come before /:id — otherwise Express reads
//    "grouped" as the :id param and calls getSkillById instead
router.get("/grouped", getGroupedSkills); // GET  /api/skills/grouped
router.get("/", getAllSkills); // GET  /api/skills
router.get("/:id", getSkillById); // GET  /api/skills/:id

// ── Protected ─────────────────────────────────────────────────────
router.post("/", Protected, isAdmin, createSkill); // POST   /api/skills
router.put("/:id", Protected, isAdmin, updateSkill); // PUT    /api/skills/:id
router.delete("/:id", Protected, isAdmin, deleteSkill); // DELETE /api/skills/:id
router.patch("/reorder", Protected, reorderSkills); // PATCH  /api/skills/reorder

export default router;
