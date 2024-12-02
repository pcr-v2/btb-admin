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
}

export default function ChatInputPart(props: IProps) {
  const { onClickEmoji, onClickSend, currentMessage, onChange } = props;
  return (
    <InputPart>
      <FormST>
        <ChatInput
          label="메세지를 입력해주세요"
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
    zIndex: 3,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: "44px",
  };
});
