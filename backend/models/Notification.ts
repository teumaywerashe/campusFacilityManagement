import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  receiverId: mongoose.Types.ObjectId;
  reportId: mongoose.Types.ObjectId;
  content: string;
  isRead: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportId: { type: Schema.Types.ObjectId, ref: "Issue", required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>("Notification", notificationSchema);
