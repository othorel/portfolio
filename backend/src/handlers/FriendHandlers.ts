// controllers/friendController.ts
import type { Response } from "express";
import { FriendRepository } from "../repositories/FriendRepository.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";

const friendRepo = new FriendRepository();

export const addFriend = async (req: AuthenticatedRequest, res: Response) => {
  const { friendLogin } = req.body;
  const userId = req.user?.userId;
  if (!userId || !friendLogin) {
    return res.status(400).json({ success: false, message: "userId et friendLogin sont requis" });
  }
  try {
    const friendship = await friendRepo.addFriend(userId, friendLogin);
    res.json({ success: true, friendship });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const acceptFriend = async (req: AuthenticatedRequest, res: Response) => {
  const { friendLogin } = req.body;
  const userId = req.user?.userId;
  if (!userId || !friendLogin) {
    return res.status(400).json({ success: false, message: "userId et friendLogin sont requis" });
  }
  try {
    const friendship = await friendRepo.acceptFriend(userId, friendLogin);
    res.json({ success: true, friendship });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const rejectFriend = async (req: AuthenticatedRequest, res: Response) => {
  const { friendLogin } = req.body;
  const userId = req.user?.userId;
  if (!userId || !friendLogin) {
    return res.status(400).json({ success: false, message: "userId et friendLogin sont requis" });
  }
  try {
    await friendRepo.rejectFriend(userId, friendLogin);
    res.json({ success: true, message: "Demande rejetée" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeFriend = async (req: AuthenticatedRequest, res: Response) => {
  const { friendLogin } = req.body;
  const userId = req.user?.userId;
  if (!userId || !friendLogin) {
    return res.status(400).json({ success: false, message: "userId et friendLogin sont requis" });
  }
  try {
    await friendRepo.removeFriend(userId, friendLogin);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFriends = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(400).json({ success: false, message: "userId est requis" });
  }
  try {
    const friends = await friendRepo.getFriends(userId);
    res.json({ success: true, friends });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPendingRequests = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(400).json({ success: false, message: "userId est requis" });
  }
  try {
    const requests = await friendRepo.getPendingRequests(userId);
    res.json({ success: true, requests });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserWithFriends = async (req: AuthenticatedRequest, res: Response) => {
  const { login } = req.query;
  if (!login || typeof login !== "string") {
    return res.status(400).json({ success: false, message: "login est requis" });
  }

  try {
    const selectedUser = await friendRepo.getUserFriendsByLogin(login);
    res.json({ success: true, user: selectedUser });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};
