import Skill from "../models/skills/skillsModal.js";
import {
  createSkillSchema,
  updateSkillSchema,
} from "../validations/skillsValidation.js";

// ── helpers ───────────────────────────────────────────────────────
const parseZodError = (err) =>
  err.errors.map((e) => ({ field: e.path[0], message: e.message }));

// ═══════════════════════════════════════════════════════════════════
//  CREATE   POST /api/skills
// ═══════════════════════════════════════════════════════════════════
export const createSkill = async (req, res) => {
  try {
    const parsed = createSkillSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: parseZodError(parsed.error),
      });
    }

    const { name, category, iconName, color, order } = parsed.data;

    // Duplicate check
    const exists = await Skill.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      category,
    });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: `"${name}" already exists in ${category}.`,
      });
    }

    const skill = await Skill.create({
      name,
      category,
      iconName,
      color,
      order,
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully.",
      data: skill,
    });
  } catch (err) {
    console.error("[createSkill]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  GET ALL   GET /api/skills
//  Supports: page, limit, sortBy, order, category, search
// ═══════════════════════════════════════════════════════════════════
export const getAllSkills = async (req, res) => {
  try {
    const {
      category,
      search,
      page = 1,
      limit = 20,
      sortBy = "order",
      order = "asc",
    } = req.query;

    // ── Build filter ─────────────────────────────────────────
    const filter = {};

    if (category && ["frontend", "backend"].includes(category))
      filter.category = category;

    if (search && search.trim()) {
      // Use regex — safer than $text (no index required)
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    // ── Pagination ───────────────────────────────────────────
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    // ── Sort ─────────────────────────────────��───────────────
    const ALLOWED_SORT = ["order", "name", "category", "createdAt"];
    const sortField = ALLOWED_SORT.includes(sortBy) ? sortBy : "order";
    const sortDir = order === "desc" ? -1 : 1;
    const sortObj = { [sortField]: sortDir };

    // Always secondary-sort by order asc for stable ordering
    if (sortField !== "order") sortObj.order = 1;

    // ── Query ────────────────────────────────────────────────
    const [skills, total] = await Promise.all([
      Skill.find(filter).sort(sortObj).skip(skip).limit(limitNum).lean(),
      Skill.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return res.status(200).json({
      success: true,
      count: skills.length,
      total,
      page: pageNum,
      totalPages,
      data: skills,
    });
  } catch (err) {
    console.error("[getAllSkills]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  GET GROUPED   GET /api/skills/grouped
//  Returns { frontend: [...], backend: [...] }
// ═══════════════════════════════════════════════════════════════════
export const getGroupedSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 }).lean();

    const grouped = {
      frontend: skills.filter((s) => s.category === "frontend"),
      backend: skills.filter((s) => s.category === "backend"),
    };

    return res.status(200).json({ success: true, data: grouped });
  } catch (err) {
    console.error("[getGroupedSkills]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  GET ONE   GET /api/skills/:id
// ═══════════════════════════════════════════════════════════════════
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).lean();
    if (!skill)
      return res
        .status(404)
        .json({ success: false, message: "Skill not found." });

    return res.status(200).json({ success: true, data: skill });
  } catch (err) {
    console.error("[getSkillById]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  UPDATE   PUT /api/skills/:id
// ═══════════════════════════════════════════════════════════════════
export const updateSkill = async (req, res) => {
  try {
    const parsed = updateSkillSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: parseZodError(parsed.error),
      });
    }

    const { name, category } = parsed.data;

    // Duplicate check — skip the current doc
    if (name && category) {
      const exists = await Skill.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
        category,
        _id: { $ne: req.params.id },
      });
      if (exists) {
        return res.status(409).json({
          success: false,
          message: `"${name}" already exists in ${category}.`,
        });
      }
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: parsed.data },
      { new: true, runValidators: true },
    );

    if (!skill)
      return res
        .status(404)
        .json({ success: false, message: "Skill not found." });

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      data: skill,
    });
  } catch (err) {
    console.error("[updateSkill]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  DELETE   DELETE /api/skills/:id
// ═══════════════════════════════════════════════════════════════════
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill)
      return res
        .status(404)
        .json({ success: false, message: "Skill not found." });

    return res.status(200).json({
      success: true,
      message: `"${skill.name}" deleted successfully.`,
    });
  } catch (err) {
    console.error("[deleteSkill]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  REORDER   PATCH /api/skills/reorder
//  Body: { orders: [{ id, order }, ...] }
// ═══════════════════════════════════════════════════════════════════
export const reorderSkills = async (req, res) => {
  try {
    const { orders } = req.body;

    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({
        success: false,
        message: "orders must be a non-empty array of { id, order }.",
      });
    }

    const ops = orders.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order } },
      },
    }));

    await Skill.bulkWrite(ops);

    return res.status(200).json({
      success: true,
      message: "Skills reordered successfully.",
    });
  } catch (err) {
    console.error("[reorderSkills]", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
