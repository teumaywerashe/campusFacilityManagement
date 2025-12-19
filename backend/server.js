// server.js
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "token"],
    origin: [
      "http://localhost:5173",
      "https://campusfacilitymanagement.onrender.com",
    ],
    credentials: true,
  })
);
app.options("/", cors());
import { userRouter } from "./route/userRoute.js";
import { issueRouter } from "./route/issueRouter.js";
import { notificationRouter } from "./route/notificationRouter.js";
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use("/uploads", express.static("uploads"));
app.use("/user", userRouter);
app.use("/issue", issueRouter);
app.use("/notification", notificationRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
