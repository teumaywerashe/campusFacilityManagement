import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./route/userRoute.js";
import { issueRouter } from "./route/issueRouter.js";
import { notificationRouter } from "./route/notificationRouter.js";
import { connectDB } from "./config/db.js";
import { commentRounter } from "./route/commentRouter.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://campusfacilitymanagement-1.onrender.com",
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token", "Authorization"],
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));

app.use("/user", userRouter);
app.use("/issue", issueRouter);
app.use("/notification", notificationRouter);
app.use("/comment", commentRounter);

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
