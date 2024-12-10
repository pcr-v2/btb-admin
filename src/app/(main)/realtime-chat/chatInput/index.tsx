"use client";

import { Box, styled } from "@mui/material";
import { useState } from "react";

import PreviewDim from "@/app/(main)/realtime-chat/attachImage/PreviewDim";
import ChatInputAdornment from "@/app/(main)/realtime-chat/chatInput/ChatInputAdornment";
import ChatInput from "@/app/_components/common/ChatInput";

interface IProps {
  onClickSend: (
    e: React.MouseEvent<HTMLButtonElement>,
    currentValue: string,
  ) => void;
  onClickAttachImage: () => void;
}

export default function ChatInputPart(props: IProps) {
  const { onClickAttachImage, onClickSend } = props;

  const [currentValue, setCurrentValue] = useState("");

  return (
    <InputPart>
      <FormST>
        <ChatInput
          label={"메세지를 입력해주세요"}
          value={currentValue}
          name="message"
          onChange={(e) => setCurrentValue(e.target.value)}
          children={
            <ChatInputAdornment
              onClickSend={(e) => {
                onClickSend(e, currentValue);
                setCurrentValue("");
              }}
              onClickEmoji={onClickAttachImage}
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
