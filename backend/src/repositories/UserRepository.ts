import { PrismaClient, Role, User } from "@prisma/client";
import { AuthRepository } from "./AuthRepository.js";

const prisma = new PrismaClient();
const authRepo = new AuthRepository();

export class UserRepository {

  async getAllUser(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getByIdUser(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async getByEmailUser(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: { login: string; email: string; password: string; avatar?: string }): Promise<User> {
    const hashedPassword = await authRepo.hashPassword(data.password);
    return prisma.user.create({
      data: {
        login: data.login,
        email: data.email,
        passwordHash: hashedPassword,
        avatar: data.avatar || "",
      },
    });
  }

  async updateUser(
    id: number,
    data: { login?: string; email?: string; password?: string; avatar?: string; status?: string; role?: Role }
  ): Promise<User> {
    const updateData: any = {};
    if (data.login) updateData.login = data.login;
    if (data.email) updateData.email = data.email;
    if (data.avatar) updateData.avatar = data.avatar;
    if (data.status) updateData.status = data.status;
    if (data.role) updateData.role = data.role;
    if (data.password) {
      updateData.passwordHash = await authRepo.hashPassword(data.password);
    }
    return prisma.user.update({ where: { id }, data: updateData });
  }

  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
