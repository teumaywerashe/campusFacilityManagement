import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export const forgotPassword = async(req, res) => {
    try {
        const { email } = req.body;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, msg: "Invalid email ❌" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ success: false, msg: "No account found with that email." });
        }

        // Generate a secure token
        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Campus Facility" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Reset Your Password",
            html: `
                <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
                    <h2 style="color:#4f46e5;">Password Reset Request</h2>
                    <p>Hi <strong>${user.name}</strong>,</p>
                    <p>We received a request to reset your password. Click the button below to set a new one. This link expires in <strong>30 minutes</strong>.</p>
                    <a href="${resetLink}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;">Reset Password</a>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                </div>
            `,
        });

        res.status(200).json({ success: true, msg: "Password reset email sent. Check your inbox." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async(req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, msg: "Reset link is invalid or has expired." });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, msg: "Password reset successfully. You can now log in." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};