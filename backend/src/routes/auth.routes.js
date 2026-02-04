import express from "express";
import { register, login,me } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/me", authMiddleware, me);


export default router;