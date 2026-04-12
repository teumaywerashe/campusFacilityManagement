import { Response } from "express";
import { AuthRequest } from "../middleWares/auth.js";
import Comment from "../models/coments.js";

export const createComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content, reportId } = req.body as { content: string; reportId: string };

    const comment = await Comment.create({ content, reportId, userId: req.userId });
    if (!comment) {
      res.status(404).json({ success: false, msg: "no comment created" });
      return;
    }
    res.status(201).json({ success: true, comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error", success: false });
  }
};

export const deleteComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      res.status(404).json({ success: false, msg: "comment not found" });
      return;
    }
    res.status(200).json({ success: true, comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error" });
  }
};
