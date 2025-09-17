import { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { 
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification,
    getUnreadCount
} from "../handlers/NotificationHandler.js";

const router = Router();

router.use(authenticate);
router.get("/", getUserNotifications);
router.get("/unread-count", getUnreadCount);
router.patch("/read/:id", markNotificationAsRead);
router.delete("/:id", deleteNotification);

export default router;
