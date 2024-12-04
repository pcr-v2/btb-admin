"use client";

import { Box, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import MessageNotice from "@/app/(main)/realtime-chat/messagePart/MessageNotice";
import MyMessage from "@/app/(main)/realtime-chat/messagePart/MyMessage";
import OtherMessage from "@/app/(main)/realtime-chat/messagePart/OtherMessage";
import { IMessage } from "@/app/_components/SocketProvider";

interface IProps {
  messages: IMessage[];
  userInfo: { userName: string; profileImg: string };
  onClickReply: (value: string) => void;
}

export default function MessagePart(props: IProps) {
  const { messages, userInfo, onClickReply } = props;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 10);
  };

  useEffect(() => {
    if (messages && messages.length !== 0) {
      scrollToBottom();
    }
  }, [messages]);

  const [notice, setNotice] = useState("");

  return (
    <Wrapper>
      <MessageNotice notice={notice} />
      {messages.map((message, index) => {
        const isMyMessage = userInfo.userName === message.userName;
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
                userInfo={userInfo}
                message={message}
                msgId={index}
                showTimeStamp={showTimeStamp}
                onClickNotice={(value) => setNotice(value)}
                onClickReply={(value) => onClickReply(value)}
              />
            ) : (
              <OtherMessage
                {...message}
                msgId={index}
                userInfo={userInfo}
                showTimeStamp={showTimeStamp}
                onClickNotice={(value) => setNotice(value)}
                onClickReply={(value) => onClickReply(value)}
              />
            )}
          </Message>
        );
      })}
      <ScrollBox
        ref={messagesEndRef}
        isemoji={(
          messages[messages.length - 1]?.emoji.emojiKey !== ""
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
