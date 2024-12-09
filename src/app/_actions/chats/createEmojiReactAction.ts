"use server";

import { v4 as uuidv4 } from "uuid";

import {
  CreateChatRequest,
  CreateChatResponse,
  createChatSchema,
} from "@/app/_actions/chats/createChatSchema";
import {
  CreateEmojiReactRequest,
  CreateEmojiReactResponse,
  createEmojiReactSchema,
} from "@/app/_actions/chats/createEmojiReactSchema";
import { mongodbPrisma } from "@/lib/prisma";

export async function createEmojiReactAction(
  req: CreateEmojiReactRequest,
): Promise<CreateEmojiReactResponse> {
  const validated = await createEmojiReactSchema.safeParse(req);
  if (validated.success === false) {
    return {
      code: "VALID_ERROR" as const,
      message: validated.error.errors[0].message,
    };
  }

  try {
    const createEmojiReactRes = await mongodbPrisma.chats.update({
      where: {
        msgId: validated.data.msgId,
        emojiKey: {
          not: validated.data.emojiKey,
        },
      },
      data: {
        emojiReact: {
          push: {
            userName: validated.data.userName,
            emojiKey: validated.data.emojiKey,
            profileImg: validated.data.profileImg,
          },
        },
      },
    });

    if (createEmojiReactRes == null) {
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
