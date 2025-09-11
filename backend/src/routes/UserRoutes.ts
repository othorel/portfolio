import { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { uploadAvatar } from "../middlewares/UploadMiddleware.js";
import { 
    getAllUsers, 
    getUserById, 
    getUserByEmail,
    createUser, 
    updateUser, 
    deleteUser 
} from "../handlers/UserHandlers.js";

const router = Router();

router.post("/", createUser);
router.use(authenticate);
router.get("/", getAllUsers);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUserById);
router.put("/:id", uploadAvatar, updateUser);
router.delete("/:id", deleteUser);

export default router;

