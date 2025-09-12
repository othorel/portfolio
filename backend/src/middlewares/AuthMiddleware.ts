import type { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ success: false, message: "No token provided" });
  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Malformed token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }
    req.user = {
      userId: (decoded as any).userId as number,
      role: (decoded as any).role as string,
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
