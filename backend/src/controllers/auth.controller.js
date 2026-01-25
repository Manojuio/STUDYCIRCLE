import { validationResult } from "express-validator";
import * as authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const user = await authService.register(req.body);
   // user.password = undefined;
    return res.status(201).json(new ApiResponse(201, user, "User registered"));
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { user, token } = await authService.login(req.body);
    return res.status(200).json(new ApiResponse(200, { user, token }, "Login successful"));
  } catch (err) {
    next(err);
  }
};