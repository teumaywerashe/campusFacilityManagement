import { Readable } from "stream";
import Issue from "../models/Issue.js";
import Notification from "../models/Notification.js";
import cloudinary from "../config/cloudinary.js";
/** Upload a buffer to Cloudinary and return the secure URL */
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: "campus-facility-reports" }, (error, result) => {
            if (error || !result)
                return reject(error ?? new Error("Upload failed"));
            resolve(result.secure_url);
        });
        Readable.from(buffer).pipe(uploadStream);
    });
};
export const createIssue = async (req, res) => {
    try {
        const { userId, content } = req.body;
        if (!content) {
            res.status(400).json({ msg: "please write the content", success: false });
            return;
        }
        if (!req.file) {
            res.status(400).json({ success: false, msg: "image is required" });
            return;
        }
        // Upload buffer to Cloudinary and get back the secure URL
        const imageUrl = await uploadToCloudinary(req.file.buffer);
        console.log("[Cloudinary] Uploaded URL:", imageUrl);
        const issue = await Issue.create({ image: imageUrl, userId, content });
        await Notification.create({
            receiverId: userId,
            content: `We have received your report: "${content.substring(0, 20)}...". Thank you.`,
            reportId: issue._id,
        });
        res.status(201).json({ success: true, msg: "thank you for your report", issue });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find()
            .sort({ createdAt: -1 })
            .populate("userId", "name email")
            .populate({ path: "comments", populate: { path: "userId", select: "name email" } });
        res.status(200).json({ success: true, issues });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const getUserIssues = async (req, res) => {
    try {
        const { id } = req.params;
        const issues = await Issue.find({ userId: id })
            .sort({ createdAt: -1 })
            .populate("userId", "name email")
            .populate({ path: "comments", populate: { path: "userId", select: "name email" } })
            .lean();
        res.status(200).json({ issues, success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const getSingleIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const issue = await Issue.findById(id);
        if (!issue) {
            res.status(404).json({ success: false, msg: "issue not found" });
            return;
        }
        res.status(200).json({ success: true, issue });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const deleteIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            res.status(404).json({ success: false, msg: "issue not found" });
            return;
        }
        // Delete image from Cloudinary using the public_id extracted from the URL
        if (issue.image) {
            try {
                // Extract public_id from Cloudinary URL (e.g. "campus-facility-reports/abc123")
                const urlParts = issue.image.split("/");
                const folderAndFile = urlParts.slice(-2).join("/");
                const publicId = folderAndFile.replace(/\.[^/.]+$/, ""); // strip extension
                await cloudinary.uploader.destroy(publicId);
            }
            catch (err) {
                console.log("Could not delete image from Cloudinary:", err);
            }
        }
        res.status(200).json({ success: true, msg: "removed", issue });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
export const updateIssue = async (req, res) => {
    try {
        const { status, isRead } = req.body;
        const { id } = req.params;
        const updatedData = {};
        if (status !== undefined)
            updatedData.status = status;
        if (isRead !== undefined)
            updatedData.isRead = isRead;
        const updatedIssue = await Issue.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({ updatedIssue, msg: "updated", success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
