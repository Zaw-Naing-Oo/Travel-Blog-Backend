import express from "express"
import { createTour, getTours  } from "../controller/tourController.js";

const router = express.Router();

router.post("/createTour", createTour);
router.get("/", getTours);

export default router;
