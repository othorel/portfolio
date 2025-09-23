import { Response } from "express";
import { ChatRepository } from "../repositories/ChatRepository.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";

const chatRepo = new ChatRepository();

// Crée une conversation 1:1 ou de groupe
export const createConversation = async (req: AuthenticatedRequest, res: Response) => {
  const { participantLogins, title } = req.body;
  const userId = req.user?.userId;

  if (!userId || !participantLogins || !Array.isArray(participantLogins)) {
    return res.status(400).json({ success: false, message: "Paramètres invalides" });
  }

  try {
    // Convert logins en IDs via Prisma
    const users = await chatRepo.getUsersByLogins(participantLogins);
    const participantIds = users.map(u => u.id);
    const conversation = await chatRepo.createConversation([userId, ...participantIds], title);
    res.json({ success: true, conversation });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  const { conversationId, content } = req.body;
  const userId = req.user?.userId;

  if (!userId || !conversationId || !content) {
    return res.status(400).json({ success: false, message: "Paramètres invalides" });
  }

  try {
    const message = await chatRepo.sendMessage(conversationId, userId, content);
    res.json({ success: true, message });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMessages = async (req: AuthenticatedRequest, res: Response) => {
  const conversationId = Number(req.query.conversationId);
  if (!conversationId) {
    return res.status(400).json({ success: false, message: "conversationId requis" });
  }

  try {
    const messages = await chatRepo.getMessages(conversationId);
    res.json({ success: true, messages });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getConversations = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ success: false, message: "Non autorisé" });

  try {
    const convParticipants = await chatRepo.getUserConversations(userId);

    const conversations = convParticipants.map(cp => ({
      id: cp.conversation.id,
      title: cp.conversation.title,
      isGroup: cp.conversation.isGroup,
      participants: cp.conversation.participants.map(p => ({
        id: p.userId,
        login: p.user?.login,
        email: p.user?.email,
        avatar: p.user?.avatar,
      })),
      messages: cp.conversation.messages.map(m => ({
        id: m.id,
        conversationId: m.conversationId,
        senderId: m.senderId,
        content: m.content,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
        sender: m.sender
          ? {
              id: m.sender.id,
              login: m.sender.login,
              email: m.sender.email,
              avatar: m.sender.avatar,
            }
          : undefined,
      })),
    }));

    res.json({ success: true, conversations });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
