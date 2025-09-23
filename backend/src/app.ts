import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/UserRoutes.js";
import friendRoutes from "./routes/FriendRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import notificationRoutes from "./routes/NotificationRoutes.js";
import chatRoutes from "./routes/ChatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

app.use("/users", userRoutes);
app.use("/friends", friendRoutes);
app.use("/auth", authRoutes);
app.use("/notifications", notificationRoutes);
app.use("/chat", chatRoutes);

export default app;
