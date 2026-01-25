import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

export default router;