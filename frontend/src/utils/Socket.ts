import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: { token },
      path: "/socket.io", // doit correspondre au backend
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connecté :", socket?.id);
    });

    socket.on("connect_error", (err: Error) => {
      console.error("❌ Erreur de connexion Socket.IO :", err.message);
    });

    socket.on("disconnect", (reason: string) => {
      console.warn("⚠️ Socket déconnecté :", reason);
    });
  }

  return socket!;
};

export const getSocket = (): Socket | null => socket;
