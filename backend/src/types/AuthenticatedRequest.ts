import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}