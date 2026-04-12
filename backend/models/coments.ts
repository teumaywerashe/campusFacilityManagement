import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  reportId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
}

const CommentSchema = new Schema<IComment>(
  {
    reportId: { type: Schema.Types.ObjectId, ref: "Report", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
