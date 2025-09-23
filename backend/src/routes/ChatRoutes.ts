import express, { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import {
    createConversation,
    sendMessage,
    getMessages,
    getConversations } from "../handlers/ChatHandlers.js";

const router = Router();

router.use(authenticate);
router.post("/conversation", express.json(), createConversation);
router.get("/conversations", getConversations);
router.post("/message", express.json(), sendMessage);
router.get("/messages", getMessages);

export default router;
