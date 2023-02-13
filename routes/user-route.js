import express from "express"
import { googleLogin, signIn, signUp } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/googleLogin", googleLogin);

export default router;

