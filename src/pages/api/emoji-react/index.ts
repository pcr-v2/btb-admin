"use server";

import { NextApiRequest } from "next";

import { NextApiResponseServerIO } from "@/types/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method === "POST") {
    const emojiReact = req.body;
    console.log("신규 이모티콘 반응 😊", req.body);

    res?.socket?.server?.io?.emit("emojiReact", emojiReact);

    res.status(201).json(emojiReact);
  }
}
