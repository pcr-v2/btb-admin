"use client";

import { Box, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import MessageNotice from "@/app/(main)/realtime-chat/messagesPart/MessageNotice";
import MyMessage from "@/app/(main)/realtime-chat/messagesPart/MyMessage";
import OtherMessage from "@/app/(main)/realtime-chat/messagesPart/OtherMessage";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { IMessage } from "@/app/_components/SocketProvider";
import useScollBottom from "@/hooks/useScollBottom";
import dayjs from "@/lib/dayjs";

interface IProps {
  messages: IMessage[];
  userData: Pick<GetUserResponse, "data">["data"];
  // onClickReply: (value: string) => void;
}

export default function MessagesPart(props: IProps) {
  const { messages, userData } = props;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = useScollBottom(messagesEndRef);
  console.log("messages", messages);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (messages && messages.length !== 0) scrollToBottom();
  }, [messages]);

  return (
    <Wrapper>
      <MessageNotice notice={notice} />
      {messages.map((message, index) => {
        const isMyMessage = userData.name === message.userName;
        // 다음 메시지의 timeStamp와 비교
        const nextMessageTimeStamp =
          messages[index + 1]?.userName === message.userName
            ? messages[index + 1]?.timeStamp
            : null;

        const showTimeStamp = nextMessageTimeStamp !== message.timeStamp;
        return (
          <Message key={index} ismymessage={isMyMessage.toString()}>
            {isMyMessage ? (
              <MyMessage
                userInfo={userData}
                message={message}
                msgId={message.msgId}
                showTimeStamp={showTimeStamp}
                onClickNotice={(value) => setNotice(value)}
              />
            ) : (
              <OtherMessage
                message={message}
                msgId={message.msgId}
                userInfo={userData}
                showTimeStamp={showTimeStamp}
                onClickNotice={(value) => setNotice(value)}
                // onClickReply={(value) => onClickReply(value)}
              />
            )}
          </Message>
        );
      })}
      <ScrollBox
        ref={messagesEndRef}
        isemoji={(
          messages[messages.length - 1]?.attachedImage?.key !== ""
        ).toString()}
      />
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "36px",
    width: "100%",
    display: "flex",
    height: "500px",
    overflowY: "auto",
    maxHeight: "500px",
    overflowX: "hidden",
    position: "relative",
    flexDirection: "column",
    padding: "12px 12px 0px",
    backgroundColor: "#fff",
    "::-webkit-scrollbar": {
      display: "none",
    },
  };
});

const Message = styled(Box)<{ ismymessage: string }>(({ ismymessage }) => {
  return {
    width: "100%",
    display: "flex",
    justifyContent: ismymessage === "true" ? "end" : "start",
  };
});

const ScrollBox = styled(Box)<{ isemoji: string }>(({ isemoji }) => {
  return {
    marginTop: isemoji ? "30px" : "-20px",
  };
});
