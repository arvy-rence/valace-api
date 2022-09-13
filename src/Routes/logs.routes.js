import express from "express";

// controllers
import {createLog, getAllLogs} from "../Controllers/logs.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/logs/
 */
router.get("/", getAllLogs);
router.post("/createLog", createLog);

export { router as logsRoutes }