import express from "express";
import { createComment } from "../controller/commentController.js";
import { authMiddleWare } from "../middleWares/auth.js";
export const commentRounter = express.Router();

commentRounter.post("/", authMiddleWare, createComment);