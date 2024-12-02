"use client";

import { Box, styled } from "@mui/material";
import { useEffect, useRef } from "react";

import MessageStatusByTyping from "@/app/(main)/realtime-chat/messagePart/CaseMessageByTyping";
import CaseMessageByTyping from "@/app/(main)/realtime-chat/messagePart/CaseMessageByTyping";
import MyMessage from "@/app/(main)/realtime-chat/messagePart/MyMessage";
import SomeOneMessage from "@/app/(main)/realtime-chat/messagePart/SomeOneMessage";
import { IMessage } from "@/app/_components/SocketProvider";
import DotLoading from "@/app/_components/common/DotLoading";

interface IProps {
  messages: IMessage[];
  userName: string;
  onTypingUser: { userName: string; profileImg: string; isTyping: boolean };
}

export default function MessagePart(props: IProps) {
  const { messages, userName, onTypingUser } = props;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 10);
  };

  useEffect(() => {
    if ((messages && messages.length !== 0) || onTypingUser.isTyping) {
      console.log("다운 트리거");

      scrollToBottom();
    }
  }, [messages, onTypingUser]);

  const isMyOnTyping = userName === onTypingUser.userName;
  const isMessagesEmpty = messages.length === 0;

  return (
    <Wrapper>
      {isMessagesEmpty ? (
        <CaseMessageByTyping onTypingUser={onTypingUser} userName={userName} />
      ) : (
        <>
          {messages.map((message, index) => {
            const isMyMessage = userName === message.userName;

            return (
              <Message key={index} ismymessage={isMyMessage.toString()}>
                {isMyMessage ? (
                  <MyMessage
                    message={message}
                    isMyOnTyping={isMyOnTyping}
                    msgId={index}
                  />
                ) : (
                  <SomeOneMessage
                    {...message}
                    msgId={index}
                    onTypingUser={onTypingUser}
                  />
                )}
              </Message>
            );
          })}

          {/* 마지막 메시지 아래에 타이핑 중인 사용자 표시 */}

          <CaseMessageByTyping
            onTypingUser={onTypingUser}
            userName={userName}
          />
        </>
      )}
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
    gap: "20px",
    width: "100%",
    display: "flex",
    height: "362px",
    padding: "12px",
    overflowY: "auto",
    maxHeight: "300px",
    overflowX: "hidden",
    flexDirection: "column",
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
    marginTop: isemoji ? "30px" : "0px",
  };
});
