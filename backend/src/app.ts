import espress from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import friendRoutes from "./routes/FriendRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";

const app = espress();

app.use(cors());
app.use(espress.json());
app.use("/users", userRoutes);
app.use("/friends", friendRoutes);
app.use("/auth", authRoutes);

export default app;
