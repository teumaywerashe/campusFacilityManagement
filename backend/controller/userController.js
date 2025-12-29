import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ================= REGISTER ================= */
export const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, msg: "Invalid email ❌" });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(200).json({
                success: false,
                msg: "User already exists. Please log in instead.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET, { expiresIn: "24h" }
        );

        res.status(201).json({
            success: true,
            msg: "user registered successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

/* ================= LOGIN ================= */
export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(200).json({ success: false, msg: "Invalid email ❌" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(200)
                .json({ success: false, msg: "user doesn't exist" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res
                .status(200)
                .json({ success: false, msg: "wrong password please try again" });
        }

        const token = jwt.sign({ id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET, { expiresIn: "24h" }
        );

        res.status(200).json({
            success: true,
            msg: "logged in successfully",
            token,
            user,
            role: user.role,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};

/* ================= GET USER ================= */
export const getUser = async(req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({ success: false, msg: "user not found" });
        }

        res.status(200).json({ success: true, msg: "user found", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};