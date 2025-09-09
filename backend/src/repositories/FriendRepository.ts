import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class FriendRepository {
    
  async addFriend(userId: number, friendId: number): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: friendId },
        },
      },
    });
  }

  async removeFriend(userId: number, friendId: number): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        friends: {
          disconnect: { id: friendId },
        },
      },
    });
  }

  async getFriends(userId: number): Promise<User[]> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });
    return user?.friends || [];
  }
}
