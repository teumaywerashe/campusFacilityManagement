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

issueSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "reportId",
});

issueSchema.set("toJSON", { virtuals: true });
issueSchema.set("toObject", { virtuals: true });

export default mongoose.model("Issue", issueSchema);