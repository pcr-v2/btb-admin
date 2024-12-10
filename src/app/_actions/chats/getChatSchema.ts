import { z } from "zod";

export type TEmojiReact = {
  userName: string;
  profileImg: string;
  emojiKey: string;
};

export type TMessage = {
  msgId: string;
  userName: string;
  emoji: { emojiType: "Emoji" | "Picture" | "Video"; emojiKey: string };
  content: string;
  profileImg: string;
  timeStamp: string | Date;
  emojiReact: TEmojiReact[];
};

export const getChatSchema = z.object({
  userName: z.string({ required_error: "유저 이름을 입력해주세요" }),
  emoji: z.object({
    emojiType: z.enum(["Emoji", "Picture", "Video"]).default("Emoji"),
    emojiKey: z.string().default(""),
  }),
  content: z
    .string({ required_error: "채팅 내용을 입력해주세요." })
    .default(""),
  profileImg: z.string({ required_error: "유저 프로필이미지가 없습니다." }),
  timeStamp: z.string({ required_error: "시간이 필요합니다." }),
});

export type GetChatResponse =
  | {
      code: "SUCCESS";
      data: TMessage[];
    }
  | {
      code: "VALID_ERROR";
      message: string;
    }
  | {
      code: "ERROR";
      message: string;
    };
