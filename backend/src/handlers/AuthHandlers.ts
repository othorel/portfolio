import type { Request, Response } from "express";
import { AuthRepository } from "../repositories/AuthRepository.js";
import { getPasswordRequirements, validatePassword } from "../utils/PasswordUtils.js";

const authRepo = new AuthRepository();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password are required" });
  try {
    const result = await authRepo.login(email, password);
    if (!result)
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    const { user, token } = result;
    res.json({ success: true, user, token });
  } catch (err: any) {
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
    const result = await authRepo.signup(login, email, password);
    if (!result)
      return res.status(500).json({ success: false, message: "Signup failed" });
    const { user, token } = result;
    res.status(201).json({ success: true, user, token });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  if (!email)
    return res.status(400).json({ success: false, message: "Email is required" });
  try {
    const exists = await authRepo.emailExists(email);
    res.json({ success: true, exists });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const checkLogin = async (req: Request, res: Response) => {
  const { login } = req.params;
  if (!login)
    return res.status(400).json({ success: false, message: "Login is required" });
  try {
    const exists = await authRepo.loginExists(login);
    res.json({ success: true, exists });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
