import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/AuthRepository.js";
import { getPasswordRequirements, validatePassword } from "../utils/PasswordUtils.js";

const authRepo = new AuthRepository();
const JWT_SECRET = process.env.JWT_SECRET!;

export const login = async (req: Request, res: Response) => {
  console.log("Login request received:", req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Login failed: missing email or password");
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  try {
    const user = await authRepo.login(email, password);
    if (!user) {
      console.log("Login failed: invalid credentials for email", email);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Login successful for user:", user.id, "Token:", token);
    res.json({ success: true, user, token });
  } catch (err: any) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { login, email, password } = req.body;
  if (!login || !email || !password) 
    return res.status(400).json({ success: false, message: "Champs requis manquants" });
  if (!validatePassword(password))
    return res.status(400).json({ success: false, message: getPasswordRequirements() });
  try {
    const user = await authRepo.signup(login, email, password);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    console.log("Signup successful for user:", user.id, "Token:", token);
    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (err: any) {
    console.error("Signup error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  try {
    const exists = await authRepo.emailExists(email);
    res.json({ success: true, exists });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const checkLogin = async (req: Request, res: Response) => {
  const { login } = req.params;
  if (!login) {
    return res.status(400).json({ success: false, message: "Login is required" });
  }
  try {
    const exists = await authRepo.loginExists(login);
    res.json({ success: true, exists });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
