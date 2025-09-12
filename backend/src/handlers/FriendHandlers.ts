import type { Response } from "express";
import { FriendRepository } from "../repositories/FriendRepository.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { prisma } from "../prismaClient.js";

const friendRepo = new FriendRepository();

export const addFriend = async (req: AuthenticatedRequest, res: Response) => {
  const { friendLogin } = req.body;
  const userId = req.user?.userId;

  if (!userId || !friendLogin) {
    return res.status(400).json({ success: false, message: "userId et friendLogin sont requis" });
  }
  try {
    const friend = await prisma.user.findUnique({ where: { login: friendLogin } });
    if (!friend) {
      return res.status(404).json({ success: false, message: "Utilisateur introuvable" });
    }
    const existing = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId: friend.id },
          { userId: friend.id, friendId: userId }
        ]
      }
    });
    if (existing) {
      return res.status(400).json({ success: false, message: "Une demande existe déjà ou vous êtes déjà amis" });
    }
    const friendship = await friendRepo.addFriend(userId, friend.id);
    res.json({ success: true, friendship });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const acceptFriend = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ success: false, message: "userId et friendId sont requis" });
  }

  try {
    const friendship = await friendRepo.acceptFriend(userId, Number(friendId));
    res.json({ success: true, friendship });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const rejectFriend = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ success: false, message: "userId et friendId sont requis" });
  }

  try {
    const friendship = await friendRepo.rejectFriend(userId, Number(friendId));
    res.json({ success: true, friendship });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeFriend = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ success: false, message: "userId et friendId sont requis" });
  }

  try {
    await friendRepo.removeFriend(userId, Number(friendId));
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
