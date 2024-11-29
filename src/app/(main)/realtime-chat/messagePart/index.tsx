"use client";

import { Box, styled } from "@mui/material";
import { useEffect, useRef } from "react";

import MyMessage from "@/app/(main)/realtime-chat/messagePart/MyMessage";
import SomeOneMessage from "@/app/(main)/realtime-chat/messagePart/SomeOneMessage";
import { IMessage } from "@/app/_components/SocketProvider";

interface IProps {
  messages: IMessage[];
  userName: string;
}

export default function MessagePart(props: IProps) {
  const { messages, userName } = props;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  useEffect(() => {
    if (messages && messages.length !== 0) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <Wrapper>
      {messages.map((message, index) => {
        const isMyMessage = userName === message.userName;
        return (
          <Message key={index} ismymessage={isMyMessage.toString()}>
            {isMyMessage ? (
              <MyMessage message={message.content} />
            ) : (
              <SomeOneMessage {...message} msgId={index} />
            )}
          </Message>
        );
      })}
      <ScrollBox ref={messagesEndRef} />
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "20px",
    width: "100%",
    display: "flex",
    height: "362px",
    overflowY: "auto",
    maxHeight: "300px",
    padding: "12px",
    flexDirection: "column",
    backgroundColor: "#fff",
    // border: "1px solid #e9e9e9",
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

const ScrollBox = styled(Box)(() => {
  return {
    marginTop: "-20px",
  };
});
