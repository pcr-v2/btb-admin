"use server";

import { v4 as uuidv4 } from "uuid";

import {
  CreateChatRequest,
  CreateChatResponse,
  createChatSchema,
} from "@/app/_actions/chats/createChatSchema";
import dayjs from "@/lib/dayjs";
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

  const today = dayjs();

  try {
    const createResult = await mongodbPrisma.chats.create({
      data: {
        msgId: validated.data.msgId,
        userName: validated.data.userName,
        attachedImgType: validated.data.attachedImage.type,
        attachedImgKey: validated.data.attachedImage.key,
        profileImg: validated.data.profileImg,
        content: validated.data.content,
        timeStamp: today.toISOString(),
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
