import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

interface JwtPayload {
  id: string;
  role: string;
  email: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleWare = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.token as string;

    if (!token) {
      res.status(401).json({ msg: "No token" });
      return;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }

    req.userId = String(user._id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Unauthorized" });
  }
};
