import { Router } from "express";
import {
    login,
    checkEmail,
    checkLogin
} from "../handlers/AuthHandlers.js";

const router = Router();

router.post("/login", login);
router.get("/email/:email", checkEmail);
router.get("/login/:login", checkLogin);

export default router;
