import express from "express";
import multer from "multer";
import { createIssue, deleteIssue, getAllIssues, getUserIssues, updateIssue } from "../controller/issueController.js";
import { authMiddleWare } from "../middleWares/auth.js";

export const issueRouter = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

issueRouter.route("/report").post(authMiddleWare, upload.single("image"), createIssue);
issueRouter.route("/get").get(authMiddleWare, getAllIssues);
issueRouter.route("/get/:id").get(authMiddleWare, getUserIssues);
issueRouter.route("/remove/:id").delete(authMiddleWare, deleteIssue);
issueRouter.route("/update/:id").patch(authMiddleWare, updateIssue);
