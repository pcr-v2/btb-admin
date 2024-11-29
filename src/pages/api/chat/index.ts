"use server";

import { NextApiRequest } from "next";

import { NextApiResponseServerIO } from "@/types/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method === "POST") {
    const message = req.body;
    console.log("신규 메세지 🎉", req.body);

    res?.socket?.server?.io?.emit("message", message);
    res?.socket?.server?.io?.emit("onUserJoin", message.userName);

    res.status(201).json(message);
  }
}
