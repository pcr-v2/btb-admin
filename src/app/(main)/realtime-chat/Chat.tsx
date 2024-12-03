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

import ConnectedUserProfile from "@/app/(main)/realtime-chat/ConnectedUserProfile";
import AttachImage from "@/app/(main)/realtime-chat/attachImage";
import PreviewDim from "@/app/(main)/realtime-chat/attachImage/PreviewDim";
import ChatInputPart from "@/app/(main)/realtime-chat/chatInput";
import MessagePart from "@/app/(main)/realtime-chat/messagePart";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { IMessage, useSocket } from "@/app/_components/SocketProvider";
import ChatInput from "@/app/_components/common/ChatInput";
import Emoji_Add from "@/assets/icon/emoji-add.svg";
import dayjs from "@/lib/dayjs";

type TSelectedEmoji = {
  emojiType: "Emoji" | "Picture" | "Video";
  emojiKey: string;
};

export type TCurrentMessage = {
  emoji?: { emojiType: "Emoji" | "Picture" | "Video"; emojiKey: string };
  msg: string;
};

type TCheckTypingUsers = {
  userName: string;
  profileImg: string;
  isTyping: boolean;
};

interface IProps {
  res: GetUserResponse;
}

export default function Chat(props: IProps) {
  const { res } = props;
  const { socket, connectedUsers, typingUsers } = useSocket();

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

  const [checkTypingUsers, setCheckTypingUsers] = useState<TCheckTypingUsers>();

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

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentMessage.trim() && selectedEmoji.emojiKey === "") return;

    try {
      await axios.post("/api/chat", {
        userName,
        emoji: selectedEmoji,
        content: currentMessage,
        profileImg: userProfileImg,
        timeStamp: dayjs().format("HH:mm"),
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
      setCheckTypingUsers({
        userName,
        profileImg: userProfileImg,
        isTyping: true,
      });
    } else {
      setCheckTypingUsers({
        userName,
        profileImg: userProfileImg,
        isTyping: false,
      });
    }
  }, [currentMessage, userName]);

  useEffect(() => {
    if (checkTypingUsers != null) {
      sendTypingInfo(
        checkTypingUsers.userName,
        checkTypingUsers.profileImg,
        checkTypingUsers.isTyping,
      );
    }
  }, [checkTypingUsers]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOnClickEmoji(false);
      }
    };

    // 키보드 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [reply, setReply] = useState("");
  return (
    <Wrapper>
      <ConnectedUserProfile
        userName={userName}
        connectedUsers={connectedUsers[connectedUsers.length - 1]}
      />

      <MessagePart
        messages={messages}
        userName={userName}
        onClickReply={(value) => setReply(value)}
      />

      <ChatInputPart
        currentMessage={currentMessage}
        onChange={(value) => {
          setCurrentMessage(value);
        }}
        onClickEmoji={() => setOnClickEmoji(!onClickEmoji)}
        onClickSend={(e) => {
          setReply("");
          sendMessage(e);
        }}
        reply={reply}
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

      <Box
        sx={{
          width: "100%",
          minHeight: "20px",
          padding: "0px 12px",
          fontSize: "12px",
        }}
      >
        {typingUsers.length >= 1 &&
          typingUsers.map((el, index) => {
            if (el.isTyping && el.userName !== checkTypingUsers?.userName)
              return (
                <span style={{ fontWeight: 700 }} key={index}>
                  {el.userName}
                  {typingUsers.filter(
                    (el) => el.isTyping && el.userName !== userName,
                  ).length >= 2 && index !== typingUsers.length - 1
                    ? ", "
                    : ""}
                </span>
              );
          })}

        {typingUsers.filter((el) => el.isTyping && el.userName !== userName)
          .length >= 1 && "님이 입력중입니다."}
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    zIndex: 1,
    gap: "8px",
    width: "100%",
    display: "flex",
    maxWidth: "600px",
    minHeight: "600px",
    alignItems: "center",
    borderRadius: "24px",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    padding: "32px 24px 12px",
    border: "1px solid #eee",
  };
});
