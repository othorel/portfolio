import express, { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { 
    addFriend,
    removeFriend,
    getFriends,
    acceptFriend,
    rejectFriend,
    getPendingRequests,   
    getUserWithFriends
} from "../handlers/FriendHandlers.js";

const router = Router();

router.use(authenticate);
router.post("/add", addFriend);
router.delete("/remove", express.json(), removeFriend);
router.patch("/accept", acceptFriend);
router.patch("/reject", rejectFriend);
router.get("/requests", getPendingRequests);
router.get("/", getFriends);
router.get("/user", getUserWithFriends);

export default router;