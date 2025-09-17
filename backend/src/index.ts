import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import { Server } from "socket.io";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = Number(process.env.PORT) || 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Nouvel utilisateur connecté :", socket.id);

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté :", socket.id);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { io };
