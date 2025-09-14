import { prisma } from "../prismaClient.js";
import { Notification } from "@prisma/client";

export class NotificationRepository {

  async createNotification(userId: number, message: string): Promise<Notification> {
    return prisma.notification.create({
      data: {
        userId,
        message,
      },
    });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async deleteNotification(notificationId: number): Promise<void> {
    await prisma.notification.delete({
      where: { id: notificationId },
    });
  }
}
