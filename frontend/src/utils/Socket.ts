import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: { token },
      transports: ["websocket", "polling"],
    });
    socket.on("connect", () => {
    });
  }
  return socket;
};

export const getSocket = () => socket;
