import { z } from "zod";

export const createChatSchema = z.object({
  msgId: z.string({ required_error: "메세지 아이디가 없습니다." }),
  userName: z.string({ required_error: "유저 이름을 입력해주세요" }),
  attachedImage: z.object({
    type: z.enum(["Emoji", "Picture", "Video"]).default("Emoji"),
    key: z.string().default(""),
  }),
  content: z
    .string({ required_error: "채팅 내용을 입력해주세요." })
    .default(""),
  profileImg: z.string({ required_error: "유저 프로필이미지가 없습니다." }),
});

export type CreateChatRequest = z.input<typeof createChatSchema>;

export type CreateChatResponse =
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
