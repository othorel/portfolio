import type { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository.js";

const userRepo = new UserRepository();

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userRepo.getAllUser();
    res.json({ success: true, users });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = parseInt(id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: "User ID must be a number" });
  }
  try {
    const user = await userRepo.getByIdUser(userId);
    if (!user) 
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  if (!email) 
    return res.status(400).json({ success: false, message: "Email is required" });
  try {
    const user = await userRepo.getByEmailUser(email);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { login, email, password, avatar } = req.body;
  if (!login || !email || !password) {
    return res.status(400).json({ success: false, message: "Login, email and password are required" });
  }
  try {
    const user = await userRepo.createUser({ login, email, password, avatar });
    res.status(201).json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);
  const { id } = req.params;
  const userId = parseInt(id, 10);
  if (isNaN(userId))
    return res.status(400).json({ success: false, message: "User ID must be a number" });
  const { login, email, password, status, role } = req.body;
  let avatar: string | undefined;
  if (req.file) {
    avatar = `/uploads/avatars/${req.file.filename}`;
  }

  try {
    const user = await userRepo.updateUser(userId, { login, email, password, avatar, status, role });
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = parseInt(id, 10);
  if (isNaN(userId))
    return res.status(400).json({ success: false, message: "User ID must be a number" });
  try {
    const user = await userRepo.deleteUser(userId);
    res.json({ success: true, message: "User deleted", user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
