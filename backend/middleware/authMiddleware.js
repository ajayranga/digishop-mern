import jwt from "jsonwebtoken";
import User from "../database/userSchema.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token or token expired");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else {
    res.status(401);
    throw new Error("Not Authorized as an admin");
  }
});
