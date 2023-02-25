import express from "express"
import { createTour, getTour, getTours  } from "../controller/tourController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createTour", verifyToken,  createTour);
router.get("/", getTours);
router.get("/detail/:id", getTour);

export default router;
