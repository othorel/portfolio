// repositories/FriendRepository.ts
import { prisma } from "../prismaClient.js";
import { Friendship, FriendshipStatus } from "@prisma/client";

export class FriendRepository {

  private async getUserByLogin(login: string) {
    const user = await prisma.user.findUnique({ where: { login } });
    if (!user)
      throw new Error("Utilisateur introuvable");
    return user;
  }

  async addFriend(userId: number, friendLogin: string): Promise<Friendship> {
  const friend = await this.getUserByLogin(friendLogin);

  // Supprime toute demande REJECTED précédente
  await prisma.friendship.deleteMany({
    where: {
      OR: [
        { userId, friendId: friend.id, status: FriendshipStatus.REJECTED },
        { userId: friend.id, friendId: userId, status: FriendshipStatus.REJECTED },
      ],
    },
  });

  // Vérifie si une demande PENDING ou ACCEPTED existe
  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { userId, friendId: friend.id },
        { userId: friend.id, friendId: userId },
      ],
      status: {
        in: [FriendshipStatus.PENDING, FriendshipStatus.ACCEPTED],
      },
    },
  });

  if (existing) {
    throw new Error("Une demande existe déjà ou vous êtes déjà amis");
  }

  // Crée une nouvelle demande
  return prisma.friendship.create({
    data: { userId, friendId: friend.id, status: FriendshipStatus.PENDING },
  });
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
    if (!friendship)
      throw new Error("Friendship not found");

    return prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: FriendshipStatus.ACCEPTED },
    });
  }

  async rejectFriend(userId: number, friendLogin: string): Promise<void> {
  const friend = await this.getUserByLogin(friendLogin);
  await prisma.friendship.deleteMany({
    where: {
      OR: [
        { userId, friendId: friend.id, status: FriendshipStatus.PENDING },
        { userId: friend.id, friendId: userId, status: FriendshipStatus.PENDING },
      ],
    },
  });
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

  async getFriends(userId: number) {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status: FriendshipStatus.ACCEPTED },
          { friendId: userId, status: FriendshipStatus.ACCEPTED },
        ],
      },
      include: { user: true, friend: true },
    });

    return friendships
      .map(f => (f.userId === userId ? f.friend : f.user))
      .filter(Boolean);
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
}
