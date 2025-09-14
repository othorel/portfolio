import type { Response } from "express";
import { NotificationRepository } from "../repositories/NotificationRepository.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";

const notificationRepo = new NotificationRepository();

export const getUserNotifications = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(400).json({ success: false, message: "userId est requis" });
  }

  try {
    const notifications = await notificationRepo.getUserNotifications(userId);
    res.json({ success: true, notifications });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markNotificationAsRead = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const notificationId = parseInt(req.params.id, 10);

  if (!userId || isNaN(notificationId)) {
    return res.status(400).json({ success: false, message: "userId et notificationId sont requis" });
  }

  try {
    // ✅ Correction : on ne passe que notificationId
    const updated = await notificationRepo.markAsRead(notificationId);
    res.json({ success: true, notification: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteNotification = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const notificationId = parseInt(req.params.id, 10);

  if (!userId || isNaN(notificationId)) {
    return res.status(400).json({ success: false, message: "userId et notificationId sont requis" });
  }

  try {
    // ✅ Correction : on ne passe que notificationId
    await notificationRepo.deleteNotification(notificationId);
    res.json({ success: true, message: "Notification supprimée" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
