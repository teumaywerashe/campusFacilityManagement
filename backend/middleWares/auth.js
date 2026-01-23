import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authMiddleWare = async(req, res, next) => {
    try {
        // if (req.method === "OPTIONS") return next();
        const token = req.headers.token;
        // console.log("token", token);

        if (!token) return res.status(401).json({ msg: "No token" });
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(payload.id).select('-password')
        req.userId = user

        next();
    } catch (error) {
        console.log(error);
    }
};