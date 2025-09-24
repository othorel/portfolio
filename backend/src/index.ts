import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import { Server } from "socket.io";
import http from "http";
import { prisma } from "./prismaClient.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = Number(process.env.PORT) || 3001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("Nouvel utilisateur connecté :", socket.id);

  socket.on("join", (userId: number) => {
    socket.data.userId = userId;
    socket.join(userId.toString());
    console.log(`Utilisateur ${userId} a rejoint la room`);
  });

  socket.on("send_message", async (data) => {
    try {
      const message = await prisma.message.create({
        data: {
          conversationId: data.conversationId,
          senderId: data.senderId,
          content: data.content,
        },
        include: { sender: true },
      });

      const participants = await prisma.conversationParticipant.findMany({
        where: { conversationId: data.conversationId },
      });

      participants.forEach((p) => {
        io.to(p.userId.toString()).emit("new-message", message);
      });

    } catch (err) {
      console.error("Erreur send_message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté :", socket.id);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { io };
