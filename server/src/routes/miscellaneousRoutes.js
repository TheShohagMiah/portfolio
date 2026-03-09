import express from "express";
import {
  totalQueries,
  totalProjects,
  totalServices,
} from "../controllers/miscellaneousControllers.js";

const miscellaneousRouter = express.Router();

// Dashboard routes
miscellaneousRouter.get("/total-projects", totalProjects);
miscellaneousRouter.get("/total-services", totalServices);
miscellaneousRouter.get("/total-queries", totalQueries);

export default miscellaneousRouter;
