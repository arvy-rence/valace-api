// controllers
import {
    getAllTopnotchers,
    updateTopnotcher,
    createTopnotcher,
    getThreeLatestTopnotchers
} from "../Controllers/topnotchers.controller.js";

import express from "express";

// router
const router = express.Router();

/**
 * ROOT URL: /api/topnotchers/
 */
router.get("/", getAllTopnotchers);
router.get("/latest", getThreeLatestTopnotchers);
router.post("/createTopnotcher", createTopnotcher);
router.put("/updateTopnotcher", updateTopnotcher);

export {router as topnotchersRoutes}
