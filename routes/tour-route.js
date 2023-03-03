import express from "express"
import { createTour, deleteTour, getTour, getTours, getToursByUser, getTourToEdit, updateTour  } from "../controller/tourController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createOrEdit", verifyToken,  createTour);
router.get("/", getTours);
router.get("/detail/:id", getTour);
router.get("/createOrEdit/:id", getTourToEdit);
router.delete("/dashboard/:id", deleteTour);
router.patch("/createOrEdit/:id", updateTour);
router.get("/dashboard/:id", getToursByUser);

export default router;
