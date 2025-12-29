import prisma from "../config/db.js";
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
export const createIssue = async(req, res) => {
    const { userId, content } = req.body;
    try {
        if (!content) {
            return res
                .status(400)
                .json({ msg: "please write the content", success: false });
        }
        const issue = await prisma.issue.create({
            data: {
                image: req.file.filename,
                userId: parseInt(userId),
                content,
            },
        });
        res.status(201).json({ success: true, msg: "thankyou for your r", issue });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const getAllIssues = async(req, res) => {
    try {
        const issues = await prisma.issue.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, issues });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const getUserIssues = async(req, res) => {
    try {
        const { id } = req.params;
        const issues = await prisma.issue.findMany({
            where: { userId: parseInt(id) },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ issues, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const getSingleIssue = async(req, res) => {
    try {
        const { id } = req.params;
        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(id) },
        });

        if (!issue) {
            return res.status(404).json({ success: false, msg: "issue not found " });
        }
        res.status(200).json({
            success: true,
            issue,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const deleteIssue = async(req, res) => {
    try {
        const { id } = req.params;
        const issue = await prisma.issue.delete({ where: { id: parseInt(id) } });
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
        res.staut(500)({ success: false, msg: "server error" });
    }
};
export const updateIssue = async(req, res) => {
    try {
        const { status, isRead } = req.body;
        const updatedData = {};
        if (status !== undefined) updatedData.status = status;
        if (isRead !== undefined) updatedData.isRead = isRead;
        const { id } = req.params;
        const updatedIssue = await prisma.issue.update({
            where: { id: parseInt(id) },
            data: updatedData,
        });
        res.status(200).json({ updatedIssue, msg: "updated", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};