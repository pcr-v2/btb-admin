"use client";

import { Box, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import ConnectedUser from "@/app/(main)/realtime-chat/additionalComponents/ConnectedUser";
import ConnectedUserProfile from "@/app/(main)/realtime-chat/additionalComponents/ConnectedUserProfile";
import TypingUserInfo from "@/app/(main)/realtime-chat/additionalComponents/TypingUserInfo";
import AttachImage from "@/app/(main)/realtime-chat/attachImage";
import PreviewDim from "@/app/(main)/realtime-chat/attachImage/PreviewDim";
import ChatInputPart from "@/app/(main)/realtime-chat/chatInput";
import MessagesPart from "@/app/(main)/realtime-chat/messagesPart";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { createChatAction } from "@/app/_actions/chats/createChatAction";
import { TMessage } from "@/app/_actions/chats/getChatSchema";
import { IMessage, useSocket } from "@/app/_components/SocketProvider";
import dayjs from "@/lib/dayjs";

export type TAttachedImage = {
  type: "Emoji" | "Picture" | "Video";
  key: string;
};

export type TCheckTypingUser = {
  userName: string;
  profileImg: string;
  isTyping: boolean;
};

interface IProps {
  userData: Pick<GetUserResponse, "data">["data"];
  chatData: IMessage[];
}

export default function RealTimeChat(props: IProps) {
  const { userData, chatData } = props;
  const { socket, typingUsers } = useSocket();

  const [messages, setMessages] = useState<IMessage[]>(chatData);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [showAttachImage, setShowAttachImage] = useState(false);
  const [attachedImage, setAttachedImage] = useState<TAttachedImage>({
    type: "Emoji",
    key: "",
  });
  const [checkTypingUser, setCheckTypingUser] = useState<TCheckTypingUser>();

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement>,
    currentValue: string,
  ) => {
    e.preventDefault();

    if (!currentValue.trim() && attachedImage.key === "") return;

    try {
      await axios.post("/api/chat", {
        msgId: uuidv4(),
        userName: userData.name,
        attachedImage: attachedImage,
        content: currentValue,
        profileImg: userData.profile_img,
        timeStamp: dayjs().format("HH:mm"),
      });

      const res = await createChatAction({
        msgId: uuidv4(),
        userName: userData.name,
        attachedImage: attachedImage,
        content: currentValue,
        profileImg: userData.profile_img,
      });

      if (res.code === "ERROR") {
        toast.error("메세지 전송에 에러가 발생했습니다.");
      }
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
    setShowPreviewImage(false);
    setAttachedImage({ type: "Emoji", key: "" });
  };

  const handleSelectAttachImg = (data: TAttachedImage) => {
    const { key, type } = data;
    setAttachedImage({ key, type });
    setShowAttachImage(!attachedImage);
    setShowPreviewImage(true);
  };

  useEffect(() => {
    if (currentMessage !== "" && currentMessage.length < 2) {
      setCheckTypingUser({
        userName: userData.name,
        profileImg: userData.profile_img,
        isTyping: true,
      });
    } else {
      setCheckTypingUser({
        userName: userData.name,
        profileImg: userData.profile_img,
        isTyping: false,
      });
    }
  }, [currentMessage, userData]);

  useEffect(() => {
    const handleMessage = async (data: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    socket?.on("message", handleMessage);

    return () => {
      socket?.off("message", handleMessage);
    };
  }, [socket, messages, userData]);

  return (
    <Wrapper>
      <ConnectedUser userName={userData.name} />
      <MsgContents>
        <MessagesPart messages={messages} userData={userData} />

        <ChatInputPart
          onClickAttachImage={() => setShowAttachImage(!attachedImage)}
          onClickSend={(e, currentValue) => sendMessage(e, currentValue)}
        />

        {showPreviewImage && (
          <PreviewDim
            attachedImage={attachedImage}
            onClose={() => setShowPreviewImage(!showPreviewImage)}
          />
        )}

        {showAttachImage && (
          <AttachImage
            onClose={() => setShowAttachImage(false)}
            onClickAttachImg={(data) => handleSelectAttachImg(data)}
          />
        )}

        <TypingUserInfo
          typingUsers={typingUsers}
          checkTypingUser={checkTypingUser}
          userData={userData}
        />
      </MsgContents>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    width: "100%",
    maxWidth: "600px",
    border: "1px solid red",
  };
});

const MsgContents = styled(Box)(() => {
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
