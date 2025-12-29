import Notification from "../models/Notification.js";

/* ================= GET USER NOTIFICATIONS ================= */
export const getNotifications = async(req, res) => {
    try {
        const receiverId = req.params.id;

        if (!receiverId) {
            return res
                .status(400)
                .json({ success: false, msg: "receiverId is required" });
        }

        const notifications = await Notification.find({ receiverId })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};

/* ================= CREATE NOTIFICATION ================= */
export const createNotification = async(req, res) => {
    try {
        const { receiverId, content, reportId } = req.body;

        if (!receiverId || !content || !reportId) {
            return res
                .status(400)
                .json({ success: false, msg: "Missing required fields" });
        }

        const notification = await Notification.create({
            receiverId,
            reportId,
            content,
        });

        res.status(201).json({ success: true, notification });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};

/* ================= UPDATE NOTIFICATION (MARK AS READ) ================= */
export const updateNotification = async(req, res) => {
    try {
        const { id } = req.params;

        const updatedNotification = await Notification.findByIdAndUpdate(
            id, { isRead: true }, { new: true }
        );

        res
            .status(200)
            .json({ updatedNotification, msg: "updated", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

/* ================= DELETE NOTIFICATION ================= */
export const deleteNotification = async(req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Notification.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            deleted,
            msg: "deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

/* ================= GET ALL NOTIFICATIONS ================= */
export const getAllNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};