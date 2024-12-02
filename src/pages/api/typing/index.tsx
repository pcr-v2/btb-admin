"use server";

import { NextApiRequest } from "next";

import { NextApiResponseServerIO } from "@/types/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method === "POST") {
    const typingInfo = req.body;

    console.log("typingInfo", typingInfo);

    res?.socket?.server?.io?.emit("onTyping", typingInfo);
    res.status(201).json(typingInfo);
  }
}
