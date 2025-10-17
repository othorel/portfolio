import http from "http";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import { Server } from "socket.io";
import { prisma } from "./prismaClient.js";

// Résolution du chemin absolu
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chargement des variables d'environnement
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = Number(process.env.PORT) || 3001;

// === Serveur HTTP (pas HTTPS, car géré par Nginx) ===
const server = http.createServer(app);

// === Configuration Socket.IO ===
const io = new Server(server, {
  path: "/socket.io",
  cors: { origin: "*" },
});

// === Gestion des connexions ===
io.on("connection", (socket) => {
  console.log("✅ Nouveau client connecté :", socket.id);

  // Le client joint sa "room" utilisateur
  socket.on("join", (userId: number) => {
    socket.data.userId = userId;
    socket.join(userId.toString());
    console.log(`👥 Utilisateur ${userId} a rejoint la room`);
  });

  // Envoi d’un message
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

      // Trouver les participants et leur envoyer le message
      const participants = await prisma.conversationParticipant.findMany({
        where: { conversationId: data.conversationId },
      });

      participants.forEach((p) => {
        io.to(p.userId.toString()).emit("new-message", message);
      });
    } catch (err) {
      console.error("❌ Erreur send_message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❎ Utilisateur déconnecté :", socket.id);
  });
});

// === Lancement du serveur ===
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 HTTP Server running on http://localhost:${PORT}`);
});
