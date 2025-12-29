// server.js
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
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

import { userRouter } from "./route/userRoute.js";
import { issueRouter } from "./route/issueRouter.js";
import { notificationRouter } from "./route/notificationRouter.js";
// import prisma from "./config/db.js";

const PORT = process.env.PORT || 3000;
app.use("/uploads", express.static("uploads"));
app.get("/TEST", (req, res) =>
    res.send("Server is running!\n this is to test the server")
);

// app.get("/test-db", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json({ success: true, users });
//   } catch (error) {
//     console.error("DB connection error:", error);
//     res.status(500).json({ success: false, msg: error.message });
//   }
// });
app.use("/user", userRouter);
app.use("/issue", issueRouter);
app.use("/notification", notificationRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});