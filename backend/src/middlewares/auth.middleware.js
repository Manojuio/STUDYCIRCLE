import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { ENV } from "../config/env.js";   // ✅ import ENV

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET); // ✅ use ENV.JWT_SECRET
    console.log("Decoded JWT:", decoded);              // debug log
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    next(new ApiError(401, "Invalid token"));
  }
};