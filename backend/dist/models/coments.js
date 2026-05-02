import mongoose, { Schema } from "mongoose";
const CommentSchema = new Schema({
    reportId: { type: Schema.Types.ObjectId, ref: "Report", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model("Comment", CommentSchema);
