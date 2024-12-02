"use client";

import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import DotLoading from "@/app/_components/common/DotLoading";
import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";
import useMappingEmojiConfig from "@/hooks/useMappingEmojiConfig";

interface IProps {
  emoji: { emojiType: "Emoji" | "Picture" | "Video"; emojiKey: string };
  content: string;
  userName: string;
  profileImg?: string;
  msgId: number;
  onTypingUser: {
    userName: string;
    profileImg: string;
    isTyping: boolean;
  };
}

export default function SomeOneMessage(props: IProps) {
  const { content, userName, profileImg, msgId, emoji, onTypingUser } = props;

  return (
    <Wrapper>
      <ProfileImg src={profileImg} alt="profile" />

      <Contents>
        <UserName>{userName}</UserName>
        <Message>
          {onTypingUser.isTyping && msgId === -1 ? (
            <DotLoading />
          ) : emoji.emojiKey === "" ? (
            content
          ) : (
            <WithEmojiMessageBox>
              {useMappingEmojiConfig({ ...emoji })}
              {content === "" ? "" : content}
            </WithEmojiMessageBox>
          )}
        </Message>
      </Contents>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)(() => {
  return {
    zIndex: 1,
    gap: "12px",
    display: "flex",
    alignItems: "start",
    position: "relative",
  };
});

const Message = styled(Box)(() => {
  return {
    display: "flex",
    fontSize: "12px",
    width: "100%",
    maxWidth: "400px",
    padding: "8px 12px",
    borderRadius: "4px",
    alignItems: "center",
    whiteSpace: "normal",
    position: "relative",
    wordBreak: "break-word",
    backgroundColor: "#f3f0f0",
    border: "1px solid #ebebeb",

    ":after": {
      left: 0,
      top: "50%",
      width: "0px",
      height: "0px",
      content: '""',
      borderTop: "0px",
      borderLeft: "0px",
      marginTop: "-18px",
      marginLeft: "-18px",
      position: "absolute",
      border: "12px solid transparent",
      borderRightColor: "#f3f0f0",
    },
  };
});

const ProfileImg = styled("img")(() => {
  return {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 5px 12px rgba(0,0,0,0.12), 0 1px 5px rgba(0,0,0,0.24)",
  };
});

const UserName = styled("span")(() => {
  return {
    fontSize: "10px",
    lineHeight: "120%",
    letterSpacing: "0.5px",
  };
});

const Contents = styled(Box)(() => {
  return {
    gap: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
});

const WithEmojiMessageBox = styled(Box)(() => {
  return {
    gap: "4px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };
});
