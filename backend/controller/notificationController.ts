import { Request, Response } from "express";
import Notification from "../models/Notification.js";

export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: receiverId } = req.params;
    if (!receiverId) {
      res.status(400).json({ success: false, msg: "receiverId is required" });
      return;
    }
    const notifications = await Notification.find({ receiverId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error", success: false });
  }
};

export const createNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { receiverId, content, reportId } = req.body as {
      receiverId: string;
      content: string;
      reportId: string;
    };

    if (!receiverId || !content || !reportId) {
      res.status(400).json({ success: false, msg: "Missing required fields" });
      return;
    }

    const notification = await Notification.create({ receiverId, reportId, content });
    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error", success: false });
  }
};

export const updateNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json({ updatedNotification, msg: "updated", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};

export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Notification.findByIdAndDelete(id);
    res.status(200).json({ success: true, deleted, msg: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};

export const getAllNotifications = async (_req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error", success: false });
  }
};
