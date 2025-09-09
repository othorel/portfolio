import espress from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";

const app = espress();

app.use(cors());
app.use(espress.json());
app.use("/users", userRoutes);

export default app;
