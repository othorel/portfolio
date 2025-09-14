import express, { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { 
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification
} from "../handlers/NotificationHandler.js";

const router = Router();

router.use(authenticate);
router.get("/", getUserNotifications);
router.patch("/read/:id", markNotificationAsRead);
router.delete("/:id", express.json(), deleteNotification);

export default router;
