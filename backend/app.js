import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import expressRateLimit from "express-rate-limit";
import productRoutes from "./routes/productRoutes.js";
import "./utils/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const limiter = expressRateLimit({ windowMs: 3 * 60 * 1000, max: 50 });

const app = express();
app.use(cors());
app.use(limiter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.set("truest proxy", 1);
app.get("/", (req, res) => {
  return res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use("/uploads", express.static("uploads")); // express.static(path.join(path.resolve(), "uploads")));

app.use((req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(err);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

export default app;
