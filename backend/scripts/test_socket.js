import { io } from "socket.io-client";

const socket = io("http://localhost:3001", { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("✅ Connecté au backend :", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("⚠️ Déconnecté :", reason);
});
