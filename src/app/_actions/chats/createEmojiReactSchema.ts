import { z } from "zod";

export const createEmojiReactSchema = z.object({
  msgId: z.string({ required_error: "메세지 아이디가 없습니다." }),
  userName: z.string({ required_error: "유저 이름을 입력해주세요" }),
  emojiKey: z.string({ required_error: "이모지키가 없습니다." }),
  profileImg: z.string({ required_error: "유저 프로필이미지가 없습니다." }),
});

export type CreateEmojiReactRequest = z.input<typeof createEmojiReactSchema>;

export type CreateEmojiReactResponse =
  | {
      code: "SUCCESS";
    }
  | {
      code: "VALID_ERROR";
      message: string;
    }
  | {
      code: "ERROR";
      message: string;
    };
