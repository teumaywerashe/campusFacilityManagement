import { Response } from "express";
import { AuthRequest } from "../middleWares/auth.js";
import Issue from "../models/Issue.js";
import Notification from "../models/Notification.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createIssue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId, content } = req.body as { userId: string; content: string };

    if (!content) {
      res.status(400).json({ msg: "please write the content", success: false });
      return;
    }
    if (!req.file) {
      res.status(400).json({ success: false, msg: "image is required" });
      return;
    }

    const issue = await Issue.create({ image: req.file.filename, userId, content });

    await Notification.create({
      receiverId: userId,
      content: `We have received your report: "${content.substring(0, 20)}...". Thank you.`,
      reportId: issue._id,
    });

    res.status(201).json({ success: true, msg: "thank you for your report", issue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};

export const getAllIssues = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const issues = await Issue.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate({ path: "comments", populate: { path: "userId", select: "name email" } });
    res.status(200).json({ success: true, issues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};

export const getUserIssues = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const issues = await Issue.find({ userId: id })
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate({ path: "comments", populate: { path: "userId", select: "name email" } })
      .lean();
    res.status(200).json({ issues, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};

export const getSingleIssue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) {
      res.status(404).json({ success: false, msg: "issue not found" });
      return;
    }
    res.status(200).json({ success: true, issue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};

export const deleteIssue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      res.status(404).json({ success: false, msg: "issue not found" });
      return;
    }

    const filePath = path.join(__dirname, "..", "uploads", issue.image);
    fs.unlink(filePath, (err) => {
      if (err) console.log("File not found or could not be deleted:", err);
      else console.log("File deleted successfully");
    });

    res.status(200).json({ success: true, msg: "removed", issue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};

export const updateIssue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, isRead } = req.body as { status?: string; isRead?: boolean };
    const { id } = req.params;

    const updatedData: { status?: string; isRead?: boolean } = {};
    if (status !== undefined) updatedData.status = status;
    if (isRead !== undefined) updatedData.isRead = isRead;

    const updatedIssue = await Issue.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ updatedIssue, msg: "updated", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};
