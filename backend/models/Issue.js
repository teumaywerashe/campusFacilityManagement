import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "pending",
    },
}, { timestamps: true });

export default mongoose.model("Issue", issueSchema);