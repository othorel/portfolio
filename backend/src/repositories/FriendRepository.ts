import { Friendship, FriendshipStatus } from "@prisma/client";
import { prisma } from "../prismaClient.js";

export class FriendRepository {
  async addFriend(userId: number, friendId: number): Promise<Friendship> {
    return prisma.friendship.create({
      data: { userId, friendId, status: FriendshipStatus.PENDING },
    });
  }

  async acceptFriend(userId: number, friendId: number): Promise<Friendship> {
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
        status: FriendshipStatus.PENDING,
      },
    });

    if (!friendship) throw new Error("Friendship not found");

    return prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: FriendshipStatus.ACCEPTED },
    });
  }

  async rejectFriend(userId: number, friendId: number): Promise<Friendship> {
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
        status: FriendshipStatus.PENDING,
      },
    });

    if (!friendship) throw new Error("Friendship not found");

    return prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: FriendshipStatus.REJECTED },
    });
  }

  async removeFriend(userId: number, friendId: number): Promise<void> {
    await prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });
  }

  async getFriends(userId: number) {
  const friendships = await prisma.friendship.findMany({
    where: { 
      OR: [
        { userId, status: FriendshipStatus.ACCEPTED },
        { friendId: userId, status: FriendshipStatus.ACCEPTED }
      ]
    },
    include: { user: true, friend: true },
  });

  // Retourne uniquement les objets valides
  return friendships.map((f: { userId: number; friendId: number; user: any; friend: any }) => {
    if (f.userId === userId) return f.friend;
    return f.user;
  }).filter(Boolean);
}

  async getPendingRequests(userId: number) {
    return prisma.friendship.findMany({
      where: { friendId: userId, status: FriendshipStatus.PENDING },
      include: { user: true },
    });
  }
}
