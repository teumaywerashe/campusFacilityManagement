import mongoose, { Schema } from "mongoose";
const notificationSchema = new Schema({
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportId: { type: Schema.Types.ObjectId, ref: "Issue", required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model("Notification", notificationSchema);
