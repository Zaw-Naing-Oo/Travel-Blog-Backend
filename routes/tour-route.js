import express from "express"
import { createComment, createTour, deleteTour, getTour, getTours, getToursBySearch, getToursByUser, getTourToEdit, likeTour, updateTour  } from "../controller/tourController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTours);
router.get("/detail/:id", getTour);
router.get("/search", getToursBySearch);

router.get("/createOrEdit/:id", verifyToken, getTourToEdit);
router.get("/dashboard/:id", verifyToken,  getToursByUser);
router.post("/createOrEdit", verifyToken,  createTour);
router.patch("/createOrEdit/:id", verifyToken,  updateTour);
router.delete("/dashboard/:id", verifyToken,  deleteTour);
router.post("/likes/:id", verifyToken, likeTour);
router.post("/detail/comment/:id", verifyToken, createComment);


export default router;
