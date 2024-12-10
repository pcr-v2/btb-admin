"use server";

import { GetChatResponse, TMessage } from "@/app/_actions/chats/getChatSchema";
import dayjs from "@/lib/dayjs";
import { mongodbPrisma } from "@/lib/prisma";

export async function getChatAction(): Promise<GetChatResponse> {
  try {
    const getChatResult = await mongodbPrisma.chats.findMany({
      orderBy: { timeStamp: "asc" },
      take: 100,
    });

    if (getChatResult == null) {
      return {
        code: "ERROR" as const,
        message: "메세지를 가져오는 과정에서 에러가 발생했습니다.",
      };
    }

    const mappedMessage: TMessage[] = getChatResult.map((chat) => {
      // emojiKey를 기준으로 그룹화된 데이터 생성
      const emojiReactGrouped = chat.emojiReact.reduce(
        (acc, react) => {
          // 이미 해당 emojiKey로 그룹이 존재하는지 확인
          const existingGroup = acc.find(
            (group) => group.emojiKey === react.emojiKey,
          );

          if (existingGroup) {
            // 그룹이 있으면 count 증가
            existingGroup.count += 1;
          } else {
            // 그룹이 없다면 새로 추가
            acc.push({
              emojiKey: react.emojiKey,
              count: 1,
              userName: react.userName,
              profileImg: react.profileImg,
              imgUrl: react.emojiKey,
            });
          }

          return acc;
        },
        [] as {
          emojiKey: string;
          count: number;
          userName: string;
          profileImg: string;
          imgUrl: string;
        }[],
      );

      return {
        userName: chat.userName,
        emoji: {
          emojiType: chat.emojiType as "Emoji" | "Picture" | "Video",
          emojiKey: chat.emojiKey,
        },
        content: chat.content,
        profileImg: chat.profileImg,
        timeStamp: dayjs(chat.timeStamp).format("HH:mm"),
        msgId: chat.msgId,
        emojiReact: emojiReactGrouped,
      };
    });

    return {
      code: "SUCCESS",
      data: mappedMessage,
    };
  } catch (error) {
    console.log(error);

    return {
      code: "ERROR" as const,
      message: "에러가 발생했습니다.",
    };
  }
}
