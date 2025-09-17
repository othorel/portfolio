import express, { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { 
    addFriend,
    removeFriend,
    getFriends,
    acceptFriend,
    rejectFriend,
    getPendingRequests,
    getSentRequests,   
    getUserWithFriends
} from "../handlers/FriendHandlers.js";

const router = Router();

router.use(authenticate);
router.post("/add", express.json(), addFriend);
router.delete("/remove", express.json(), removeFriend);
router.patch("/accept", express.json(), acceptFriend);
router.patch("/reject", express.json(), rejectFriend);
router.get("/requests/pending", getPendingRequests);
router.get("/requests/sent", getSentRequests);
router.get("/", getFriends);
router.get("/user", getUserWithFriends);

export default router;
