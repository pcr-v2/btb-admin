"use server";

import { NextApiRequest } from "next";

import { NextApiResponseServerIO } from "@/types/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method === "POST") {
    const reaction = req.body;

    console.log("reaction", reaction);

    res?.socket?.server?.io?.emit("reaction", reaction);
    res.status(201).json(reaction);
  }
}
