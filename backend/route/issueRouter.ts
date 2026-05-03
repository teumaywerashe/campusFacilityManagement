import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { createIssue, deleteIssue, getAllIssues, getUserIssues, updateIssue } from "../controller/issueController.js";
import { authMiddleWare } from "../middleWares/auth.js";

export const issueRouter = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "campus-facility-reports",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  } as object,
});

const upload = multer({ storage });

issueRouter.route("/report").post(authMiddleWare, upload.single("image"), createIssue);
issueRouter.route("/get").get(authMiddleWare, getAllIssues);
issueRouter.route("/get/:id").get(authMiddleWare, getUserIssues);
issueRouter.route("/remove/:id").delete(authMiddleWare, deleteIssue);
issueRouter.route("/update/:id").patch(authMiddleWare, updateIssue);
