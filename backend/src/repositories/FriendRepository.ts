import { prisma } from "../prismaClient.js";
import { NotificationRepository } from "./NotificationRepository.js";
import { Friendship, FriendshipStatus, User } from "@prisma/client";
import { Server } from "socket.io";

const notificationRepo = new NotificationRepository();

export class FriendRepository {
  constructor(private io?: Server) {} // Injection de l'instance Socket.IO

  private async getUserByLogin(login: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { login } });
    if (!user) throw new Error("Utilisateur introuvable");
    return user;
  }

  private async getUserById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("Utilisateur introuvable");
    return user;
  }

  async addFriend(userId: number, friendLogin: string): Promise<Friendship> {
    const friend = await this.getUserByLogin(friendLogin);
    const sender = await this.getUserById(userId);

    await prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId, friendId: friend.id, status: FriendshipStatus.REJECTED },
          { userId: friend.id, friendId: userId, status: FriendshipStatus.REJECTED },
        ],
      },
    });

    const existing = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId, friendId: friend.id },
          { userId: friend.id, friendId: userId },
        ],
      },
    });

    const blocking = existing.find(
      (e) => e.status === FriendshipStatus.PENDING || e.status === FriendshipStatus.ACCEPTED
    );
    if (blocking) throw new Error("Une demande existe déjà ou vous êtes déjà amis");

    const newFriendship = await prisma.friendship.create({
      data: { userId, friendId: friend.id, status: FriendshipStatus.PENDING },
    });

    const newNotification = await notificationRepo.createNotification(
      friend.id,
      `Vous avez reçu une demande d'ami de ${sender.login}`
    );

    if (this.io) {
      this.io.to(friend.id.toString()).emit("new-notification", newNotification);
    }

    return newFriendship;
  }

  async acceptFriend(userId: number, friendLogin: string): Promise<Friendship> {
    const friend = await this.getUserByLogin(friendLogin);
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId: friend.id },
          { userId: friend.id, friendId: userId },
        ],
        status: FriendshipStatus.PENDING,
      },
    });
    if (!friendship) throw new Error("Demande introuvable");

    const updatedFriendship = await prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: FriendshipStatus.ACCEPTED },
    });

    const sender = await this.getUserById(
      friendship.userId === userId ? friendship.friendId : friendship.userId
    );

    const newNotification = await notificationRepo.createNotification(
      sender.id,
      `Votre demande d'ami a été acceptée par ${friendLogin}`
    );

    if (this.io) {
      this.io.to(sender.id.toString()).emit("new-notification", newNotification);
    }

    return updatedFriendship;
  }

  async rejectFriend(userId: number, friendLogin: string): Promise<void> {
    const friend = await this.getUserByLogin(friendLogin);
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId: friend.id },
          { userId: friend.id, friendId: userId },
        ],
        status: FriendshipStatus.PENDING,
      },
    });

    if (!friendship) return;

    await prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: FriendshipStatus.REJECTED },
    });

    const sender = await this.getUserById(
      friendship.userId === userId ? friendship.friendId : friendship.userId
    );

    const newNotification = await notificationRepo.createNotification(
      sender.id,
      `Votre demande d'ami a été refusée par ${friend.login}`
    );

    if (this.io) {
      this.io.to(sender.id.toString()).emit("new-notification", newNotification);
    }
  }

  async removeFriend(userId: number, friendLogin: string): Promise<void> {
    const friend = await this.getUserByLogin(friendLogin);
    await prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId, friendId: friend.id },
          { userId: friend.id, friendId: userId },
        ],
      },
    });
  }

  async getFriends(userId: number): Promise<User[]> {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status: FriendshipStatus.ACCEPTED },
          { friendId: userId, status: FriendshipStatus.ACCEPTED },
        ],
      },
      include: { user: true, friend: true },
    });
    return friendships.map(f => (f.userId === userId ? f.friend : f.user)).filter(Boolean) as User[];
  }

  async getPendingRequests(userId: number) {
    return prisma.friendship.findMany({
      where: { friendId: userId, status: FriendshipStatus.PENDING },
      include: { user: true },
    });
  }

  async getUserFriendsByLogin(login: string) {
    const user = await this.getUserByLogin(login);
    const friends = await this.getFriends(user.id);
    return { ...user, friends };
  }

  async getSentRequests(userId: number) {
    return prisma.friendship.findMany({
      where: { userId, status: FriendshipStatus.PENDING },
      include: { friend: true },
    });
  }
}
