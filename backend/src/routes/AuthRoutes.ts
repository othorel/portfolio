import { Router } from "express";
import {
    login,
    signup,
    checkEmail,
    checkLogin
} from "../handlers/AuthHandlers.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/email/:email", checkEmail);
router.get("/login/:login", checkLogin);

export default router;
