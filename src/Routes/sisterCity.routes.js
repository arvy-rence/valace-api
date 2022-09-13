import express from "express";

// controllers
import {getAllSisterCities, getSingleSisterCity, createSisterCity} from "../Controllers/sisterCity.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/sisterCity/
 */

router.get("/", getAllSisterCities);
router.get("/:id", getSingleSisterCity);
router.post("/createSisterCity", createSisterCity);

export { router as sisterCityRoutes }