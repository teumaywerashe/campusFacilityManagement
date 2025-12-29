import Issue from "../models/Issue.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= CREATE ISSUE ================= */
export const createIssue = async(req, res) => {
    try {
        const { userId, content } = req.body;

        if (!content) {
            return res
                .status(400)
                .json({ msg: "please write the content", success: false });
        }

        const issue = await Issue.create({
            image: req.file.filename,
            userId,
            content,
        });

        res.status(201).json({
            success: true,
            msg: "thank you for your report",
            issue,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

/* ================= GET ALL ISSUES ================= */
export const getAllIssues = async(req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, issues });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

/* ================= GET USER ISSUES ================= */
export const getUserIssues = async(req, res) => {
    try {
        const { id } = req.params;

        const issues = await Issue.find({ userId: id })
            .sort({ createdAt: -1 });

        res.status(200).json({ issues, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

/* ================= GET SINGLE ISSUE ================= */
export const getSingleIssue = async(req, res) => {
    try {
        const { id } = req.params;

        const issue = await Issue.findById(id);

        if (!issue) {
            return res
                .status(404)
                .json({ success: false, msg: "issue not found" });
        }

        res.status(200).json({ success: true, issue });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

/* ================= DELETE ISSUE ================= */
export const deleteIssue = async(req, res) => {
    try {
        const { id } = req.params;

        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            return res
                .status(404)
                .json({ success: false, msg: "issue not found" });
        }

        const filePath = path.join(__dirname, "..", "uploads", issue.image);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("File not found or could not be deleted:", err);
            } else {
                console.log("File deleted successfully");
            }
        });

        res.status(200).json({ success: true, msg: "removed", issue });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

/* ================= UPDATE ISSUE ================= */
export const updateIssue = async(req, res) => {
    try {
        const { status, isRead } = req.body;
        const { id } = req.params;

        const updatedData = {};
        if (status !== undefined) updatedData.status = status;
        if (isRead !== undefined) updatedData.isRead = isRead;

        const updatedIssue = await Issue.findByIdAndUpdate(
            id,
            updatedData, { new: true }
        );

        res.status(200).json({
            updatedIssue,
            msg: "updated",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};