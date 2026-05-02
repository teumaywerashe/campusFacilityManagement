import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(401).json({ msg: "No token" });
            return;
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select("-password");
        if (!user) {
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }
        req.userId = String(user._id);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Unauthorized" });
    }
};
