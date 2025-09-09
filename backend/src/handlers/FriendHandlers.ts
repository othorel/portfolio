import type { Request, Response } from "express";
import { FriendRepository } from "../repositories/FriendRepository.js";

const friendRepo = new FriendRepository();

export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId) {
    return res.status(400).json({ success: false, message: "userId et friendId sont requis" });
  }
  try {
    const updatedUser = await friendRepo.addFriend(Number(userId), Number(friendId));
    res.json({ success: true, user: updatedUser });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId) {
    return res.status(400).json({ success: false, message: "userId et friendId sont requis" });
  }
  try {
    const updatedUser = await friendRepo.removeFriend(Number(userId), Number(friendId));
    res.json({ success: true, user: updatedUser });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFriends = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ success: false, message: "userId est requis" });
  }
  try {
    const friends = await friendRepo.getFriends(Number(userId));
    res.json({ success: true, friends });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
