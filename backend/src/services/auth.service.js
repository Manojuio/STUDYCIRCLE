import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { ENV } from "../config/env.js";

export const register = async ({ username, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, "Email already registered");

  const user = await User.create({ username, email, password, role });
  return user;
};

export const login = async ({ email, password }) => {
  // Explicitly include password
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid credentials");

  const match = await user.comparePassword(password);
  if (!match) throw new ApiError(401, "Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    ENV.JWT_SECRET, // ✅ must match middleware
    { expiresIn: "1d" }
  );

  // Strip password before returning
  const { password: _, ...userData } = user.toObject();
  return { user: userData, token };
};