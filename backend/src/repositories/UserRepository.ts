import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const prisma = new PrismaClient();
const scrypt = promisify(_scrypt);

export class UserRepository {

private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString("hex")}`;
}

private async verifyPassword(stored: string, password: string): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 2)
    return false;
  const salt = parts[0];
  const key = parts[1];
  if (!salt || !key)
    return false;
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return key === derivedKey.toString("hex");
}

async getAll(): Promise<User[]> {
    return prisma.user.findMany();
}

async getById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
}

async getByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
}

async create(data: { login: string; email: string; password: string; avatar?: string }): Promise<User> {
  const hashedPassword = await this.hashPassword(data.password);
  return prisma.user.create({
    data: {
      login: data.login,
      email: data.email,
      passwordHash: hashedPassword,
      avatar: data.avatar || "",
    },
  });
}

async update(id: number, data: { name?: string; email?: string; password?: string; avatar?: string }): Promise<User> {
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await this.hashPassword(data.password);
    }
    return prisma.user.update({ where: { id }, data: updateData });
}

async delete(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
}

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
