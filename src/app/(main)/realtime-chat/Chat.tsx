"use client";

import { Box, Button, styled } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io as ClientIO } from "socket.io-client";

import ConnectedUserProfile from "@/app/(main)/realtime-chat/ConnectedUserProfile";
import AttachImage from "@/app/(main)/realtime-chat/attachImage";
import PreviewDim from "@/app/(main)/realtime-chat/attachImage/PreviewDim";
import ChatInputPart from "@/app/(main)/realtime-chat/chatInput";
import MessagePart from "@/app/(main)/realtime-chat/messagePart";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { IMessage, useSocket } from "@/app/_components/SocketProvider";
import ChatInput from "@/app/_components/common/ChatInput";
import Emoji_Add from "@/assets/icon/emoji-add.svg";

type TSelectedEmoji = {
  emojiType: "Emoji" | "Picture" | "Video";
  emojiKey: string;
};

export type TCurrentMessage = {
  emoji?: { emojiType: "Emoji" | "Picture" | "Video"; emojiKey: string };
  msg: string;
};

interface IProps {
  res: GetUserResponse;
}

export default function Chat(props: IProps) {
  const { res } = props;
  const { socket, connectedUsers } = useSocket();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userProfileImg, setUserProfileImg] = useState("");
  const [onClickEmoji, setOnClickEmoji] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<TSelectedEmoji>({
    emojiType: "Emoji",
    emojiKey: "",
  });

  const [onTypingUser, setOnTypingUSer] = useState({
    userName: "",
    profileImg: "",
    isTyping: false,
  });

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

  const sendTypingInfo = async (
    userName: string,
    profileImg: string,
    isTyping: boolean,
  ) => {
    try {
      await axios.post("/api/typing", {
        userName,
        isTyping,
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
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket?.on("message", handleMessage);

    return () => {
      socket?.off("message", handleMessage);
    };
  }, [socket, messages, res]);

  useEffect(() => {
    socket?.on(
      "onTyping",
      (data: { userName: string; profileImg: string; isTyping: boolean }) => {
        setOnTypingUSer({
          userName: data.userName,
          profileImg: data.profileImg,
          isTyping: data.isTyping,
        });
      },
    );

    return () => {
      socket?.off("onTyping");
    };
  }, [socket, userName]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentMessage.trim() && selectedEmoji.emojiKey === "") return;

    try {
      await axios.post("/api/chat", {
        userName,
        emoji: selectedEmoji,
        content: currentMessage,
        profileImg: userProfileImg,
      });
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
    setCurrentMessage("");
    setSelectedEmoji({ emojiType: "Emoji", emojiKey: "" });
    setShowPreview(false);
  };

  useEffect(() => {
    if (currentMessage !== "") {
      setOnClickEmoji(false);
      // setIsTypingMyMessage(true);
      // handleTyping(userName, true); // 타이핑 시작
      sendTypingInfo(userName, userProfileImg, true);
    } else {
      // setIsTypingMyMessage(false);
      // handleTyping(userName, false); // 타이핑 종료
      sendTypingInfo(userName, userProfileImg, false);
    }
  }, [currentMessage, userName, userProfileImg]);

  return (
    <Wrapper>
      <ConnectedUserProfile
        userName={userName}
        connectedUsers={connectedUsers[connectedUsers.length - 1]}
      />

      <MessagePart
        messages={messages}
        userName={userName}
        onTypingUser={onTypingUser}
      />

      <ChatInputPart
        currentMessage={currentMessage}
        onChange={(value) => setCurrentMessage(value)}
        onClickEmoji={() => setOnClickEmoji(!onClickEmoji)}
        onClickSend={sendMessage}
      />

      {showPreview && (
        <PreviewDim
          selectedEmoji={selectedEmoji}
          onClose={() => setShowPreview(!showPreview)}
        />
      )}

      {onClickEmoji && (
        <AttachImage
          onClose={() => setOnClickEmoji(false)}
          onClickEmoji={(
            emojiType: "Emoji" | "Picture" | "Video",
            emojiKey: string,
          ) => {
            // const messageWithEmoji = currentMessage + emojiKey;
            // setCurrentMessage(messageWithEmoji);
            // setContent(messageWithEmoji);
            setSelectedEmoji({ emojiType, emojiKey });
            setOnClickEmoji(!onClickEmoji);
            setShowPreview(true);
            // setCurrentMessage('');
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
    zIndex: 1,
    border: "1px solid #eee",
  };
});
