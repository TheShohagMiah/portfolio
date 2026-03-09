import express from "express";
import {
  trackVisitor,
  totalVisitors,
  todayVisitors,
  visitorStats,
} from "../controllers/visitorController.js";

const visitorRouter = express.Router();

visitorRouter.post("/track", trackVisitor); // Called from frontend on page load
visitorRouter.get("/total", totalVisitors); // Dashboard: all time total
visitorRouter.get("/today", todayVisitors); // Dashboard: today's count
visitorRouter.get("/stats", visitorStats); // Dashboard: last 7 days chart

export default visitorRouter;
