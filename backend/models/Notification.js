import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);