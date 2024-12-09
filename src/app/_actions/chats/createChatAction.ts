"use server";

import { v4 as uuidv4 } from "uuid";

import {
  CreateChatRequest,
  CreateChatResponse,
  createChatSchema,
} from "@/app/_actions/chats/createChatSchema";
import { mongodbPrisma } from "@/lib/prisma";

export async function createChatAction(
  req: CreateChatRequest,
): Promise<CreateChatResponse> {
  const validated = await createChatSchema.safeParse(req);
  if (validated.success === false) {
    return {
      code: "VALID_ERROR" as const,
      message: validated.error.errors[0].message,
    };
  }

  try {
    const createResult = await mongodbPrisma.chats.create({
      data: {
        msgId: uuidv4(),
        userName: validated.data.userName,
        emojiType: validated.data.emoji.emojiType,
        emojiKey: validated.data.emoji.emojiKey,
        profileImg: validated.data.profileImg,
        content: validated.data.content,
        timeStamp: validated.data.timeStamp,
      },
    });

    if (createResult == null) {
      return {
        code: "ERROR" as const,
        message: "메세지 전송중 에러가 발생했습니다.",
      };
    }

    return {
      code: "SUCCESS",
    };
  } catch (error) {
    console.log(error);

    return {
      code: "ERROR" as const,
      message: "에러가 발생했습니다.",
    };
  }
}
