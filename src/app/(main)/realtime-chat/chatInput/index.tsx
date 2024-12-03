"use client";

import { Box, styled } from "@mui/material";

import { TCurrentMessage } from "@/app/(main)/realtime-chat/Chat";
import PreviewDim from "@/app/(main)/realtime-chat/attachImage/PreviewDim";
import ChatInputAdornment from "@/app/(main)/realtime-chat/chatInput/ChatInputAdornment";
import ChatInput from "@/app/_components/common/ChatInput";

interface IProps {
  currentMessage: string;
  onChange: (value: string) => void;
  onClickSend: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickEmoji: () => void;
  reply?: string;
}

export default function ChatInputPart(props: IProps) {
  const { onClickEmoji, onClickSend, currentMessage, onChange, reply } = props;
  console.log("reply", reply);
  return (
    <InputPart>
      <FormST>
        <ChatInput
          label={
            reply
              ? `${reply}에 대한 답장을 입력해주세요.`
              : "메세지를 입력해주세요"
          }
          value={currentMessage}
          name="message"
          onChange={(e) => onChange(e.target.value)}
          children={
            <ChatInputAdornment
              onClickSend={onClickSend}
              onClickEmoji={onClickEmoji}
            />
          }
          disabled={false}
        />
      </FormST>
    </InputPart>
  );
}

const InputPart = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    marginTop: "12px",
    zIndex: 3,
    justifyContent: "center",
  };
});

const FormST = styled("form")(() => {
  return {
    gap: "10px",
    width: "100%",
    display: "flex",
    minHeight: "44px",
    flexDirection: "column",
  };
});
