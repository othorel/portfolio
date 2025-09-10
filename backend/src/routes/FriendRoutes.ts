import { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { 
    addFriend,
    removeFriend,
    getFriends   
} from "../handlers/FriendHandlers.js";

const router = Router();

router.use(authenticate);
router.post("/add", addFriend);
router.post("/remove", removeFriend);
router.get("/:userId", getFriends);

export default router;