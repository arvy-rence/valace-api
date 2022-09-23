import express from "express";

// controllers
import {
    getAllSisterCities,
    getSingleSisterCity,
    createSisterCity,
    updateSisterCity
} from "../Controllers/sisterCity.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/sisterCity/
 */

router.get("/", getAllSisterCities);
router.get("/:id", getSingleSisterCity);
router.post("/createSisterCity", createSisterCity);
router.put("/updateSisterCity/:id", updateSisterCity);

export { router as sisterCityRoutes }