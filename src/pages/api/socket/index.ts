import { Server as NetServer } from "http";
import { NextRequest } from "next/server";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIO } from "@/types/chat";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server ... ✅");

    const httpServer: NetServer = res.socket.server as any;

    const io = new ServerIO(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "http://192.168.3.20:2024", // 클라이언트의 URL
        credentials: true, // 쿠키 공유 위함
      },
      transports: ["websocket"],
    });

    res.socket.server.io = io;
  }

  res.end();
};
