"use client";

import { Box, Button, styled } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import ConnectedUserProfile from "@/app/(main)/realtime-chat/ConnectedUserProfile";
import AttachImage from "@/app/(main)/realtime-chat/attachImage";
import ChatInputPart from "@/app/(main)/realtime-chat/chatInput";
import MessagePart from "@/app/(main)/realtime-chat/messagePart";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { IMessage, useSocket } from "@/app/_components/SocketProvider";
import ChatInput from "@/app/_components/common/ChatInput";
import Emoji_Add from "@/assets/icon/emoji-add.svg";

interface IProps {
  res: GetUserResponse;
}

export default function Chat(props: IProps) {
  const { res } = props;
  const { socket, isConnected, connectedUsers } = useSocket();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");
  const [onClickEmoji, setOnClickEmoji] = useState(false);

  const sendUserInfo = async (userName: string, profileImg: string) => {
    try {
      await axios.post("/api/connect", {
        userName,
        profileImg,
      });
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  useEffect(() => {
    if (res) {
      setUserName(res?.data?.name);
      setUserProfileImg(res.data.profile_img);
      sendUserInfo(res.data.name, res.data.profile_img);
    }
  }, []);

  useEffect(() => {
    const handleMessage = async (data: IMessage) => {
      console.log("data ", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket?.on("message", handleMessage);

    return () => {
      socket?.off("message", handleMessage);
    };
  }, [socket, messages, res]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentMessage.trim()) return;

    try {
      await axios.post("/api/chat", {
        userName,
        content: currentMessage,
        profileImg: userProfileImg,
      });
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
    setCurrentMessage("");
  };

  return (
    <Wrapper>
      <ConnectedUserProfile
        userName={userName}
        connectedUsers={connectedUsers[connectedUsers.length - 1]}
      />

      <MessagePart messages={messages} userName={userName} />

      <ChatInputPart
        currentMessage={currentMessage}
        onChange={(value) => setCurrentMessage(value)}
        onClickEmoji={() => setOnClickEmoji(!onClickEmoji)}
        onClickSend={sendMessage}
      />

      {onClickEmoji && (
        <AttachImage
          onClose={() => setOnClickEmoji(false)}
          onClickEmoji={(emojiKey: string) => {
            const messageWithEmoji = currentMessage + emojiKey;
            setCurrentMessage(messageWithEmoji);
            // setContent(messageWithEmoji);
            setOnClickEmoji(!onClickEmoji);
          }}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    display: "flex",
    maxWidth: "600px",
    alignItems: "center",
    borderRadius: "24px",
    flexDirection: "column",
    justifyContent: "center",
    padding: "32px 24px 24px",
    position: "relative",
    border: "1px solid #eee",
  };
});

const IsConnectedBox = styled(motion.div)(() => {
  return {
    gap: "12px",
    display: "flex",
    fontSize: "14px",
    marginLeft: "8px",
    alignItems: "center",
    justifyContent: "start",
  };
});

const Message = styled(Box)<{ ismymessage: string }>(({ ismymessage }) => {
  return {
    width: "100%",
    display: "flex",
    justifyContent: ismymessage === "true" ? "end" : "start",
  };
});

const ProfileImg = styled("img")(() => {
  return {
    width: "48px",
    height: "48px",
    padding: "1px",
    objectFit: "cover",
    borderRadius: "100%",
    border: "1px solid #bcbcbc",
  };
});

const ScrollBox = styled(Box)(() => {
  return {
    marginTop: "-20px",
  };
});

const InputPart = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    marginTop: "12px",
    justifyContent: "center",
  };
});

const FormST = styled("form")(() => {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minHeight: "44px",
  };
});

const EndAdormentButton = styled(Button)(() => {
  return {
    fontWeight: 600,
    fontSize: "14px",
    paddin: "8px 10px",
    borderRadius: "24px",
    whiteSpace: "nowrap",
    letterSpacing: "1px",
  };
});

const InputWrap = styled("div")(() => ({
  position: "relative",
  display: "flex",
  width: "100%",
  maxWidth: "400px",
  minHeight: "50px",
  padding: "16.5px 24px 16.5px 0px",
  justifyContent: "space-between",
  border: "1px solid gray",
}));
