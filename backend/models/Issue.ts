import mongoose, { Document, Schema } from "mongoose";

export interface IIssue extends Document {
  content: string;
  image: string;
  userId: mongoose.Types.ObjectId;
  isRead: boolean;
  status: string;
  comments?: IComment[];
}

export interface IComment extends Document {
  content: string;
  userId: mongoose.Types.ObjectId | { _id: string; name: string; email: string };
  reportId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const issueSchema = new Schema<IIssue>(
  {
    content: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isRead: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

issueSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "reportId",
});

issueSchema.set("toJSON", { virtuals: true });
issueSchema.set("toObject", { virtuals: true });

export default mongoose.model<IIssue>("Issue", issueSchema);
