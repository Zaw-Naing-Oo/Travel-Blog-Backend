import express from "express"
import { createTour, deleteTour, getTour, getTours, getToursBySearch, getToursByUser, getTourToEdit, updateTour  } from "../controller/tourController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTours);
router.get("/detail/:id", getTour);
router.get("/search", getToursBySearch);

router.get("/createOrEdit/:id", getTourToEdit);
router.get("/dashboard/:id", getToursByUser);
router.post("/createOrEdit", createTour);
router.patch("/createOrEdit/:id", updateTour);
router.delete("/dashboard/:id", deleteTour);


export default router;
