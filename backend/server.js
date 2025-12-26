// server.js
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());
app.use(
    cors({
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "token"],
        origin: ["http://localhost:5173",
            /\.onrender\.com$/
        ],
        credentials: true,
    }));
app.options("/", cors());
import { userRouter } from "./route/userRoute.js";
import { issueRouter } from "./route/issueRouter.js";
import { notificationRouter } from "./route/notificationRouter.js";

const PORT = process.env.PORT || 3000;
app.use("/uploads", express.static("uploads"));
app.get("/TEST", (req, res) => res.send("Server is running!\n this is to test the server"));
app.use("/user", userRouter);
app.use("/issue", issueRouter);
app.use("/notification", notificationRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});