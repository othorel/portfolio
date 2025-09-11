import { PrismaClient, User } from "@prisma/client";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { generateToken } from "../utils/JwtUtils.js";

const DEFAULT_AVATAR = "/avatars/default.png";
const prisma = new PrismaClient();
const scrypt = promisify(_scrypt);

export class AuthRepository {

	async hashPassword(password: string): Promise<string> {
		const salt = randomBytes(16).toString("hex");
		const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
		return `${salt}:${derivedKey.toString("hex")}`;
	}

  	private async verifyPassword(stored: string, password: string): Promise<boolean> {
		const [salt, key] = stored.split(":");
		if (!salt || !key)
			return false;
		const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
		return key === derivedKey.toString("hex");
	  }

	async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user)
			return null;
		const isValid = await this.verifyPassword(user.passwordHash, password);
		if (!isValid)
			return null;
		const token = generateToken(user.id);
		return { user, token };
 	 }

	async signup(login: string, email: string, password: string): Promise<{ user: User; token: string } | null> {
  		const exists = await prisma.user.findFirst({
    		where: {
    		OR: [{ email }, { login }],
    		},
  		});
  		if (exists)
    		throw new Error("Email ou login déjà utilisé");
  		const passwordHash = await this.hashPassword(password);
 		const user = await prisma.user.create({
    		data: {
      		login,
      		email,
      		passwordHash,
      		role: "USER",
			avatar: DEFAULT_AVATAR,
    	},
  	});
	const token = generateToken(user.id);
  	return { user, token };
	}

  	async emailExists(email: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { email } });
		return !!user;
 	 }

	async loginExists(login: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { login } });
		return !!user;
	}
}
