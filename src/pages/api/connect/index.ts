"use server";

import { NextApiRequest } from "next";

import { NextApiResponseServerIO } from "@/types/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method === "POST") {
    const userInfo = req.body;
    res?.socket?.server?.io?.emit("onUserJoin", userInfo);
    res.status(201).json(userInfo);
  }
}
