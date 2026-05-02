import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    profileImage: { type: String, default: "admin.jpg" },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
}, { timestamps: true });
export default mongoose.model("User", userSchema);
