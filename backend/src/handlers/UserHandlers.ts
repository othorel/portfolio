import type { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository.js";

const userRepo = new UserRepository();

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userRepo.getAll();
    res.json({ success: true, users });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }
  const userId = parseInt(id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: "User ID must be a number" });
  }
  try {
    const user = await userRepo.getById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "Name and email are required" });
  try {
    const user = await userRepo.create({ login: name, email, password });
    res.status(201).json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
