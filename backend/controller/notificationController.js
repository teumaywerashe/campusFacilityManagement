import prisma from "../config/db.js";

export const getNotifications = async(req, res) => {
    try {
        const receiverId = Number(req.params.id);

        if (!receiverId) {
            return res.status(400).json({ success: false, msg: "receiverId is required" });
        }
        const notifications = await prisma.notification.findMany({
            where: { receiverId: parseInt(receiverId) },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};

export const createNotification = async(req, res) => {
    const { receiverId, content, reportId } = req.body;
    try {
        if (!receiverId || !content || !reportId) {
            return res
                .status(400)
                .json({ success: false, msg: "Missing required fields" });
        }
        const notification = await prisma.notification.create({
            data: {
                receiverId: parseInt(receiverId),
                reportId: parseInt(reportId),
                content,
            },
        });
        res.status(201).json({ success: true, notification });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false });
    }
};

export const updateNotification = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedNotification = await prisma.notification.update({
            where: { id: parseInt(id) },
            data: { isRead: true },
        });
        res.status(200).json({ updatedNotification, msg: 'updated', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const deleteNotification = async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await prisma.notification.delete({
            where: { id: parseInt(id) },
        });
        res
            .status(200)
            .json({ success: true, deleted, msg: "deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};


export const getAllNotifications = async(req, res) => {
    try {
        const notifications = await prisma.notification.findMany({ orderBy: { createdAt: "desc" } })
        res.status(200).json({
            success: true,
            notifications
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error", success: false })
    }
}