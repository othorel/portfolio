import { prisma } from "../prismaClient.js";
import { MessageStatus } from "@prisma/client";

export class ChatRepository {
  async getUsersByLogins(logins: string[]) {
    return prisma.user.findMany({
      where: { login: { in: logins } },
    });
  }

  async createConversation(userIds: number[], title?: string, isGroup = false) {
    return prisma.conversation.create({
      data: {
        title,
        isGroup,
        participants: { create: userIds.map(uid => ({ userId: uid })) },
      },
      include: { participants: true },
    });
  }

  async sendMessage(conversationId: number, senderId: number, content: string) {
    return prisma.message.create({
      data: { conversationId, senderId, content, status: MessageStatus.SENT },
    });
  }

  async getMessages(conversationId: number, limit = 50) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { sender: true },
    });
  }

  async getUserConversations(userId: number) {
  return prisma.conversationParticipant.findMany({
    where: { userId },
    include: {
      conversation: {
        include: {
          messages: { 
            take: 1, 
            orderBy: { createdAt: "desc" },
            include: { sender: true }
          },
          participants: { include: { user: true } },
        },
      },
    },
  });
}
}